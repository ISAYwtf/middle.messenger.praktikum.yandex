import { Block } from '@utils';
import { default as template } from './profile-back-button.hbs?raw';
import { router } from '@routes';

export class ProfileBackButton extends Block {
    protected init() {
        this.props.events = {
            click: () => {
                router.back();
            }
        };
    }

    protected render(): string {
        return template;
    }
}
