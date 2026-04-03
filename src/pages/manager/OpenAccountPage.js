import { expect } from '@playwright/test';

export class OpenAccountPage {
  constructor(page) {
    this.page = page;
    this.customerSelect = page.locator('#userSelect');
    this.currencySelect = page.locator('#currency');
    this.processButton = page.getByRole('button', { name: 'Process' });
  }

  //ACTIONS
  
  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/openAccount',
    );
  }

  async selectCustomer(customerName) {
    await this.customerSelect.selectOption({ label: customerName });
  }

  async selectCurrency(currency) {
    await this.currencySelect.selectOption({ label: currency });
  }

  async clickProcessButton() {
    await this.processButton.click();
  }

  //ASSERTIONS

  async assertPageIsVisible() {
    await expect(this.customerSelect).toBeVisible();
    await expect(this.currencySelect).toBeVisible();
    await expect(this.processButton).toBeVisible();
  }

  async assertCustomerSelectHasValue(expectedValue) {
    await expect(this.customerSelect).toHaveValue(expectedValue);
  }

  async assertCurrencySelectHasValue(expectedValue) {
    await expect(this.currencySelect).toHaveValue(expectedValue);
  }

  async assertProcessButtonIsEnabled() {
    await expect(this.processButton).toBeEnabled();
  }

  async assertProcessButtonIsDisabled() {
    await expect(this.processButton).toBeDisabled();
  }
}