import { Block } from '@utils';
import { default as template } from './chats.hbs?raw';
import profileExampleImg from '@assets/img/profileExample.jpg';
import { ChatsListType } from '@pages/chats/components/chats-list/types.ts';
import { Image } from '@types';
import { ChatWindow } from '@pages/chats/components';

type ChatsRefs = {
    chatWindow: ChatWindow,
}

interface ChatsProps {
    userName: string,
    image?: Image,
    onSelect: (user: ChatsListType) => void,
}

export class Chats extends Block<ChatsProps, ChatsRefs> {
    constructor() {
        super({
            userName: 'Герман',
            image: {
                path: profileExampleImg,
                name: 'user-image'
            },
            onSelect: (user: ChatsListType) => this.onSelect(user),
        });
    }

    private onSelect(_: ChatsListType) {
        this.refs.chatWindow.setProps({
            selected: true,
        });
    }

    protected render(): string {
        return template;
    }
}
