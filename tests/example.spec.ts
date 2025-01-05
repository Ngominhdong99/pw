import { test, expect } from '@playwright/test';

test.describe('Credit Card Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should render credit card form with initial empty state', async ({ page }) => {
    await expect(page.locator('.card-number')).toContainText('•••• •••• •••• ••••');
    await expect(page.locator('.card-holder .value')).toContainText('YOUR NAME');
    await expect(page.locator('.card-expiry .value')).toContainText('MM/YY');
  });

  test('should format card number with spaces', async ({ page }) => {
    const cardNumberInput = page.locator('input#cardNumber');
    await cardNumberInput.fill('4111111111111111');
    await expect(cardNumberInput).toHaveValue('4111 1111 1111 1111');
    await expect(page.locator('.card-number')).toContainText('4111 1111 1111 1111');
  });

  test('should convert cardholder name to uppercase', async ({ page }) => {
    const cardNameInput = page.locator('input#cardName');
    await cardNameInput.fill('John Doe');
    await expect(cardNameInput).toHaveValue('JOHN DOE');
    await expect(page.locator('.card-holder .value')).toContainText('JOHN DOE');
  });

  test('should format expiry date with slash', async ({ page }) => {
    const expiryInput = page.locator('input#expiry');
    await expiryInput.fill('1224');
    await expect(expiryInput).toHaveValue('12/24');
    await expect(page.locator('.card-expiry .value')).toContainText('12/24');
  });

  test('should only allow numbers in CVC field', async ({ page }) => {
    const cvcInput = page.locator('input#cvc');
    await cvcInput.fill('123a');
    await expect(cvcInput).toHaveValue('123');
  });

  test('should clear form when clear button is clicked', async ({ page }) => {
    await page.locator('input#cardNumber').fill('4111111111111111');
    await page.locator('input#cardName').fill('John Doe');
    await page.locator('input#expiry').fill('1224');
    await page.locator('input#cvc').fill('123');

    await page.locator('button.clear-button').click();

    await expect(page.locator('input#cardNumber')).toHaveValue('');
    await expect(page.locator('input#cardName')).toHaveValue('');
    await expect(page.locator('input#expiry')).toHaveValue('');
    await expect(page.locator('input#cvc')).toHaveValue('');

    await expect(page.locator('.card-number')).toContainText('•••• •••• •••• ••••');
    await expect(page.locator('.card-holder .value')).toContainText('YOUR NAME');
    await expect(page.locator('.card-expiry .value')).toContainText('MM/YY');
  });

  test('should submit form with correct values', async ({ page }) => {
    let dialogMessage = '';

    page.on('dialog', async (dialog) => {
      dialogMessage = dialog.message();
      await dialog.accept();
    });

    await page.locator('input#cardNumber').fill('4111111111111111');
    await page.locator('input#cardName').fill('John Doe');
    await page.locator('input#expiry').fill('1224');
    await page.locator('input#cvc').fill('123');

    await page.locator('button[type="submit"]').click();

    expect(dialogMessage).toBeTruthy();
    expect(dialogMessage).toContain('Card info submitted!');
  });

  test('should handle max length restrictions', async ({ page }) => {
    await page.locator('input#cardNumber').fill('41111111111111112222');
    await expect(page.locator('input#cardNumber')).toHaveValue('4111 1111 1111 1111');

    await page.locator('input#cvc').fill('1234');
    await expect(page.locator('input#cvc')).toHaveValue('123');

    await page.locator('input#expiry').fill('122424');
    await expect(page.locator('input#expiry')).toHaveValue('12/24');
  });
});