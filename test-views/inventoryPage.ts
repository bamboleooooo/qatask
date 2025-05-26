import { Page } from '@playwright/test'
import { CollectionComponent } from './collectionComponent'
import { CartPage } from './cartPage'
import { BasePage } from './base/basePage'

export class InventoryPage extends BasePage {
  readonly products = new CollectionComponent(
    this.page.locator('.inventory_list'),
  )
  protected orderSelect = this.page.locator(
    "[data-test='product-sort-container']",
  )
  protected cartButton = this.page.locator('#shopping_cart_container')

  constructor(page: Page) {
    super(page, '/inventory.html')
  }
  async chooseOrderByValue(value: string) {
    await this.orderSelect.selectOption(value)
    await this.page.waitForLoadState('networkidle')
  }
  async clickCart(): Promise<CartPage> {
    await this.cartButton.click()
    await this.page.waitForLoadState('networkidle')
    return new CartPage(this.page)
  }
  get selectValue(): Promise<string> {
    return this.orderSelect.innerText()
  }
}
