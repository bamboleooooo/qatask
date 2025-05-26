import { Locator, Page } from '@playwright/test'
import { InventoryPage } from './inventoryPage'

export class LoginPage {
  protected page: Page
  protected url: string = '/'
  protected emailInput: Locator
  protected passwordInput: Locator
  protected loginButton: Locator
  protected errorBaner: Locator

  constructor(page: Page) {
    this.page = page
    this.emailInput = page.getByPlaceholder('Username')
    this.passwordInput = page.getByPlaceholder('Password')
    this.loginButton = page.getByRole('button', { name: 'Login' })
    this.errorBaner = page.locator('.error-message-container.error')
  }
  async open() {
    await this.page.goto(this.url)
  }
  async currentUrl(): Promise<string> {
    return this.page.url()
  }
  async fillEmail(email: string) {
    await this.emailInput.pressSequentially(email)
  }
  async fillPassword(password: string) {
    await this.passwordInput.pressSequentially(password)
  }
  get isErrorBannerVisible(): Promise<boolean> {
    return this.errorBaner.isVisible()
  }
  get errorBannerCopy(): Promise<string> {
    return this.errorBaner.innerText()
  }
  async clickLogin(): Promise<InventoryPage> {
    if (await this.isErrorBannerVisible) {
      throw new Error('Login is not possible, error banner is visible')
    } else {
      await this.loginButton.click()
      await this.page.waitForLoadState('networkidle')
      return new InventoryPage(this.page)
    }
  }
}
