import { Block } from '@utils';
import { default as template } from './delete-chat-modal.hbs?raw';
import { DeleteChatModalProps } from './types.ts';
import { chatService } from '@services';

export class DeleteChatModal extends Block<DeleteChatModalProps> {
    constructor(props: DeleteChatModalProps) {
        super({
            ...props,
            title: 'Вы действительно хотите удалить чат?',
            actions: [
                {
                    label: 'Удалить',
                    type: 'critical',
                    onClick: () => this.delete(),
                },
                {
                    label: 'Отмена',
                    onClick: () => this.close(),
                },
            ],
        });
    }

    async delete() {
        const chatId = window.store.getState().currentChat?.id;
        if (!chatId) {
            console.error('chatId не определен');
            return;
        }
        const response = await chatService.deleteChat(chatId);
        if (response === null) {
            return;
        }
        this.close();
    }

    open(options: DeleteChatModalProps = {}) {
        this.setProps({
            open: true,
            ...options,
        });
    }

    close() {
        this.setProps({ open: false });
    }

    protected render(): string {
        return template;
    }
}
