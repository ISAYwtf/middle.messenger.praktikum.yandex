# Yandex Practicum Messenger

Данный проект был создан в результате прохождения обучения в Яндекс Практикуме.

Он представляет собой базовый мессенджер и состоит из следующих страниц: 
- Вход
- Регистрация
- Список чатов
- Профиль
- Страница ошибок (404, 500).

За основу был взят заранее предоставленный [макет](https://www.figma.com/file/SZWjni0psBWQ1Ped9wjFj8/Yandex-Practicum-Messenger?type=design&node-id=0%3A1&mode=design&t=VbUi5LqVDWh4ZMMS-1).

Список используемых технологий:
- Vite
- Html / Css
- Typescript
- Handlebars
- Eslint / Stylelint

Для публикации приложения во внешнем домене используется Netlify.

Для навигации по страницам используются пути:
- /login
- /registration
- /chats
- /profile
- /404
- /500

## Команды
1. Сборка проекта

    ```shell
    npm run build
    ```

2. Запуск dev-mode

    ```shell
    npm run dev
    ```

3. Сборка и запуск проекта

    ```shell
    npm run start
    ```

## Sprint 1
В первом спринте была выполнена верстка приложения с помощью шаблонизатора Handlebars.

## Sprint 2
Во втором спринте реализована логика и жизненный цикл компонентов с использованием EventBus.
Добавлены статические анализаторы кода.

### Ссылки
- [Pull request](https://github.com/ISAYwtf/middle.messenger.praktikum.yandex/pull/5)
- [Опубликованное приложение](https://isay-practicum-messenger.netlify.app)
