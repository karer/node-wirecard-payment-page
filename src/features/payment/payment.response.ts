export interface PaymentResponse {
  redirectUrl: string
}

export type PaymentResponsePromise = Promise<PaymentResponse>
