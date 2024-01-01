import { PAGES, PagesType } from '@pages';

export const appendPage = (page: PagesType) => {
    const Component = PAGES[page];
    const container = document.getElementById('app')!;
    const component = new Component();

    const content = component.getContent();
    if (!content) {
        return;
    }
    container?.append(content);
};
