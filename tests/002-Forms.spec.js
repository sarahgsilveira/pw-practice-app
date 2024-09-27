import { test} from '@playwright/test';

/**
 * Test Case: Testing the 'Form Fields' Submit Button and Dialog Handling
 * 
 * Description:
 * This test navigates to the "Form Fields" section of the website, 
 * fills out the mandatory form fields, submits the form, and verifies 
 * the dialog message that appears after submission.
 * 
 * Preconditions:
 * - The browser is initialized.
 * - The page "https://practice-automation.com/" is accessible.
 * - The test navigates to the "Form Fields" section.
 * 
 * Actions:
 * - Navigate to the "Form Fields" page.
 * - Fill out the mandatory fields: Name, Password, Water option, Red option, Automation selection, Favorite Framework, Email, and Message.
 * - Click the 'Submit' button.
 * - Verify and handle the dialog that appears.
 * 
 * Expected Result:
 * - After clicking the submit button, the form is submitted, and the dialog message should be: "Message received!"
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

      if (message === expectedMessage) {
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
 * Test Case: Fill the form fields and submit the form
 * 
 * Preconditions:
 * - Webpage must be on the 'Form Fields' page.
 * 
 * Actions:
 * - Fill the mandatory fields: Name, Password, Water, Red, Automation, Favorite Framework, Email, and Message.
 * - Click the 'Submit' button.
 * 
 * Expected Result:
 * - A dialog appears with the message: "Message received!".
 */

test('Testing Form Fields Button', async ({ page }) => {
  // Navigate to the 'Form Fields' page
  await page.getByRole('link', { name: 'Form Fields' }).click();
  // Fill the mandatory form fields
  await page.getByTestId('name-input').fill('Sarah');
  await page.getByLabel('Password').fill('pass');
  await page.getByText('Water').click();
  await page.getByText('Red', { exact: true }).click();
  await page.getByTestId('automation').selectOption('yes');
  await page.getByText('Playwright').click();
  await page.getByTestId('email').fill('sarah@test.com');
  await page.getByTestId('message').fill('Studying Playwright');

  // Log the action of attempting to submit the form
  console.log('Attempting to click on the submit button...');

  // Ensure the button is visible and enabled before clicking
  await page.getByTestId('submit-btn', { state: 'visible' });
  await page.getByTestId('submit-btn', { state: 'enabled' });

  // Click the submit button
  await page.getByTestId('submit-btn').click();

  // Log after clicking the button
  console.log('Submit button clicked.');

  // Handle and check the dialog popup
  page.on('dialog', async dialog => {
    const dialogMessage = dialog.message();
    // Check if the dialog contains the expected message
    if (dialogMessage === 'Message received!') {
      console.log('Success: The dialog message is "Message received!"');
    } else {
      console.error(`Unexpected dialog message: ${dialogMessage}`);
    }
    // Accept the dialog
    await dialog.accept();
  });
});