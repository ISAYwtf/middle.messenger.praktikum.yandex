import { Block, ERRORS } from '@utils';
import { default as template } from './delete-user-modal.hbs?raw';
import { DeleteUserModalProps, DeleteUserModalRefs } from './types.ts';
import { DELETE_USER_MODAL_FIELDS_CONFIG } from './fieldsConfig.ts';
import { chatService } from '@services';

export class DeleteUserModal extends Block<DeleteUserModalProps, DeleteUserModalRefs> {
    constructor(props: DeleteUserModalProps) {
        super({
            ...props,
            title: 'Удалить пользователя',
            fields: DELETE_USER_MODAL_FIELDS_CONFIG,
            actions: [
                {
                    label: 'Удалить',
                    type: 'critical',
                    onClick: () => this.deleteUser(),
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

    async deleteUser() {
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
            return false;
        }

        const userCanBeDeleted = await this.checkUserInChat(chatId, userId);
        if (!userCanBeDeleted) {
            return;
        }

        const response = await chatService.deleteUsers(chatId, [userId]);
        if (response === null) {
            return;
        }

        this.close();
    }

    private async checkUserInChat(chatId: number, userId: number) {
        const currentUserId = window.store.getState().user?.id;
        if (currentUserId === userId) {
            this.setError(ERRORS.userCantBeDeleted);
            return false;
        }

        const usersList = await chatService.getUsers(chatId) ?? [];
        const targetUser = usersList.find(({ id }) => id === userId);

        if (!targetUser) {
            this.setError(ERRORS.userIsNotFound);
            return false;
        }

        if (targetUser.role === 'admin') {
            this.setError(ERRORS.userCantBeDeleted);
            return false;
        }

        return true;
    }

    open(options: DeleteUserModalProps = {}) {
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
