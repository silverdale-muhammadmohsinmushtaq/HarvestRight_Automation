require('dotenv').config();
const { test, expect } = require('@playwright/test');


test('Verify the user can add information to sales and purchase tabs like sale persons, tax id, delivery method, payment terms and etc.', async ({ page }) => {
    await page.goto(process.env.SERVER_LINK);
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.HARVESTRIGHT_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.HARVESTRIGHT_PASSWORD);
    await page.getByRole('button', { name: 'Log in', exact: true }).click();

    // Wait for successful login - navigation should complete
    await page.waitForLoadState('networkidle');
    await page.getByRole('option', { name: 'Contacts' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByRole('radio', { name: 'Company' }).check();
    await page.getByRole('textbox', { name: 'e.g. Lumber Inc' }).click();
    await page.getByRole('textbox', { name: 'e.g. Lumber Inc' }).fill('**Test Company 001**');
    await page.getByRole('button', { name: 'Save manually' }).click();
    await page.getByRole('textbox', { name: 'Street...' }).click();
    await page.getByRole('textbox', { name: 'Street...' }).fill('7842 Big Timber Trail');
    await page.getByRole('textbox', { name: 'City' }).click();
    await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
    await page.getByRole('textbox', { name: 'ZIP' }).click();
    await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
    await page.getByRole('combobox', { name: 'Country' }).click();
    await page.getByRole('combobox', { name: 'Country' }).click();
    await page.getByRole('combobox', { name: 'Country' }).click();
    await page.getByRole('combobox', { name: 'State' }).click();
    await page.getByRole('combobox', { name: 'State' }).fill('wi');
    await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
    await page.getByRole('textbox', { name: 'Phone' }).click();
    await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
    await page.getByRole('textbox', { name: 'Mobile' }).click();
    await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
    await page.getByRole('textbox', { name: 'Email' }).click();
    await page.getByRole('textbox', { name: 'Email' }).fill('testCompany001@Example.com');
    await page.getByRole('textbox', { name: 'Website' }).click();
    await page.getByRole('textbox', { name: 'Website' }).fill('Testing.com');
    await page.getByRole('combobox', { name: 'Tags' }).click();
    await page.getByRole('option', { name: 'Contract' }).click();
    await page.waitForTimeout(1000);
    await page.getByRole('combobox', { name: 'Tags' }).click();

    await page.getByRole('option', { name: 'Affiliate' }).click();
    await page.getByRole('button', { name: 'Save manually' }).click();
    // await page.pause();
    await page.getByRole('tab', { name: 'Sales' }).click();
    //await page.waitForTimeout(10000);

    await page.locator('#user_id').click();
    await page.waitForTimeout(2000);
    await page.locator('#user_id').click();
    //await page.locator('#user_id').fill('');  // Trigger the dropdown
    await page.getByRole('option', { name: 'Administrator' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Pricelist?' }).click();
    await page.getByRole('option', { name: 'Public (USD)' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Delivery Method' }).click();
    await page.getByRole('option', { name: 'UPS (Reseller Only-Home Depot)' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Channel' }).click();
    await page.getByRole('option', { name: 'Misc' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Co-Op' }).click();
    await page.getByRole('option', { name: 'Mid-States' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Save manually' }).click();
    await page.getByRole('tab', { name: 'Purchase' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Payment Terms' }).click();
    await page.getByRole('option', { name: 'Prepay' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('combobox', { name: 'Payment Method' }).click();
    await page.waitForTimeout(2000);
    await page.getByRole('option', { name: 'Wire Transfer' }).click();
    await page.getByRole('button', { name: 'Save manually' }).click();
});
