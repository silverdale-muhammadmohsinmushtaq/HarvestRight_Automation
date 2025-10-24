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

    test('PRE-CONDITION: CREATE NEW CUSTOMER', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Contacts' }).click();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('radio', { name: 'Company' }).check();
        await page.getByRole('textbox', { name: 'e.g. Lumber Inc' }).click();
        await page.getByRole('textbox', { name: 'e.g. Lumber Inc' }).fill('**Test SalesCompany 001**');
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
        await page.getByRole('textbox', { name: 'Email' }).fill('testSalesCompany001@Example.com');
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
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test SalesInvoice 001**');
        await page.getByRole('textbox', { name: 'Email Email' }).click();
        await page.getByRole('textbox', { name: 'Email Email' }).fill('testSalesInvoice001@Example.com');
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
        await page.getByRole('textbox', { name: 'Contact Name' }).fill('**Test SalesDelivery 001**');
        await page.getByRole('textbox', { name: 'Email Email' }).click();
        await page.getByRole('textbox', { name: 'Email Email' }).fill('testSalesDelivery001@Example.com');
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
        await expect.soft(page.locator('body')).toContainText('**Test SalesInvoice 001**');
        await expect.soft(page.locator('body')).toContainText('**Test SalesDelivery 001**');
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
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Contacts' }).click();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('textbox', { name: 'e.g. Brandom Freeman' }).click();
        await page.getByRole('textbox', { name: 'e.g. Brandom Freeman' }).fill('**Test SalesCustomer 001**');
        await page.getByRole('combobox', { name: 'Company Name...' }).click();
        await page.getByRole('combobox', { name: 'Company Name...' }).fill('**Test SalesCompany 001**');
        await page.locator('#parent_id_0_0').click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).click();
        await page.getByRole('textbox', { name: 'Phone' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Mobile' }).click();
        await page.getByRole('textbox', { name: 'Mobile' }).fill('12345678999');
        await page.getByRole('textbox', { name: 'Email' }).click();
        await page.getByRole('textbox', { name: 'Email' }).fill('testSalesCustomer001@Example.com');
        await page.getByRole('textbox', { name: 'Website' }).click();
        await page.getByRole('textbox', { name: 'Website' }).fill('Testing.com');
        await page.getByRole('combobox', { name: 'Title' }).click();
        await page.getByRole('option', { name: 'W Gabriel Ave' }).click();
        await page.getByRole('combobox', { name: 'Tags' }).click();
        await page.getByRole('option', { name: 'Contract' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await page.getByRole('button', { name: ' Validate Address' }).click();
        await page.getByRole('button', { name: 'Update' }).click();
        
        await expect.soft(page.locator('body')).toContainText('7842 BIG TIMBER TRL');
        await expect.soft(page.locator('body')).toContainText('MIDDLETON');
        await expect.soft(page.locator('body')).toContainText('Wisconsin (US)');
        await page.getByText('-4159').click();
        await expect.soft(page.locator('body')).toContainText('53562');
        await expect.soft(page.locator('body')).toContainText('United States');

    });

    test('QC0676697Verify that clicking on the Sales module opens the Sales module', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Sales' }).click();
        await page.waitForTimeout(10000);
        await expect.soft(page.getByRole('menuitem', { name: 'Sales' })).toBeVisible();
    });

    test('QC0676785 Verify that the user can control warehouse visibility on Sale Quotes using the "Available to be displayed on SO" checkbox, ensuring correct warehouse selection, quote confirmation, and associated delivery routes.', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Sales' }).click();
        await expect.soft(page.getByRole('menuitem', { name: 'Sales' })).toBeVisible();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).fill('**Test SalesCustomer 001**');
        await page.locator('#partner_id_0_0').click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.locator('body')).toContainText('Harvest Right Main');
        await page.getByRole('tab', { name: 'Other Info' }).click();
        await page.getByRole('combobox', { name: 'Fiscal Position?' }).click();
        await page.getByRole('combobox', { name: 'Fiscal Position?' }).fill('');
        await page.getByRole('option', { name: 'Tax Exempt' }).click();
        await page.getByRole('tab', { name: 'Order Lines' }).click();
        await page.waitForTimeout(5000);
        await page.getByRole('button', { name: 'Add a product' }).click();
        await page.locator('.o_field_widget.o_required_modifier.o_field_sol_product_many2one > .o_field_many2one_selection > .o_input_dropdown > .o-autocomplete > .o-autocomplete--input').click();
        await page.getByRole('option', { name: '-Pack Mylar Bags' }).click();
        await page.getByRole('button', { name: 'Add one' }).click();
        await page.locator('button.o_sale_product_configurator_edit').click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.locator('body')).toContainText('Small Order Warehouse');
        await page.getByRole('button', { name: 'Add a product' }).click();
        await page.locator('.o_field_widget.o_required_modifier.o_field_sol_product_many2one > .o_field_many2one_selection > .o_input_dropdown > .o-autocomplete > .o-autocomplete--input').click();
        await page.getByRole('option', { name: 'Home Pro Freeze Dryer' }).click();
        await page.getByTitle('Black').check();
        await page.getByRole('radio', { name: 'M + US$' }).check();
        await page.locator('button.o_sale_product_configurator_edit').click();
        await page.getByRole('button', { name: 'Ok' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.locator('body')).toContainText('Harvest Right Main');
        await page.getByRole('checkbox', { name: 'Bypass Warehouse Rules' }).check();
        //Verify warehouse field is editable
        await expect.soft(page.getByRole('combobox', { name: 'Warehouse' })).toBeEnabled();

        await page.getByRole('combobox', { name: 'Warehouse' }).click();
        await page.getByRole('option', { name: 'Small Order Warehouse' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();


        await page.getByRole('checkbox', { name: 'Bypass Warehouse Rules' }).uncheck();
        await page.waitForTimeout(7000);

        await page.getByRole('checkbox', { name: 'Bypass Warehouse Rules' }).check();
        await page.getByRole('combobox', { name: 'Warehouse' }).click();
        await page.getByRole('option', { name: 'Harvest Right Main' }).click();
        await page.getByRole('button', { name: 'Save manually' }).click();
    });


    test('Verify that default Expiration field in the New Quotation form', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Sales' }).click();
        await page.waitForTimeout(10000);
        await expect.soft(page.getByRole('menuitem', { name: 'Sales' })).toBeVisible();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).fill('**Test SalesCustomer 001**');
        await page.locator('#partner_id_0_0').click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.getByRole('textbox', { name: 'Expiration' })).toBeVisible();
        
        // Get the actual expiration date from the page
        const actualExpirationDate = await page.getByRole('textbox', { name: 'Expiration' }).inputValue();
        
        // Verify the expiration date is approximately 1 month from today (within 2 days tolerance)
        const today = new Date();
        const expectedMinDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() - 1);
        const expectedMaxDate = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate() + 1);
        
        const actualDate = new Date(actualExpirationDate);
        expect.soft(actualDate.getTime()).toBeGreaterThanOrEqual(expectedMinDate.getTime());
        expect.soft(actualDate.getTime()).toBeLessThanOrEqual(expectedMaxDate.getTime());
    });

    test('Verify that default Quotation Template field in the New Quotation form is empty', async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('option', { name: 'Sales' }).click();
        await page.waitForTimeout(10000);
        await expect.soft(page.getByRole('menuitem', { name: 'Sales' })).toBeVisible();
        await page.getByRole('button', { name: 'New' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).click();
        await page.getByRole('combobox', { name: 'Customer' }).fill('**Test SalesCustomer 001**');
        await page.locator('#partner_id_0_0').click();
        await page.getByRole('button', { name: 'Save manually' }).click();
        await expect.soft(page.getByRole('combobox', { name: 'Quotation Template' })).toBeVisible();
        await expect.soft(page.getByRole('combobox', { name: 'Quotation Template' })).toHaveValue('Default Template');
        
    });


    /////////////////////////////////////////////


    test.afterAll(async () => {
        await page.goto(process.env.SERVER_LINK);
        await page.getByRole('button', { name: 'User' }).click();
        await page.getByRole('menuitem', { name: /Log out/i }).click();
        await page.close();
    });
});



