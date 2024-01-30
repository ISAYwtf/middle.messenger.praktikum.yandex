import { Block } from '@utils';
import { default as template } from './profile-modal.hbs?raw';
import { ProfileModalProps } from './types.ts';

export class ProfileModal extends Block<ProfileModalProps> {
    constructor(props: ProfileModalProps) {
        super(props);
    }

    open(options: ProfileModalProps) {
        this.setProps(options);
    }

    close() {
        this.setProps({
            open: false,
            title: undefined,
            actions: undefined,
        });
    }

    protected render(): string {
        return template;
    }
}
