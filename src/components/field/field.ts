import { Block } from '@utils';
import { default as template } from './field.hbs?raw';
import { FieldProps, FieldRefs } from './types.ts';

export class Field extends Block<FieldProps, FieldRefs> {
    constructor(props: FieldProps) {
        super({
            ...props,
            onBlur: () => this.applyError(),
        });
    }

    componentDidMount() {
        this.validate();
    }

    public get value() {
        if (this.error) {
            return null;
        }
        return (this.refs.input.element as HTMLInputElement)?.value;
    }

    public get errorField() {
        return this.refs.error;
    }

    public error = false;

    private setError(value: boolean) {
        this.error = value;
    }

    private validate() {
        const value = (this.refs.input.element as HTMLInputElement)?.value;
        const error = this.props.validate?.(value) ?? null;
        this.setError(Boolean(error));
        return error;
    }

    private applyError() {
        const error = this.validate();
        this.props.onValidate?.(error);
        this.refs.error.setProps({ error });
        if (error) {
            this.refs.error.show();
        } else {
            this.refs.error.hide();
        }
    }

    protected render(): string {
        return template;
    }
}
