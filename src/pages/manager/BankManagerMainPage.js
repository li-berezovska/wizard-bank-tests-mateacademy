import { expect } from "@playwright/test";

export class BankManagerMainPage {
  constructor(page) {
    this.page = page;

    this.addCustomerButton = page.getByRole('button', { 
      name: 'Add Customer' 
    });
  

  this.openAccountButton = page.getByRole('button', { 
      name: 'Open Account' 
   });

   this.customersButton = page.getByRole('button', { 
      name: 'Customers' 
    });
  }

  async clickAddCustomer() {
    await this.addCustomerButton.click();
  }

  async clickOpenAccount() {
    await this.openAccountButton.click();
  }

  async clickCustomers() {
    await this.customersButton.click();
  }

  async assertAddCustomerButtonIsVisible() {
    await expect(this.addCustomerButton).toBeVisible();
  }

  async assertOpenAccountButtonIsVisible() {
    await expect(this.openAccountButton).toBeVisible();
  }
  
  async assertCustumersButtonIsVisible() {
    await expect(this.customersButton).toBeVisible();
  }

   async assertPageIsVisible() {
      await expect(this.addCustomerButton).toBeVisible();
      await expect(this.openAccountButton).toBeVisible();
      await expect(this.customersButton).toBeVisible();
    }
    
    async assertAddCustomerButtonIsHidden() {
      await expect(this.addCustomerButton).toBeHidden();
    }

    async assertButtonHasText(buttonName, expectedText) {
      let button;

      if (buttonName === 'addCustomer') {
        button = this.addCustomerButton;
      } else if (buttonName === 'openAccount') {
        button = this.openAccountButton;
      } else if (buttonName === 'customers') {
        button = this.customersButton;
      } else {
        throw new Error(`Unknown button: $ {buttonName}`);
      }

      await expect(button).toHaveText(expectedText); 
    }
  }

