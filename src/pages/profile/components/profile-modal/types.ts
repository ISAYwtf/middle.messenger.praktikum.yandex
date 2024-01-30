import { ButtonProps } from '@components/button/types.ts';

export interface ProfileModalProps {
    open?: boolean,
    title?: string,
    actions?: ButtonProps[],
}
