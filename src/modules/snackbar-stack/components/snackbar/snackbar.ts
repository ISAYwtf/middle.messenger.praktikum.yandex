import { Block } from '@utils';
import { default as template } from './snackbar.hbs?raw';
import { SnackbarProps } from './types.ts';
import { notificationService } from '@services';

export class Snackbar extends Block<SnackbarProps> {
    constructor(props: SnackbarProps) {
        super({
            ...props,
            onClose: () => this.onClose(),
        });
    }

    onClose() {
        notificationService.close(this.props.id);
    }

    protected render(): string {
        return template;
    }
}
