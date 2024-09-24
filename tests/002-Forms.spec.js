import { test} from '@playwright/test';

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


test('Testing Form Fields Button', async ({ page }) => {
  await page.getByRole('link', { name: 'Form Fields' }).click();
  await page.getByTestId('name-input').click();
  await page.getByTestId('name-input').fill('Sarah');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pass');
  await page.getByText('Water').click();
  await page.getByText('Red', { exact: true }).click();
  await page.getByTestId('automation').selectOption('yes');
  await page.getByText('Playwright').click();
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('sarah@test.com');
  await page.getByTestId('message').fill('Studying Playwright');
  await page.getByTestId('message').click();
  await page.getByTestId('message').fill('Learning');
  await page.getByTestId('submit-btn').click();

  await handleDialog(page, "Message received!");

});

