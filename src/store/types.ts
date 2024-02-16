import { LastMessageDTO } from '@api/chats/types.ts';

export interface User {
    id: number,
    login: string,
    firstName: string,
    secondName: string,
    displayName: string,
    avatar: string,
    phone: string,
    email: string,
}

export interface LastMessageType extends Omit<LastMessageDTO, 'user'> {
    user: Omit<User, 'id'>,
    mine?: boolean,
}

export interface ChatType {
    id: number,
    title: string,
    avatar: string | null,
    avatarFile?: string | null,
    unreadCount: string,
    createdBy: number,
    lastMessage: LastMessageType | null,
}

export interface AvatarFile {
    avatarFile?: string | null,
}

export interface MessageFileDTO {
    id: number,
    user_id: number,
    path: string,
    filename: string,
    content_type: string,
    content_size: string,
    upload_date: string,
}

export interface MessageDTO {
    id: number,
    chat_id: number,
    time: string,
    type: 'message' | 'file',
    user_id: number,
    content: string,
    is_read: boolean,
    file: MessageFileDTO | null,
}

export interface ChatBlockType {
    mine: boolean,
    items: MessageDTO[], // todo Встроить объект user для отображения имени и аватара
}

export interface ChatDayBlockType {
    date: string,
    blocks: ChatBlockType[],
}

export interface AppStore extends Record<string, unknown> {
    chatsRequestIntervalId: NodeJS.Timeout | null,
    user: (User & AvatarFile) | null,
    chats: ChatType[] | null,
    currentChat: ChatType | null,
    chatMessages: ChatDayBlockType[] | null,
}
