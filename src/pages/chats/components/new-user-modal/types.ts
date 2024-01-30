import { ButtonProps } from '@components/button/types.ts';
import { FieldProps } from '@components/field/types.ts';
import { Field } from '@components';

export type NewUserModalRefs = {
    userId: Field,
}

export interface NewUserModalProps {
    open?: boolean,
    title?: string,
    actions?: ButtonProps[],
    fields?: FieldProps[],
}
