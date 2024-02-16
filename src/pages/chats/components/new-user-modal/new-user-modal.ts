import { Block, ERRORS } from '@utils';
import { default as template } from './new-user-modal.hbs?raw';
import { NewUserModalProps, NewUserModalRefs } from './types.ts';
import { NEW_USER_MODAL_FIELDS_CONFIG } from './fieldsConfig.ts';
import { chatService, userService } from '@services';

export class NewUserModal extends Block<NewUserModalProps, NewUserModalRefs> {
    constructor(props: NewUserModalProps) {
        super({
            ...props,
            title: 'Добавить пользователя',
            fields: NEW_USER_MODAL_FIELDS_CONFIG,
            actions: [
                {
                    label: 'Добавить',
                    type: 'primary',
                    onClick: () => this.addUser(),
                },
                {
                    label: 'Отмена',
                    onClick: () => this.close(),
                },
            ],
        });
    }

    private setError(error: string) {
        this.refs.userId.errorField.setProps({ error });
        this.refs.userId.errorField.show();
    }

    async addUser() {
        const userId = this.refs.userId.value
            ? parseInt(this.refs.userId.value)
            : null;
        if (!userId) {
            this.setError(ERRORS.incorrectId);
            return;
        }
        const chatId = window.store.getState().currentChat?.id;
        if (!chatId) {
            console.error('chatId не определен');
            return;
        }
        const userResponse = await userService.getUser(userId);
        if (!userResponse) {
            this.setError(ERRORS.userIsNotFound);
            return;
        }
        await chatService.addUsers(chatId, [userId]);
        this.close();
    }

    open(options: NewUserModalProps = {}) {
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
