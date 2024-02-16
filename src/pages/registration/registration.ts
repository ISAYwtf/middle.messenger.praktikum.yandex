import { SIGNUP_FIELDS_CONFIG } from './fieldsConfig.ts';
import { AuthBlock } from '@modules';
import { authService } from '@services';
import { RegistrationDTO } from '@api/auth/types.ts';
import { validateEqualPassword } from '@utils';
import { FieldProps } from '@components/field/types.ts';

export class Registration extends AuthBlock {
    protected init() {
        const resolvedFieldsConfig: FieldProps[] = SIGNUP_FIELDS_CONFIG.map((fieldConfig) => {
            if (fieldConfig.name === 'repeated_password') {
                return {
                    ...fieldConfig,
                    validate: (value) => validateEqualPassword(value, this.getField('password'))
                };
            }

            return fieldConfig;
        });

        this.setProps({
            fields: resolvedFieldsConfig,
            title: 'Регистрация',
            primaryActionLabel: 'Зарегистрироваться',
            secondaryActionLabel: 'Войти',
            secondaryActionLink: 'login',
        });
    }

    protected async auth() {
        const fields = this.fields as unknown as RegistrationDTO;
        await authService.createUser(fields);
    }
}
