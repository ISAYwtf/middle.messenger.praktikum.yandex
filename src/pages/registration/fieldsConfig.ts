import { FieldProps } from '@components/field/types.ts';
import { validators } from '@utils';

export const SIGNUP_FIELDS_CONFIG: FieldProps[] = [
    {
        name: 'email',
        label: 'Почта',
        value: '',
        validate: validators.email,
    },
    {
        name: 'login',
        label: 'Логин',
        value: '',
        validate: validators.login,
    },
    {
        name: 'first_name',
        label: 'Имя',
        value: '',
        validate: validators.name,
    },
    {
        name: 'second_name',
        label: 'Фамилия',
        value: '',
        validate: validators.name,
    },
    {
        name: 'phone',
        label: 'Телефон',
        value: '',
        validate: validators.phone,
    },
    {
        name: 'password',
        label: 'Пароль',
        value: '',
        type: 'password',
        validate: validators.password,
    },
    {
        name: 'repeated_password',
        label: 'Пароль (ещё раз)',
        value: '',
        type: 'password',
        validate: validators.password,
    },
];
