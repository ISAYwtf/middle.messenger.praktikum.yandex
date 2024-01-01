import { registerPartials } from '@utils';
import { ErrorContainer } from '@pages/error/components';

export { Error404 } from './error-404.ts';
export { Error500 } from './error-500.ts';

registerPartials({ ErrorContainer });
