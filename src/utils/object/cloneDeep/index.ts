export const cloneDeep = <T extends object = object>(obj: T): T => {
    if (Array.isArray(obj)) {
        return obj.map(item => cloneDeep(item)) as T;
    } else if (typeof obj === 'object' && obj !== null) {
        const newObj: Record<any, any> = {};
        for (const key in obj) {
            newObj[key] = cloneDeep(obj[key] as unknown as object);
        }
        return newObj as T;
    } else {
        return obj;
    }
};
