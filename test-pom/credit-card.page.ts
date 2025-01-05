import { type Locator, type Page } from '@playwright/test';

export class CreditCardPage {
  readonly cardNumberPreview: Locator;
  readonly cardHolderPreview: Locator;
  readonly cardExpiryPreview: Locator;

  readonly cardNumberInput: Locator;
  readonly cardNameInput: Locator;
  readonly expiryInput: Locator;
  readonly cvcInput: Locator;

  readonly submitButton: Locator;
  readonly clearButton: Locator;

  constructor(private page: Page) {
    this.cardNumberPreview = page.locator('.card-number');
    this.cardHolderPreview = page.locator('.card-holder .value');
    this.cardExpiryPreview = page.locator('.card-expiry .value');

    this.cardNumberInput = page.locator('input#cardNumber');
    this.cardNameInput = page.locator('input#cardName');
    this.expiryInput = page.locator('input#expiry');
    this.cvcInput = page.locator('input#cvc');

    this.submitButton = page.locator('button[type="submit"]');
    this.clearButton = page.locator('button.clear-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async fillCardDetails(details: {
    cardNumber?: string;
    cardName?: string;
    expiry?: string;
    cvc?: string;
  }) {
    if (details.cardNumber) {
      await this.cardNumberInput.fill(details.cardNumber);
    }
    if (details.cardName) {
      await this.cardNameInput.fill(details.cardName);
    }
    if (details.expiry) {
      await this.expiryInput.fill(details.expiry);
    }
    if (details.cvc) {
      await this.cvcInput.fill(details.cvc);
    }
  }

  async getFormValues() {
    return {
      cardNumber: await this.cardNumberInput.inputValue(),
      cardName: await this.cardNameInput.inputValue(),
      expiry: await this.expiryInput.inputValue(),
      cvc: await this.cvcInput.inputValue(),
    };
  }

  async getPreviewValues() {
    return {
      cardNumber: await this.cardNumberPreview.textContent(),
      cardHolder: await this.cardHolderPreview.textContent(),
      expiry: await this.cardExpiryPreview.textContent(),
    };
  }

  async clearForm() {
    await this.clearButton.click();
  }

  async submitForm() {
    await this.submitButton.click();
  }
}