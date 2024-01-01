import { ProfileDataInputProps } from '../profile-data-input/types';

export interface ProfileRowProps extends ProfileDataInputProps {
    validate?: (value: string) => string | null,
    onValidate?: (error: string | null) => void,
    error?: string,
}
