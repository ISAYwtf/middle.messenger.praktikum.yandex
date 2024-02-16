import { ChatUserDTO } from '@api/chats/types.ts';

export interface ChatUser extends Omit<ChatUserDTO, 'display_name' | 'second_name' | 'first_name'> {
    displayName: string,
    secondName: string,
    firstName: string,
}
