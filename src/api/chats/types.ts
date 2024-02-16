import { UserDTO } from '@api/auth/types.ts';

export interface LastMessageDTO {
    user: Omit<UserDTO, 'id'>,
    time: string,
    content: string,
    id: string,
}

export interface ChatDTO {
    id: string,
    title: string,
    avatar: string | null,
    unread_count: string,
    created_by: string,
    last_message: LastMessageDTO | null,
}

export type ChatsDTO = ChatDTO[];

export interface ChatsRequestParams {
    offset?: number,
    limit?: number,
    title?: string,
}

export interface ChatToken {
    token: string,
}

export interface ChatDeleteResponse {
    userId: number,
    result: Omit<ChatDTO, 'unread_count' | 'last_message'>,
}

export interface ChatUsersRequestParams {
    offset?: number,
    limit?: number,
    name?: string,
    email?: string,
}

export interface ChatUserDTO extends UserDTO {
    role: 'admin' | 'regular',
}
