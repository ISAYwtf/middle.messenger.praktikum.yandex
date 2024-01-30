import { Block } from '@utils';
import { default as template } from './profile-avatar.hbs?raw';
import { ProfileAvatarProps } from './types.ts';
import { userService } from '@services';

export class ProfileAvatar extends Block<ProfileAvatarProps> {
    constructor(props: ProfileAvatarProps) {
        super({
            ...props,
            onChange: (event) => this.onChange(event)
        });
    }

    private async onChange(event: Event) {
        const target = event.target as HTMLInputElement;
        const formData = new FormData();
        if (target?.files?.[0]) {
            formData.append(target.name, target.files[0]);
            await userService.updateAvatar(formData);
        }
    }

    protected render(): string {
        return template;
    }
}
