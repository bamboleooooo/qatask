import { Locator, Page } from '@playwright/test'
import { CheckoutStepTwoPage } from './checkoutStepTwoPage'
import { BasePage } from './base/basePage'

export class CheckoutStepOnePage extends BasePage {
  protected continueButton = this.page.getByRole('button', { name: 'Continue' })
  protected firstNameField = this.page.getByPlaceholder('First Name')
  protected lastNameField = this.page.getByPlaceholder('Last Name')
  protected postalCodeField = this.page.getByPlaceholder('Zip/Postal Code')

  constructor(page: Page) {
    super(page, '/checkout-step-one.html')
  }
  async fillFirstName(firstName: string): Promise<void> {
    await this.firstNameField.pressSequentially(firstName)
  }
  async fillLastName(lastName: string): Promise<void> {
    await this.lastNameField.pressSequentially(lastName)
  }
  async fillPostalCode(postalCode: string): Promise<void> {
    await this.postalCodeField.pressSequentially(postalCode)
  }
  async clickContinue(): Promise<CheckoutStepTwoPage> {
    await this.continueButton.click()
    await this.page.waitForLoadState('networkidle')
    return new CheckoutStepTwoPage(this.page)
  }
}
