import { Block } from '@utils';
import { default as template } from './chats-list.hbs?raw';
import { ChatsListProps } from './types.ts';
import { CHATS_LIST } from './stub.ts';

export class ChatsList extends Block<ChatsListProps> {
    constructor(props: ChatsListProps) {
        super({
            ...props,
            list: CHATS_LIST,
        });
    }

    protected init() {
        this.props.events = {
            click: (event) => this.onSelect(event),
        };
    }

    private onSelect(event: Event) {
        const element = (event.target as HTMLDivElement)
            .closest('[data-user]') as HTMLDivElement;
        const userId = element?.dataset.user;
        const user = this.props.list
            .find(({ id }) => id === userId);
        if (user) {
            this.props.onSelect?.(user);
            const otherUsers = Array.from(
                element.parentElement?.querySelectorAll('[data-user][data-selected]') ?? []
            );
            otherUsers.forEach((htmlElement) => {
                htmlElement.removeAttribute('data-selected');
            });
            element.setAttribute('data-selected', 'true');
        }
    }

    protected render(): string {
        return template;
    }
}
