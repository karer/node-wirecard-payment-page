import request from 'request-promise-native'

import { Config } from './config'
import { PaymentRequest } from './payment'

export class WirecardPaymentPage {
  private config: Config

  public constructor(config: Config) {
    this.config = config
  }

  protected getConfig(): Config {
    return this.config
  }

  public createPayment(payment: PaymentRequest): request.RequestPromise {
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
        'success-redirect-url': payment.successUrl,
        'fail-redirect-url': payment.errorUrl,
        'cancel-redirect-url': payment.errorUrl
      }
    }

    return this.sendRequest(config.baseUrl, fields)
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
