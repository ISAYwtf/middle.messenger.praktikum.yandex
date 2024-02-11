import { nanoid } from 'nanoid';
import { Notification } from '@store/types.ts';

export class NotificationService {
    private readonly closingTimeout = 7 * 1000;

    send(title: Notification['title'], options: Omit<Notification, 'id' | 'title'> = {}) {
        const statedNotifications = window.store.getState().notifications;
        const id = nanoid(6);
        statedNotifications.push({
            type: 'default',
            ...options,
            id,
            title,
        });

        window.store.set({
            notifications: statedNotifications,
        });

        setTimeout(() => {
            this.close(id);
        }, this.closingTimeout);
    }

    sendError(title: Notification['title'], options: Omit<Notification, 'id' | 'type' | 'title'> = {}) {
        this.send(title, {
            ...options,
            type: 'error',
        });
    }

    close(id: string) {
        const statedNotifications = window.store.getState().notifications
            .filter((el) => el.id !== id);

        window.store.set({
            notifications: statedNotifications,
        });
    }

    closeAll() {
        window.store.set({ notifications: [] });
    }
}

export const notificationService = new NotificationService();
