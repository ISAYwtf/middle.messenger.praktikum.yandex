import Handlebars from 'handlebars';

export const registerPartials = (partials: Record<string, string>) => {
    Object.entries(partials).forEach(([name, component]) => {
        Handlebars.registerPartial(name, component);
    });
};
