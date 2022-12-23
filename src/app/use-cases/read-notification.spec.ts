import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read notification', () => {
    it('should be able to read a notification', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository)

        const notication = makeNotification()

        await notificationsRepository.create(notication);

        await readNotification.execute({
            notificationId: notication.id,
        });

        expect(notificationsRepository.notifications[0].readAt).toEqual(
            expect.any(Date),
        );
    })

    it('should be able to read a notification when it does not exist', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const readNotification = new ReadNotification(notificationsRepository)

        expect(() => { 
            return readNotification.execute({
                notificationId: 'fake-notification-id',
        })
        }).rejects.toThrow(NotificationNotFound);
    })
})