import Handlebars from 'handlebars';
import dialogExampleImg from '@assets/img/dialogExample.jpg';

const chatOppositeItems = [
    { content: 'Привет', time: '10:59' },
    { content: 'Прости, что пропал', time: '10:59' },
    { image: { name: 'example', path: dialogExampleImg }, time: '11:00' },
];

const chatOwnItems = [
    { content: 'О, какие люди!', time: '11:05', read: true },
    { content: 'Ты куда так часто пропадаешь?', time: '10:59', read: true },
];

const chatBlock = [
    { opposite: true, items: chatOppositeItems },
    { opposite: false, items: chatOwnItems },
];

Handlebars.registerHelper('chat-blocks', () => {
    return [
        { date: '01.07.24', blocks: chatBlock },
        { date: '01.06.24', blocks: chatBlock },
        { date: '01.05.24', blocks: chatBlock },
        { date: '01.04.24', blocks: chatBlock },
    ];
});

export { default as Chat } from './chat.hbs?raw';
