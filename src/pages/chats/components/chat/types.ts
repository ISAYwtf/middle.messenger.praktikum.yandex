import { Image } from '@types';

export interface ChatItem {
    content: string | Image,
    time: string,
    read?: boolean,
    sent?: boolean,
}

export interface ChatBlockType {
    opposite: boolean,
    items: ChatItem[],
}

export interface ChatDayBlockType {
    date: string,
    blocks: ChatBlockType[],
}

export interface ChatProps {
    dateBlocks: ChatDayBlockType[],
}
