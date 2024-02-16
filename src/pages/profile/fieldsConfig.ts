import { ProfileRowProps } from './components/profile-row/types.ts';
import { validators } from '@utils';

export const PROFILE_FIELDS_CONFIG: ProfileRowProps[] = [
    {
        name: 'email',
        key: 'Почта',
        value: '',
        validate: validators.email,
    },
    {
        name: 'login',
        key: 'Логин',
        value: '',
        validate: validators.login,
    },
    {
        name: 'first_name',
        key: 'Имя',
        value: '',
        validate: validators.name,
    },
    {
        name: 'second_name',
        key: 'Фамилия',
        value: '',
        validate: validators.name,
    },
    {
        name: 'display_name',
        key: 'Имя в чате',
        value: '',
        validate: validators.login,
    },
    {
        name: 'phone',
        key: 'Телефон',
        value: '',
        validate: validators.phone,
    },
];

export const PASSWORD_FIELDS_CONFIG: ProfileRowProps[] = [
    {
        name: 'oldPassword',
        key: 'Старый пароль',
        value: '',
        type: 'password',
        validate: validators.password,
    },
    {
        name: 'newPassword',
        key: 'Новый пароль',
        value: '',
        type: 'password',
        validate: validators.password,
    },
    {
        name: 'repeatedPassword',
        key: 'Повторите новый пароль',
        value: '',
        type: 'password',
        validate: validators.password,
    },
];
