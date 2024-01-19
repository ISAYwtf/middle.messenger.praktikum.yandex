import { Block } from '@utils';
import { default as template } from './error.hbs?raw';

export class Error500 extends Block {
    constructor() {
        super({
            code: 500,
            message: 'Мы уже фиксим'
        });
    }

    protected render() {
        return template;
    }
}
