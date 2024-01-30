import { ButtonProps } from '@components/button/types.ts';

export interface DeleteChatModalProps {
    open?: boolean,
    title?: string,
    actions?: ButtonProps[],
}
