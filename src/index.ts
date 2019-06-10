import request from 'request-promise-native'

import { Config } from './config'
import { WirecardError } from './error'
import { PaymentRequest, PaymentResponse, PaymentResponsePromise } from './payment'
import { NotificationRequest, Notification } from './notification'

export class WirecardPaymentPage {
  private config: Config

  public constructor(config: Config) {
    this.config = config
  }

  public async createPayment(payment: PaymentRequest): PaymentResponsePromise {
    const config = this.getConfig()

    const fields = {
      payment: {
        'merchant-account-id': {
          value: config.merchantAccountId
        },
        'request-id': payment.id,
        'transaction-type': payment.type,
        'requested-amount': {
          value: payment.amount,
          currency: payment.currency
        },
        'payment-methods': {
          'payment-method': [
            {
              name: payment.method
            }
          ]
        },
        notifications: payment.notification
          ? {
              format: payment.notification.format,
              notification: [
                {
                  url: payment.notification.url
                }
              ]
            }
          : undefined,
        'success-redirect-url': payment.successUrl,
        'fail-redirect-url': payment.errorUrl,
        'cancel-redirect-url': payment.errorUrl
      }
    }

    let result

    try {
      result = await this.sendRequest(config.baseUrl, fields)
    } catch (err) {
      throw new WirecardError(`Cannot create a payment request. Reason: ${err.message}`)
    }

    const paymentResponse: PaymentResponse = {
      redirectUrl: result['payment-redirect-url']
    }

    return paymentResponse
  }

  public consumeNotification(notification: NotificationRequest): Notification {
    // TODO: decode and verify response
    // TODO: map NotificationRequest to Notification

    return {}
  }

  protected getConfig(): Config {
    return this.config
  }

  protected sendRequest(url: string, fields: object): request.RequestPromise {
    const { userName: user, password: pass } = this.getConfig()

    return request({
      uri: url,
      method: 'POST',
      json: fields,
      auth: {
        user,
        pass
      }
    })
  }
}
