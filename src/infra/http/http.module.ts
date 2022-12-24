import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';

import { UnreadNotification } from './../../app/use-cases/unread-notification';
import { ReadNotification } from './../../app/use-cases/read-notification';
import { CountRecipientNotifications } from './../../app/use-cases/count-recipient-notifications';
import { CancelNotification } from './../../app/use-cases/cancel-notification';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { NotificationsController } from './controllers/notifications.controller';
import { GetRecipientNotifications } from 'src/app/use-cases/get-recipient-notifications';

@Module({
  imports: [DatabaseModule],
  controllers: [
    NotificationsController
  ],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
