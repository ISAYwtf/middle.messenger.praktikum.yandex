import { registerFields } from './stub.ts';
import { AuthBlock } from '@modules';

export class Registration extends AuthBlock {
    protected init() {
        this.setProps({
            fields: registerFields,
            title: 'Регистрация',
            primaryActionLabel: 'Зарегистрироваться',
            secondaryActionLabel: 'Войти',
            secondaryActionLink: 'login',
        });
    }

    protected auth() {
        // todo Отправка данных на сервер
        console.log(this.fields);
    }
}
