import request from 'request-promise-native'

import { ConfigGetter } from '../config'

export class LibModule {
  protected getConfig: ConfigGetter

  public constructor(getConfig: ConfigGetter) {
    this.getConfig = getConfig
  }

  protected sendRequest = (url: string, fields: object): request.RequestPromise => {
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
