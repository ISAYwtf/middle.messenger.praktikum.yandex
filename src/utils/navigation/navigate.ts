import { PagesType } from '@pages';

export const navigate = (page: PagesType) => {
    window.location.replace(page);
};
