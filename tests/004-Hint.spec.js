import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})

//Testing a hint
test('Check tooltip text on click', async ({ page }) => {
  await page.goto('https://practice-automation.com/');
  await page.getByRole('link', { name: 'Popups' }).click();
  await page.getByText('<< click me to see a tooltip').click();

  const tooltip = await page.getByText('Cool text');
  await expect(tooltip).toBeVisible(); // Assertion to check visibility

  await page.getByText('Cool text').click();
});
