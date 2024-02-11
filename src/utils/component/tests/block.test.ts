import sinon from 'sinon';
import { Block } from '../Block.ts';
import { expect } from 'chai';

interface Props {
    text?: string,
    events?: Record<string, () => void>,
}

describe('block', () => {
    let TestComponent: typeof Block<Props>;

    beforeEach(() => {
        class TestComponentClass extends Block<Props> {
            constructor(props: Props) {
                super(props);
            }

            protected render(): string {
                return (`
                <div>
                    <span id="test-text">{{text}}</span>
                    <button>{{text-button}}</button>
                </div>
            `);
            }
        }

        TestComponent = TestComponentClass;
    });

    it('should create a component with a state from the constructor', () => {
        const text = 'Test';
        const testComponent = new TestComponent({ text });
        const spanText = testComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).equal(text);
    });

    it('component is reactive', () => {
        const text = 'new value';
        const testComponent = new TestComponent({ text: 'Hello' });

        testComponent.setProps({ text });
        const spanText = testComponent.element?.querySelector('#test-text')?.innerHTML;

        expect(spanText).equal(text);

    });

    it('should add events', () => {
        const handlerStub = sinon.stub();
        const testComponent = new TestComponent({ events: {
            click: handlerStub
        } });

        const event = new MouseEvent('click');
        testComponent.element?.dispatchEvent(event);

        expect(handlerStub.calledOnce).true;
    });

    it('should call dispatchComponentDidMount method', () => {
        const clock = sinon.useFakeTimers();
        const testComponent = new TestComponent();

        const spyCDM = sinon.spy(testComponent, 'componentDidMount');

        const element = testComponent.getContent();
        document.body.append(element!);
        clock.next();

        expect(spyCDM.calledOnce).true;
    });
});
