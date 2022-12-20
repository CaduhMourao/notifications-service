import { Content } from './content';
import { Notification } from './notification';

describe('Nofitication', () => {
    it('should be able to create a notification', () => {
        const notification = new Notification({
            content: new Content('Nova socilitação'),
            category: 'social',
            recipientId: 'example-recipient-id',
        });

        expect(notification).toBeTruthy();
    })
})