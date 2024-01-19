import { Block } from '@utils';
import { default as template } from './profile-action-row.hbs?raw';
import { ProfileActionProps } from '../profile-action/types.ts';

export class ProfileActionRow extends Block<ProfileActionProps> {
    constructor(props: ProfileActionProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}
