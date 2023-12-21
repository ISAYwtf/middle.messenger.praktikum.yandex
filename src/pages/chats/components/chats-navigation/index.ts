import Handlebars from 'handlebars';
import profileImage from '@assets/img/profileExample.jpg';

export { default as ChatsNavigation } from './chats-navigation.hbs?raw';

const imageInfo = {
    name: 'spidey',
    path: profileImage,
};

Handlebars.registerHelper('chats-list', () => {
    return [
        { name: 'Андрей', message: 'Изображение', date: '15:20', count: 2, image: imageInfo },
        { name: 'Киноклуб', message: 'Стикер', date: '12:00' },
        { name: 'Илья', message: 'Друзья, у меня для вас особенный выпуск новостей!...', date: '10:49', opposite: true, count: 4 },
        { name: 'Вадим', message: 'Круто!', date: 'Сб', image: imageInfo },
        { name: 'тет-а-теты', message: 'Миллионы россиян ежедневно проводят десятки часов свое...', date: 'Сб', opposite: true, image: imageInfo },
        { name: 'Design Destroyer', message: 'В 2008 году художник Jon Rafman начал собирать...', date: 'Ср', opposite: true },
        { name: 'Day.', message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...', date: 'Пн', opposite: true },
        { name: 'Стас Рогозин', message: 'Можно или сегодня или завтра вечером.', date: '01.05.24', count: 7 },
        { name: 'Андрей', message: 'Изображение', date: '01.05.24' },
        { name: 'Андрей', message: 'Изображение', date: '29.04.24' },
        { name: 'Андрей', message: 'Изображение', date: '28.04.24' },
        { name: 'Андрей', message: 'Изображение', date: '28.04.24' },
        { name: 'Андрей', message: 'Изображение', date: '28.04.24' },
        { name: 'Андрей', message: 'Изображение', date: '15.04.24' },
        { name: 'Андрей', message: 'Изображение', date: '03.04.24' },
        { name: 'Андрей', message: 'Изображение', date: '03.03.24' },
    ];
});
