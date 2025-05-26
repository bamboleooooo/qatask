import { test, expect, Page } from '@playwright/test'
import { LoginPage } from '../test-views/loginPage'
import { InventoryPage } from '../test-views/inventoryPage'
import { CartPage } from '../test-views/cartPage'
import { CheckoutStepTwoPage } from '../test-views/checkoutStepTwoPage'

let inventoryPage: InventoryPage
let cartPage: CartPage
let checkoutTwoStepPage: CheckoutStepTwoPage

test.describe.configure({ mode: 'serial' })

test.describe('Purchase flow', () => {
  test('Log in and complete the full purchase flow', async ({ page }) => {
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
      expect(await inventoryPage.getCartNumberIndicator()).toBe(0)
      expect(await inventoryPage.secondaryHeaderCopy).toContain('Products')
      await inventoryPage.assertPageLayout()
    })
    await test.step('Change the products order - low to highest - and add last to cart', async () => {
      await inventoryPage.chooseOrderByValue('lohi')
      const lastProduct = await inventoryPage.products.last()
      await lastProduct.clickAddToCart()
      expect(await inventoryPage.getCartNumberIndicator()).toBe(1)
    })
    await test.step('Change the products order - A to Z - and add second to cart', async () => {
      await inventoryPage.chooseOrderByValue('az')
      const secendProduct = await inventoryPage.products.nth(1)
      await secendProduct.clickAddToCart()
      expect(await inventoryPage.getCartNumberIndicator()).toBe(2)
    })
    await test.step('Go to cart and verify the products', async () => {
      cartPage = await inventoryPage.clickCart()
      expect(await cartPage.products.count()).toBe(2)
      expect(await cartPage.products.getNames()).toMatchObject([
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bike Light',
      ])
      expect(await cartPage.getCartNumberIndicator()).toBe(2)
      expect(await cartPage.secondaryHeaderCopy).toBe('Your Cart')
      await cartPage.assertPageLayout()
    })
    await test.step('Go to 1st stage of checkout and fill the data ', async () => {
      const checkoutOneStepPage = await cartPage.clickCheckout()
      expect(await checkoutOneStepPage.getCartNumberIndicator()).toBe(2)
      expect(await checkoutOneStepPage.secondaryHeaderCopy).toBe(
        'Checkout: Your Information',
      )
      await checkoutOneStepPage.assertPageLayout()
      await checkoutOneStepPage.fillFirstName('John')
      await checkoutOneStepPage.fillLastName('Doe')
      await checkoutOneStepPage.fillPostalCode('12345')

      checkoutTwoStepPage = await checkoutOneStepPage.clickContinue()
    })
    await test.step('Go to 2st stage of checkout and check the data', async () => {
      expect(await checkoutTwoStepPage.products.getNames()).toMatchObject([
        'Sauce Labs Fleece Jacket',
        'Sauce Labs Bike Light',
      ])
      const summaryInfo = await checkoutTwoStepPage.summaryInfoCopy
      expect(summaryInfo).toContain(
        'Payment Information:\nSauceCard #31337\nShipping Information:\nFree Pony Express Delivery!\nPrice Total\nItem total: $59.980000000000004\nTax: $4.80\nTotal: $64.78',
      )
      expect(await checkoutTwoStepPage.getCartNumberIndicator()).toBe(2)
      expect(await checkoutTwoStepPage.secondaryHeaderCopy).toBe(
        'Checkout: Overview',
      )
      await checkoutTwoStepPage.assertPageLayout()
    })
    await test.step('Go to final stage of checkout', async () => {
      const checkoutFinishStepPage = await checkoutTwoStepPage.clickFinish()
      expect(await checkoutFinishStepPage.isCompleteHeaderVisible).toBeTruthy()
      expect(await checkoutFinishStepPage.getCartNumberIndicator()).toBe(0)
      expect(await checkoutFinishStepPage.secondaryHeaderCopy).toBe(
        'Checkout: Complete!',
      )
      expect(await checkoutFinishStepPage.getCartNumberIndicator()).toBe(0)
      await checkoutFinishStepPage.assertPageLayout()
    })
  })
})
