import { Chats } from './chats';
import { Error404, Error500 } from './error';
import { Login } from './login';
import { Profile } from './profile';
import { Registration } from './registration';

export const PAGES = {
    login: Login,
    registration: Registration,
    chats: Chats,
    profile: Profile,
    '404': Error404,
    '500': Error500,
};

export type PagesType = keyof typeof PAGES;

export { Login } from './login';
export { Registration } from './registration';
export { Chats } from './chats';
export { Profile } from './profile';
export { Error500, Error404 } from './error';

