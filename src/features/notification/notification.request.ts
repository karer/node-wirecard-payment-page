export interface NotificationRequest {
  payment: {
    'transaction-type': string //'authorization'
    'transaction-id': string //'08649015-eb17-4c67-ab5f-d132af616e02'
    'completion-time-stamp': string //'2018-12-19T12:02:26'
    'card-token': {
      'token-id': string //'4242796444090018'
      'masked-account-number': string //'420000******0018'
    }
    'merchant-account-id': {
      value: string //'7a6dd74f-06ab-4f3f-a864-adc52687270a'
    }
    'transaction-state': string //'success'
    'payment-methods': {
      'payment-method': {
        name: string //'creditcard'
      }[]
    }
    'cancel-redirect-url': string //'https://demoshop-test.wirecard.com/demoshop/#/cancel'
    'success-redirect-url': string //'https://demoshop-test.wirecard.com/demoshop/#/success'
    'fail-redirect-url': string //'https://demoshop-test.wirecard.com/demoshop/#/error'
    'api-id': string //'wpp'
  }
  'request-id': string //'28285dbd-ecd3-49bd-a7e5-0239affa2448'
  'requested-amount': {
    currency: string //'EUR'
    value: number //10
  }
  statuses: {
    status: {
      description: string //'3d-acquirer:The resource was successfully created.'
      severity: string //'information'
      code: string //'201.0000'
    }[]
  }
  'authorization-code': string //'801433'
  'account-holder': {
    'first-name': string //'John'
    'last-name': string //'Doe'
  }
  descriptor: string //'demo descriptor'
}
