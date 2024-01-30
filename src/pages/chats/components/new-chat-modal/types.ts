import { ButtonProps } from '@components/button/types.ts';
import { FieldProps } from '@components/field/types.ts';
import { Field } from '@components';

export type NewChatModalRefs = {
    title: Field,
}

export interface NewChatModalProps {
    open?: boolean,
    title?: string,
    actions?: ButtonProps[],
    fields?: FieldProps[],
}
