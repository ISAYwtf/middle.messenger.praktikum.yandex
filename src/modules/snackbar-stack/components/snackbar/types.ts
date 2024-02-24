import { Notification } from '@store/types.ts';

export interface SnackbarProps extends Notification {
    onClose?: EventListener,
}
