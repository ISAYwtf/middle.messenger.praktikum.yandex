import { Block } from '@utils';
import { default as template } from './chat-options-item.hbs?raw';
import { ChatOptionsItemProps } from './types.ts';

export class ChatOptionsItem extends Block<ChatOptionsItemProps> {
    constructor(props: ChatOptionsItemProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            click: this.props.onClick,
        };
    }

    protected render(): string {
        return template;
    }
}
