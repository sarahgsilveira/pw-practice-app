import { test, expect } from '@playwright/test';

/**
 * Test Case: Adjust Slider and Verify Displayed Value
 * 
 * Preconditions:
 * - The webpage must have a slider control that adjusts its value and updates a 
 *   visible display showing the current value.
 * 
 * Actions:
 * - Adjust the slider input value to 42.
 * - Verify that the displayed text correctly reflects the new slider value.
 * 
 * Expected Result:
 * - The text "Current value: 42" should be displayed after adjusting the slider.
 */

test.beforeEach(async({page}) => {
  // Navigate to the webpage before each test
  await page.goto('https://practice-automation.com/');
})

test('Sliders', async ({page}) => {
  // Navigate to the 'Sliders' page
  await page.getByRole('link', { name: 'Sliders' }).click();
  // Set the slider to the value '42'
  await page.locator('#slideMe').fill('42');
  // Get the text displaying the current value and verify it matches the slider's value
  const currentValueText = await page.getByText('Current value: 42').textContent();
  expect(currentValueText).toContain('Current value: 42'); // Assertion to check the value
});
