import { expect } from 'chai';
import { getLocaleDayOfWeek } from '../getLocaleDayOfWeek.ts';

describe('getLocaleDayOfWeek', () => {
    it('returns Вс', () => {
        const date = new Date('2024-02-18T21:00:00.000Z');
        expect(getLocaleDayOfWeek(date)).equal('Вс');
    });
});
