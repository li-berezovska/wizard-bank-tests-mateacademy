import { expect } from '@playwright/test';

export class BankHomePage {
  constructor(page) {
    this.page = page;

    this.managerLoginButton = page.getByRole('button', {
      name: 'Bank Manager Login',
    });

    this.customerLoginButton = page.getByRole('button', {
      name: 'Customer Login',
    });
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/login');
  }

  async clickManagerLoginButton() {
    await this.managerLoginButton.click();
  }

  async clickCustomerLoginButton() {
    await this.customerLoginButton.click();
  }
}