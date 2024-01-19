import Handlebars from 'handlebars';
import * as Icons from '@assets/icons';
import { appendPage, navigate } from '@utils';
import { PAGES, PagesType } from '@pages';

const init = () => {
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
        (name: string) => new Handlebars.SafeString(svgs[name]),
    );

    document.addEventListener('DOMContentLoaded', () => {
        const currentPath = window.location.pathname.split('/');
        const lastOfPartUrl = currentPath[currentPath.length - 1] as PagesType;
        const targetPage: PagesType = Object.keys(PAGES).includes(lastOfPartUrl)
            ? lastOfPartUrl
            : 'login';

        appendPage(targetPage);
    });

    document.addEventListener('click', (e) => {
        const page = (e.target as HTMLElement)
            .closest('[data-page]')
            ?.getAttribute('data-page');

        if (page) {
            navigate(page as PagesType);

            e.preventDefault();
            e.stopImmediatePropagation();
        }
    });
};

init();
