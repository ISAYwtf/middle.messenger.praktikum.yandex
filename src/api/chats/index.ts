import { BaseApi } from '@api/baseApi';
import {
    ChatDeleteResponse,
    ChatsDTO,
    ChatsRequestParams,
    ChatToken,
    ChatUserDTO,
    ChatUsersRequestParams
} from './types.ts';

export class ChatsApi extends BaseApi {
    constructor() {
        super('/chats');
    }

    async getChats(params?: ChatsRequestParams) {
        return this.client.get<ChatsDTO>('/', {
            queryData: params,
        });
    }

    async getToken(chatId: number) {
        return this.client.post<ChatToken>(`token/${chatId}`);
    }

    async createChat(title: string) {
        return this.client.post('/', {
            data: { title }
        });
    }

    async addUsers(chatId: number, users: string[]) {
        return this.client.put('users', {
            data: { chatId, users }
        });
    }

    async deleteChat(chatId: number) {
        return this.client.delete<ChatDeleteResponse>('/', {
            data: { chatId }
        });
    }

    async getUsers(chatId: number, params?: ChatUsersRequestParams) {
        return this.client.get<ChatUserDTO[]>(`${chatId}/users`, {
            queryData: params,
        });
    }

    async deleteUsers(chatId: number, users: string[]) {
        return this.client.delete('users', {
            data: { chatId, users }
        });
    }
}
