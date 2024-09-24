import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})

//Testing Sliders

test('Sliders', async ({page}) => {
  await page.getByRole('link', { name: 'Sliders' }).click();

  // Set the slider value to '42'
  await page.locator('#slideMe').fill('42');

  // Get the text that displays the Current Value and assert it matches the Slider value
  const currentValueText = await page.getByText('Current value: 42').textContent();
  expect(currentValueText).toContain('Current value: 42'); // Assertion to check the value
});
