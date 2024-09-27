import { test, expect } from '@playwright/test';

/**
 * Test Case: DatePicker - Select Date from Current Month
 * 
 * Description:
 * This test navigates to the "Calendars" section, selects the 13th day of the current month 
 * from the date picker, submits the form, and verifies that the message "Your message has been sent" 
 * is displayed.
 * 
 * Preconditions:
 * - The browser is initialized and navigates to the page.
 * - The date picker widget must be functional and visible on the page.
 * 
 * Actions:
 * - Open the calendar.
 * - Select the 13th day of the current month.
 * - Submit the form.
 * 
 * Expected Result:
 * - The form is successfully submitted, and the confirmation message is displayed.
 * - The user is able to navigate back to the previous page.
 */

test.beforeEach(async({page}) => {
  // Navigate to the webpage before each test
  await page.goto('https://practice-automation.com/');
})

test('DatePicker - Select Date from Current Month', async ({ page }) => {
    await page.getByRole('link', { name: 'Calendars' }).click();
    await page.getByLabel('Select or enter a date (YYYY-').click();
    // Select the 13th day
    const dateElement = page.getByRole('link', { name: '13' });
    await expect(dateElement).toBeVisible();
    // Increase timeout if necessary
    await dateElement.click({ timeout: 60000 });
    // Submit the form
    await page.getByRole('button', { name: 'Submit' }).click();
    // Verify the success message
    const messageHeading = page.getByRole('heading', { name: 'Your message has been sent' });
    await expect(messageHeading).toBeVisible();
    // Navigate back and verify URL
    await page.getByRole('link', { name: 'Go back' }).click();
    await expect(page).toHaveURL('https://practice-automation.com/calendars/?contact-form-hash=412068ef7f61d0abe68f96678b697e83d4b93b37');
  });
  
/**
 * Test Case: Select Current Day from DatePicker
 * 
 * Description:
 * This test dynamically selects today's date from the date picker, submits the form, and verifies 
 * the confirmation message.
 * 
 * Preconditions:
 * - The browser is initialized and navigates to the page.
 * - The date picker widget must be functional and visible.
 * 
 * Actions:
 * - Open the calendar.
 * - Select today's date.
 * - Submit the form.
 * 
 * Expected Result:
 * - The form is successfully submitted, and the confirmation message is displayed.
 * - The user is able to navigate back to the previous page.
 */

test('Selecting Current Day', async ({ page }) => {
  // Get today's date
  const today = new Date();
  const day = today.getDate(); // Day of the month (1-31)
  const formattedDay = day < 10 ? `0${day}` : day; // Format day with leading zero if necessary
  // Open the date picker and select today's date
  await page.getByRole('link', { name: 'Calendars' }).click();
  await page.getByLabel('Select or enter a date (YYYY-').click();
  // Click the current day
  await page.getByRole('link', { name: formattedDay }).click();
  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();
  // Verify the success message
  const messageHeading = page.getByRole('heading', { name: 'Your message has been sent' });
  await expect(messageHeading).toBeVisible();
  // Navigate back and verify URL
  await page.getByRole('link', { name: 'Go back' }).click();
  await expect(page).toHaveURL('https://practice-automation.com/calendars/?contact-form-hash=412068ef7f61d0abe68f96678b697e83d4b93b37');
});
  
/**
 * Test Case: Select Future Date from DatePicker
 * 
 * Description:
 * This test selects a date 10 days from the current date, ensuring the correct month 
 * and year are selected, submits the form, and verifies the confirmation message.
 * 
 * Preconditions:
 * - The browser is initialized and navigates to the page.
 * - The date picker widget must be functional and visible.
 * 
 * Actions:
 * - Open the date picker.
 * - Select a future date (10 days from today).
 * - Submit the form.
 * 
 * Expected Result:
 * - The form is successfully submitted, and the confirmation message is displayed.
 */

test('Selecting Future Dates', async ({page}) => {
  // Get today's date
  const today = new Date();
  // Add 10 days to today's date
  const targetDate = new Date(today);
  targetDate.setDate(today.getDate() + 10);
  // Extract the day, month and year of the subsequent tenth day
  const targetDay = targetDate.getDate();
  const targetMonth = targetDate.toLocaleString('default', { month: 'long' });
  const targetYear = targetDate.getFullYear();
  // Open the calendar and select the date
  await page.getByRole('link', { name: 'Calendars' }).click();
  await page.getByLabel('Select or enter a date (YYYY-').click();
  // Ensure the correct year is selected
  const currentYear = await page.textContent('.ui-datepicker-year');
  if (parseInt(currentYear) !== targetYear) {
      await page.selectOption('.ui-datepicker-year', `${targetYear}`);
    }
  // Ensure the correct month is selected
  const currentMonth = await page.textContent('.ui-datepicker-month');
    if (currentMonth !== targetMonth) {
      await page.selectOption('.ui-datepicker-month', targetMonth);
    }
  // Select the correct day
  await page.click(`.ui-datepicker-calendar td a:text("${targetDay}")`);
  // Submit the form
  await page.getByRole('button', { name: 'Submit' }).click();
  })