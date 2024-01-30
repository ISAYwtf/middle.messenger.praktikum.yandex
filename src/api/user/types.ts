import { UserDTO } from '@api/auth/types.ts';

export type UpdatingProfileDTO = Omit<UserDTO, 'id' | 'avatar'>
export interface UpdatingPasswordDTO {
    oldPassword: string,
    newPassword: string,
}
