import { FieldProps } from '@components/field/types.ts';
import { validators } from '@utils';

export const loginFields: FieldProps[] = [
    {
        name: 'login',
        label: 'Логин',
        value: 'iskander-aydynov',
        validate: validators.login,
    },
    {
        name: 'password',
        label: 'Пароль',
        value: '1234',
        type: 'password',
        validate: validators.password,
    }
];
