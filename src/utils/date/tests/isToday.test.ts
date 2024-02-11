import { expect } from 'chai';
import { isToday } from '../isToday.ts';

describe('isToday', () => {
    it('returns true', () => {
        const date = new Date();
        expect(isToday(date)).true;
    });

    it('returns false', () => {
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();
        const currentDate = new Date().getDate() ?? 28;
        const date = new Date(currentYear, currentMonth, currentDate - 1);
        expect(isToday(date)).false;
    });
});
