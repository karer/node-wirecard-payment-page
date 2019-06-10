export interface Config {
  baseUrl: string
  userName: string
  password: string
  merchantAccountId: string
}

export type ConfigGetter = () => Config
