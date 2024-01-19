import { Block } from '@utils';
import { default as template } from './profile-action.hbs?raw';
import { ProfileActionProps } from './types';

export class ProfileAction extends Block<ProfileActionProps> {
    constructor(props: ProfileActionProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            click: this.props.onClick,
        };
    }

    protected render(): string {
        return template;
    }
}
