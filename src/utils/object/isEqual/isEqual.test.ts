import { describe, it } from 'mocha';
import { isEqual } from './index.ts';
import { expect } from 'chai';

describe('isEqual', () => {
    describe('objects', () => {
        const data1 = {
            a: { b: 1, c: ['a', 'b', { foo: 'bar' }] },
            b: [1, 2, 3],
            c: 'string',
        };

        it('should be true', () => {
            const data2 = {
                a: { b: 1, c: ['a', 'b', { foo: 'bar' }] },
                b: [1, 2, 3],
                c: 'string',
            };
            expect(isEqual(data1, data2)).true;
        });

        it('should be false', () => {
            const data2 = {
                a: { b: 1, c: ['a', 'b', { foo: 'bar' }] },
                b: [1, 2, 4],
                c: 'string',
            };
            expect(isEqual(data1, data2)).false;
        });
    });

    describe('primitives', () => {
        it('should be true', () => {
            expect(isEqual('foo', 'foo')).true;
        });

        it('should be false', () => {
            expect(isEqual(1, '1')).false;
        });
    });

    describe('functions', () => {
        it('should be true', () => {
            expect(isEqual(() => {}, () => {})).true;
        });

        it('should be false', () => {
            const fn1 = () => true;
            const fn2 = () => false;
            expect(isEqual(fn1, fn2)).false;
        });
    });
});
