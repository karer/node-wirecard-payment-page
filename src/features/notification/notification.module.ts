import crypto from 'crypto'

import { LibModule } from '../../utils'
import { WirecardError } from '../../error'

import { EncryptedNotificationRequest, NotificationRequest, Notification } from '.'

export class NotificationModule extends LibModule {
  public consume(encryptedNotification: EncryptedNotificationRequest): Notification {
    const request: NotificationRequest = this.verify(encryptedNotification)

    return this.mapRequestToNotification(request)
  }

  protected verify(notification: EncryptedNotificationRequest): NotificationRequest {
    const config = this.getConfig()

    const signature = crypto
      .createHmac('sha256', config.secretKey)
      .update(notification['response-base64'])
      .digest('hex')

    const expectedSignature = new Buffer(notification['response-signature-base64'], 'base64').toString('hex')

    if (signature !== expectedSignature) {
      throw new WirecardError(`Notification signature verification failed. Expected ${expectedSignature} and got ${signature}`)
    }

    const json = new Buffer(notification['response-base64'], 'base64').toString('utf8')

    return JSON.parse(json) as NotificationRequest
  }

  protected mapRequestToNotification(request: NotificationRequest): Notification {
    return {} as Notification
  }
}
