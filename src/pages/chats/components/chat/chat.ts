import { Block } from '@utils';
import { default as template } from './chat.hbs?raw';
import { connect } from '@store';
import { ChatProps } from './types.ts';

export class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}

export const ChatConnected = connect(['chatMessages'])(Chat);
