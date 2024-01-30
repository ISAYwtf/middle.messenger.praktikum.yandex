import { Block } from '@utils';
import { default as template } from './input.hbs?raw';
import { InputProps } from './types.ts';

export class Input extends Block<InputProps> {
    constructor(props: InputProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            blur: this.props.onBlur,
            input: this.props.onInput,
        };
    }

    protected render(): string {
        return template;
    }
}
