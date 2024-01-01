import { Block } from '@utils';
import { default as template } from './error.hbs?raw';

export class Error404 extends Block {
    constructor() {
        super({
            code: 404,
            message: 'Не туда попали'
        });
    }

    protected render() {
        return template;
    }
}
