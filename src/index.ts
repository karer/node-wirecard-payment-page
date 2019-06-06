import request from 'request-promise-native'

import { Config } from './config'
import { PaymentRequest } from './payment'

export class WirecardPaymentPage {
  config: Config

  constructor(config: Config) {
    this.config = config
  }

  createPayment(payment: PaymentRequest) {
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

  getConfig() {
    return this.config
  }

  sendRequest(url: string, fields: object) {
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
