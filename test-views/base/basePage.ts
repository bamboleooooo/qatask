import { expect, Locator, Page } from '@playwright/test'
import { LoginPage } from '../loginPage'

export abstract class BasePage {
  protected page: Page
  protected url: string
  protected primaryHeader: Locator
  protected secondaryHeader: Locator
  protected footer: Locator
  protected cartIndicator: Locator
  protected navigationMenu: Locator
  protected logoutButton: Locator

  constructor(page: Page, url: string) {
    this.page = page
    this.url = url
    this.primaryHeader = page.locator("[data-test='primary-header']")
    this.secondaryHeader = page.locator("[data-test='secondary-header']")
    this.footer = page.locator("[data-test='footer']")
    this.cartIndicator = page.locator("[data-test='shopping-cart-badge']")
    this.navigationMenu = page.locator('#react-burger-menu-btn')
    this.logoutButton = page.getByText('Logout', { exact: true })
  }

  async open(): Promise<void> {
    await this.page.goto(this.url)
  }
  async reload(): Promise<void> {
    await this.page.reload()
  }
  async close(): Promise<void> {
    await this.page.close()
  }
  async currentUrl(): Promise<string> {
    return this.page.url()
  }
  async waitForLoadState(
    state: 'load' | 'domcontentloaded' | 'networkidle',
  ): Promise<void> {
    await this.page.waitForLoadState(state)
  }
  get isPrimaryHeaderVisible(): Promise<boolean> {
    return this.primaryHeader.isVisible()
  }
  get primaryHeaderCopy(): Promise<string> {
    return this.primaryHeader.innerText()
  }
  get isSecondaryHeaderVisible(): Promise<boolean> {
    return this.secondaryHeader.isVisible()
  }
  get secondaryHeaderCopy(): Promise<string> {
    return this.secondaryHeader.innerText()
  }
  get isFooterVisible(): Promise<boolean> {
    return this.footer.isVisible()
  }
  get footerCopy(): Promise<string> {
    return this.footer.innerText()
  }
  async getCartNumberIndicator(): Promise<number> {
    if (await this.cartIndicator.isVisible()) {
      return Number(await this.cartIndicator.innerText())
    }
    return 0
  }
  async openNavigationMenu(): Promise<void> {
    await this.navigationMenu.click()
  }
  async clickLogout(): Promise<LoginPage> {
    await this.logoutButton.click()
    return new LoginPage(this.page)
  }

  async assertPageLayout(): Promise<void> {
    expect(await this.isPrimaryHeaderVisible).toBeTruthy()
    expect(await this.primaryHeaderCopy).toContain('Open Menu\nSwag Labs')
    expect(await this.isSecondaryHeaderVisible).toBeTruthy()
    expect(await this.isFooterVisible).toBeTruthy()
    const footerText = await this.footerCopy
    expect(footerText).toContain(
      '2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy',
    )
  }
}
