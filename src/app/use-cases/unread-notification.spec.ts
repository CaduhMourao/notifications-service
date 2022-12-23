import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Unread notification', () => {
    it('should be able to unread a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository)

        const notication = makeNotification({
            readAt: new Date(),
        })

        await notificationsRepository.create(notication);

        await unreadNotification.execute({
            notificationId: notication.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toBeNull();
    })

    it('should be able to unread a notification when it does not exist', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const unreadNotification = new UnreadNotification(notificationsRepository)

        expect(() => { 
            return unreadNotification.execute({
                notificationId: 'fake-notification-id',
        })
        }).rejects.toThrow(NotificationNotFound);
    })
})