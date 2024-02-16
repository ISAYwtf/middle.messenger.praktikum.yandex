import { Block } from '@utils';

export const render = (query: string | null, block: Block) => {
    if (!query) {
        return;
    }

    const root = document.querySelector(query);
    const content = block.getContent();

    if (!content) {
        return;
    }

    root?.replaceChildren(content);
};
