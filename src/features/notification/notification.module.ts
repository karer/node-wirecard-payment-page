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
    const { payment } = request

    const status = request.statuses.status[0]

    return {
      payment: {
        transactionType: payment['transaction-type'],
        transactionId: payment['transaction-id'],
        completionTimeStamp: payment['completion-time-stamp'],
        cardToken: {
          tokenId: payment['card-token']['token-id'],
          maskedAccountNumber: payment['card-token']['masked-account-number']
        },
        merchantAccountId: payment['merchant-account-id'].value,
        transactionState: payment['transaction-state'],
        paymentMethods: {
          paymentMethod: payment['payment-methods']['payment-method'].map((e): string => e.name)
        },
        cancelUrl: payment['cancel-redirect-url'],
        successUrl: payment['success-redirect-url'],
        errorUrl: payment['fail-redirect-url'],
        apiId: payment['api-id']
      },
      requestId: request['request-id'],
      requestedAmount: {
        currency: request['requested-amount'].currency,
        value: request['requested-amount'].value
      },
      status: {
        description: status.description,
        severity: status.severity,
        code: status.code
      },
      authorizationCode: request['authorization-code'],
      accountHolder: {
        firstName: request['account-holder']['first-name'],
        lastName: request['account-holder']['last-name']
      },
      descriptor: request.descriptor
    }
  }
}
