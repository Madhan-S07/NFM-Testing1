const { BaseActions } = require('../utils/BaseActions');

class GrowthStagePage extends BaseActions {
  constructor(page) {
    super(page);
  }

  async navigateToGrowthStage() {
    await this.page.getByRole('link', { name: 'Crops Crops' }).click();
    await this.page.getByRole('link', { name: 'Growth Stage' }).click();
  }

  async createStage(data) {
    await this.clickButtonByText(data.addButtonLabel);
    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.stageNameLabel }), data.stageName);
    await this.fillAndVerify(this.page.getByRole('textbox', { name: data.descriptionLabel }), data.description);
    await this.clickButtonByText(data.saveButtonLabel);
    await this.verifyRowVisible(data.stageName);
  }

  async updateStageInLanguage(currentName, data) {
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

module.exports = { GrowthStagePage };
