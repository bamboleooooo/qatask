import { test, expect } from '@playwright/test'
import { LoginPage } from '../test-views/loginPage'
import { InventoryPage } from '../test-views/inventoryPage'

let inventoryPage: InventoryPage

test.describe.configure({ mode: 'serial' })

test.describe('Login flow', () => {
  test('Check login for existing user', async ({ page }) => {
    const standardUser = {
      name: 'standard_user',
      password: 'secret_sauce',
    }
    const loginPage = new LoginPage(page)

    await test.step('Login page should be opened', async () => {
      await loginPage.open()
      expect(await loginPage.currentUrl()).toBe('https://www.saucedemo.com/')
    })
    await test.step('Login form - fill user credentials', async () => {
      await loginPage.fillEmail(standardUser.name)
      await loginPage.fillPassword(standardUser.password)
    })
    await test.step('Login form - Submit form and check Inventory page', async () => {
      inventoryPage = await loginPage.clickLogin()
      expect(await inventoryPage.currentUrl()).toContain('/inventory.html')
      await inventoryPage.assertPageLayout()
    })
  })
  test('Check login for locked out user', async ({ page }) => {
    const locked_out_user = {
      name: 'locked_out_user',
      password: 'secret_sauce',
    }
    const loginPage = new LoginPage(page)

    await test.step('Login page should be opened', async () => {
      await loginPage.open()
      expect(await loginPage.currentUrl()).toBe('https://www.saucedemo.com/')
    })
    await test.step('Login form - fill user credentials', async () => {
      await loginPage.fillEmail(locked_out_user.name)
      await loginPage.fillPassword(locked_out_user.password)
    })
    await test.step('Login form - Submit form and check Inventory page', async () => {
      await loginPage.clickLogin()
      expect(await loginPage.currentUrl()).toBe('https://www.saucedemo.com/')
      expect(await loginPage.isErrorBannerVisible).toBeTruthy()
      expect(await loginPage.errorBannerCopy).toContain(
        'Epic sadface: Sorry, this user has been locked out.',
      )
    })
  })
})
