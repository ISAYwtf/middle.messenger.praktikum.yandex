import { ROUTES } from '@routes/routes.ts';
import { router } from '@routes/controller/Router.ts';

export const registerRoutes = () => {
    ROUTES.forEach(({ path, component, type }) => {
        router.use(path, component, type);
    });
    router.start();
};

export { router } from './controller/Router.ts';
export { Route } from './controller/Route.ts';
