import { AppStore } from './types.ts';

export const initialStore: AppStore = {
    chatsRequestIntervalId: null,
    user: null,
    chats: null,
    chatMessages: null,
    currentChat: null,
    notifications: [],
};
