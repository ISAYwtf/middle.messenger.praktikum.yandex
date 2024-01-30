import { Method } from './constants.ts';

export type HttpMiddlewareParam = Pick<XMLHttpRequest,
| 'response'
| 'responseType'
| 'responseURL'
| 'responseXML'
| 'status'
| 'statusText'
>;
export type HttpMiddleware = (xhr: HttpMiddlewareParam) => void;

export type QueryData = Record<string, string | number | undefined | null> | unknown;

export interface MethodOptions {
    timeout?: number,
    queryData?: QueryData,
    data?: QueryData | FormData,
    headers?: Record<string, string>,
    withCredentials?: boolean,
    responseType?: XMLHttpRequestResponseType,
}

export interface RequestOptions extends MethodOptions {
    method?: Method,
}

export type PostMethod = <Response = unknown>(url?: string, options?: MethodOptions) => Promise<Response>
export type GetMethod = <Response = unknown>(url?: string, options?: Omit<MethodOptions, 'data'>) => Promise<Response>
export type HTTPMethod = <Response = unknown>(url?: string, options?: RequestOptions) => Promise<Response>
