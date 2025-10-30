const path = require('path');
const { BaseActions } = require('../utils/BaseActions');

class VarietyPage extends BaseActions {
  constructor(page) {
    super(page);
  }

  async navigateToVariety() {
    await this.page.getByRole('link', { name: 'Crops Crops' }).click();
    await this.page.getByRole('link', { name: 'Variety', exact: true }).click();
    await this.page.waitForLoadState('networkidle');
  }

  async createVariety(data) {
    await this.clickButtonByText(data.addButtonLabel);

    if (data.imagePath) {
      const fileInput = this.page.locator('input[type="file"]');
      const fullPath = path.resolve(data.imagePath);
      await fileInput.setInputFiles(fullPath);
      await this.page.waitForTimeout(1000);
    }

    await this.page.locator('#cropType').click();
    await this.page.getByText(data.cropType).click();
    await this.selectDropdownOption(data.companyNameLabel, data.companyName);

    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.cropNameLabel }), data.cropName);
    await this.page.getByRole('img', { name: 'toggle' }).click();
    await this.fillAndVerify(this.page.getByPlaceholder(data.numberOfDaysPlaceholder).first(), data.numberOfDays1);
    await this.fillAndVerify(this.page.getByPlaceholder(data.ratePercentagePlaceholder), data.ratePercentage);
    await this.fillAndVerify(this.page.getByPlaceholder(data.numberOfDaysPlaceholder).nth(1), data.numberOfDays2);
    await this.fillAndVerify(this.page.getByPlaceholder(data.yieldPlaceholder), data.yield);
    await this.selectDropdownOption(data.treatmentLabel, data.treatment);
    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.diseasesLabel }), data.diseases);
    await this.selectDropdownOption(data.numberOfDaysPlaceholder, data.weightUnit);
    await this.fillAndVerify(this.page.getByPlaceholder(data.packagingSizePlaceholder), data.packagingSize);
    await this.selectDropdownOption(data.packagingUnitLabel, data.packagingUnit);
    await this.fillAndVerify(this.page.getByPlaceholder(data.numberOfDaysPlaceholder).nth(2), data.numberOfDays3);
    await this.fillAndVerify(this.page.getByPlaceholder(data.spacingValuePlaceholder1, { exact: true }), data.spacingValue1);
    await this.page.getByRole('combobox').filter({ hasText: data.selectUnitLabel }).first().click();
    await this.page.getByRole('option', { name: data.spacingUnit1 }).click();
    await this.fillAndVerify(this.page.getByPlaceholder(data.selectUnitPlaceholder), data.spacingValue2);
    await this.page.getByRole('combobox').filter({ hasText: data.selectUnitLabel }).first().click();
    await this.page.getByText(data.spacingUnit2).click();
    await this.fillAndVerify(this.page.getByPlaceholder(data.spacingValuePlaceholder2, { exact: true }), data.spacingValue3);
    await this.selectDropdownOption(data.selectUnitLabel, data.spacingUnit3);
    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.informationLabel }).first(), data.information1);
    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.informationLabel }).nth(1), data.information2);
    await this.clickButtonByText(data.saveButtonLabel);
    await this.verifyRowVisible(data.cropName);
  }

  async updateVarietyInLanguage(currentName, data) {
    await this.editRow(currentName);
    if (data.language !== 'English') {
      await this.selectDropdownOption('English', data.language);
    }
    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.fieldLabel }), data.newName);
    await this.clickButtonByText(data.updateButtonLabel);
    if (data.language !== 'English') {
      await this.switchLanguage(data.language);
    }
    await this.verifyRowVisible(data.newName);
    if (data.language !== 'English') {
      await this.switchLanguage('English');
    }
  }
}

module.exports = { VarietyPage };
