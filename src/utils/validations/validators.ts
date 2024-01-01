export const LIMITERS = {
    login: {
        min: 3,
        max: 20,
    },
    password: {
        min: 8,
        max: 40,
    },
    phone: {
        min: 10,
        max: 15,
    }
};

export const ERRORS = {
    min: (min: number) => `Минимальное количество символов - ${min}`,
    max: (max: number) => `Максимальное количество символов - ${max}`,
    empty: 'Поле не может быть пустым',
    incorrect: 'Неверный формат',
};

export const REGEXPS = {
    name: /^([A-Z]|[А-ЯЁ])([a-z]|[а-яё]|-)+$/,
    login: /^([A-z]|\d|-|_)+$/,
    email: /^(\w|-|\.)+@\w+\.\w+$/,
    phone: /^\+?\d+$/,
};

const checkMin = (value: string, min: number) => value.length < min ? ERRORS.min(min) : null;
const checkMax = (value: string, max: number) => value.length > max ? ERRORS.max(max) : null;
const checkEmpty = (value: string) => value.length === 0 ? ERRORS.empty : null;
const checkRegExp = (value: string, regExp: RegExp) => !regExp.test(value) ? ERRORS.incorrect : null;
const checkUppercase = (value: string) => value.toLowerCase() === value ? ERRORS.incorrect : null;

export const validateLogin = (value: string) => checkMin(value, LIMITERS.login.min)
    ?? checkMax(value, LIMITERS.login.max) ?? checkRegExp(value, REGEXPS.login);
export const validateEmail = (value: string) => checkEmpty(value)
    ?? checkRegExp(value, REGEXPS.email);
export const validatePhone = (value: string) => checkMin(value, LIMITERS.phone.min)
    ?? checkMax(value, LIMITERS.phone.max)
    ?? checkRegExp(value, REGEXPS.phone);
export const validateName = (value: string) => checkRegExp(value, REGEXPS.name);
export const validatePassword = (value: string) => {
    return checkMin(value, LIMITERS.password.min)
        ?? checkMax(value, LIMITERS.password.max)
        ?? checkRegExp(value, /[0-9]/)
        ?? checkUppercase(value);
};

export const validators = {
    login: validateLogin,
    email: validateEmail,
    name: validateName,
    text: checkEmpty,
    phone: validatePhone,
    password: validatePassword,
};
