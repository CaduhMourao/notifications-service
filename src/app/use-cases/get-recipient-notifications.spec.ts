import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeNotification } from '../../../test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';

describe('Get recipient notifications', () => {
    it('should be able to get recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const getrecipientNotifications = new GetRecipientNotifications(notificationsRepository)

        await notificationsRepository.create(
           makeNotification({ recipientId: 'recipient-1' }),
        );

        await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-1' }),
         );

         await notificationsRepository.create(
            makeNotification({ recipientId: 'recipient-2' }),
         );

        const { notifications } = await getrecipientNotifications.execute({
            recipientId:'recipient-1',
        });

        expect(notifications).toHaveLength(2);
        expect(notifications).toEqual(expect.arrayContaining([
            expect.objectContaining({ recipientId: 'recipient-1' }),
            expect.objectContaining({ recipientId: 'recipient-1'}),
        ]))
    })
})