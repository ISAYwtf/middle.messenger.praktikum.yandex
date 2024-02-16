import { FieldProps } from '@components/field/types.ts';
import { Button, Field } from '@components';
import { PathType } from '@routes/controller/types.ts';

export type AuthRefs =
    & Record<string, Field>
    & { authButton: Button }

export interface AuthProps {
    fields: FieldProps[],
    onAuth?: () => void,
    title?: string,
    primaryActionLabel?: string,
    secondaryActionLabel?: string,
    secondaryActionLink?: Extract<PathType, 'sign-up' | 'login'>,
}
