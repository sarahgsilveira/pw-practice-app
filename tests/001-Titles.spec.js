import { test, expect } from '@playwright/test';

/**
 * Test Case: Verify that the page title is correct.
 * 
 * Description:
 * This test navigates to the "https://practice-automation.com/" website 
 * and verifies that the page title is "Learn and Practice Automation | automateNow".
 * 
 * Preconditions:
 * - The browser is initialized.
 * - The page "https://practice-automation.com/" must be accessible and load correctly.
 * 
 * Actions:
 * - Navigate to the webpage.
 * - Check the page's title.
 * 
 * Expected Result:
 * - The page's title should be: "Learn and Practice Automation | automateNow".
 */

test.beforeEach(async({page}) => {
  // Navigate to the website before each test
  await page.goto('https://practice-automation.com/');
})

// Test to verify the page title
test('Has Title', async ({ page }) => {
  // Check if the page title matches the expected title
  await expect(page).toHaveTitle("Learn and Practice Automation | automateNow");
  
});
