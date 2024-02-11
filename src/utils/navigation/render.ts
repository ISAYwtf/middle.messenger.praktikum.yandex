import { Block } from '@utils';
import { SnackbarStackConnected } from '@modules';

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
    const snackbar = new SnackbarStackConnected({}).getContent();

    if (snackbar) {
        root?.appendChild(snackbar);
    }
};
