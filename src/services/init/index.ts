import { authService, chatsService } from '@services';
import { Pathname } from '@routes/controller/types.ts';
import { registerRoutes, router } from '@routes';
import { registerStore } from '@store';
import { registerHelpers } from '@utils';

export class InitService {
    constructor() {
        this.app = this.app.bind(this);
    }

    private get isAuthPage() {
        const authPaths: Pathname[] = ['/login', '/sign-up'];
        return authPaths.includes(router.currentRoute);
    }

    private async user() {
        await authService.getUser();
    }

    private async chats() {
        await chatsService.getChats();
    }

    private async requests() {
        if (this.isAuthPage) {
            return;
        }

        await this.user();
        await this.chats();
    }

    private store() {
        registerStore();
    }

    private router() {
        registerRoutes();
    }

    private helpers() {
        registerHelpers();
    }

    async app() {
        this.store();
        this.helpers();
        this.router();
        await this.requests();
    }
}

export const initService = new InitService();
