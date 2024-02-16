import { Block } from '@utils';
import { default as template } from './chats-list.hbs?raw';
import { ChatsListProps } from './types.ts';
import { connect } from '@store';

export class ChatsList extends Block<ChatsListProps> {
    constructor(props: ChatsListProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            click: (event) => this.onSelect(event),
        };
    }

    private onSelect(event: Event) {
        const element = (event.target as HTMLDivElement)
            .closest('[data-chat]') as HTMLDivElement;

        if (!element?.dataset.chat) {
            return;
        }

        const chatId = parseInt(element?.dataset.chat);
        const chat = this.props.chats
            ?.find(({ id }) => id === chatId);

        if (!chat) {
            return;
        }

        this.props.onSelect?.(chat);
        const otherChats = Array.from(
            element.parentElement?.querySelectorAll('[data-chat][data-selected]') ?? []
        );
        otherChats.forEach((htmlElement) => {
            htmlElement.removeAttribute('data-selected');
        });
        element.setAttribute('data-selected', 'true');
    }

    protected render(): string {
        return template;
    }
}

export const ChatsListConnected = connect(['chats'])(ChatsList);
