import { test, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');


test('Authentication', async ({ page }) => {
    await page.goto('https://github.com/login');
    await page.getByLabel('Username or email address').fill('username');
    await page.getByLabel('Password').fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    await page.waitForURL('https://github.com/');
    await expect(page.getByText('Dashboard')).toBeVisible();

    await page.context().storageState({ path: authFile })
});