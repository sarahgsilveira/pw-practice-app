import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})


//Datepicker (select dates of the actual month)
test('DatePicker', async ({ page }) => {
    await page.getByRole('link', { name: 'Calendars' }).click();
    await page.getByLabel('Select or enter a date (YYYY-').click();
  
    // Ensure the date element is visible
    const dateElement = page.getByRole('link', { name: '13' });
    await expect(dateElement).toBeVisible();
  
    // Increase timeout if necessary
    await dateElement.click({ timeout: 60000 });
  
    await page.getByRole('button', { name: 'Submit' }).click();
  
    // Check if the message text is displayed
    const messageHeading = page.getByRole('heading', { name: 'Your message has been sent' });
    await expect(messageHeading).toBeVisible();
  
    // Click 'Go back' and verify the URL
    await page.getByRole('link', { name: 'Go back' }).click();
    await expect(page).toHaveURL('https://practice-automation.com/calendars/?contact-form-hash=412068ef7f61d0abe68f96678b697e83d4b93b37');
  });
  


//Selecting the Actual Date

test('Selecting Current Day', async ({ page }) => {
  // Get today's date
  const today = new Date();
  const day = today.getDate(); // Day of the month (1-31)
  const formattedDay = day < 10 ? `0${day}` : day; // Format day with leading zero if necessary

  // Click to open the date picker
  await page.getByRole('link', { name: 'Calendars' }).click();
  await page.getByLabel('Select or enter a date (YYYY-').click();
  
  // Click the current day
  await page.getByRole('link', { name: formattedDay }).click();
  
  // Click 'Submit' button
  await page.getByRole('button', { name: 'Submit' }).click();

  // Check if the message text is displayed
  const messageHeading = page.getByRole('heading', { name: 'Your message has been sent' });
  await expect(messageHeading).toBeVisible();
  
  // Click 'Go back' and verify the URL
  await page.getByRole('link', { name: 'Go back' }).click();
  await expect(page).toHaveURL('https://practice-automation.com/calendars/?contact-form-hash=412068ef7f61d0abe68f96678b697e83d4b93b37');
});
  

//Selecting Future Dates 
test('Selecting Future Dates', async ({page}) => {
    // Obter a data de hoje
    const today = new Date();
    
    // Adicionar 10 dias à data de hoje
    const targetDate = new Date(today);
    targetDate.setDate(today.getDate() + 10);
  
    // Extrair o dia, mês e ano do décimo dia subsequente
    const targetDay = targetDate.getDate();
    const targetMonth = targetDate.toLocaleString('default', { month: 'long' });
    const targetYear = targetDate.getFullYear();
  
    // Abrir o calendário
    await page.getByRole('link', { name: 'Calendars' }).click();
    await page.getByLabel('Select or enter a date (YYYY-').click();
  
    // Selecionar o ano correto
    const currentYear = await page.textContent('.ui-datepicker-year');
    if (parseInt(currentYear) !== targetYear) {
      await page.selectOption('.ui-datepicker-year', `${targetYear}`);
    }
  
    // Selecionar o mês correto
    const currentMonth = await page.textContent('.ui-datepicker-month');
    if (currentMonth !== targetMonth) {
      await page.selectOption('.ui-datepicker-month', targetMonth);
    }
  
    // Selecionar o décimo dia seguinte
    await page.click(`.ui-datepicker-calendar td a:text("${targetDay}")`);
  
    // Clicar no botão "Submit"
    await page.getByRole('button', { name: 'Submit' }).click();
  })