import { test, expect } from '@playwright/test'
import { LoginPage } from '../test-views/loginPage'
import { InventoryPage } from '../test-views/inventoryPage'

let inventoryPage: InventoryPage

test.describe.configure({ mode: 'serial' })

test.describe('Smoke test', () => {
  test('Log in and ccheck basic elements', async ({ page }) => {
    const standardUser = {
      name: 'standard_user',
      password: 'secret_sauce',
    }
    const loginPage = new LoginPage(page)

    await test.step('Login page should be opened', async () => {
      await loginPage.open()
    })
    await test.step('Login form - fill user credentials', async () => {
      await loginPage.fillEmail(standardUser.name)
      await loginPage.fillPassword(standardUser.password)
    })
    await test.step('Login form - Submit form and check Inventory page', async () => {
      inventoryPage = await loginPage.clickLogin()
      expect(await inventoryPage.currentUrl()).toContain('/inventory.html')
      expect(await inventoryPage.secondaryHeaderCopy).toContain('Products')
      await inventoryPage.assertPageLayout()
    })
    await test.step('Compare product list - A to z and from Z to A ', async () => {
      await inventoryPage.chooseOrderByValue('az')
      const firstProduct = await inventoryPage.products.first()
      await inventoryPage.chooseOrderByValue('za')
      expect(await inventoryPage.products.first()).not.toEqual(firstProduct)
    })
    await test.step('Add and remove product from cart', async () => {
      await (await inventoryPage.products.first()).clickAddToCart()
      expect(await inventoryPage.getCartNumberIndicator()).toBe(1)
      await (await inventoryPage.products.first()).clickRemoveFromCart()
      expect(await inventoryPage.getCartNumberIndicator()).toBe(0)
    })
    await test.step('Open navigation menu and logout', async () => {
      await inventoryPage.openNavigationMenu()
      const loginPage = await inventoryPage.clickLogout()
      expect(await loginPage.currentUrl()).toBe('https://www.saucedemo.com/')
    })
  })
})
