import { Block } from '@utils';
import { default as template } from './new-chat-modal.hbs?raw';
import { NewChatModalProps, NewChatModalRefs } from './types.ts';
import { NEW_CHAT_MODAL_FIELDS_CONFIG } from './fieldsConfig.ts';
import { chatsService } from '@services';

export class NewChatModal extends Block<NewChatModalProps, NewChatModalRefs> {
    constructor(props: NewChatModalProps) {
        super({
            ...props,
            title: 'Создать чат',
            fields: NEW_CHAT_MODAL_FIELDS_CONFIG,
            actions: [
                {
                    label: 'Создать',
                    type: 'primary',
                    onClick: () => this.create(),
                },
                {
                    label: 'Отмена',
                    onClick: () => this.close(),
                },
            ],
        });
    }

    async create() {
        const title = this.refs.title.value;
        if (!title) {
            return;
        }
        await chatsService.create(title);
        this.close();
    }

    open(options: NewChatModalProps = {}) {
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
