import { Block } from '@utils';
import { ChatProps } from './types.ts';
import { default as template } from './chat.hbs?raw';
import { CHAT_BLOCKS } from './stub.ts';

export class Chat extends Block<ChatProps> {
    constructor(props: ChatProps) {
        super({
            ...props,
            dateBlocks: CHAT_BLOCKS,
        });
    }

    protected render(): string {
        return template;
    }
}
