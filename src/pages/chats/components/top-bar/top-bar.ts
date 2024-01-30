import { Block } from '@utils';
import { default as template } from './top-bar.hbs?raw';
import { TopBarProps, TopBarRefs } from './types.ts';

export class TopBar extends Block<TopBarProps, TopBarRefs> {
    constructor(props: TopBarProps) {
        super({
            ...props,
            onClickNewChat: () => this.newChatHandler(),
        });
    }

    newChatHandler() {
        this.refs.modal.open();
    }

    protected render(): string {
        return template;
    }
}
