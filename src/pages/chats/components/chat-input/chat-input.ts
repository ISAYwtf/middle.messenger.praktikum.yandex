import { Block, validators } from '@utils';
import { default as template } from './chat-input.hbs?raw';
import { ChatInputProps } from './types.ts';

export class ChatInput extends Block<ChatInputProps> {
    constructor(props: ChatInputProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            blur: () => this.validate(),
        };
    }

    componentDidMount() {
        this.validate();
    }

    public get value() {
        return (this.element as HTMLInputElement)?.value ?? '';
    }

    public error = false;

    private setError(value: boolean) {
        this.error = value;
    }

    private validate() {
        const error = validators.text(this.value);
        this.setError(Boolean(error));
        this.props.onValidate?.(error);
        return error;
    }

    protected render(): string {
        return template;
    }
}
