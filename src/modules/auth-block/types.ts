import { FieldProps } from '@components/field/types.ts';
import { Button, Field } from '@components';
import { PagesType } from '@pages';

export type AuthRefs =
    & Record<string, Field>
    & { authButton: Button }

export interface AuthProps {
    fields: FieldProps[],
    onAuth?: () => void,
    title?: string,
    primaryActionLabel?: string,
    secondaryActionLabel?: string,
    secondaryActionLink?: Extract<PagesType, 'registration' | 'login'>,
}
