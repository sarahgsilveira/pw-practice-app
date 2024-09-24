import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})

// Helper function to handle dialog and log its message
//handleDialog function: This reusable function takes care of handling dialogs. 
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

test('Pop-ups', async ({ page }) => {

  await page.getByRole('link', { name: 'Popups' }).click();
  await expect(page).toHaveTitle("Popups | Practice Automation");

  await page.getByRole('button', { name: 'Alert Popup' }).click();
  await handleDialog(page, "Hi there, pal!");

  await page.getByRole('button', { name: 'Confirm Popup' }).click();
  await handleDialog(page, "OK or Cancel, which will it be?");
  
  await page.getByRole('button', { name: 'Prompt Popup' }).click();
  await handleDialog(page, "Hi there, what's your name?", 'accept', 'Sarah');

});