import { AppStore } from '@store/types.ts';
import { Store } from '@store/controller/Store.ts';

declare global {
    interface Window {
        store: Store<AppStore>,
    }
}
