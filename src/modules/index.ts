import { registerPartials } from '@utils';
import { FormAuth } from './form-auth';
import { Modal } from './modal';

export { FormAuth } from './form-auth';
export { Modal } from './modal';
export { AuthBlock } from './auth-block';

registerPartials({ FormAuth, Modal });
