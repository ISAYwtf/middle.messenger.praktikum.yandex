import { Block } from '@utils';
import { default as template } from './auth-block.hbs?raw';
import { AuthProps, AuthRefs } from './types.ts';
import { Button, Field } from '@components';

function isField(element: Field | Button): element is Field {
    return element instanceof Field;
}

export class AuthBlock extends Block<AuthProps, AuthRefs> {
    constructor() {
        super({
            fields: [],
            onAuth: () => this._auth(),
        });
    }

    componentDidMount() {
        this.applyErrorToSubmitButton();
    }

    protected get error() {
        return Object.values(this.fieldElements)
            .some((element) => element.error);
    }

    protected get fieldElements() {
        // Получаем из refs только поля ввода
        return Object.entries(this.refs)
            .reduce((acc, [key, element]) => {
                return isField(element)
                    ? ({ ...acc, [key]: element })
                    : acc;
            }, {} as Record<string, Field>);
    }

    protected get fields() {
        return Object.entries(this.fieldElements)
            .reduce((acc, [fieldKey, field]) => ({
                ...acc,
                [fieldKey]: field.value
            }), {} as Record<string, string | null>);
    }

    protected getField(name: string) {
        return this.fields[name] ?? '';
    }

    protected applyErrorToSubmitButton() {
        Object.values(this.fieldElements)
            .forEach((fieldElement) => fieldElement
                .setProps({
                    onValidate: () => {
                        this.refs.authButton.setProps({ disabled: this.error });
                    }
                }));
        this.refs.authButton.setProps({ disabled: this.error });
    }

    private _auth() {
        if (this.error) {
            return;
        }

        this.auth();
    }

    protected auth() {}

    protected render(): string {
        return template;
    }
}
