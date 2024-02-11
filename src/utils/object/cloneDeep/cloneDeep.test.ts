import { describe } from 'mocha';
import { cloneDeep } from './index.ts';
import { expect } from 'chai';
import { isEqual } from '../isEqual/index.ts';

describe('cloneDeep', () => {
    const data = {
        a: { b: 1, c: ['a', 'b', { foo: 'bar' }] },
        b: [1, 2, 3],
        c: 'string',
    };

    it('should return a new object', () => {
        const clonedData = cloneDeep(data);
        expect(clonedData).not.equal(data);
    });

    it('should return an identical object', () => {
        const clonedData = cloneDeep(data);
        expect(isEqual(clonedData, data)).true;
    });

    it('should handle a primitive', () => {
        const expectedValue = 5;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const clonedData = cloneDeep(expectedValue);
        expect(clonedData).equal(expectedValue);
    });
});
