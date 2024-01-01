import { registerPartials } from '@utils';
import { TopBar, SearchInput, Message, MessageBlock } from './components';

export { Chats } from './chats.ts';

registerPartials({
    TopBar,
    SearchInput,
    Message,
    MessageBlock
});
