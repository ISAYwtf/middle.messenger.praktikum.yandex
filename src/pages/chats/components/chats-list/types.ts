import { Image } from '@types';

export interface ChatsListType {
    id: string,
    name: string,
    message: string,
    date: string,
    count?: number,
    image?: Image,
    opposite?: boolean,
}

export interface ChatsListProps {
    list: ChatsListType[],
    onSelect: (user: ChatsListType) => void,
}
