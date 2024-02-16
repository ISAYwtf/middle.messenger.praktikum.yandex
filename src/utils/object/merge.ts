export const merge = <T extends object = object, E extends T = T>(lhs: T, rhs: E): T => {
    const cloned: T = { ...lhs };

    Object.keys(rhs).forEach((key) => {
        const typedKey = key as keyof T;
        const areObject = lhs[typedKey] instanceof Object && rhs[typedKey] instanceof Object;
        const areFunction = typeof lhs[typedKey] === 'function' && typeof rhs[typedKey] === 'function';

        if (Boolean(lhs[typedKey]) && areObject && !areFunction) {
            cloned[typedKey] = merge(lhs[typedKey] as object, rhs[typedKey] as object) as T[keyof T];
        } else {
            cloned[typedKey] = rhs[typedKey];
        }
    });

    return cloned;
};
