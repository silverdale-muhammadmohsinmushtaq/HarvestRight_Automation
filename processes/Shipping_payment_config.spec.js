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

    test('Verify the user can configure the shipping and payment methods', async () => {
        await page.goto(process.env.SERVER_LINK);
        
        await page.getByRole('option', { name: 'Accounting' }).click();
        await page.getByRole('button', { name: 'Configuration' }).click();
        await page.getByRole('menuitem', { name: 'Payment Providers' }).click();
        await page.getByRole('heading', { name: 'Authorize.Net' }).click();
        await page.getByRole('radio', { name: 'Test Mode' }).check();
        await page.getByRole('textbox', { name: 'API Login ID?' }).click();
        await page.getByRole('textbox', { name: 'API Login ID?' }).fill('3yD69ueAFTMf');
        await page.getByRole('textbox', { name: 'API Transaction Key' }).click();
        await page.getByRole('textbox', { name: 'API Transaction Key' }).fill('83aMVm4gT5q9F6jk');
        await page.getByRole('textbox', { name: 'API Signature Key' }).click();
        await page.getByRole('textbox', { name: 'API Signature Key' }).fill('A3F828CEEAA54FEEF04909047B7AFE05695C4426E6B9FF6E18C77878807ECCC3F37BF2A08AF2AA7733AB472521DE21193F60D8492BFE4AF649565B903A617689');
        await page.getByRole('button', { name: 'Generate Client Key' }).click();
        await expect.soft(page.getByRole('textbox', { name: 'API Client Key?' })).toBeVisible();
        
        // Click "Unpublished" only if the payment provider is not already "Published"
        const publishButton = page.locator('button[name="action_toggle_is_published"]');
        const buttonText = await publishButton.textContent();
        if (buttonText && buttonText.includes('Unpublished')) {
            await publishButton.click();
        }
        await expect.soft(page.locator('button[name="action_toggle_is_published"]')).toContainText('Published');
        await page.getByRole('link', { name: 'Home menu' }).click();
        
        await page.keyboard.type('shipping');
        await page.getByRole('combobox', { name: 'Search for a menu...' }).fill('Shipping Methods');
        await page.getByRole('link', { name: 'Inventory / Configuration / Delivery / Shipping Methods' }).click();
        await page.getByRole('button', { name: ' Filters' }).click();
        await page.getByRole('menuitemcheckbox', { name: 'Archived' }).click();
        await page.getByRole('searchbox', { name: 'Search...' }).click();
        await page.getByRole('searchbox', { name: 'Search...' }).fill('Fedex Freight LTL - USA');
        await page.getByRole('searchbox', { name: 'Search...' }).press('Enter');
        await page.getByRole('cell', { name: 'Fedex Freight LTL - USA', exact: true }).click();
        await page.getByRole('textbox', { name: 'Developer Key' }).click();
        await page.getByRole('textbox', { name: 'Developer Key' }).fill('l7efe6730c7a29407a97ff001e0aa4ef35');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('f115b7ba-b780-446f-a7aa-8e5d5b5f6c15');
        await page.getByRole('textbox', { name: 'Freight Account Number' }).click();
        await page.getByRole('textbox', { name: 'Freight Account Number' }).click();
        await page.getByRole('textbox', { name: 'Freight Account Number' }).fill('535141762');
        await page.getByRole('textbox', { name: 'Fedex Account Number' }).click();
        await page.getByRole('textbox', { name: 'Fedex Account Number' }).fill('254100396');
        await page.getByRole('textbox', { name: 'Fedex Account Number' }).click();
        await page.getByRole('textbox', { name: 'Fedex Account Number' }).fill('532844045');
        await page.getByRole('textbox', { name: 'Meter Number' }).click();
        await page.getByRole('textbox', { name: 'Meter Number' }).fill('254100396');
        // Click "Save manually" only if the button appears
        const saveButton = page.getByRole('button', { name: 'Save manually' });
        if (await saveButton.isVisible()) {
            await saveButton.click();
        }
        
        // Click "Test Environment" only if the button shows "Test Environment"
        const environmentButton = page.locator('button[name="toggle_prod_environment"]');
        const environmentText = await environmentButton.textContent();
        if (environmentText && environmentText.includes('Test Environment')) {
            await environmentButton.click();
        }
        await expect.soft(page.locator('button[name="toggle_prod_environment"]')).toContainText('Production');
        
        // Click "Action" and "Unarchive" only if the shipping method is archived
        const archivedRibbon = page.locator('.ribbon .bg-danger');
        if (await archivedRibbon.isVisible()) {
            await page.getByRole('button', { name: 'Action' }).click();
            await page.getByRole('menuitem', { name: 'Unarchive' }).click();
        }
        await expect.soft(page.locator('button[name="website_publish_button"]')).toContainText('Published');
        await expect.soft(page.locator('button[name="toggle_prod_environment"]')).toContainText('Production');
        await page.getByRole('link', { name: 'Home menu' }).click();

    });




    /////////////////////////////////////////////


    test.afterAll(async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('button', { name: 'User' }).click();
        await page.getByRole('menuitem', { name: /Log out/i }).click();
        await page.close();
    });
});



