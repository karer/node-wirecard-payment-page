import { Config, ConfigGetter } from './config'

import { PaymentModule } from './features/payment'
import { NotificationModule } from './features/notification'

export class WirecardPaymentPage {
  private config: Config

  public payments: PaymentModule
  public notifications: NotificationModule

  public constructor(config: Config) {
    this.config = config

    this.payments = new PaymentModule(this.getConfig)
    this.notifications = new NotificationModule(this.getConfig)
  }

  protected getConfig: ConfigGetter = (): Config => {
    return this.config
  }
}
