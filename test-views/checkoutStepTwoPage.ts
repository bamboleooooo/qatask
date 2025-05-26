import { Locator, Page } from '@playwright/test'
import { CheckoutFinishStepPage } from './checkoutFinishStepPage'
import { CollectionComponent } from './collectionComponent'
import { BasePage } from './base/basePage'

export class CheckoutStepTwoPage extends BasePage {
  protected finishButton = this.page.getByRole('button', { name: 'Finish' })
  protected summaryInfo = this.page.locator('.summary_info')
  readonly products = new CollectionComponent(this.page.locator('.cart_list'))

  constructor(page: Page) {
    super(page, '/checkout-step-two.html')
  }
  async clickFinish(): Promise<CheckoutFinishStepPage> {
    await this.finishButton.click()
    await this.page.waitForLoadState('networkidle')
    return new CheckoutFinishStepPage(this.page)
  }
  get summaryInfoCopy(): Promise<string> {
    return this.summaryInfo.innerText()
  }
}
