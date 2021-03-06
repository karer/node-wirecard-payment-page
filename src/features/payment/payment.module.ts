import { LibModule } from '../../utils'
import { WirecardError } from '../../error'

import { PaymentRequest, PaymentResponse, PaymentResponsePromise } from '.'

export class PaymentModule extends LibModule {
  public async create(payment: PaymentRequest): PaymentResponsePromise {
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
}
