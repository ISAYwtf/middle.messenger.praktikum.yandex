import { QueryData } from './types.ts';


export const queryStringify = (data: QueryData) => {
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    return Object.entries(data)
        .reduce((acc, [key, value]) => {
            const prev = acc === '?' ? acc : `${acc}&`;
            if (Array.isArray(value)) {
                return `${prev}${key}=${value.join(',')}`;
            }
            if (typeof value === 'object') {
                return `${prev}${key}=[object Object]`;
            }
            if (value === '') {
                return acc;
            }

            return `${prev}${key}=${value}`;
        }, '?');
};
