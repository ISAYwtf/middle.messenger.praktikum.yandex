import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';
import { AnyFunction, WithEvents } from '@types';
import { cloneDeep, EmbedFn, EventBus, isEqual } from '@utils';
import { AppStore } from '@store';

export type RefType = Record<string, Block>

export interface BlockClass<P extends object = object, R extends RefType = RefType> extends AnyFunction {
    new (props: P): Block<P, R>,
    componentName?: string,
}

export class Block<Props extends object = object, Refs extends RefType = RefType> {
    static EVENTS = {
        INIT: 'init',
        FLOW_CDM: 'flow:component-did-mount',
        FLOW_CDU: 'flow:component-did-update',
        FLOW_CWU: 'flow:component-will-unmount',
        FLOW_RENDER: 'flow:render'
    };

    public id = nanoid(6);
    protected props: WithEvents<Props> & Partial<AppStore>;
    protected refs: Refs = {} as Refs;
    private children: Block[] = [];
    private eventBus: () => EventBus;
    private _element: HTMLElement | null = null;

    constructor(props: Props = {} as Props) {
        const eventBus = new EventBus();
        this.props = this._makePropsProxy(props);
        this.eventBus = () => eventBus;
        this._registerEvents(eventBus);
        eventBus.emit(Block.EVENTS.INIT);
    }

    private _addEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            const eventHandler = events[eventName];
            if (!eventHandler) {
                return;
            }

            this._element?.addEventListener(eventName, eventHandler);
        });
    }

    private _removeEvents() {
        const { events = {} } = this.props;

        Object.keys(events).forEach(eventName => {
            const eventHandler = events[eventName];
            if (!eventHandler) {
                return;
            }

            this._element?.removeEventListener(eventName, eventHandler);
        });
    }

    private _registerEvents(eventBus: EventBus) {
        eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
        eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
        eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
    }

    private _init() {
        this.init();

        this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }

    protected init() {}

    private _componentDidMount() {
        this._checkInDom();
        this.componentDidMount();
    }

    componentDidMount() {}

    public dispatchComponentDidMount() {
        this.eventBus().emit(Block.EVENTS.FLOW_CDM);

        Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
    }

    private _componentDidUpdate(oldProps: any, newProps: any) {
        if (this.componentDidUpdate(oldProps, newProps)) {
            this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
    }

    protected componentDidUpdate(oldProps: Props, newProps: Props) {
        return !isEqual(oldProps, newProps);
    }

    /**
     * Хелпер, который проверяет, находится ли элемент в DOM дереве
     * И если нет, триггерит событие COMPONENT_WILL_UNMOUNT
     */
    private _checkInDom() {
        const elementInDOM = document.body.contains(this._element);

        if (elementInDOM) {
            setTimeout(() => this._checkInDom(), 1000);
            return;
        }

        this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
    }

    private _componentWillUnmount() {
        this._removeEvents();
        this.componentWillUnmount();
    }

    componentWillUnmount() {}

    setProps = (nextProps: Partial<Props>) => {
        if (!nextProps) {
            return;
        }

        Object.assign(this.props, nextProps);
    };

    get element() {
        return this._element;
    }


    private _render() {
        const fragment = this.compile(this.render(), this.props);
        const newElement = fragment.firstElementChild as HTMLElement;

        if (this._element) {
            this._element.replaceWith(newElement);
        }

        this._element = newElement;
        this._addEvents();
    }

    private compile(template: string, context: Props) {
        const contextAndStubs: Props & { __refs: Refs, __children?: { embed: EmbedFn }[] } = {
            ...context,
            __refs: this.refs
        };

        Object.entries(this.children).forEach(([key, child]) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            contextAndStubs[key] = `<div data-id="${child.id}"></div>`;
        });

        const html = Handlebars.compile(template)(contextAndStubs);
        const temp = document.createElement('template');

        temp.innerHTML = html;
        contextAndStubs.__children?.forEach(({ embed }) => {
            embed(temp.content);
        });

        Object.values(this.children).forEach((child) => {
            const stub = temp.content.querySelector(`[data-id="${child.id}"]`);
            stub?.replaceWith(child.getContent()!);
        });

        return temp.content;
    }

    protected render(): string {
        return '';
    }

    getContent() {
        // Хак, чтобы вызвать CDM только после добавления в DOM
        if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
            setTimeout(() => {
                if (
                    this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
                ) {
                    this.dispatchComponentDidMount();
                }
            }, 100);
        }

        return this._element;
    }

    private _makePropsProxy(props: Props): Props {
        return new Proxy(props, {
            get: (target: Props, prop: string) => {
                const value = target[prop as keyof Props];
                return typeof value === 'function' ? value.bind(target) : value;
            },
            set: (target: Props, prop: string, value) => {
                const oldTarget = cloneDeep(target);

                target[prop as keyof Props] = value;

                // Запускаем обновление компоненты
                this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
                return true;
            },
            deleteProperty: () => {
                throw new Error('Нет доступа');
            }
        });
    }

    show() {
        const content = this.getContent();
        if (!content) {
            return;
        }
        content.style.display = 'block';
    }

    hide() {
        const content = this.getContent();
        if (!content) {
            return;
        }
        content.style.display = 'none';
    }
}
