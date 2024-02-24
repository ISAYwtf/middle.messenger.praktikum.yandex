import { Route } from '../Route.ts';
import { Block } from '@utils/component/Block.ts';
import { expect } from 'chai';

class TestComponent extends Block {
    protected render(): string {
        return (`
            <div>
                <span id="test-text">Hello</span>
            </div>
        `);
    }
}

describe('route', () => {
    const url = 'test';
    const routeProps = { rootQuery: '#app' };

    it('should match url', () => {
        const route = new Route(url, TestComponent, routeProps);
        expect(route.match(`/${url}`)).true;
    });
});
