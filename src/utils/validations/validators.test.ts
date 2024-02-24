import { describe } from 'mocha';
import { validators } from './validators.ts';
import { expect } from 'chai';
import { ERRORS, LIMITERS } from './constants.ts';

const checkValidation = (validator: keyof typeof validators) => (
    value: string,
    assert: string | null
) => {
    const error = validators[validator](value);
    if (assert) {
        expect(error).equal(assert);
    } else {
        expect(error).null;
    }
};

describe('validators', () => {
    describe('login', () => {
        const checkLogin = checkValidation('login');

        it('correct', () => {
            checkLogin('testlogin', null);
        });

        it('min length', () => {
            checkLogin('', ERRORS.min(LIMITERS.login.min));
        });

        it('max length', () => {
            const value = 'a'.repeat(LIMITERS.login.max + 1);
            checkLogin(value, ERRORS.max(LIMITERS.login.max));
        });

        it('format', () => {
            checkLogin('Abc$334-_', ERRORS.incorrect);
        });
    });

    describe('email', () => {
        const checkEmail = checkValidation('email');

        it('correct', () => {
            checkEmail('user@test.ru', null);
        });

        it('min length', () => {
            checkEmail('', ERRORS.empty);
        });

        it('format', () => {
            checkEmail('user@.', ERRORS.incorrect);
        });
    });

    describe('name', () => {
        const checkName = checkValidation('name');

        it('correct', () => {
            checkName('Тест', null);
        });

        it('format', () => {
            checkName('Test@', ERRORS.incorrect);
        });
    });

    describe('text', () => {
        const checkText = checkValidation('text');

        it('correct', () => {
            checkText('Тест', null);
        });

        it('empty', () => {
            checkText('', ERRORS.empty);
        });
    });

    describe('phone', () => {
        const checkPhone = checkValidation('phone');

        it('correct', () => {
            checkPhone('79999999999', null);
        });

        it('should handle plus', () => {
            checkPhone('+79999999999', null);
        });

        it('min length', () => {
            checkPhone('799999999', ERRORS.min(LIMITERS.phone.min));
        });

        it('max length', () => {
            const value = '799999999999'.repeat(LIMITERS.login.max + 1);
            checkPhone(value, ERRORS.max(LIMITERS.phone.max));
        });

        it('format', () => {
            checkPhone('7999999f999', ERRORS.incorrect);
        });
    });

    describe('password', () => {
        const checkPassword = checkValidation('password');

        it('correct', () => {
            checkPassword('SomePass1234', null);
        });

        it('min length', () => {
            checkPassword('So1234', ERRORS.min(LIMITERS.password.min));
        });

        it('max length', () => {
            const value = 'Sa1'.repeat(Math.ceil(LIMITERS.password.max / 3) + 1);
            checkPassword(value, ERRORS.max(LIMITERS.password.max));
        });

        it('format', () => {
            checkPassword('Somepassword', ERRORS.incorrect);
        });
    });

    describe('id', () => {
        const checkId = checkValidation('id');

        it('correct', () => {
            checkId('1234', null);
        });

        it('empty', () => {
            checkId('', ERRORS.empty);
        });

        it('format', () => {
            checkId('s1234', ERRORS.incorrectId);
        });
    });
});
