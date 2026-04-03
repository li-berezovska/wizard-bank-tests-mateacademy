import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const bankManagerPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();
  await bankManagerPage.clickOpenAccount();
  await openAccountPage.assertPageIsVisible();

  await openAccountPage.selectCurrency('Dollar');
  await openAccountPage.assertCurrencySelectHasValue('Dollar');

  await openAccountPage.selectCurrency('Pound');
  await openAccountPage.assertCurrencySelectHasValue('Pound');

  await openAccountPage.selectCurrency('Rupee');
  await openAccountPage.assertCurrencySelectHasValue('Rupee');
});