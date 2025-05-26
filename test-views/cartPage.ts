import { Locator, Page } from '@playwright/test'
import { CollectionComponent } from './collectionComponent'
import { CheckoutStepOnePage } from './checkoutStepOnePage'
import { BasePage } from './base/basePage'

export class CartPage extends BasePage {
  protected url: string = '/cart.html'
  readonly products = new CollectionComponent(this.page.locator('.cart_list'))
  protected checkoutButton = this.page.getByRole('button', { name: 'Checkout' })

  constructor(page: Page) {
    super(page, '/cart.html')
  }
  async clickCheckout(): Promise<CheckoutStepOnePage> {
    await this.checkoutButton.click()
    await this.page.waitForLoadState('networkidle')
    return new CheckoutStepOnePage(this.page)
  }
}
