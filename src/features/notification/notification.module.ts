import { LibModule } from '../../utils'

import { NotificationRequest, Notification } from '.'

export class NotificationModule extends LibModule {
  public consumeNotification(notification: NotificationRequest): Notification {
    // TODO: decode and verify response
    // TODO: map NotificationRequest to Notification

    return {}
  }
}
