export type PaymentRequest = {
  id: string
  type: string
  amount: number
  currency: string
  method: string
  successUrl: string
  errorUrl: string
}
