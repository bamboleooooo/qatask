import { Locator } from '@playwright/test'

export class ListItemComponent {
  readonly root: Locator
  protected productName: Locator
  protected productPrice: Locator
  protected addToCartButton: Locator
  protected removeFromCartButton: Locator

  constructor(root: Locator) {
    this.root = root
    this.productName = root.locator('[data-test="inventory-item-name"]')
    this.productPrice= root.locator('[data-test="inventory-item-price"]')
    this.addToCartButton = root.getByRole('button', { name: 'Add to cart' })
    this.removeFromCartButton = root.getByRole('button', { name: 'Remove' })
  }

  async getName(): Promise<string | null> {
    return this.productName.innerText()
  }
  async getPrice(): Promise<string | null> {
    return (await this.productPrice.innerText()).replace('$', '').trim()
  }
  async clickAddToCart(): Promise<void> {
    await this.addToCartButton.click()
  }
  async clickRemoveFromCart(): Promise<void> {
    await this.removeFromCartButton.click()
  }
}
