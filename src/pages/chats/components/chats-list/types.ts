import { ChatType } from '@store/types.ts';

export interface ChatsListProps {
    onSelect: (chat: ChatType) => void,
}
