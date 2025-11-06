const { test, expect, beforeEach, describe } = require('@playwright/test')

test.use({ browserName: 'chromium' })

describe('Blog application', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
  
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }

    await request.post('http://localhost:3003/api/users', { data: user })
    await page.goto('http://localhost:5173')
 })

  describe('User login', () => {
    test('is successful with valid credentials', async ({ page }) => {
      
      await page.getByRole('button', { name: 'login' }).click()

      await page.getByPlaceholder('Username').fill('mluukkai')
      await page.getByPlaceholder('Password').fill('salainen')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('Matti Luukkainen logged in')).toBeVisible()
    })

    test('shows an error with invalid credentials', async ({ page }) => {
      await page.getByRole('button', { name: 'login' }).click()

      
      await page.getByPlaceholder('Username').fill('mluukkai')
      await page.getByPlaceholder('Password').fill('incorrect')

      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()

      await expect(page.getByText('Matti Luukkainen logged in')).not.toBeVisible()
    })
  })

})

