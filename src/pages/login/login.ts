import { loginFields } from './stub.ts';
import { AuthBlock } from '@modules';

export class Login extends AuthBlock {
    protected init() {
        this.setProps({
            fields: loginFields,
            title: 'Вход',
            primaryActionLabel: 'Авторизоваться',
            secondaryActionLabel: 'Нет аккаунта?',
            secondaryActionLink: 'registration',
        });
    }

    protected auth() {
        // todo Отправка данных на сервер
        console.log(this.fields);
    }
}
