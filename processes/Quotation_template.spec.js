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

    test('Verify the user can create and use Quotation Templates', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Sales' }).click();
        await page.getByRole('button', { name: 'Configuration' }).click();
        //await page.waitForTimeout(5000);
        await page.getByRole('menuitem', { name: 'Quotation Templates' }).click();
        await page.waitForTimeout(10000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('textbox', { name: 'Quotation Template' }).click();
        await page.getByRole('textbox', { name: 'Quotation Template' }).fill('**Test Quotation Template**');
        await page.locator('#number_of_days').nth(1).click();
        await page.locator('#number_of_days').nth(1).press('ArrowLeft');
        await page.locator('#number_of_days').nth(1).fill('30');
        await page.getByRole('checkbox', { name: 'Online confirmation?' }).check();
        await page.getByRole('combobox', { name: 'Confirmation Mail?' }).click();
        await page.getByRole('combobox', { name: 'Confirmation Mail?' }).fill('confirm');
        await page.getByRole('option', { name: 'Sales Order: Confirmation' }).click();
        await page.getByRole('combobox', { name: 'Company' }).click();
        await page.getByRole('option', { name: 'Harvest Right', exact: true }).click();
        await page.getByRole('button', { name: 'Add a product' }).click();
        await page.getByRole('combobox').nth(2).click();
        await page.getByRole('combobox').nth(2).fill('home pro freeze dryer bund');
        await page.getByRole('option', { name: '[HRFDMBKP-OFP] Home Pro' }).click();
        await page.getByRole('button', { name: 'Add a product' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox').nth(2).fill('my');
        await page.getByRole('option', { name: '[MB-006-10x14] 50-Pack Mylar' }).click();
        await page.getByRole('checkbox', { name: 'Online confirmation?' }).check();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.getByRole('tab', { name: 'Terms & Conditions' }).click();
        await page.getByRole('paragraph').filter({ hasText: /^$/ }).click();
        await page.locator('#note').fill('test terms and conditions');
        await page.getByRole('tab', { name: 'Optional Products' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.getByRole('button', { name: 'Orders' }).click();
        await page.getByRole('menuitem', { name: 'Quotations' }).click();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).click();
        await page.getByRole('option', { name: 'Tractor Supply Co.' }).click();
        await expect.soft(page.getByRole('heading').getByText('New')).toBeVisible();
        await expect.soft(page.getByRole('combobox', { name: 'Customer' })).toBeVisible();
        await expect.soft(page.getByRole('combobox', { name: 'Invoice Address' })).toBeVisible();
        await page.getByRole('combobox', { name: 'Quotation Template' }).click();
        await page.locator('div').filter({ hasText: /^CustomerPreview$/ }).first().click();
        await page.getByRole('combobox', { name: 'Quotation Template' }).click();
        await page.getByRole('combobox', { name: 'Quotation Template' }).fill('**test');
        await page.getByRole('option', { name: '**Test Quotation Template**' }).first().click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.locator('body')).toContainText('Harvest Right Main');
        await expect.soft(page.locator('body')).toContainText('Home Pro Freeze Dryer Bundle');
      
        await expect.soft(page.locator('body')).toContainText('50-Pack Mylar Bags');
        await expect.soft(page.locator('body')).toContainText('US$ 3,293.90');
        await page.getByRole('cell', { name: 'Taxable' }).first().click();
        await page.waitForTimeout(3000);
        await page.getByRole('cell', { name: 'Taxable' }).first().click();

        // Click on the tax dropdown field
        await page.locator('input[role="combobox"][aria-haspopup="listbox"]').last().click();
        await page.getByRole('option', { name: '7.25%' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.locator('body')).toContainText('US$ 237.58');
        await expect.soft(page.locator('body')).toContainText('Tax 7.25%');
        await expect.soft(page.locator('body')).toContainText('US$ 3,293.90US$ 3,531.48(Total)');
        await expect.soft(page.locator('body')).toContainText('Sales Order created');
        await page.getByRole('button', { name: 'Send by Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('button', { name: 'Discard' }).click();
        await page.getByRole('button', { name: 'Send', exact: true }).click();
        await page.getByRole('button', { name: 'Confirm' }).click();
        await page.getByRole('button', { name: 'OK' }).click();
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



