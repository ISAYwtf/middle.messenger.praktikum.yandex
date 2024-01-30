import { registerComponent } from '@utils';
import {
    ProfileAction,
    ProfileActionRow,
    ProfileAvatar,
    ProfileAvatarInput,
    ProfileBackButton,
    ProfileDataError,
    ProfileDataInput,
    ProfileModal,
    ProfileRow,
} from './components';

registerComponent('ProfileRow', ProfileRow);
registerComponent('ProfileAction', ProfileAction);
registerComponent('ProfileActionRow', ProfileActionRow);
registerComponent('ProfileDataInput', ProfileDataInput);
registerComponent('ProfileDataError', ProfileDataError);
registerComponent('ProfileAvatar', ProfileAvatar);
registerComponent('ProfileAvatarInput', ProfileAvatarInput);
registerComponent('ProfileModal', ProfileModal);
registerComponent('ProfileBackButton', ProfileBackButton);

export { Profile, ProfileConnected } from './profile.ts';
