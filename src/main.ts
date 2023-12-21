import Handlebars from 'handlebars';
import * as Components from '@components';
import * as Modules from '@modules';
import * as Pages from '@pages';
import * as Icons from '@assets/icons';
import { registerPartials } from '@utils';

const pages = {
    login: [ Pages.LoginPage ],
    registration: [ Pages.RegistrationPage ],
    chats: [ Pages.ChatsPage ],
    profile: [ Pages.ProfilePage ],
    '404': [ Pages.Error404 ],
    '500': [ Pages.Error500 ],
};

type PagesType = keyof typeof pages;

registerPartials({ ...Components, ...Modules });

const svgs: Record<string, string> = Object.entries(Icons)
    .reduce((acc, [name, svg]) => {
        const resolvedName = name.replace('Icon', '');
        return ({
            ...acc,
            [resolvedName]: svg,
        });
    }, {});

Handlebars.registerHelper(
    'svgIcon',
    (name: string) => new Handlebars.SafeString(svgs[name])
);

function navigate(page: PagesType) {
    const [ source, context ] = pages[page];
    const container = document.getElementById('app')!;
    container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname.split('/');
    const lastOfPartUrl = currentPath[currentPath.length - 1] as PagesType;
    const targetPage = Object.keys(pages).includes(lastOfPartUrl)
        ? lastOfPartUrl
        : 'login';
    navigate(targetPage);
});

document.addEventListener('click', e => {
    const page = (e.target as HTMLElement)
        .closest('[data-page]')
        ?.getAttribute('data-page');
    if (page) {
        window.location.replace(page);

        e.preventDefault();
        e.stopImmediatePropagation();
    }
});
