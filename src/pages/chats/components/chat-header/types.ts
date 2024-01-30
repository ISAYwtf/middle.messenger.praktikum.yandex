import {
    ChatOptionsButton,
    ChatOptionsSelect,
    DeleteChatModal,
    DeleteUserModal,
    NewUserModal
} from '@pages/chats/components';
import { ChatOptionsItemProps } from '@pages/chats/components/chat-options-item/types.ts';

export type ChatHeaderRefs = {
    options: ChatOptionsSelect,
    optionsButton: ChatOptionsButton,
    newUserModal: NewUserModal,
    deleteChatModal: DeleteChatModal,
    deleteUserModal: DeleteUserModal,
}

export interface ChatHeaderProps {
    title: string,
    avatarFile: string,
    onOptionsClick?: (event: Event) => void,
    options?: ChatOptionsItemProps[],
}
