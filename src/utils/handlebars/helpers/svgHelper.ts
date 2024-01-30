import * as Icons from '@assets/icons';
import Handlebars from 'handlebars';

const svgs: Record<string, string> = Object.entries(Icons)
    .reduce((acc, [name, svg]) => {
        const resolvedName = name.replace('Icon', '');

        return ({
            ...acc,
            [resolvedName]: svg,
        });
    }, {});

export const registerSvgHelper = () => {
    Handlebars.registerHelper(
        'svgIcon',
        (name: string) => new Handlebars.SafeString(svgs[name]),
    );
};
