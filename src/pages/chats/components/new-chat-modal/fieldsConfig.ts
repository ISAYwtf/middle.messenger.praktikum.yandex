import { FieldProps } from '@components/field/types.ts';
import { validators } from '@utils';

export const NEW_CHAT_MODAL_FIELDS_CONFIG: FieldProps[] = [
    {
        label: 'Название',
        name: 'title',
        validate: validators.text,
    },
];
