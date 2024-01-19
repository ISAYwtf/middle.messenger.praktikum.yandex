import profileImage from '@assets/img/profileExample.jpg';
import { ChatsListType } from './types';
import { Image } from '@types';

const imageInfo: Image = {
    name: 'spidey',
    path: profileImage,
};

export const CHATS_LIST: ChatsListType[] = [
    { id: '1', name: 'Андрей', message: 'Изображение', date: '15:20', count: 2, image: imageInfo },
    { id: '2', name: 'Киноклуб', message: 'Стикер', date: '12:00' },
    { id: '3', name: 'Илья', message: 'Друзья, у меня для вас особенный выпуск новостей!...', date: '10:49', opposite: true, count: 4 },
    { id: '4', name: 'Вадим', message: 'Круто!', date: 'Сб', image: imageInfo },
    { id: '5', name: 'тет-а-теты', message: 'Миллионы россиян ежедневно проводят десятки часов свое...', date: 'Сб', opposite: true, image: imageInfo },
    { id: '6', name: 'Design Destroyer', message: 'В 2008 году художник Jon Rafman начал собирать...', date: 'Ср', opposite: true },
    { id: '7', name: 'Day.', message: 'Так увлёкся работой по курсу, что совсем забыл его анонсир...', date: 'Пн', opposite: true },
    { id: '8', name: 'Стас Рогозин', message: 'Можно или сегодня или завтра вечером.', date: '01.05.24', count: 7 },
    { id: '9', name: 'Андрей', message: 'Изображение', date: '01.05.24' },
    { id: '10', name: 'Андрей', message: 'Изображение', date: '29.04.24' },
    { id: '11', name: 'Андрей', message: 'Изображение', date: '28.04.24' },
    { id: '12', name: 'Андрей', message: 'Изображение', date: '28.04.24' },
    { id: '13', name: 'Андрей', message: 'Изображение', date: '28.04.24' },
    { id: '14', name: 'Андрей', message: 'Изображение', date: '15.04.24' },
    { id: '15', name: 'Андрей', message: 'Изображение', date: '03.04.24' },
    { id: '16', name: 'Андрей', message: 'Изображение', date: '03.03.24' },
];
