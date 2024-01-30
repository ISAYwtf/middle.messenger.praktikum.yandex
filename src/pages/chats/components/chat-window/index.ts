import { registerComponent } from '@utils';
import { ChatWindowConnected } from './chat-window.ts';

export { ChatWindowConnected } from './chat-window.ts';

registerComponent('ChatWindow', ChatWindowConnected);
