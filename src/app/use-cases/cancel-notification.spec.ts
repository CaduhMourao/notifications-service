import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Cancel notification', () => {
    it('should be able to cancel a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository)

        const notication = makeNotification()

        await notificationsRepository.create(notication);

        await cancelNotification.execute({
            notificationId: notication.id,
        });

        expect(notificationsRepository.notifications[0].canceledAt).toEqual(
            expect.any(Date),
        );
    })

    it('should be able to cancel a notification when it does not exist', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const cancelNotification = new CancelNotification(notificationsRepository)

        expect(() => { 
            return cancelNotification.execute({
                notificationId: 'fake-notification-id',
        })
        }).rejects.toThrow(NotificationNotFound);
    })
})