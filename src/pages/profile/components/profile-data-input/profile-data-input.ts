import { Block } from '@utils';
import { default as template } from './profile-data-input.hbs?raw';
import { ProfileDataInputProps } from './types.ts';

export class ProfileDataInput extends Block<ProfileDataInputProps> {
    constructor(props: ProfileDataInputProps) {
        super(props);
    }

    protected init() {
        this.props.events = {
            blur: this.props.onBlur,
        };
    }

    protected render(): string {
        return template;
    }
}
