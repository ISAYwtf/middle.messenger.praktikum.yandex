export type PathType =
    | 'sign-up'
    | 'login'
    | 'settings'
    | 'messenger'
    | '404'
    | '500'

export type RouteType = '404' | '500' | 'auth' | 'root';
export type Pathname = PathType | `/${PathType}` | string;
export type FallbackPaths = Map<RouteType, Pathname>;
