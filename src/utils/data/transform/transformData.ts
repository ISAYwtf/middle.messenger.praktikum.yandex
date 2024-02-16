import { transformCase } from './transformCase.ts';
import { ChatDTO } from '@api/chats/types.ts';
import { ChatDayBlockType, ChatType, MessageDTO } from '@store/types.ts';
import { transformDate } from '@/utils';
import { getDate, removeSeconds } from '@utils/date';

const transformChat = (data: ChatDTO, login: string): ChatType => {
    const resolvedFromDTO = transformData.from.dto<ChatType>(data);

    if (resolvedFromDTO.lastMessage) {
        if (resolvedFromDTO.lastMessage.user.login === login) {
            resolvedFromDTO.lastMessage.mine = true;
        }

        resolvedFromDTO.lastMessage.time = transformDate.from.server(resolvedFromDTO.lastMessage.time);
    }

    return resolvedFromDTO;
};

const transformMessageDateBLocks = (data: MessageDTO[], userId: number) => {
    return data.reduce((acc, message) => {
        const lastIndex = acc.length - 1;
        const lastBlock = acc[lastIndex];
        const messageIsMine = message.user_id === userId;

        const resolvedMessage: MessageDTO = {
            ...message,
            time: removeSeconds(new Date(message.time)
                .toLocaleTimeString())
        };

        if (lastBlock?.mine === messageIsMine) {
            lastBlock.items.push(resolvedMessage);
        } else {
            acc.push({
                mine: messageIsMine,
                items: [resolvedMessage],
            });
        }

        return acc;
    }, [] as Array<{ mine: boolean, items: MessageDTO[] }>);
};

const transformMessages = (data: MessageDTO[], userId: number) => {
    const dateBlocks = data.reduce((acc, message) => {
        const lastIndex = acc.length - 1;
        const lastDate = acc[lastIndex]?.date ?? '';

        if (lastDate === getDate(message.time)) {
            acc[lastIndex].blocks.push(message);
        } else {
            acc.push({
                date: getDate(message.time),
                blocks: [message],
            });
        }

        return acc;
    }, [] as Array<{ date: string, blocks: MessageDTO[] }>);

    const resolvedDateBlocks: ChatDayBlockType[] = dateBlocks.map((dateBlock) => ({
        ...dateBlock,
        blocks: transformMessageDateBLocks(dateBlock.blocks, userId),
    }));

    return resolvedDateBlocks;
};

export const transformData = {
    to: {
        dto<T extends object, D extends object = object>(data: D): T {
            return Object.entries(data).reduce((acc, [key, value]) => ({
                ...acc,
                [transformCase.snakeCase(key)]: value
            }), {} as T);
        }
    },
    from: {
        dto<T extends object, D extends object = object>(data: D): T {
            return Object.entries(data).reduce((acc, [key, value]) => ({
                ...acc,
                [transformCase.camelCase(key)]: value
            }), {} as T);
        }
    },
    chats(data: ChatDTO[], login: string): ChatType[] {
        return data.map((chat) => transformChat(chat, login));
    },
    messages: transformMessages,
};
