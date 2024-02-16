import { FieldProps } from '@components/field/types.ts';
import { validators } from '@utils';

export const LOGIN_FIELDS_CONFIG: FieldProps[] = [
    {
        name: 'login',
        label: 'Логин',
        validate: validators.login,
    },
    {
        name: 'password',
        label: 'Пароль',
        type: 'password',
        validate: validators.password,
    }
];
