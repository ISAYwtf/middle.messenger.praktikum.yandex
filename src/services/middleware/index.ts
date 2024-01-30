import { HttpMiddlewareParam } from '@api/transport/types.ts';
import { router } from '@routes';

export class Middleware {
    auth({ status }: HttpMiddlewareParam): void {
        if (status === 401) {
            router.go('/login');
        }
    }

    logger({ response }: HttpMiddlewareParam): void {
        if (response.reason) {
            console.error(response);
        }
    }

    get all() {
        return [
            this.auth,
            this.logger
        ];
    }
}

export const middleware = new Middleware();
