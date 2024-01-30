import { Block } from '@utils';
import { default as template } from './profile-avatar-input.hbs?raw';
import { ProfileAvatarInputProps } from './types.ts';

export class ProfileAvatarInput extends Block<ProfileAvatarInputProps> {
    constructor(props: ProfileAvatarInputProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            change: this.props.onChange,
        };
    }

    protected render(): string {
        return template;
    }
}
