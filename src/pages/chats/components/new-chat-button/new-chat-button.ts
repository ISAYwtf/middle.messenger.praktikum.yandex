import { default as template } from './new-chat-button.hbs?raw';
import { Block } from '@utils';
import { NewChatButtonProps } from './types.ts';

export class NewChatButton extends Block<NewChatButtonProps> {
    constructor(props: NewChatButtonProps) {
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
