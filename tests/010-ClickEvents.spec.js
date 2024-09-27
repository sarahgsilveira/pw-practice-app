import { test, expect } from '@playwright/test';

/**
 * Test Suite: Click to Check an Event
 *
 * Preconditions:
 * - Navigate to the practice automation webpage before each test.
 *
 * Actions:
 * - Click on the "Click Events" link to navigate to the Click Events page.
 * - Click on the "Cat" button to trigger the cat sound event and verify it displays "Meow!".
 * - Click on the "Pig" button to trigger the pig sound event and verify it displays "Oink!".
 *
 * Expected Results:
 * - The page title should be "Click Events | Practice Automation".
 * - The text for the cat event should display "Meow!".
 * - The text for the pig event should display "Oink!".
 */

test.beforeEach(async({page}) => {
  // Navigate to the webpage before each test
  await page.goto('https://practice-automation.com/');
})

test('Click to Check an Event', async ({ page }) => {
  // Action: Click on the "Click Events" link.
  await page.getByRole('link', { name: 'Click Events' }).click();
  // Expected Result: Verify the page title.
  await expect(page).toHaveTitle("Click Events | Practice Automation");
  // Action: Click on the "Cat" button.
  await page.getByRole('button', { name: 'Cat' }).click();
  // Action: Verify the displayed text for the cat event.
  const catText = await page.locator('#demo');
  await expect(catText).toHaveText('Meow!');
  // Action: Log the actual text displayed for the cat event.
  const actualText = await catText.textContent();
  console.log(`The actual text is: ${actualText}`);

  // Action: Click on the "Pig" button.
  await page.getByRole('button', { name: 'Pig' }).click();
  // Action: Verify the displayed text for the pig event.
  const pigText = await page.locator('#demo');
  await expect(pigText).toHaveText('Oink!');
  // Action: Log the actual text displayed for the pig event.
  const pigActualText = await pigText.textContent();
  console.log(`The actual text is: ${pigActualText}`);
});