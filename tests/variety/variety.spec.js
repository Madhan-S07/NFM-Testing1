const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pageobjects/LoginPage');
const { VarietyPage } = require('../../Pageobjects/VarietyPage');
const userdata = require('../../utils/userdata.json');
const varietydata = require('../../utils/varietydata.json');

test.describe('Variety Tests', () => {
  let varietyPage;

  test.beforeEach(async ({ page }) => {
    test.setTimeout(120000);
    const login = new LoginPage(page);
    await login.goto();
    await login.login(userdata.username, userdata.password);
    await expect(page).toHaveURL('https://nfm-fe.i4ulabs.com/app/dashboard');
    varietyPage = new VarietyPage(page);
    await varietyPage.navigateToVariety();
  });

  test('Create, Update, and Delete Variety', async () => {
    await varietyPage.createVariety(varietydata.create);
    await varietyPage.updateVarietyInLanguage(varietydata.create.cropName, varietydata.updateEnglish);
    await varietyPage.updateVarietyInLanguage(varietydata.updateEnglish.newName, varietydata.updateHindi);
    await varietyPage.updateVarietyInLanguage(varietydata.updateEnglish.newName, varietydata.updateTamil);
    await varietyPage.deleteRow(varietydata.updateEnglish.newName);
    await varietyPage.verifyRowNotExists(varietydata.updateEnglish.newName);
  });
});
