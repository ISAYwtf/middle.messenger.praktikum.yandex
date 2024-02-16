import { Block } from '@utils';
import { default as template } from './chat-header.hbs?raw';
import { ChatHeaderProps, ChatHeaderRefs } from './types.ts';

export class ChatHeader extends Block<ChatHeaderProps, ChatHeaderRefs> {
    constructor(props: ChatHeaderProps) {
        super({
            ...props,
            options: [
                {
                    label: 'Добавить пользователя',
                    onClick: () => this.addUser(),
                },
                {
                    label: 'Удалить пользователя',
                    onClick: () => this.deleteUser(),
                },
                {
                    label: 'Удалить чат',
                    critical: true,
                    onClick: () => this.removeChatHandler(),
                },
            ],
            onOptionsClick: () => this.onOptionsClick(),
        });
    }

    private addUser() {
        this.onOptionsClick();
        this.refs.newUserModal.open();
    }

    private deleteUser() {
        this.onOptionsClick();
        this.refs.deleteUserModal.open();
    }

    private removeChatHandler() {
        this.onOptionsClick();
        this.refs.deleteChatModal.open();
    }

    private setupOptionsPosition() {
        const {
            left: buttonLeft = 0,
            width: buttonWidth = 0,
            bottom: buttonBottom = 0,
        } = this.refs.optionsButton.element?.getBoundingClientRect() ?? {};

        const optionsElement = this.refs.options.element;

        if (optionsElement) {
            optionsElement.style.top = `${buttonBottom + 8}px`;
            optionsElement.style.left = `${buttonLeft + buttonWidth}px`;
        }
    }

    private onOptionsClick() {
        this.refs.options.toggleOpen();

        const activeClassname = 'chat-header__options-button_active';
        if (this.refs.options.opened) {
            this.refs.optionsButton.element?.classList.add(activeClassname);
        } else {
            this.refs.optionsButton.element?.classList.remove(activeClassname);
        }
        this.setupOptionsPosition();
    }

    protected render(): string {
        return template;
    }
}
