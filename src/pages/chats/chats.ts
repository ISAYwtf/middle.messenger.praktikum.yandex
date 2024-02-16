import { Block } from '@utils';
import { default as template } from './chats.hbs?raw';
import { ChatType } from '@store/types.ts';
import { ChatsListProps } from '@pages/chats/components/chats-list/types.ts';
import { chatService } from '@services';

interface ChatsProps {
    onSelect: ChatsListProps['onSelect'],
}

export class Chats extends Block<ChatsProps> {
    constructor() {
        super({
            onSelect: (user: ChatType) => this.onSelect(user),
        });
    }

    private async onSelect(chat: ChatType) {
        await chatService.selectChat(chat);
    }

    protected render(): string {
        return template;
    }
}
