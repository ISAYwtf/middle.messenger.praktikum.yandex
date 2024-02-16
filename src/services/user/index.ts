import { UserApi } from '@api/user';
import { UpdatingPasswordDTO, UpdatingProfileDTO } from '@api/user/types.ts';
import { transformData } from '@utils';
import { User } from '@store/types.ts';
import { ResourcesApi } from '@api/resources';

export class UserService {
    constructor() {
        this.api = new UserApi();
        this.resourcesApi = new ResourcesApi();
    }

    readonly api: UserApi;
    readonly resourcesApi: ResourcesApi;

    async updateProfile(data: UpdatingProfileDTO): Promise<User | null> {
        try {
            const response = await this.api.updateProfile(data);
            const userInfo = transformData.from.dto<User>(response);
            const avatarFile = await this.getAvatar(userInfo.avatar);
            window.store.set({ user: { ...userInfo, avatarFile } });
            return userInfo;
        } catch (e) {
            return null;
        }
    }

    async getAvatar(avatar: string | null) {
        if (!avatar) {
            return null;
        }

        try {
            return await this.resourcesApi.get(avatar);
        } catch (e) {
            return null;
        }
    }


    async updateAvatar(data: FormData): Promise<User | null> {
        try {
            const response = await this.api.updateAvatar(data);
            const userInfo = transformData.from.dto<User>(response);
            const avatarFile: string | null = await this.getAvatar(userInfo.avatar);
            window.store.set({
                user: { ...userInfo, avatarFile }
            });
            return userInfo;
        } catch (e) {
            return null;
        }
    }

    async updatePassword(data: UpdatingPasswordDTO): Promise<void | null> {
        try {
            await this.api.updatePassword(data);
        } catch (e) {
            return null;
        }
    }

    async getUser(id: number | string) {
        try {
            const response = await this.api.getUser(String(id));
            return transformData.from.dto(response);
        } catch (e) {
            return null;
        }
    }
}

export const userService = new UserService();
