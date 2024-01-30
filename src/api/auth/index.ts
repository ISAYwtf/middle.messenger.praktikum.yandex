import { BaseApi } from '@api/baseApi';
import { LoginDTO, RegistrationDTO, SignupResponse, UserDTO } from './types.ts';

export class AuthApi extends BaseApi {
    constructor() {
        super('/auth');
    }

    async me() {
        return this.client.get<UserDTO>('user');
    }

    async create(data: RegistrationDTO) {
        return this.client.post<SignupResponse>('signup', { data });
    }

    async login(data: LoginDTO): Promise<void> {
        return this.client.post('signin', { data });
    }

    async logout(): Promise<void> {
        return this.client.post('logout');
    }
}

export const authApi = new AuthApi();
