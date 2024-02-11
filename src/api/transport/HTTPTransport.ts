import { GetMethod, HTTPMethod, HttpMiddleware, PostMethod, RequestOptions } from './types';
import { Method } from './constants.ts';
import { queryStringify } from './queryStringify.ts';
import { joinURL } from '@utils/url/joinURL.ts';
import { merge } from '@utils/object/merge';

function arrayBufferToBase64(response: XMLHttpRequest['response']) {
    const buffer = new Uint8Array(response);
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}

export class HTTPTransport {
    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    baseURL: string;
    options: Omit<RequestOptions, 'method'> = {};
    middleware: HttpMiddleware[] = [];

    addMiddleware(fn: HttpMiddleware) {
        this.middleware.push(fn);
    }

    get: GetMethod = (url, options) =>
        this.request(url, { ...options, method: Method.GET });

    post: PostMethod = (url, options) =>
        this.request(url, { ...options, method: Method.POST });

    put: PostMethod = (url, options) =>
        this.request(url, { ...options, method: Method.PUT });

    delete: PostMethod = (url, options) =>
        this.request(url, { ...options, method: Method.DELETE });

    request: HTTPMethod = (url = '', options: RequestOptions = {}) => {
        const {
            method = Method.GET,
            queryData,
            data,
            timeout = 5000,
            headers,
            withCredentials = false,
            responseType = '',
        } = merge(options, this.options);

        const urlInstance = joinURL(
            this.baseURL,
            queryData
                ? url + queryStringify(queryData)
                : url
        );

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, urlInstance);
            xhr.timeout = timeout;
            xhr.withCredentials = withCredentials;
            xhr.responseType = responseType;

            if (headers) {
                Object.entries(headers).forEach(([key, value]) => {
                    xhr.setRequestHeader(key, value);
                });
            }

            if (!(data instanceof FormData)) {
                xhr.setRequestHeader('Content-Type', 'application/json');
            }

            xhr.onload = () => {
                const response = this._convertResponse(xhr);

                this.middleware.forEach((fn) => fn({
                    ...xhr,
                    response,
                }));

                if (typeof response === 'object' && response.reason) {
                    reject({
                        ...response,
                        status: xhr.status,
                    });
                    return;
                }
                resolve(response);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            const body = this._getBody(method, data);

            xhr.send(body);
        });
    };

    private _convertResponse(xhr: XMLHttpRequest) {
        const responseIsJson = xhr.getResponseHeader('Content-type')
            ?.includes('application/json');
        if (responseIsJson) {
            return JSON.parse(xhr.response);
        }
        if (xhr.responseType === 'arraybuffer') {
            return arrayBufferToBase64(xhr.response);
        }

        return xhr.response;
    }

    private _getBody(method: Method, data?: RequestOptions['data']) {
        if (method === Method.GET || !data) {
            return undefined;
        } else if (data instanceof FormData) {
            return data;
        } else {
            return JSON.stringify(data);
        }
    }
}
