import { test, expect } from '@playwright/test';

/**
 * Test Suite: Dropdown Selection Test
 *
 * Actions:
 * - Click on the dropdown list.
 * - Verify the options "Option 1" and "Option 2" are displayed.
 * - Select "Option 1".
 * - Select "Option 2".
 * - Select "Option 1" again.
 * - Close the dropdown with the last option selected.
 *
 * Expected Results:
 * - The dropdown should contain the correct options.
 * - The selected options should change accordingly.
 * - The dropdown must show the last option selected when closed.
 */
test.beforeEach(async({page}) => {
  // Navigate to the webpage before each test
  await page.goto('https://the-internet.herokuapp.com/');
})

test('Dropdown Selection Test', async ({ page }) => {
  // Action: Click on the "Click Events" link.
  await page.getByRole('link', { name: 'Dropdown' }).click();
  // Action: Click on the dropdown list to open it.
  const dropdown = await page.locator('#dropdown');
  await dropdown.click();

  // Action: Verify the options are displayed.
  const options = await dropdown.locator('option');
  
  // Retrieve option texts
  const optionTexts = await options.allTextContents();

  // Log the option texts
  console.log(`Dropdown options: ${optionTexts.join(', ')}`);

  // Expected Results: Verify the dropdown options
  await expect(optionTexts).toContain('Option 1');
  await expect(optionTexts).toContain('Option 2');

  // Action: Select "Option 1"
  await dropdown.selectOption('1'); // Selecting by value
  await expect(dropdown).toHaveValue('1'); // Verify selection
  console.log(`Selected: ${await dropdown.locator('option:checked').textContent()}`);

  // Action: Select "Option 2"
  await dropdown.selectOption('2'); // Selecting by value
  await expect(dropdown).toHaveValue('2'); // Verify selection
  console.log(`Selected: ${await dropdown.locator('option:checked').textContent()}`);

  // Action: Select "Option 1" again
  await dropdown.selectOption('1'); // Selecting by value
  await expect(dropdown).toHaveValue('1'); // Verify selection
  console.log(`Selected: ${await dropdown.locator('option:checked').textContent()}`);

  // Action: Close the dropdown with the last option selected ("Option 1")
  // The dropdown is a `select` element, so it automatically closes after selecting an option.
  // To simulate the closure, we simply verify that "Option 1" is the final selected value.
  await expect(dropdown).toHaveValue('1'); // Ensure the dropdown shows "Option 1" when closed.

  console.log('Dropdown closed with the last option selected: Option 1');
});

/**

Code Explanation:
Dropdown Actions:

The script clicks the dropdown and retrieves the options ("Option 1" and "Option 2").
It selects "Option 1", then "Option 2", and finally "Option 1" again.
Expected Results:

After each selection, the script checks that the correct option is selected using await expect(dropdown).toHaveValue(...).
Closing the Dropdown:

For select elements, the dropdown automatically closes after making a selection. Therefore, no extra code is needed to "close" the dropdown explicitly. The key verification is that the last selected option is "Option 1".
Logging:

The actual selected option is logged at each step for verification.
Final Assertion:

The script ensures that after all actions, the final option selected is "Option 1".
 */