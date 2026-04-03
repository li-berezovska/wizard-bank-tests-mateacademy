import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

let firstName;
let lastName;
let postCode;

test.beforeEach(async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);

  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postCode = faker.location.zipCode();

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await bankManagerPage.clickAddCustomer();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);
  await addCustomerPage.clickAddCustomer();

  page.on('dialog', async dialog => {
    await dialog.accept();
  });
});

test('Assert manager can add new customer', async ({ page }) => {
  const bankManagerPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await bankManagerPage.clickOpenAccount();
  await openAccountPage.assertPageIsVisible();

  await openAccountPage.selectCustomer(`${firstName} ${lastName}`);
  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.clickProcessButton();

  page.on('dialog', async dialog => {
    expect(dialog.message()).toContain('Account created successfully');
    await dialog.accept();
  });

  await bankManagerPage.clickCustomers();

  const lastRow = customersListPage.getLastRow();
  const customerData = await customersListPage.getCustomerDataFromRow(lastRow);

  expect(customerData.firstName).toBe(firstName);
  expect(customerData.lastName).toBe(lastName);
  expect(customerData.postCode).toBe(postCode);
  expect(customerData.accountNumber).not.toBe('');
});