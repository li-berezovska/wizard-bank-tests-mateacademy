import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await bankManagerPage.clickAddCustomer();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);
  await addCustomerPage.clickAddCustomer();

  page.on('dialog', async dialog => {
    await dialog.accept();
  });
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const bankManagerPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankManagerPage.clickCustomers();
  await customersListPage.assertPageIsVisible();

  await customersListPage.searchCustomer(postalCode);
  await customersListPage.assertCustomerExistsInTable(firstName, lastName);

  const rows = customersListPage.getRows();
  await expect(rows).toHaveCount(1);
});