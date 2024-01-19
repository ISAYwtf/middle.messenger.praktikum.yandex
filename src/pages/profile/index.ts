import { registerComponent } from '@utils';
import {
    ProfileAction,
    ProfileActionRow,
    ProfileRow,
    ProfileDataInput,
    ProfileDataError,
} from './components';

registerComponent('ProfileRow', ProfileRow);
registerComponent('ProfileAction', ProfileAction);
registerComponent('ProfileActionRow', ProfileActionRow);
registerComponent('ProfileDataInput', ProfileDataInput);
registerComponent('ProfileDataError', ProfileDataError);

export { Profile } from './profile.ts';
