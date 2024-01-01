import { InputProps } from '@components/input/types.ts';

export interface FieldProps extends InputProps {
    onValidate?: (error: string | null) => void,
    validate?: (value: string) => string | null,
    error?: string | null,
}
