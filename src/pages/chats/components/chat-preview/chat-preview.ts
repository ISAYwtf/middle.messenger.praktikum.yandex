import { Block } from '@utils';
import { default as template } from './chat-preview.hbs?raw';
import { ChatPreviewProps } from './types.ts';

export class ChatPreview extends Block<ChatPreviewProps> {
    constructor(props: ChatPreviewProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}
