import { ProfileRowProps } from './components/profile-row/types.ts';
import { validators } from '@utils';

export const profileFields: ProfileRowProps[] = [
    {
        name: 'email',
        key: 'Почта',
        value: 'iskander.aydynov@yandex.ru',
        validate: validators.email,
    },
    {
        name: 'login',
        key: 'Логин',
        value: 'iskander-aydynov',
        validate: validators.login,
    },
    {
        name: 'first_name',
        key: 'Имя',
        value: 'Искандер',
        validate: validators.name,
    },
    {
        name: 'second_name',
        key: 'Фамилия',
        value: 'Айдынов',
        validate: validators.name,
    },
    {
        name: 'display_name',
        key: 'Имя в чате',
        value: 'isay',
        validate: validators.login,
    },
    {
        name: 'phone',
        key: 'Телефон',
        value: '+79099673030',
        validate: validators.phone,
    },
];

export const passwordFields: ProfileRowProps[] = [
    {
        name: 'old_password',
        key: 'Старый пароль',
        value: '1234',
        type: 'password',
        validate: validators.password,
    },
    {
        name: 'new_password',
        key: 'Новый пароль',
        value: 'qwertyuiop',
        type: 'password',
        validate: validators.password,
    },
    {
        name: 'repeat_new_password',
        key: 'Повторите новый пароль',
        value: 'qwertyuiop',
        type: 'password',
        validate: validators.password,
    },
];
