import { test, expect } from '@playwright/test'

test.describe('SignFlow E2E', () => {

  test('homepage loads and shows title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('Professional contracts')
  })

  test('homepage has Get Started link', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByText('Start for Free')).toBeVisible()
  })

  test('login page loads', async ({ page }) => {
    await page.goto('/login')
    await expect(page.locator('h1')).toContainText('Welcome back')
    await expect(page.locator('input[name="email"]')).toBeVisible()
    await expect(page.locator('input[name="password"]')).toBeVisible()
  })

  test('signup page loads', async ({ page }) => {
    await page.goto('/signup')
    await expect(page.locator('h1')).toContainText('Create your account')
    await expect(page.getByText('or continue with email')).toBeVisible()
  })

  test('pricing page loads', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.locator('h1')).toContainText('Simple, transparent pricing')
    await expect(page.getByRole('heading', { name: 'Free' })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Pro' })).toBeVisible()
  })

  test('404 page shows for unknown routes', async ({ page }) => {
    const response = await page.goto('/nonexistent-route')
    expect(response?.status()).toBe(404)
    await expect(page.getByText('404')).toBeVisible()
  })

  test('checkout API redirects to Creem', async ({ page }) => {
    const response = await page.goto('/api/checkout')
    expect(response?.url()).toContain('creem.io')
  })

  test('dashboard redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page).toHaveURL(/\/login/)
  })

  test('templates redirects to login when unauthenticated', async ({ page }) => {
    await page.goto('/templates')
    await expect(page).toHaveURL(/\/login/)
  })

  test('sign page shows contract not found for invalid ID', async ({ page }) => {
    await page.goto('/sign/invalid-id-12345')
    await expect(page.getByText('Contract not found')).toBeVisible()
  })

})
