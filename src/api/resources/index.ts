import { BaseApi } from '@api/baseApi';

export class ResourcesApi extends BaseApi {
    constructor() {
        super('/resources');
    }

    async get(path: string) {
        return await this.client.get<string>(path, { responseType: 'arraybuffer' });
    }
}
