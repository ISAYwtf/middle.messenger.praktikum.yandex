import { Block } from '@utils';
import { default as template } from './chat-input-line.hbs?raw';
import { ChatInputLineProps, ChatInputLineRefs } from './types.ts';
import { chatService } from '@services';

export class ChatInputLine extends Block<ChatInputLineProps, ChatInputLineRefs> {
    constructor(props: ChatInputLineProps) {
        super({
            ...props,
            onSubmit: () => this.postMessage(),
        });
    }

    protected init() {
        this.props.events = {
            keydown: (e) => this.onKeyDown(e),
        };
    }

    private onKeyDown(e: Event) {
        const event = e as KeyboardEvent;
        if (event.code !== 'Enter') {
            return;
        }
        event.preventDefault();
        if (this.error) {
            return;
        }
        this.postMessage();
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
        this.chatInput.validate();
        if (this.error) {
            return;
        }

        chatService.message(this.chatInput.value);
        this.chatInput.clear();
    }

    protected render(): string {
        return template;
    }
}
