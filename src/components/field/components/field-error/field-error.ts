import { Block } from '@utils';
import { default as template } from './field-error.hbs?raw';
import { FieldErrorProps } from './types.ts';

export class FieldError extends Block<FieldErrorProps> {
    constructor(props: FieldErrorProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}
