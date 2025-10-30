const { expect } = require('@playwright/test');

class BaseActions {
  constructor(page) {
    this.page = page;
  }

  async fillAndVerify(locator, value) {
    await locator.click();
    await locator.fill(value);
    await expect(locator).toHaveValue(value);
  }

  async selectDropdownOption(filterText, optionText) {
    await this.page.getByRole('combobox').filter({ hasText: filterText }).click();
    
    await this.page.getByRole('option', { name: optionText }).click();
  }

  async clickButtonByText(buttonText) {
    await this.page.getByRole('button', { name: buttonText }).click();
  }

  async switchLanguage(language) {
    const currentLangButton = this.page.getByRole('button', { name: /Language/ });
    await currentLangButton.click();
    await this.page.waitForSelector('[role="menuitem"]');
    await this.page.getByRole('menuitem', { name: new RegExp(language) }).click();
  }

  async verifyRowVisible(text, timeout = 30000) {
    await expect(this.page.locator('tbody tr').filter({ hasText: text })).toBeVisible({ timeout });
  }

  async verifyRowNotExists(text) {
    await expect(this.page.locator('tbody tr').filter({ hasText: text })).toHaveCount(0);
  }

  async editRow(searchText) {
    const row = this.page.locator('tbody tr').filter({ hasText: searchText });
    await row.locator('button:has(svg.lucide-pencil)').click();
  }

  async deleteRow(searchText, timeout = 30000) {
    const row = this.page.locator('tbody tr').filter({ hasText: searchText });
    await row.locator('button:has(svg.lucide-ban)').click({ timeout });
    await this.clickButtonByText('Delete');
  }
}

module.exports = { BaseActions };
