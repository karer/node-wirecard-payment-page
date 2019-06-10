import { Config, ConfigGetter } from './config'

export class WirecardPaymentPage {
  private config: Config

  public constructor(config: Config) {
    this.config = config
  }

  protected getConfig: ConfigGetter = (): Config => {
    return this.config
  }
}
