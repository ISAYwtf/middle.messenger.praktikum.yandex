import { Block } from '@utils';
import { default as template } from './profile-data-error.hbs?raw';
import { ProfileDataErrorProps } from './types.ts';

export class ProfileDataError extends Block<ProfileDataErrorProps> {
    constructor(props: ProfileDataErrorProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}
