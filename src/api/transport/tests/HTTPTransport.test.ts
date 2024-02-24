import * as sinon from 'sinon';
import { HTTPTransport } from '../HTTPTransport.ts';
import { expect } from 'chai';
import { Method } from '../constants.ts';

describe('HTTPTransport', () => {
    const expectedUrl = 'test';
    let http: HTTPTransport;
    let requestStub: sinon.SinonStub;

    beforeEach(() => {
        http = new HTTPTransport('/base');
        requestStub = sinon.stub(http, 'request');
    });

    afterEach(() => {
        sinon.restore();
    });

    it('get', async () => {
        const data = { queryData: { a: '1', b: 'foo bar' } };
        await http.get(expectedUrl, data);
        expect(requestStub.calledWithMatch(expectedUrl, { method: Method.GET, ...data })).true;
    });

    it('post', async () => {
        const data = { data: { a: '1', b: 'foo bar' } };
        await http.post(expectedUrl, data);
        expect(requestStub.calledWithMatch(expectedUrl, { method: Method.POST, ...data })).true;
    });

    it('put', async () => {
        const data = { data: { a: '1', b: 'foo bar' } };
        await http.put(expectedUrl, data);
        expect(requestStub.calledWithMatch(expectedUrl, { method: Method.PUT, ...data })).true;
    });

    it('delete', async () => {
        const data = { data: { a: '1', b: 'foo bar' } };
        await http.delete(expectedUrl, data);
        expect(requestStub.calledWithMatch(expectedUrl, { method: Method.DELETE, ...data })).true;
    });
});
