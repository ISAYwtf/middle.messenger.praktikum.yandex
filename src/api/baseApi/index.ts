import { HTTPTransport } from '@api/transport';
import { joinURL } from '@utils';
import { BASE_API } from './constants.ts';
import { RequestOptions } from '@api/transport/types.ts';
import { middleware } from '@services';

export class BaseApi {
    constructor(baseURL?: string, options: Omit<RequestOptions, 'method'> = {}) {
        this.baseURL = joinURL(BASE_API, baseURL);
        this.client = new HTTPTransport(this.baseURL);
        this.client.options = {
            withCredentials: true,
            ...options,
        };
        this.client.middleware = middleware.all;
    }

    client: HTTPTransport;

    baseURL: string;
}
