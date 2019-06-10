import { PaymentModule } from './features/payment'
import { NotificationModule } from './features/notification'

import { WirecardPaymentPage } from '.'

const MOCK_CONFIG = {
  baseUrl: 'http://test.com',
  userName: 'login',
  password: 'password',
  merchantAccountId: '0000-0000',
  secretKey: 'xxxx-xxxx'
}

describe('Entry point', (): void => {
  const wirecard = new WirecardPaymentPage(MOCK_CONFIG)

  it('should be instance of WirecardPaymentPage', (): void => {
    expect(wirecard).toBeInstanceOf(WirecardPaymentPage)
  })

  it('should run payment module', (): void => {
    const key = 'payments'
    expect(wirecard).toHaveProperty(key)
    expect(wirecard[key]).toBeInstanceOf(PaymentModule)
  })

  it('should run notification module', (): void => {
    const key = 'notifications'
    expect(wirecard).toHaveProperty(key)
    expect(wirecard[key]).toBeInstanceOf(NotificationModule)
  })
})
