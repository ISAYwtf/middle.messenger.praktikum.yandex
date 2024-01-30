import { InputProps } from '@components/input/types.ts';
import { FieldError } from '@components/field/components';
import { Input } from '@components';

export type FieldRefs = {
    input: Input,
    error: FieldError,
}

export interface FieldProps extends InputProps {
    onValidate?: (error: string | null) => void,
    validate?: (value: string) => string | null,
    error?: string | null,
}
