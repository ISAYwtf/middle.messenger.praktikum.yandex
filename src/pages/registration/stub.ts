import { FieldProps } from '@components/field/types.ts';
import { validators } from '@utils';

export const registerFields: FieldProps[] = [
    {
        name: 'email',
        label: 'Почта',
        value: 'iskander.aydynov@yandex.ru',
        validate: validators.email,
    },
    {
        name: 'login',
        label: 'Логин',
        value: 'iskander-aydynov',
        validate: validators.login,
    },
    {
        name: 'first_name',
        label: 'Имя',
        value: 'Иван',
        validate: validators.name,
    },
    {
        name: 'second_name',
        label: 'Фамилия',
        value: 'Иванов',
        validate: validators.name,
    },
    {
        name: 'phone',
        label: 'Телефон',
        value: '+79099673030',
        validate: validators.phone,
    },
    {
        name: 'password',
        label: 'Пароль',
        value: '1234',
        type: 'password',
        validate: validators.password,
    },
    {
        name: 'password',
        label: 'Пароль (ещё раз)',
        value: '1234',
        type: 'password',
        validate: validators.password,
    },
];
