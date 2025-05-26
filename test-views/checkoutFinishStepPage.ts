import { Page } from '@playwright/test'
import { BasePage } from './base/basePage'

export class CheckoutFinishStepPage extends BasePage {
  protected completeHeader = this.page.locator('.complete-header')

  constructor(page: Page) {
    super(page, '/checkout-complete.html')
  }
  get isCompleteHeaderVisible(): Promise<boolean> {
    return this.completeHeader.isVisible()
  }
}
