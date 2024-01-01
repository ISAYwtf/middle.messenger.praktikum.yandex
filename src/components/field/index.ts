import { registerComponent } from '@utils';
import { Field } from './field.ts';
import { FieldError } from './components';

export { Field } from './field.ts';

registerComponent('Field', Field);
registerComponent('FieldError', FieldError);
