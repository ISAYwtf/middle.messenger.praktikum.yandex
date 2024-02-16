import { Store } from './controller/Store.ts';
import { AppStore } from './types.ts';
import { initialStore } from './initialStore.ts';

export const registerStore = () => {
    window.store = new Store<AppStore>(initialStore);
};

export { connect } from './controller/connect.ts';
export type { AppStore } from './types.ts';
