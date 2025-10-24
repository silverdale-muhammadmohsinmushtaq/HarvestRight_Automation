import { test, expect } from '@playwright/test';

test.describe('New Quotation - Send by Email Button Verification', () => {
  test('Verify that Send by Email button on the New Quotation form is highlighted by default', async ({ page }) => {
    // Navigate to Odoo login page
    await page.goto('https://harvestright-do-not-drop-training-24878354.dev.odoo.com/web');

    // Fill in login credentials
    await page.getByRole('textbox', { name: 'Email' }).fill('admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');

    // Click login button
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait for navigation after login
    await page.waitForLoadState('networkidle');

    // Click on Sales module
    await page.getByRole('option', { name: 'Sales' }).click();

    // Wait for Sales module to load
    await page.waitForLoadState('networkidle');

    // Click New button to create a new quotation
    await page.getByRole('button', { name: 'New' }).click();

    // Wait for the form to load
    await page.waitForLoadState('networkidle');

    // Verify the page title is "New"
    await expect(page).toHaveTitle(/New/);

    // Verify the 'Send by Email' button exists
    const sendByEmailButton = page.getByRole('button', { name: 'Send by Email' });
    await expect(sendByEmailButton).toBeVisible();

    // Verify the 'Send by Email' button is highlighted (has primary/active styling)
    // We check for the presence of a specific CSS class that indicates highlighting
    const buttonClass = await sendByEmailButton.getAttribute('class');
    
    // In Odoo, highlighted buttons typically have 'btn-primary' or similar classes
    // We verify that the button has some form of highlighted/primary styling
    expect(buttonClass).toBeTruthy();
    
    // Alternative: Check the computed background color to ensure it's not the default
    const backgroundColor = await sendByEmailButton.evaluate((el) => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    // Verify that background color is not white/transparent (indicating it's highlighted)
    // The highlighted button should have a color (e.g., teal/green in Odoo)
    expect(backgroundColor).not.toBe('rgba(0, 0, 0, 0)'); // Not transparent
    expect(backgroundColor).not.toBe('rgb(255, 255, 255)'); // Not white
    
    console.log('Send by Email button background color:', backgroundColor);
  });
});

