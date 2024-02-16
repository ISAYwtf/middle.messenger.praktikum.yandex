import { Block, isEqual, RefType } from '@utils';
import { StoreEvents } from './Store.ts';
import { AppStore } from '../types.ts';

type MapStateToProps = ((state: AppStore) => Partial<AppStore>) | Array<keyof AppStore>

export const connect = (mapState: MapStateToProps) => {
    const mapStateToProps = (state: AppStore): Partial<AppStore> => {
        if (!Array.isArray(mapState)) {
            return mapState(state);
        }

        return Object.keys(state)
            .filter((key) => mapState.includes(key as keyof AppStore))
            .reduce((acc, key) => ({
                ...acc,
                [key]: state[key as keyof AppStore]
            }), {});
    };

    return <P extends object = object, R extends RefType = RefType>(Component: typeof Block<P, R>) =>
        class extends Component {
            private readonly onChangeStoreCallback: () => void;

            constructor(props: P & Partial<AppStore>) {
                const store = window.store;
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

                super({ ...props, ...state });

                this.onChangeStoreCallback = () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());

                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                        this.setProps({ ...newState } as P);

                        // не забываем сохранить новое состояние
                        state = newState;
                    }
                };

                // подписываемся на событие
                store.on(StoreEvents.Updated, this.onChangeStoreCallback);
            }

            componentWillUnmount() {
                super.componentWillUnmount();
                window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
            }
        };
};
