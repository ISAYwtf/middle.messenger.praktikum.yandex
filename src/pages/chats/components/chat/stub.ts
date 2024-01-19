import dialogExampleImg from '@assets/img/dialogExample.jpg';
import { ChatBlockType, ChatDayBlockType, ChatItem } from '@pages/chats/components/chat/types.ts';

const chatOppositeItems: ChatItem[] = [
    { content: 'Привет', time: '10:59' },
    { content: 'Прости, что пропал', time: '10:59' },
    { content: { name: 'example', path: dialogExampleImg }, time: '11:00' },
];

const chatOwnItems: ChatItem[] = [
    { content: 'О, какие люди!', time: '11:05', read: true },
    { content: 'Ты куда так часто пропадаешь?', time: '10:59', read: true },
];

const chatBlock: ChatBlockType[] = [
    { opposite: true, items: chatOppositeItems },
    { opposite: false, items: chatOwnItems },
];

export const CHAT_BLOCKS: ChatDayBlockType[] = [
    { date: '01.07.24', blocks: chatBlock },
    { date: '01.06.24', blocks: chatBlock },
    { date: '01.05.24', blocks: chatBlock },
    { date: '01.04.24', blocks: chatBlock },
];
