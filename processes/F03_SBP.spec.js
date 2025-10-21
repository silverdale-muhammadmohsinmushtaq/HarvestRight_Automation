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

    test('Verify the user can Generate Lead in CRM Module', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'CRM' }).click();
        await page.getByRole('menuitem', { name: 'Leads' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).fill('**Test Lead 001**');
        await page.getByRole('textbox', { name: 'Company Name?' }).click();
        await page.getByRole('textbox', { name: 'Company Name?' }).fill('**Test Company 001**');
        await page.getByRole('textbox', { name: 'Address' }).click();
        await page.getByRole('textbox', { name: 'Address' }).fill('7842 Big Timber Trail');
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
        await page.getByRole('combobox', { name: 'Country' }).click();
        await page.getByRole('combobox', { name: 'Country' }).fill('united state');
        await page.getByRole('option', { name: 'United States' }).click();
        await page.getByRole('combobox', { name: 'State' }).click();
        await page.getByRole('combobox', { name: 'State' }).fill('Wisconsin');
        await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
        await page.getByRole('textbox', { name: 'Contact Name' }).click();
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Contact 001**');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testLead001@Example.com');
        await page.getByRole('textbox', { name: 'Job Position' }).click();
        await page.getByRole('textbox', { name: 'Job Position' }).fill('Quality Assurance');
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Website?' }).click();
        await page.getByRole('textbox', { name: 'Website?' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByRole('option', { name: 'English (US)' }).click();
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Referral Credit' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Missing in Shipment' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.waitForTimeout(5000);

        await page.getByRole('radio', { name: 'High', exact: true }).click();
        await page.locator('#description').click();
        await page.locator('#description').fill('Testing Notes:\n\nMIA\n\n\n');
        await page.getByText('Testing Notes:MIA').fill('Testing Notes:\n\nMIA\n\nEvermind\n\npathway\n\npinange\n\nwork flow\n\nai\n\nFuture of Silverdale');
        await page.getByRole('tab', { name: 'Extra Info' }).click();
        await page.getByRole('tab', { name: 'Internal Notes' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();

    });

    test('Verify the user can mark lead as lost AND restore the lost lead', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'CRM' }).click();
        await page.getByRole('menuitem', { name: 'Leads' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).fill('**Test Lead 001**');
        await page.getByRole('textbox', { name: 'Company Name?' }).click();
        await page.getByRole('textbox', { name: 'Company Name?' }).fill('**Test Company 001**');
        await page.getByRole('textbox', { name: 'Address' }).click();
        await page.getByRole('textbox', { name: 'Address' }).fill('7842 Big Timber Trail');
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
        await page.getByRole('combobox', { name: 'Country' }).click();
        await page.getByRole('combobox', { name: 'Country' }).fill('united state');
        await page.getByRole('option', { name: 'United States' }).click();
        await page.getByRole('combobox', { name: 'State' }).click();
        await page.getByRole('combobox', { name: 'State' }).fill('Wisconsin');
        await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
        await page.getByRole('textbox', { name: 'Contact Name' }).click();
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Contact 001**');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testLead001@Example.com');
        await page.getByRole('textbox', { name: 'Job Position' }).click();
        await page.getByRole('textbox', { name: 'Job Position' }).fill('Quality Assurance');
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Website?' }).click();
        await page.getByRole('textbox', { name: 'Website?' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByRole('option', { name: 'English (US)' }).click();
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Referral Credit' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Missing in Shipment' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.waitForTimeout(5000);

        await page.getByRole('radio', { name: 'High', exact: true }).click();
        await page.locator('#description').click();
        await page.locator('#description').fill('Testing Notes:\n\nMIA\n\n\n');
        await page.getByText('Testing Notes:MIA').fill('Testing Notes:\n\nMIA\n\nEvermind\n\npathway\n\npinange\n\nwork flow\n\nai\n\nFuture of Silverdale');
        await page.getByRole('tab', { name: 'Extra Info' }).click();
        await page.getByRole('tab', { name: 'Internal Notes' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.getByRole('button', { name: 'Lost' }).click();
        await page.waitForTimeout(5000);
        await expect.soft(page.locator('.ribbon span.bg-danger').filter({ hasText: 'Lost' })).toBeVisible();
        await page.getByRole('button', { name: 'Restore' }).click();
        await page.waitForTimeout(5000);
        await expect.soft(page.getByRole('button', { name: 'Convert to Opportunity' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Lost' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Enrich' })).toBeVisible();
        await expect.soft(page.locator('.ribbon span.bg-danger').filter({ hasText: 'Lost' })).not.toBeVisible();


    });

    test('Verify the user can covert CRM Lead to Opportunity', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'CRM' }).click();
        await page.getByRole('menuitem', { name: 'Leads' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).fill('**Test Lead 001**');
        await page.getByRole('textbox', { name: 'Company Name?' }).click();
        await page.getByRole('textbox', { name: 'Company Name?' }).fill('**Test Company 001**');
        await page.getByRole('textbox', { name: 'Address' }).click();
        await page.getByRole('textbox', { name: 'Address' }).fill('7842 Big Timber Trail');
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
        await page.getByRole('combobox', { name: 'Country' }).click();
        await page.getByRole('combobox', { name: 'Country' }).fill('united state');
        await page.getByRole('option', { name: 'United States' }).click();
        await page.getByRole('combobox', { name: 'State' }).click();
        await page.getByRole('combobox', { name: 'State' }).fill('Wisconsin');
        await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
        await page.getByRole('textbox', { name: 'Contact Name' }).click();
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Contact 001**');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testLead001@Example.com');
        await page.getByRole('textbox', { name: 'Job Position' }).click();
        await page.getByRole('textbox', { name: 'Job Position' }).fill('Quality Assurance');
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Website?' }).click();
        await page.getByRole('textbox', { name: 'Website?' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByRole('option', { name: 'English (US)' }).click();
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Referral Credit' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Missing in Shipment' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.waitForTimeout(5000);

        await page.getByRole('radio', { name: 'High', exact: true }).click();
        await page.locator('#description').click();
        await page.locator('#description').fill('Testing Notes:\n\nMIA\n\n\n');
        await page.getByText('Testing Notes:MIA').fill('Testing Notes:\n\nMIA\n\nEvermind\n\npathway\n\npinange\n\nwork flow\n\nai\n\nFuture of Silverdale');
        await page.getByRole('tab', { name: 'Extra Info' }).click();
        await page.getByRole('tab', { name: 'Internal Notes' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.getByRole('button', { name: 'Lost' }).click();
        await page.waitForTimeout(5000);
        await expect.soft(page.locator('.ribbon span.bg-danger').filter({ hasText: 'Lost' })).toBeVisible();
        await page.getByRole('button', { name: 'Restore' }).click();
        await page.waitForTimeout(5000);
        await expect.soft(page.getByRole('button', { name: 'Convert to Opportunity' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Lost' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Enrich' })).toBeVisible();
        await expect.soft(page.locator('.ribbon span.bg-danger').filter({ hasText: 'Lost' })).not.toBeVisible();

        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).check();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).click();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Create Opportunity' }).click();
        await page.waitForTimeout(5000);

        await expect.soft(page.getByRole('button', { name: 'New Quotation' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Won' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Lost' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Enrich' })).toBeVisible();
        await expect.soft(page.getByRole('radiogroup', { name: 'Statusbar' })).toBeVisible();
        await expect.soft(page.locator('#probability').nth(1)).toBeVisible();
        await expect.soft(page.getByRole('textbox', { name: 'e.g. Product Pricing' })).toBeVisible();
        await expect.soft(page.locator('body')).toContainText('Referral Credit');
        await expect.soft(page.locator('body')).toContainText('Missing in Shipment');
        await expect.soft(page.getByRole('radio', { name: 'High', exact: true })).toBeVisible();
        await expect.soft(page.getByRole('combobox', { name: 'Customer?' })).toBeVisible();
        await expect.soft(page.getByRole('textbox', { name: 'Email' })).toBeVisible();
        await expect.soft(page.getByRole('textbox', { name: 'Phone' })).toBeVisible();
        await expect.soft(page.getByRole('tab', { name: 'Internal Notes' })).toBeVisible();
        await expect.soft(page.getByRole('tab', { name: 'Extra Information' })).toBeVisible();


    });


    test('Verify the user can lost and restore CRM Opportunity', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'CRM' }).click();
        await page.getByRole('menuitem', { name: 'Leads' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).fill('**Test Lead 001**');
        await page.getByRole('textbox', { name: 'Company Name?' }).click();
        await page.getByRole('textbox', { name: 'Company Name?' }).fill('**Test Company 001**');
        await page.getByRole('textbox', { name: 'Address' }).click();
        await page.getByRole('textbox', { name: 'Address' }).fill('7842 Big Timber Trail');
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
        await page.getByRole('combobox', { name: 'Country' }).click();
        await page.getByRole('combobox', { name: 'Country' }).fill('united state');
        await page.getByRole('option', { name: 'United States' }).click();
        await page.getByRole('combobox', { name: 'State' }).click();
        await page.getByRole('combobox', { name: 'State' }).fill('Wisconsin');
        await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
        await page.getByRole('textbox', { name: 'Contact Name' }).click();
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Contact 001**');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testLead001@Example.com');
        await page.getByRole('textbox', { name: 'Job Position' }).click();
        await page.getByRole('textbox', { name: 'Job Position' }).fill('Quality Assurance');
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Website?' }).click();
        await page.getByRole('textbox', { name: 'Website?' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByRole('option', { name: 'English (US)' }).click();
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Referral Credit' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Missing in Shipment' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.waitForTimeout(5000);

        await page.getByRole('radio', { name: 'High', exact: true }).click();
        await page.locator('#description').click();
        await page.locator('#description').fill('Testing Notes:\n\nMIA\n\n\n');
        await page.getByText('Testing Notes:MIA').fill('Testing Notes:\n\nMIA\n\nEvermind\n\npathway\n\npinange\n\nwork flow\n\nai\n\nFuture of Silverdale');
        await page.getByRole('tab', { name: 'Extra Info' }).click();
        await page.getByRole('tab', { name: 'Internal Notes' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();


        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).check();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).click();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Create Opportunity' }).click();
        await page.waitForTimeout(10000);

        await page.getByRole('button', { name: 'Lost' }).click();
        await page.getByRole('combobox', { name: 'Lost Reason' }).click();
        await page.getByRole('option', { name: 'Too Expensive' }).click();
        await page.locator('.oe-hint').click();
        await page.locator('#lost_feedback').fill('To Expensive bro');
        await page.getByRole('button', { name: 'Submit' }).click();
        await expect.soft(page.locator('.ribbon span.bg-danger').filter({ hasText: 'Lost' })).toBeVisible();
        await page.getByRole('button', { name: 'Restore' }).click();
        await expect.soft(page.locator('.ribbon span.bg-danger').filter({ hasText: 'Lost' })).not.toBeVisible();
        await page.getByRole('button', { name: 'Won' }).click();
        await expect.soft(page.locator('.ribbon span.bg-success').filter({ hasText: 'Won' })).toBeVisible();
        await expect.soft(page.getByRole('radio', { name: 'Sale Won' })).toBeChecked();
    });

    test('Verify the user can mark CRM Opportunity as won', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'CRM' }).click();
        await page.getByRole('menuitem', { name: 'Leads' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).fill('**Test Lead 001**');
        await page.getByRole('textbox', { name: 'Company Name?' }).click();
        await page.getByRole('textbox', { name: 'Company Name?' }).fill('**Test Company 001**');
        await page.getByRole('textbox', { name: 'Address' }).click();
        await page.getByRole('textbox', { name: 'Address' }).fill('7842 Big Timber Trail');
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
        await page.getByRole('combobox', { name: 'Country' }).click();
        await page.getByRole('combobox', { name: 'Country' }).fill('united state');
        await page.getByRole('option', { name: 'United States' }).click();
        await page.getByRole('combobox', { name: 'State' }).click();
        await page.getByRole('combobox', { name: 'State' }).fill('Wisconsin');
        await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
        await page.getByRole('textbox', { name: 'Contact Name' }).click();
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Contact 001**');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testLead001@Example.com');
        await page.getByRole('textbox', { name: 'Job Position' }).click();
        await page.getByRole('textbox', { name: 'Job Position' }).fill('Quality Assurance');
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Website?' }).click();
        await page.getByRole('textbox', { name: 'Website?' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByRole('option', { name: 'English (US)' }).click();
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Referral Credit' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Missing in Shipment' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.waitForTimeout(5000);

        await page.getByRole('radio', { name: 'High', exact: true }).click();
        await page.locator('#description').click();
        await page.locator('#description').fill('Testing Notes:\n\nMIA\n\n\n');
        await page.getByText('Testing Notes:MIA').fill('Testing Notes:\n\nMIA\n\nEvermind\n\npathway\n\npinange\n\nwork flow\n\nai\n\nFuture of Silverdale');
        await page.getByRole('tab', { name: 'Extra Info' }).click();
        await page.getByRole('tab', { name: 'Internal Notes' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();


        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).check();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).click();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Create Opportunity' }).click();
        await page.waitForTimeout(10000);

        await page.getByRole('button', { name: 'Won' }).click();
        await expect.soft(page.locator('.ribbon span.bg-success').filter({ hasText: 'Won' })).toBeVisible();
        await expect.soft(page.getByRole('radio', { name: 'Sale Won' })).toBeChecked();
    });


    test('Verify the user can Convert CRM Opportunity to Sales Quotation and can confirm it after adding the products', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'CRM' }).click();
        await page.getByRole('menuitem', { name: 'Leads' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).click();
        await page.getByRole('textbox', { name: 'e.g. Product Pricing' }).fill('**Test Lead 001**');
        await page.getByRole('textbox', { name: 'Company Name?' }).click();
        await page.getByRole('textbox', { name: 'Company Name?' }).fill('**Test Company 001**');
        await page.getByRole('textbox', { name: 'Address' }).click();
        await page.getByRole('textbox', { name: 'Address' }).fill('7842 Big Timber Trail');
        await page.getByRole('textbox', { name: 'City' }).click();
        await page.getByRole('textbox', { name: 'City' }).fill('Middleton');
        await page.getByRole('combobox', { name: 'Country' }).click();
        await page.getByRole('combobox', { name: 'Country' }).fill('united state');
        await page.getByRole('option', { name: 'United States' }).click();
        await page.getByRole('combobox', { name: 'State' }).click();
        await page.getByRole('combobox', { name: 'State' }).fill('Wisconsin');
        await page.getByRole('option', { name: 'Wisconsin (US)' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).click();
        await page.getByRole('textbox', { name: 'ZIP' }).fill('53562');
        await page.getByRole('textbox', { name: 'Contact Name' }).click();
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test Contact 001**');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testLead001@Example.com');
        await page.getByRole('textbox', { name: 'Job Position' }).click();
        await page.getByRole('textbox', { name: 'Job Position' }).fill('Quality Assurance');
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Website?' }).click();
        await page.getByRole('textbox', { name: 'Website?' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Language' }).click();
        await page.getByRole('option', { name: 'English (US)' }).click();
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Referral Credit' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('combobox', { name: 'Tags?' }).click();
        await page.getByRole('option', { name: 'Missing in Shipment' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.waitForTimeout(5000);

        await page.getByRole('radio', { name: 'High', exact: true }).click();
        await page.locator('#description').click();
        await page.locator('#description').fill('Testing Notes:\n\nMIA\n\n\n');
        await page.getByText('Testing Notes:MIA').fill('Testing Notes:\n\nMIA\n\nEvermind\n\npathway\n\npinange\n\nwork flow\n\nai\n\nFuture of Silverdale');
        await page.getByRole('tab', { name: 'Extra Info' }).click();
        await page.getByRole('tab', { name: 'Internal Notes' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();


        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).check();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Cancel' }).click();
        await page.getByRole('button', { name: 'Convert to Opportunity' }).click();
        await page.getByRole('radio', { name: 'Convert to opportunity' }).click();
        await page.getByRole('radio', { name: 'Create a new customer' }).check();
        await page.getByRole('button', { name: 'Create Opportunity' }).click();
        await page.waitForTimeout(10000);

        await page.getByRole('button', { name: 'Won' }).click();
        await expect.soft(page.locator('.ribbon span.bg-success').filter({ hasText: 'Won' })).toBeVisible();
        await expect.soft(page.getByRole('radio', { name: 'Sale Won' })).toBeChecked();
        await page.getByRole('button', { name: 'New Quotation' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.getByRole('button', { name: 'Send by Email' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Send PRO-FORMA Invoice' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Create Invoice' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Cancel' })).toBeVisible();
        await expect.soft(page.getByRole('button', { name: 'Validate Address' })).toBeVisible();
        await expect.soft(page.getByRole('radio', { name: 'Quotation', exact: true })).toBeChecked();
        await page.getByRole('button', { name: 'Confirm' }).click();
        await expect.soft(page.getByRole('radio', { name: 'Sales Order', exact: true })).toBeChecked();
    });





















    /////////////////////////////////////////////


    test.afterAll(async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('button', { name: 'User' }).click();
        await page.getByRole('menuitem', { name: /Log out/i }).click();
        await page.close();
    });
});



