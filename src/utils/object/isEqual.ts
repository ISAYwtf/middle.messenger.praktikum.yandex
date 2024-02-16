const isPrimitive = (arg: unknown): arg is string | number | boolean | null => !['object', 'function']
    .includes(typeof arg) || arg === null;

const isFunction = (arg: unknown): arg is (() => void) =>
    typeof arg === 'function';

const isObjectOrArray = (arg: unknown): arg is Record<any, any> => {
    return typeof arg === 'object' && arg !== null;
};

export const isEqual = (lhs: unknown, rhs: unknown) => {
    if (isPrimitive(lhs) || isPrimitive(rhs)) {
        return lhs === rhs;
    }
    if (isFunction(lhs) && isFunction(rhs)) {
        return lhs.toString() === rhs.toString();
    }

    if (isObjectOrArray(lhs) && isObjectOrArray(rhs)) {
        if (Object.keys(lhs).length !== Object.keys(rhs).length) {
            return false;
        }

        for (const [key, value] of Object.entries(lhs)) {
            const rightValue = rhs[key];
            if (isEqual(value, rightValue)) {
                continue;
            }
            return false;
        }
    }

    return true;
};
