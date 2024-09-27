import { test, expect } from '@playwright/test';

/**
 * Test Case: Verify Tooltip Visibility on Click
 * 
 * Description:
 * This test navigates to the "Popups" section of the website, clicks on an element 
 * to trigger a tooltip, and checks whether the tooltip text is visible. 
 * The tooltip is then clicked to simulate interaction.
 * 
 * Preconditions:
 * - The browser is initialized.
 * - The page "https://practice-automation.com/" is accessible.
 * - The test navigates to the "Popups" section where the tooltip element is present.
 * 
 * Actions:
 * - Navigate to the "Popups" page.
 * - Click on the element labeled "<< click me to see a tooltip" to trigger the tooltip.
 * - Verify that the tooltip with the text "Cool text" is visible.
 * - Interact by clicking the tooltip text.
 * 
 * Expected Result:
 * - The tooltip with the text "Cool text" should appear and be visible after clicking the trigger element.
 * - The tooltip should be clickable.
 */


test.beforeEach(async({page}) => {
  // Navigate to the webpage before each test
  await page.goto('https://practice-automation.com/');
})

/**
 * Test Case: Check Tooltip Text Visibility on Click
 * 
 * Preconditions:
 * - The webpage should display a clickable element that triggers a tooltip.
 * 
 * Actions:
 * - Click the element that triggers the tooltip.
 * - Verify the tooltip text "Cool text" becomes visible.
 * - Click the tooltip text.
 * 
 * Expected Result:
 * - The tooltip becomes visible, and the text "Cool text" is displayed and clickable.
 */

test('Check tooltip text on click', async ({ page }) => {
  // Navigate to the 'Popups' page
  await page.goto('https://practice-automation.com/');
  await page.getByRole('link', { name: 'Popups' }).click();
  // Click to display the tooltip
  await page.getByText('<< click me to see a tooltip').click();
  // Find the tooltip and verify it is visible
  const tooltip = await page.getByText('Cool text');
  await expect(tooltip).toBeVisible(); // Assertion to check visibility
  // Click the tooltip text to simulate interaction
  await page.getByText('Cool text').click();
});
