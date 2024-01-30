import { Block } from '@utils';
import { default as template } from './chat-options-button.hbs?raw';
import { ChatOptionsButtonProps } from './types.ts';

export class ChatOptionsButton extends Block<ChatOptionsButtonProps> {
    constructor(props: ChatOptionsButtonProps) {
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
