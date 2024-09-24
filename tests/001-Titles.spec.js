import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})

test('Has Title', async ({ page }) => {
  await expect(page).toHaveTitle("Learn and Practice Automation | automateNow");
});
