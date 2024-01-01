import { Block } from '@utils';
import { default as template } from './chat-input-line.hbs?raw';
import { ChatInputLineProps, ChatInputLineRefs } from './types.ts';

export class ChatInputLine extends Block<ChatInputLineProps, ChatInputLineRefs> {
    constructor(props: ChatInputLineProps) {
        super({
            ...props,
            onSubmit: () => this.postMessage(),
        });
    }

    componentDidMount() {
        this.applyErrorToSubmitButton();
    }

    private get chatInput() {
        return this.refs.input;
    }

    private get error() {
        return this.chatInput.error;
    }

    private applyErrorToSubmitButton() {
        this.chatInput?.setProps({
            onValidate: () => {
                this.refs.submitButton?.setProps({ disabled: this.error });
            }
        });
        this.refs.submitButton?.setProps({ disabled: this.error });
    }

    private postMessage() {
        if (this.error) {
            return;
        }

        const data = {
            [(this.chatInput.element as HTMLInputElement).name]: this.chatInput.value,
        };

        // todo Отправка данных на сервер
        console.log(data);
    }

    protected render(): string {
        return template;
    }
}
