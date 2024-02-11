import { Block, resolvePath } from '@utils';
import { Router } from '@routes/controller/Router.ts';
import { expect } from 'chai';
import sinon from 'sinon';

class TestComponent extends Block {
    protected render(): string {
        return (`
            <div>
                <span id="test-text">Hello</span>
            </div>
        `);
    }
}

describe('router', () => {
    const url = 'test';
    const url2 = 'test_2';
    let router: Router;

    beforeEach(() => {
        router = new Router('#app');
        router
            .use(url, TestComponent, 'root')
            .use(url2, TestComponent)
            .start();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('shouldn\'t change url', () => {
        expect(window.location.pathname).equal('/');
    });

    it('should change url', () => {
        router.go(url);
        expect(window.location.pathname).equal(resolvePath(url));
    });

    it('should return correct current route', () => {
        expect(router.currentRoute).equal(window.location.pathname);
    });

    it('should call history.back', () => {
        const historySpy = sinon.spy(window.history, 'back');
        router.back();
        expect(historySpy.callCount).equal(1);
    });

    it('should call history.forward', () => {
        const historySpy = sinon.spy(window.history, 'forward');
        router.forward();
        expect(historySpy.callCount).equal(1);
    });
});
