export interface PaymentRequest {
  id: string
  type: string
  amount: number
  currency: string
  method: string
  notification?: {
    format: string
    url: string
  }
  successUrl: string
  errorUrl: string
}
