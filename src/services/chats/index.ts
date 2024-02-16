import { ChatsApi } from '@api/chats';
import { transformData } from '@utils';
import { ChatType } from '@store/types.ts';
import { ResourcesApi } from '@api/resources';
import { ChatsRequestParams } from '@api/chats/types.ts';

export class ChatsService {
    constructor() {
        this.api = new ChatsApi();
        this.resourcesApi = new ResourcesApi();
    }

    readonly api: ChatsApi;
    readonly resourcesApi: ResourcesApi;

    async getChats(params?: ChatsRequestParams) {
        const userLogin = window.store.getState().user?.login;
        if (!userLogin) {
            return;
        }
        try {
            const response = await this.api.getChats(params);
            const transformedChats = transformData.chats(response, userLogin);
            const chatsWithAvatars = await this.getAvatars(transformedChats);

            window.store.set({ chats: chatsWithAvatars });
        } catch (e) {
            return null;
        }
    }

    async getAvatars(chats: ChatType[]) {
        const avatarRequests = chats.map(async (chat) => {
            if (!chat.avatar) {
                return chat;
            }

            const avatarFile = await this.resourcesApi.get(chat.avatar);
            return { ...chat, avatarFile };
        });

        return await Promise.all(avatarRequests);
    }

    async create(title: string) {
        try {
            await this.api.createChat(title);
            await this.getChats();
        } catch (e) {
            return null;
        }
    }
}

export const chatsService = new ChatsService();
