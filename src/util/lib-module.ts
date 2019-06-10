import { ConfigGetter } from '../config'

export class LibModule {
  protected getConfig: ConfigGetter

  public constructor(getConfig: ConfigGetter) {
    this.getConfig = getConfig
  }
}
