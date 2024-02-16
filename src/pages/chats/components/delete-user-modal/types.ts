import { ButtonProps } from '@components/button/types.ts';
import { FieldProps } from '@components/field/types.ts';
import { Field } from '@components';

export type DeleteUserModalRefs = {
    userId: Field,
}

export interface DeleteUserModalProps {
    open?: boolean,
    title?: string,
    actions?: ButtonProps[],
    fields?: FieldProps[],
}
