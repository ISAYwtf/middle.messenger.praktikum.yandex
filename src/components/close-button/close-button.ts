import { Block } from '@utils';
import { default as template } from './close-button.hbs?raw';
import { CloseButtonProps } from './types.ts';

export class CloseButton extends Block<CloseButtonProps> {
    constructor(props: CloseButtonProps) {
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
