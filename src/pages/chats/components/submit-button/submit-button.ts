import { Block } from '@utils';
import { default as template } from './submit-button.hbs?raw';
import { SubmitButtonProps } from './types.ts';

export class SubmitButton extends Block<SubmitButtonProps> {
    constructor(props: SubmitButtonProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            click: this.props.onSubmit,
        };
    }

    protected render(): string {
        return template;
    }
}
