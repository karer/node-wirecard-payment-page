export interface Config {
  baseUrl: string
  userName: string
  password: string
  merchantAccountId: string
  secretKey: string
}

export type ConfigGetter = () => Config
