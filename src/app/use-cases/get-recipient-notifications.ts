import { Injectable } from "@nestjs/common";
import { Notification } from "../entities/notification";
import { NotificationsRepository } from "../repositories/notifications-repository";

interface GetrecipientNotificationsRequest {
    recipientId: string;
}

interface GetrecipientNotificationsResponse {
    notifications: Notification[];
};

@Injectable()
export class GetrecipientNotifications {
    constructor(private notificationsRepository: NotificationsRepository) {}

    async execute(request: GetrecipientNotificationsRequest): Promise<GetrecipientNotificationsResponse> {
        const { recipientId } = request;

        const notifications = await this.notificationsRepository.findManyByRecipientId(
            recipientId,
        )

        return {
            notifications,
        }
    }
}