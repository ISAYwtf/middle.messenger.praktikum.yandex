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
    notEqualPasswords: 'Пароли должны совпадать',
    incorrectId: 'Некорректный ID',
    userIsNotFound: 'Пользователь не найден',
    userCantBeDeleted: 'Данный пользователь не может быть удален',
};

export const REGEXPS = {
    name: /^([A-Z]|[А-ЯЁ])([a-z]|[а-яё]|-)+$/,
    login: /^([A-z]|\d|-|_)+$/,
    email: /^(\w|-|\.)+@\w+\.\w+$/,
    phone: /^\+?\d+$/,
    integer: /^\d+$/,
};
