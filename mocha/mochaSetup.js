import { JSDOM } from 'jsdom'

// jsdom
const jsdom = new JSDOM(`<body></body>`, { url: 'https://localhost:3000' });

global.window = {
    ...jsdom.window,
    store: {
        getState: () => ({}),
        on: () => {},
    },
};
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
