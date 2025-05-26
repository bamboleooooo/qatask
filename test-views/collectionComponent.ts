import { Locator, Page } from '@playwright/test'
import { ListItemComponent } from './listItemComponent'

export class CollectionComponent {
  readonly items: Locator

  constructor(containerLocator: Locator) {
    this.items = containerLocator.locator('[data-test="inventory-item"]')
  }

  async count(): Promise<number> {
    return await this.items.count()
  }

  async getNames(): Promise<string[]> {
    return await this.items.locator('.inventory_item_name ').allTextContents()
  }

  async findByName(name: string): Promise<ListItemComponent | null> {
    const count = await this.items.count()
    for (let i = 0; i < count; i++) {
      const item = this.items.nth(i)
      const itemName = await item.locator('.inventory_item_name ').textContent()
      if (itemName?.trim() === name) {
        return new ListItemComponent(item)
      }
    }
    return null
  }

  nth(index: number): ListItemComponent {
    return new ListItemComponent(this.items.nth(index))
  }

  first(): ListItemComponent {
    return this.nth(0)
  }

  async last(): Promise<ListItemComponent> {
    const count = await this.count()
    return this.nth(count - 1)
  }
}
