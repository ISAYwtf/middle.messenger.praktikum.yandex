import { BlockConstructable } from '@utils';
import { Route } from './Route.ts';
import { FallbackPaths, Pathname, RouteType } from './types.ts';

class Router {
    constructor(rootQuery: Pathname) {
        this._rootQuery = rootQuery;
    }

    private routes: Route[] = [];
    private _currentRoute: Route | null = null;
    private readonly routeTypes: FallbackPaths = new Map();
    private readonly history: History = window.history;
    private readonly _rootQuery: Pathname | null = null;

    private addRoute(pathname: Pathname, block: BlockConstructable) {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery });
        this.routes.push(route);
    }

    get currentRoute() {
        return this._currentRoute?.pathname ?? '';
    }

    use(pathname: Pathname, block: BlockConstructable, routeType?: RouteType | RouteType[]) {
        if (routeType) {
            const resolvedRouteType = Array.isArray(routeType) ? routeType : [routeType];
            resolvedRouteType.forEach((el) => this.routeTypes.set(el, pathname));

            if (resolvedRouteType.includes('root')) {
                this.addRoute('/', block);
            }
        }
        this.addRoute(pathname, block);
        return this;
    }

    start() {
        window.onpopstate = (event) => {
            this._onRoute((event.currentTarget as Window)?.location.pathname);
        };
        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: Pathname) {
        const route = this.getRoute(pathname);

        if (!route) {
            const fallbackPage = this.routes.find((el) => el.match(this.routeTypes.get('404')));
            fallbackPage?.render();
            return;
        }

        if (this._currentRoute) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.render();
    }

    go(pathname: Pathname) {
        this.history.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history.back();
    }

    forward() {
        this.history.forward();
    }

    getRoute(pathname: Pathname) {
        return this.routes.find(route => route.match(pathname));
    }
}

export const router = new Router('#app');
