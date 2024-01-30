import { LOGIN_FIELDS_CONFIG } from './fieldsConfig.ts';
import { AuthBlock } from '@modules';
import { LoginDTO } from '@api/auth/types.ts';
import { authService } from '@services';

export class Login extends AuthBlock {
    protected init() {
        this.setProps({
            fields: LOGIN_FIELDS_CONFIG,
            title: 'Вход',
            primaryActionLabel: 'Авторизоваться',
            secondaryActionLabel: 'Нет аккаунта?',
            secondaryActionLink: 'sign-up',
        });
    }

    protected async auth() {
        const fields = this.fields as unknown as LoginDTO;
        await authService.login(fields);
        // todo Выводить ошибку (компонент уведомлений)
    }
}
