import { registerComponent } from '@utils';
import { ChatsList } from '@pages/chats/components';

export { ChatsList } from './chats-list.ts';

registerComponent('ChatsList', ChatsList);
