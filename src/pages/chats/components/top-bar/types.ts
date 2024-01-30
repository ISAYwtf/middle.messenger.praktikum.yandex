import { NewChatButton, NewChatModal } from '@pages/chats/components';

export type TopBarRefs = {
    newChatButton: NewChatButton,
    modal: NewChatModal,
}

export interface TopBarProps {
    onClickNewChat?: (event: Event) => void,
}
