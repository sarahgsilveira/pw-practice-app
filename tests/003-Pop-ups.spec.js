import { test, expect } from '@playwright/test';

/**
 * Test Case: Handle and Validate Pop-up Dialogs
 * 
 * Description:
 * This test navigates to the "Popups" section of the website and verifies the 
 * page title. It then interacts with three types of pop-up dialogs (Alert, 
 * Confirm, and Prompt), validates the messages, and handles each appropriately.
 * 
 * Preconditions:
 * - The browser is initialized.
 * - The page "https://practice-automation.com/" is accessible.
 * - The test navigates to the "Popups" section.
 * 
 * Actions:
 * - Navigate to the "Popups" page.
 * - Trigger and handle the Alert, Confirm, and Prompt pop-ups.
 * 
 * Expected Result:
 * - The Alert pop-up message should be "Hi there, pal!" and should be dismissed.
 * - The Confirm pop-up message should be "OK or Cancel, which will it be?" and should be dismissed.
 * - The Prompt pop-up message should be "Hi there, what's your name?" and should be accepted with the input "Sarah".
 */

test.beforeEach(async({page}) => {
  // Navigate to the webpage before each test
  await page.goto('https://practice-automation.com/');
})

/**
 * Helper function to handle dialog and log its message
 * 
 * @param {object} page - The Playwright page object.
 * @param {string} expectedMessage - The expected dialog message to validate.
 * @param {string} action - The action to perform on the dialog ('accept' or 'dismiss').
 * @param {string|null} inputText - Optional input for dialog if action is 'accept'.
 * @returns {Promise} - Resolves after handling the dialog.
 */

async function handleDialog(page, expectedMessage, action = 'dismiss', inputText = null) {
  return new Promise((resolve) => {
    page.once('dialog', async dialog => {
      const message = dialog.message();
      console.log(`Dialog message: ${message}`);
      // Validate the dialog message
      if (message === expectedMessage) {
        // Accept or dismiss the dialog based on the action
        if (action === 'accept') {
          await dialog.accept(inputText);
        } else {
          await dialog.dismiss();
        }
      }
      resolve();
    });
  });
}

/**
 * Test Case: Pop-ups interaction and validation
 * 
 * Preconditions:
 * - Webpage must be on the 'Popups' page.
 * 
 * Actions:
 * - Trigger the Alert, Confirm, and Prompt pop-ups.
 * - Validate and handle each pop-up accordingly.
 * 
 * Expected Result:
 * - Alert: The dialog message should be "Hi there, pal!" and dismissed.
 * - Confirm: The dialog message should be "OK or Cancel, which will it be?" and dismissed.
 * - Prompt: The dialog message should be "Hi there, what's your name?" and accepted with input "Sarah".
 */

test('Pop-ups', async ({ page }) => {
  // Navigate to the 'Popups' page
  await page.getByRole('link', { name: 'Popups' }).click();
  // Verify the page title
  await expect(page).toHaveTitle("Popups | Practice Automation");
  // Handle Alert pop-up
  await page.getByRole('button', { name: 'Alert Popup' }).click();
  await handleDialog(page, "Hi there, pal!");
  // Handle Confirm pop-up
  await page.getByRole('button', { name: 'Confirm Popup' }).click();
  await handleDialog(page, "OK or Cancel, which will it be?");
  // Handle Prompt pop-up, accept with input 'Sarah'
  await page.getByRole('button', { name: 'Prompt Popup' }).click();
  await handleDialog(page, "Hi there, what's your name?", 'accept', 'Sarah');

});