import { Block } from '@utils';

export type EmbedFn = (fragment: DocumentFragment) => void;

export interface BlockConstructable<Props extends object = object> {
    new (props: Props): Block,
}
