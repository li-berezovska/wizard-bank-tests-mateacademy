import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.rows = page.locator('table.table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  getRows() {
    return this.rows;
  }

  getLastRow() {
    return this.rows.last();
  }

  getFirstRow() {
    return this.rows.first();
  }

  getRowById(index) {
    return this.rows.nth(index);
  }

  async getCustomerDataFromRow(row) {
    return {
      firstName: await row.locator('td:nth-child(1)').textContent(),
      lastName: await row.locator('td:nth-child(2)').textContent(),
      postCode: await row.locator('td:nth-child(3)').textContent(),
      accountNumber: await row.locator('td:nth-child(4)').textContent(),
    };
  }
  
  async deleteCustomer(row) {
    await row.locator('button', { name: 'Delete' }).click();
  }

  async searchCustomer(searchText) {
    await this.searchInput.fill(searchText);
  }

  async clearSearch() {
    await this.searchInput.clear();
  }

  async assertPageIsVisible() {
    await expect(this.searchInput).toBeVisible();
    await expect(this.rows.first()).toBeVisible();
  }

  async assertSearchInputIsVisible() {
    await expect(this.searchInput).toBeVisible();
  }

  async assertTableHasRows(expectedCount) {
    await expect(this.rows).toHaveCount(expectedCount);
  }

  async assertCustomerExistsInTable(firstName, lastName) {
    const row = await this.findCustomerRow(firstName, lastName);
    await expect(row).toBeVisible();
  }

  async assertCustomerDoesNotExistInTable(firstName, lastName) {
    const row = this.page.locator('table.table tbody tr').filter({
      has: this.page.locator(`td:has-text("${firstName}")`),
    }).filter({
      has: this.page.locator(`td:has-text("${lastName}")`),
    });
    await expect(row).toHaveCount(0);
  }

  async assertCustomerDataMatches(row, expectedData) {
    const actualData = await this.getCustomerDataFromRow(row);
    
    if (expectedData.firstName !== undefined) {
      expect(actualData.firstName).toBe(expectedData.firstName);
    }
    if (expectedData.lastName !== undefined) {
      expect(actualData.lastName).toBe(expectedData.lastName);
    }
    if (expectedData.postCode !== undefined) {
      expect(actualData.postCode).toBe(expectedData.postCode);
    }
  }

  async findCustomerRow(firstName, lastName) {
    return this.page.locator('table.table tbody tr').filter({
      has: this.page.locator(`td:has-text("${firstName}")`),
    }).filter({
      has: this.page.locator(`td:has-text("${lastName}")`),
    }).first();
  }
}