import { FieldProps } from '@components/field/types.ts';
import { validators } from '@utils';

export const NEW_USER_MODAL_FIELDS_CONFIG: FieldProps[] = [
    {
        label: 'ID пользователя',
        name: 'userId',
        validate: validators.id,
    },
];
