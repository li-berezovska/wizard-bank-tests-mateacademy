import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage';

test('Assert manager can delete customer', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerPage = new BankManagerMainPage(page);
  const addCustomerPage = new AddCustomerPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = 'John';
  const lastName = 'DeleteMe';
  const postCode = '98765';

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

  await bankManagerPage.clickCustomers();

  await customersListPage.searchCustomer(firstName);
  await customersListPage.assertCustomerExistsInTable(firstName, lastName);

  const customerRow = await customersListPage.findCustomerRow(firstName, lastName);
  await customersListPage.deleteCustomer(customerRow);

  page.on('dialog', async dialog => {
    await dialog.accept();
  });

  await customersListPage.assertCustomerDoesNotExistInTable(firstName, lastName);
});