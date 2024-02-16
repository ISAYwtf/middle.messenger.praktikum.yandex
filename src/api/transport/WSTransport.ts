import { EventBus } from '@utils';

export const enum WSTransportEvents {
    message = 'message',
    error = 'error',
    connected = 'connected',
    close = 'close',
}

export class WSTransport extends EventBus {
    socket: WebSocket | null = null;
    private readonly url: string;
    private pingIntervalId?: NodeJS.Timeout;
    private readonly pingIntervalTime = 30 * 1000;

    constructor(url: string) {
        super();
        this.url = url;
    }

    connect(): Promise<void> {
        if (this.socket) {
            throw new Error('Сокет уже подключен');
        }

        this.socket = new WebSocket(this.url);
        this.subscribe();
        this.setupPing();

        return new Promise((resolve, reject) => {
            this.on(WSTransportEvents.error, reject);
            this.on(WSTransportEvents.connected, () => {
                this.off(WSTransportEvents.error, reject);
                resolve();
            });
        });
    }

    send(data: string | number | object) {
        if (!this.socket) {
            throw new Error('Сокет не подключен');
        }

        this.socket.send(JSON.stringify(data));
    }

    close() {
        this.socket?.close(1000, 'Закрыт пользователем');
        clearInterval(this.pingIntervalId);
    }

    private setupPing() {
        this.pingIntervalId = setInterval(() => {
            this.send({ type: 'ping' });
        }, this.pingIntervalTime);

        this.on(WSTransportEvents.close,() => {
            clearInterval(this.pingIntervalId);
            this.pingIntervalId = undefined;
        });
    }

    private subscribe() {
        this.socket?.addEventListener('open', (e) => this._onOpen(e));
        this.socket?.addEventListener('close', (e) => this._onClose(e));
        this.socket?.addEventListener('error', (e) => this._onError(e));
        this.socket?.addEventListener('message', (e) => this._onMessage(e));
    }

    private _onOpen(_: WebSocketEventMap['open']) {
        console.log('Соединение открыто');
        this.emit(WSTransportEvents.connected);
    }

    private _onMessage(event: WebSocketEventMap['message']) {
        try {
            const data = JSON.parse(event.data);
            if (['pong', 'user connected'].includes(data?.type)) {
                return;
            }

            this.emit(WSTransportEvents.message, data);
        } catch (e) {
            console.error(e);
        }
    }

    private _onClose(event: WebSocketEventMap['close']) {
        if (event.wasClean) {
            console.log('Соединение закрыто чисто');
        } else {
            console.log('Обрыв соединения');
        }
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);

        this.emit(WSTransportEvents.close);
    }

    private _onError(event: WebSocketEventMap['error']) {
        console.error(event);
        this.emit(WSTransportEvents.error, event);
    }
}
