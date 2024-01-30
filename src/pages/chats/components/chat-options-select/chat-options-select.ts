import { Block } from '@utils';
import { default as template } from './chat-options-select.hbs?raw';
import { ChatOptionsSelectProps } from './types.ts';

export class ChatOptionsSelect extends Block<ChatOptionsSelectProps> {
    constructor(props: ChatOptionsSelectProps) {
        super(props);
    }

    get opened() {
        return this.props.open;
    }

    toggleOpen() {
        this.setProps({ open: !this.props.open });
    }

    protected render(): string {
        return template;
    }
}
