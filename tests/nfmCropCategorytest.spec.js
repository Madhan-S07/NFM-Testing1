import { test, expect } from '@playwright/test';

test('Login and add a new category via Crops dropdown', async ({ page }) => {
  
  test.setTimeout(60000);

  await page.goto('https://nfm-fe.i4ulabs.com/login', { waitUntil: 'networkidle' });
  await expect(page).toHaveTitle('CB Nursery');

  await page.locator('#email').fill('user@gmail.com');
  await page.locator('#password').fill('admin123');
  await page.locator('xpath=//*[@id="root"]/div/div/div[2]/form/div[4]/button').click();

  await expect(page).toHaveURL('https://nfm-fe.i4ulabs.com/app/dashboard', { timeout: 15000 });

  await page.waitForSelector('text=Crops', { timeout: 10000 });
  await page.click('text=Crops');

  await page.waitForSelector('text=Category', { timeout: 10000 });
  await page.click('text=Category');

  await expect(page).toHaveURL('https://nfm-fe.i4ulabs.com/app/crops/category');

  await page.waitForSelector('button:has-text("+ Add Category")', { timeout: 10000 });
  await page.click('button:has-text("+ Add Category")');

  const categoryName = "jack";
  console.log(`Creating category: ${categoryName}`);

  await page.waitForSelector('#categoryName', { timeout: 10000 });
  await page.fill('#categoryName', categoryName);

  await page.waitForSelector('button:has-text("Save Category")', { timeout: 10000 });
  await page.click('button:has-text("Save Category")');

  
  await expect(page.getByRole('cell', { name: categoryName, exact: true })).toBeVisible({ timeout: 30000 });

  
  const editRow = page.getByRole('row').filter({ has: page.getByRole('cell', { name: categoryName, exact: true }) });
  await editRow.getByRole('button').first().click();

  const updatedName = "jackfruit";
  await page.waitForSelector('#categoryName', { timeout: 10000 });
  
  
  await page.locator('#categoryName').fill('');
  await page.locator('#categoryName').fill(updatedName);

  await expect(page.locator('button:has-text("UPDATE")')).toBeEnabled({ timeout: 10000 });
  await page.click('button:has-text("UPDATE")');

  
  await expect(page.getByRole('cell', { name: updatedName, exact: true })).toBeVisible({ timeout: 30000 });

  
  const deleteRow = page.getByRole('row').filter({ has: page.getByRole('cell', { name: updatedName, exact: true }) });
  await deleteRow.getByRole('button').nth(2).click();

  await page.waitForSelector('text=Confirm Delete', { timeout: 5000 });

  await page.locator('button:has-text("Delete")').click();

  
  await expect(page.getByRole('cell', { name: updatedName, exact: true })).not.toBeVisible({ timeout: 10000 });

  console.log(`Category "${updatedName}" deleted successfully.`);

  console.log(`Test passed: Category "${categoryName}" added and updated to "${updatedName}" successfully.`);
});