import { LibModule } from '../../utils'

import { EncryptedNotificationRequest, NotificationRequest, Notification } from '.'

export class NotificationModule extends LibModule {
  public consume(encryptedNotification: EncryptedNotificationRequest): Notification {
    const request: NotificationRequest = this.decrypt(encryptedNotification)

    return this.mapRequestToNotification(request)
  }

  protected decrypt(notification: EncryptedNotificationRequest): NotificationRequest {
    return {} as NotificationRequest
  }

  protected mapRequestToNotification(request: NotificationRequest): Notification {
    return {} as Notification
  }
}
