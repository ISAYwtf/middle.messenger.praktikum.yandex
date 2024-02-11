import { Block } from '@utils';
import { default as template } from './snackbar-stack.hbs?raw';
import { SnackbarStackProps } from './types.ts';
import { connect } from '@store';

export class SnackbarStack extends Block<SnackbarStackProps> {
    constructor(props: SnackbarStackProps) {
        super(props);
    }

    protected render(): string {
        return template;
    }
}

export const SnackbarStackConnected = connect(['notifications'])(SnackbarStack);
