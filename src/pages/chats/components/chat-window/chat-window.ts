import { Block } from '@utils';
import { default as template } from './chat-window.hbs?raw';
import { ChatWindowProps } from './types.ts';
import { connect } from '@store';

export class ChatWindow extends Block<ChatWindowProps> {
    constructor(props: ChatWindowProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}

export const ChatWindowConnected = connect(['currentChat'])(ChatWindow);
