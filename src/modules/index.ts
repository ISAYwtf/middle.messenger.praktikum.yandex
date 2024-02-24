import { registerPartials } from '@utils';
import { FormAuth } from './form-auth';
import { Modal } from './modal';

export * from './form-auth';
export * from './modal';
export * from './auth-block';
export * from './snackbar-stack';

registerPartials({ FormAuth, Modal });
