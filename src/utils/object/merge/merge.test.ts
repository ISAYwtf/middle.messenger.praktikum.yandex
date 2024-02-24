import { describe, it } from 'mocha';
import { merge } from './index.ts';
import { expect } from 'chai';
import { isEqual } from '../isEqual/index.ts';

interface TestData {
    a: any,
    b?: number[],
    c?: string,
}

describe('merge', () => {
    const data: TestData = {
        a: { b: 1, c: ['a', 'b', { foo: 'bar' }] },
        b: [1, 2, 3],
        c: 'string',
    };
    const targetData: TestData = {
        a: { b: 3, g: ['new value'] },
    };

    it('should return new object', () => {
        const mergedObject = merge(data, targetData);
        expect(mergedObject).not.equal(data);
    });

    it('should return merged object', () => {
        const mergedObject = merge(data, targetData);
        const expectedData = {
            ...data,
            a: { ...data.a, ...targetData.a },
        };
        expect(isEqual(mergedObject, expectedData)).true;
    });
});
