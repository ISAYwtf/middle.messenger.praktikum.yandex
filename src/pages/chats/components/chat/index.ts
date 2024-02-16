import { registerComponent } from '@utils';
import { ChatConnected } from './chat.ts';

export { ChatConnected } from './chat.ts';

registerComponent('Chat', ChatConnected);
