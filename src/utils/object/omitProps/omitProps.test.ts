import { describe } from 'mocha';
import { omitProps } from './index.ts';
import { expect } from 'chai';
import { isEqual } from '../isEqual/index.ts';

describe('omitProps', () => {
    const data = {
        a: { b: 1, c: ['a', 'b', { foo: 'bar' }] },
        b: [1, 2, 3],
        c: 'string',
    };

    it('should handle empty object', () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const omittedData = omitProps({}, ['b']);

        expect(isEqual(omittedData, {})).true;
    });

    it('should handle empty array of keys', () => {
        const omittedData = omitProps(data, []);

        expect(isEqual(omittedData, data)).true;
    });

    it('should delete props', () => {
        const omittedData = omitProps(data, ['b', 'c']);
        const expectedData = { a: data.a };

        expect(isEqual(omittedData, expectedData)).true;
    });

    it('should delete correct props', () => {
        const omittedData = omitProps(data, ['b', 'c']);
        const expectedData = { a: data.a, b: data.b };

        expect(isEqual(omittedData, expectedData)).false;
    });
});
