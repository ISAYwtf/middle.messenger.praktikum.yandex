export const enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

type Data = Record<string, string | number | undefined | null>;

export interface HTTPTransportOptions {
    timeout?: number,
    data?: Data,
    method?: Method,
    headers?: Record<string, string>,
}

function queryStringify(data: Data) {
    return Object.entries(data).reduce((acc, [key, value]) => {
        const prev = acc === '?' ? acc : `${acc}&`;
        if (Array.isArray(value)) {
            return `${prev}${key}=${value.join(',')}`;
        }
        if (typeof value === 'object') {
            return `${prev}${key}=[object Object]`;
        }

        return `${prev}${key}=${value}`;
    }, '?');
}

export class HTTPTransport {
    get = (url: string, options: HTTPTransportOptions = {}) => {
        return this.request(url, { ...options, method: Method.GET }, options.timeout);
    };

    post = (url: string, options: HTTPTransportOptions = {}) => {
        return this.request(url, { ...options, method: Method.POST }, options.timeout);
    };

    put = (url: string, options: HTTPTransportOptions = {}) => {
        return this.request(url, { ...options, method: Method.PUT }, options.timeout);
    };

    delete = (url: string, options: HTTPTransportOptions = {}) => {
        return this.request(url, { ...options, method: Method.DELETE }, options.timeout);
    };

    request = (url: string, options: HTTPTransportOptions = {}, timeout = 5000) => {
        const { method = Method.GET, data, headers } = options;

        const urlInstance = method === Method.GET && data
            ? url + queryStringify(data)
            : url;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, urlInstance);
            xhr.timeout = timeout;

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            xhr.onload = function() {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === Method.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
