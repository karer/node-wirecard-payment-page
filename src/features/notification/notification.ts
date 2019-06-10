export interface Notification {
  payment: {
    transactionType: string
    transactionId: string
    completionTimeStamp: string
    cardToken: {
      tokenId: string
      maskedAccountNumber: string
    }
    merchantAccountId: string
    transactionState: string
    paymentMethods: {
      paymentMethod: string[]
    }
    cancelUrl: string
    successUrl: string
    errorUrl: string
    apiId: string
  }
  requestId: string
  requestedAmount: {
    currency: string
    value: number
  }
  status: {
    description: string
    severity: string
    code: string
  }
  authorizationCode: string
  accountHolder: {
    firstName: string
    lastName: string
  }
  descriptor: string
}
