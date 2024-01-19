import { Block } from '@utils';
import { default as template } from './button.hbs?raw';
import { ButtonProps } from './types.ts';

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            click: this.props.onClick,
        };
    }

    protected render(): string {
        return template;
    }
}
