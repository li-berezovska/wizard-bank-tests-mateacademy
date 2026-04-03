import { expect } from "@playwright/test";
export class AddCustomerPage {
  constructor(page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postCodeInput = page.getByPlaceholder('Post Code');
    this.addCustomerButton = 
    page.locator('form').getByRole('button', { name: 'Add Customer' });
    this.successMessage = 
    page.getByText('Customer added successfully');
  }

  async open() {
    await this.page.goto(
      '/angularJs-protractor/BankingProject/#/manager/addCust',
    );
  }

  async fillFirstName(firstName) {
     await this.firstNameInput.fill(firstName);
  }

  async fillLastName(lastName) {
    await this.lastNameInput.fill(lastName);
  }

  async fillPostCode(postCode) {
    await this.postCodeInput.fill(postCode);
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }

  async assertPageIsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postCodeInput).toBeVisible();
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertSuccessMessageIsVisible() {
    await expect(this.successMessage).toBeVisible();
  }

  async assertSuccessMessageContainsText(expectedText) {
    await expect(this.successMessage).toContainText(expectedText);
  }
  async assertSuccessMessageHasText(expectedText) {
    await expect(this.successMessage).toHaveText(expectedText);
  }

  async assertFirstNameInputHasValue(expectedValue) {
    await expect(this.firstNameInput).toHaveValue(expectedValue);
  }

  async assertLastNameInputHasValue(expectedValue) {
    await expect(this.lastNameInput).toHaveValue(expectedValue);
  }

  async assertPostCodeInputHasValue(expectedValue) {
    await expect(this.postCodeInput).toHaveValue(expectedValue);
  }
  async assertAddCustomerButtonIsEnabled() {
    await expect(this.addCustomerButton).toBeEnabled();
  }

  async assertAddCustomerButtonIsDisabled() {
    await expect(this.addCustomerButton).toBeDisabled();
  }
}
