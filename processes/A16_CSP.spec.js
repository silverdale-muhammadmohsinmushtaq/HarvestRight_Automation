require('dotenv').config();
const { test, expect } = require('@playwright/test');

let browser;
let context;
let page;

test.describe.serial('Odoo End-to-End QA', () => {
  test.beforeAll(async ({ browser: br }) => {
    browser = br;
    // Create a new browser context to maintain session
    context = await browser.newContext();
    page = await context.newPage();
    
    // Login once
    await page.goto(process.env.SERVER_LINK);
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.HARVESTRIGHT_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.HARVESTRIGHT_PASSWORD);
    await page.getByRole('button', { name: 'Log in', exact: true }).click();
    
    // Wait for successful login - navigation should complete
    await page.waitForLoadState('networkidle');
    
    // Verify user is logged in - User Icon should appear
    await page.getByRole('button', { name: 'User' }).waitFor();
    await expect.soft(page.getByAltText('User')).toBeVisible();
  });

	test('QCP10993 Verify the user can create Company contact and add sub contacts to it', async () => {
		await page.goto(process.env.SERVER_LINK);
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
  
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('radio', { name: 'Invoice Address' }).check();
  await page.getByRole('textbox', { name: 'Contact Name' }).click();
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Invoice 001**');
  await page.getByRole('textbox', { name: 'Email Email' }).click();
  await page.getByRole('textbox', { name: 'Email Email' }).fill('testInvoice001@Example.com');
  await page.getByRole('textbox', { name: 'Phone Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone Phone' }).fill('12345678999');
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).click();
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).fill('12345678999');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('#comment').fill('testing');
  await page.locator('#dialog_1').getByRole('button', { name: 'Validate Address' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Save & New' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('radio', { name: 'Delivery Address' }).check();
  await page.getByRole('textbox', { name: 'Contact Name' }).click();
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Delivery 001**');
  await page.getByRole('textbox', { name: 'Email Email' }).click();
  await page.getByRole('textbox', { name: 'Email Email' }).fill('testDelivery001@Example.com');
  await page.getByRole('textbox', { name: 'Phone Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone Phone' }).fill('12345678999');
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).click();
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).fill('12345678999');
  await page.locator('#company_name').click();
  await page.locator('#comment').click();
  await page.locator('#comment').fill('testing');
  await page.locator('#dialog_1').getByRole('button', { name: 'Validate Address' }).click();
  await page.getByRole('button', { name: 'Keep' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Save & Close' }).click();
  await expect.soft(page.locator('body')).toContainText('**Test Invoice 001**');
  await expect.soft(page.locator('body')).toContainText('**Test Delivery 001**');
  await expect.soft(page.locator('body')).toContainText('Affiliate');
  await expect.soft(page.locator('body')).toContainText('Contract');
  await expect.soft(page.locator('body')).toContainText('Address');
  await expect.soft(page.locator('body')).toContainText('Phone');
  await expect.soft(page.locator('div').filter({ hasText: /^Company$/ })).toBeVisible();
  await expect.soft(page.locator('div').filter({ hasText: /^Individual$/ })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Opportunities' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Meetings' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Sales' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Tickets' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Purchases' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' No data yet On-time Rate' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' US$ 0.00 Invoiced' })).toBeVisible();
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('button', { name: 'Save manually' }).click();
		
		
		
	});

  test('QC10993 Verify the user can create Company contact and add sub contacts to it', async () => {
		await page.goto(process.env.SERVER_LINK);
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
  
  await page.getByRole('button', { name: 'Add', exact: true }).click();
  await page.getByRole('radio', { name: 'Invoice Address' }).check();
  await page.getByRole('textbox', { name: 'Contact Name' }).click();
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Invoice 001**');
  await page.getByRole('textbox', { name: 'Email Email' }).click();
  await page.getByRole('textbox', { name: 'Email Email' }).fill('testInvoice001@Example.com');
  await page.getByRole('textbox', { name: 'Phone Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone Phone' }).fill('12345678999');
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).click();
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).fill('12345678999');
  await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
  await page.locator('#comment').fill('testing');
  await page.locator('#dialog_1').getByRole('button', { name: 'Validate Address' }).click();
  await page.getByRole('button', { name: 'Update' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Save & New' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('radio', { name: 'Delivery Address' }).check();
  await page.getByRole('textbox', { name: 'Contact Name' }).click();
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Delivery 001**');
  await page.getByRole('textbox', { name: 'Email Email' }).click();
  await page.getByRole('textbox', { name: 'Email Email' }).fill('testDelivery001@Example.com');
  await page.getByRole('textbox', { name: 'Phone Phone' }).click();
  await page.getByRole('textbox', { name: 'Phone Phone' }).fill('12345678999');
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).click();
  await page.getByRole('textbox', { name: 'Mobile Mobile' }).fill('12345678999');
  await page.locator('#company_name').click();
  await page.locator('#comment').click();
  await page.locator('#comment').fill('testing');
  await page.locator('#dialog_1').getByRole('button', { name: 'Validate Address' }).click();
  await page.getByRole('button', { name: 'Keep' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Save & Close' }).click();
  await expect.soft(page.locator('body')).toContainText('**Test Invoice 001**');
  await expect.soft(page.locator('body')).toContainText('**Test Delivery 001**');
  await expect.soft(page.locator('body')).toContainText('Affiliate');
  await expect.soft(page.locator('body')).toContainText('Contract');
  await expect.soft(page.locator('body')).toContainText('Address');
  await expect.soft(page.locator('body')).toContainText('Phone');
  await expect.soft(page.locator('div').filter({ hasText: /^Company$/ })).toBeVisible();
  await expect.soft(page.locator('div').filter({ hasText: /^Individual$/ })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Opportunities' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Meetings' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Sales' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 Tickets' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' 0 PurchasesX' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' No data yet On-time Rate' })).toBeVisible();
  await expect.soft(page.getByRole('button', { name: ' US$ 0.00 Invoiced' })).toBeVisible();
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('button', { name: 'More' }).click();
  await page.getByRole('button', { name: 'Save manually' }).click();
		
		
		
	});








	/////////////////////////////////////////////


	test.afterAll(async () => {
    	await page.goto(process.env.SERVER_LINK);
    	await page.getByRole('button', { name: 'User' }).click();
    	await page.getByRole('menuitem', { name: /Log out/i }).click();
    	await page.close();
	});
});



