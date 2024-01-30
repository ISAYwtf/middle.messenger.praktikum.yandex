import { AuthApi } from '@api/auth';
import { LoginDTO, RegistrationDTO, SignupResponse } from '@api/auth/types.ts';
import { ResponseError } from '@api/baseApi/types.ts';
import { router } from '@routes';
import { transformData } from '@utils';
import { User } from '@store/types.ts';
import { ResourcesApi } from '@api/resources';
import { chatsService } from '@/services';

const AUTH_ERRORS = {
    alreadyInSystem: 'User already in system'
};

export class AuthService {
    constructor() {
        this.api = new AuthApi();
        this.resourcesApi = new ResourcesApi();
    }

    readonly api: AuthApi;
    readonly resourcesApi: ResourcesApi;

    async getUser(): Promise<User | null> {
        try {
            const response = await this.api.me();
            const userInfo = transformData.from.dto<User>(response);
            let avatarFile: string | null = null;
            if (userInfo.avatar) {
                avatarFile = await this.resourcesApi.get(userInfo.avatar);
            }
            window.store.set({
                user: { ...userInfo, avatarFile }
            });

            return userInfo;
        } catch (e) {
            return null;
        }
    }

    async createUser(data: RegistrationDTO): Promise<SignupResponse | null> {
        try {
            const response = await this.api.create(data);
            router.go('/messenger');
            await this.getUser();
            return response;
        } catch (e) {
            return null;
        }
    }

    async login(data: LoginDTO): Promise<void | null> {
        try {
            await this.api.login(data);
            router.go('/messenger');
            await this.getUser();
            await chatsService.getChats();
        } catch (e) {
            const error = e as ResponseError;
            this.doByError(error);
            return null;
        }
    }

    async logout() {
        try {
            await this.api.logout();
            window.store.set({ user: null, chats: null });
            router.go('/login');
        } catch (e) {
            return null;
        }
    }

    private doByError(error: ResponseError) {
        if (error.reason === AUTH_ERRORS.alreadyInSystem) {
            router.go('/messenger');
        }
    }
}

export const authService = new AuthService();
