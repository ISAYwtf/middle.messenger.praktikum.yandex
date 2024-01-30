import { BaseApi } from '@api/baseApi';
import { UserDTO } from '@api/auth/types.ts';
import { UpdatingPasswordDTO, UpdatingProfileDTO } from '@api/user/types.ts';

export class UserApi extends BaseApi {
    constructor() {
        super('/user');
    }

    async updateProfile(data: UpdatingProfileDTO) {
        return this.client.put<UserDTO>('profile', { data });
    }

    async updateAvatar(data: FormData) {
        return this.client.put<UserDTO>('profile/avatar', { data });
    }

    async updatePassword(data: UpdatingPasswordDTO) {
        return this.client.put('password', { data });
    }

    async getUser(id: string) {
        return this.client.get<UserDTO>(id);
    }
}
