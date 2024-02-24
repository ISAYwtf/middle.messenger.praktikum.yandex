import { expect } from 'chai';
import { getDate } from '../getDate.ts';

describe('getDate', () => {
    it('correct date', () => {
        const date = new Date(2024, 1, 22);
        expect(getDate(date)).equal('22.02.2024');
    });
});
