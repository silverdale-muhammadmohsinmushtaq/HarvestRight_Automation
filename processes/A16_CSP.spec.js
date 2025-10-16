require('dotenv').config();
const { test, expect } = require('@playwright/test');

let page;

test.describe.serial('Odoo End-to-End QA', () => {
  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto(process.env.SERVER_LINK);
    await page.getByRole('textbox', { name: 'Email' }).fill(process.env.HARVESTRIGHT_USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).fill(process.env.HARVESTRIGHT_PASSWORD);
    await page.getByRole('button', { name: 'Log in', exact: true }).click();
    
    // Verify user is logged in - User Icon should appear
    await page.getByRole('button', { name: 'User' }).waitFor();
    await expect.soft(page.getByAltText('User')).toBeVisible();
  });

	test('QCP10993 Verify user can import manifest file in amazon edi', async () => {
		await page.goto(process.env.SERVER_LINK);
		
		
	});






	/////////////////////////////////////////////


	test.afterAll(async () => {
    	await page.goto(process.env.SERVER_LINK);
    	await page.getByRole('button', { name: 'User' }).click();
    	await page.getByRole('menuitem', { name: /Log out/i }).click();
    	await page.close();
	});
});



