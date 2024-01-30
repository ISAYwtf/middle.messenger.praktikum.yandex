import { Block, BlockConstructable, isEqual, render, resolvePath } from '@utils';
import { Pathname } from './types.ts';

interface RouteProps {
    rootQuery: Pathname | null,
}

export class Route {
    constructor(pathname: Pathname, view: BlockConstructable, props: RouteProps) {
        this.pathname = resolvePath(pathname);
        this._blockClass = view;
        this._props = props;
    }

    readonly pathname: Pathname;
    private readonly _blockClass: BlockConstructable;
    private readonly _props: RouteProps;
    private _block: Block | null = null;

    leave() {
        if (this._block) {
            this._block.hide();
        }
    }

    match(pathname?: Pathname) {
        if (!pathname) {
            return false;
        }

        return isEqual(resolvePath(pathname), this.pathname);
    }

    render() {
        if (!this._block) {
            this._block = new this._blockClass({});
            render(this._props.rootQuery, this._block);
            return;
        }

        this._block.show();
    }
}
