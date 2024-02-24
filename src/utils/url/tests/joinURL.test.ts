import { expect } from 'chai';
import { joinURL } from '../joinURL.ts';

describe('joinURL', () => {
    it('returns correct url', () => {
        const parts = [
            '/',
            '',
            undefined,
            'profile',
            null,
            'chats/',
            '/messenger  ',
        ];
        const expectedValue = 'profile/chats/messenger';
        expect(joinURL(...parts)).equal(expectedValue);
    });
});
