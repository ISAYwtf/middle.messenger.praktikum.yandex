import { ProfileActionProps } from './components/profile-action/types.ts';
import { ProfileRowProps } from './components/profile-row/types.ts';
import { Button } from '@components';
import { User } from '@store/types.ts';
import { ButtonProps } from '@components/button/types.ts';
import { ProfileRow, ProfileModal } from './components';

export type ProfileRefs =
    & Record<string, ProfileRow | Button>
    & {
        modal: ProfileModal,
    }

export interface ProfileProps {
    fields: ProfileRowProps[],
    user: User | null,
    actions?: ProfileActionProps[],
    modalActions?: ButtonProps[],
    editable?: boolean,
    onSave?: () => void,
}

export const enum ProfileEditMode {
    profile = 'profile',
    password = 'password',
}
