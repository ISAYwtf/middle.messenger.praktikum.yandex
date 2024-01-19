import { ProfileActionProps } from './components/profile-action/types.ts';
import { ProfileRowProps } from './components/profile-row/types.ts';
import { ProfileRow } from '@pages/profile/components';
import { Button } from '@components';

export type ProfileRefs = Record<string, ProfileRow | Button>

export interface ProfileProps {
    fields: ProfileRowProps[],
    firstName: string,
    image?: {
        path: string,
        name: string,
    },
    actions?: ProfileActionProps[],
    editable?: boolean,
    onSave?: () => void,
}

export const enum ProfileEditMode {
    profile = 'profile',
    password = 'password',
}
