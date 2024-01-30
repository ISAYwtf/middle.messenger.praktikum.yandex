import { ChatsApi, ResourcesApi, WSTransport, WSTransportEvents } from '@api';
import { joinURL, transformData } from '@utils';
import { ChatType, MessageDTO } from '@store/types.ts';
import { ChatUser } from '@services/chat/types.ts';
import { chatsService } from '@/services';
import { SOCKET_HOST } from '@api/baseApi/constants.ts';

function isMessageArray(data: MessageDTO[] | unknown): data is MessageDTO[] {
    return Array.isArray(data) && data.some(({ type }) => ['message', 'file'].includes(type));
}

function isMessage(data: MessageDTO | unknown): data is MessageDTO {
    return typeof data === 'object'
        && data !== null
        && 'type' in data
        && ['message', 'file'].includes(data.type as string);
}

export class ChatService {
    constructor() {
        this.api = new ChatsApi();
        this.resourcesApi = new ResourcesApi();
    }

    readonly api: ChatsApi;
    readonly resourcesApi: ResourcesApi;
    id: number | null = null;
    private messageArray: MessageDTO[] = [];

    socket: WSTransport | null = null;

    async connect(chatId: number) {
        const userId = window.store.getState().user?.id;
        if (!userId) {
            return;
        }
        this.id = chatId;
        const token = await this.getToken(chatId);
        const url = joinURL(
            SOCKET_HOST,
            'chats',
            userId,
            chatId,
            token,
        );
        this.socket = new WSTransport(url);

        await this.socket.connect();
        this.subscribe();
        this.getMessages();
    }

    private async getToken(chatId: number) {
        try {
            const response = await this.api.getToken(chatId);
            if (!response.token) {
                return null;
            }

            return response.token;
        } catch (e) {
            return null;
        }
    }

    disconnect() {
        this.socket?.close();
        this.messageArray = [];
        window.store.set({ chatMessages: null, currentChat: null });
        this.unsubscribe();
    }

    message(message: string, type: 'message' | 'file' = 'message') {
        // todo Загружать файл на /resources и прикреплять сюда полученный id
        this.socket?.send({ type, content: message });
    }

    getMessages(offset = 0) {
        this.socket?.send({
            type: 'get old',
            content: String(offset),
        });
    }

    private onResponse = (data: unknown) => {
        if (isMessageArray(data) || isMessage(data)) {
            this.addMessages(data, isMessage(data));
            this.handleMessages(this.messageArray);
        }
    };

    private handleMessages(data: MessageDTO[]) {
        const userId = window.store.getState().user?.id;
        if (!userId) {
            throw new Error('userId не определен');
        }
        const messageBlocks = transformData.messages(data, userId);
        window.store.set({ chatMessages: messageBlocks });
    }

    private subscribe() {
        this.socket?.on(WSTransportEvents.message, this.onResponse);
    }

    private unsubscribe() {
        this.socket?.off(WSTransportEvents.message, this.onResponse);
    }

    async selectChat(chat: ChatType) {
        this.disconnect();
        await this.connect(chat.id);
        window.store.set({ currentChat: chat });
    }

    addMessages(data: MessageDTO | MessageDTO[], toStart = false) {
        const dataArray = Array.isArray(data) ? data : [data];

        if (toStart) {
            this.messageArray.unshift(...dataArray);
        } else {
            this.messageArray.push(...dataArray);
        }
    }

    async addUsers(chatId: number, users: number[]) {
        try {
            await this.api.addUsers(chatId, users.map(String));
        } catch (e) {
            return null;
        }
    }

    async getUsers(chatId: number) {
        try {
            const response = await this.api.getUsers(chatId);
            return response.map(transformData.from.dto<ChatUser>);
        } catch (e) {
            return null;
        }
    }

    async deleteChat(chatId: number) {
        try {
            await this.api.deleteChat(chatId);
            await chatsService.getChats();
            chatService.disconnect();
        } catch (e) {
            return null;
        }
    }

    async deleteUsers(chatId: number, users: number[]) {
        try {
            await this.api.deleteUsers(chatId, users.map(String));
        } catch (e) {
            return null;
        }
    }
}

export const chatService = new ChatService();
