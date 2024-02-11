import { expect } from 'chai';
import { queryStringify } from '../queryStringify.ts';

describe('queryStringify', () => {
    it('string', () => {
        const param = 'key=1&key=2';
        expect(queryStringify(param)).equal(param);
    });

    it('should return query params as a string', () => {
        const param = {
            key1: ['a', 'b', 'c'],
            key2: { foo: 'bar' },
            key3: '',
        };
        const expectedValue = '?key1=a,b,c&key2=[object Object]';
        expect(queryStringify(param)).equal(expectedValue);
    });
});
