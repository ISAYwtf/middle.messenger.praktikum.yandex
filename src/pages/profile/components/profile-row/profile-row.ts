import { Block } from '@utils';
import { default as template } from './profile-row.hbs?raw';
import { ProfileRowProps } from './types.ts';

export class ProfileRow extends Block<ProfileRowProps> {
    constructor(props: ProfileRowProps) {
        super({
            ...props,
            onBlur: () => this.applyError(),
        });
    }

    public get value() {
        if (this.error) {
            return null;
        }
        return (this.refs.input.element as HTMLInputElement)?.value;
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
