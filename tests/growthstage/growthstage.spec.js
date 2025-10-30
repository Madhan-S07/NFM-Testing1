const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../Pageobjects/LoginPage');
const { GrowthStagePage } = require('../../Pageobjects/GrowthStagePage');
const userdata = require('../../utils/userdata.json');
const cropgrowthstage = require('../../utils/cropgrowthstage.json');

test.describe('Growth Stage Tests', () => {
  let growthStagePage;

  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(userdata.username, userdata.password);
    await expect(page).toHaveURL('https://nfm-fe.i4ulabs.com/app/dashboard');
    growthStagePage = new GrowthStagePage(page);
    await growthStagePage.navigateToGrowthStage();
  });

  test('Create, Update, and Delete Growth Stage', async () => {
    await growthStagePage.createStage(cropgrowthstage.create);
    
    await growthStagePage.updateStageInLanguage(cropgrowthstage.create.stageName, cropgrowthstage.updateEnglish);
    await growthStagePage.updateStageInLanguage(cropgrowthstage.updateEnglish.newName, cropgrowthstage.updateHindi);
    await growthStagePage.updateStageInLanguage(cropgrowthstage.updateEnglish.newName, cropgrowthstage.updateTamil);
    await growthStagePage.deleteRow(cropgrowthstage.updateTamil.newName);
    await growthStagePage.verifyRowNotExists(cropgrowthstage.updateTamil.newName);
  });
});
