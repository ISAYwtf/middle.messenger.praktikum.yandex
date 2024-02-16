import { Pathname, RouteType } from './controller/types.ts';
import { BlockConstructable } from '@utils';
import { PAGES } from '@pages';

interface RouteOptions {
    path: Pathname,
    type?: RouteType | RouteType[],
    component: BlockConstructable<any>,
}

export const ROUTES: RouteOptions[] = [
    {
        path: '/messenger',
        component: PAGES.chats,
    },
    {
        type: ['auth', 'root'],
        path: '/login',
        component: PAGES.login,
    },
    {
        path: '/sign-up',
        component: PAGES.registration,
    },
    {
        path: '/settings',
        component: PAGES.profile,
    },
    {
        type: '404',
        path: '/404',
        component: PAGES['404'],
    },
    {
        type: '500',
        path: '/500',
        component: PAGES['500'],
    },
];
