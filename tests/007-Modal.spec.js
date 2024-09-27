// A modal is a special type of dialog used to present information or collect data from the user in an application.

import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
    // Navigate to the webpage before each test
    await page.goto('https://practice-automation.com/');
})

/**
 * Test: Simple Modal
 *
 * Preconditions:
 * - The user must be on the homepage of 'https://practice-automation.com/'.
 * - The 'Modals' link should be visible and functional.
 * 
 * Actions:
 * 1. Click the 'Modals' link to open the Modals page.
 * 2. Click the 'Simple Modal' button to open a simple modal dialog.
 * 3. Verify that the modal's title and body content are correct.
 * 4. Close the modal by clicking the 'Close' button (marked as 'X').
 * 
 * Expected Results:
 * - The modal should appear with the correct content:
 *   - Title: 'Simple Modal'
 *   - Body: 'Hi, I’m a simple modal.'
 * - The modal should close successfully when the 'Close' button is clicked.
 */

test('Simple Modal', async ({ page }) => {
    // Click on the 'Modals' link to navigate to the Modals page
    await page.getByRole('link', { name: 'Modals' }).click(); // Acesse a página de Modals
    // Click the 'Simple Modal' button to open the modal
    await page.getByRole('button', { name: 'Simple Modal' }).click(); // Certifique-se de que o seletor corresponde ao botão correto
    // Verify the modal title and body content
    const modalTitle = await page.locator('#pum_popup_title_1318').textContent(); // Extraindo o texto do título
    const modalBody = await page.getByText('Hi, I’m a simple modal.').textContent(); // Extraindo o texto do corpo do modal
    // Validate the modal's content
    if (modalTitle.trim() === 'Simple Modal' && modalBody.trim() === "Hi, I'm a simple modal.") {
      console.log('The modal content is correct.');
    } else {
      console.error('The modal content is incorrect.');
      console.log(`modalTitle: ${modalTitle.trim()}`);
      console.log(`modalBody: ${modalBody.trim()}`);
    }
    // Close the modal by clicking the 'Close' button
    await page.getByRole('button', { name: 'Close' }).click(); 
});

/**
 * Test: Form Modal
 *
 * Preconditions:
 * - The user must be on the homepage of 'https://practice-automation.com/'.
 * - The 'Modals' link and 'Form Modal' button should be visible and functional.
 * - Form fields ('Name', 'Email', 'Message') must be available inside the modal.
 * 
 * Actions:
 * 1. Click the 'Modals' link to open the Modals page.
 * 2. Wait for the page to fully load.
 * 3. Ensure that the 'Form Modal' button is attached and visible.
 * 4. Click the 'Form Modal' button to open the modal dialog.
 * 5. Verify that the modal title is correct.
 * 6. Fill in the form fields:
 *    - Name: 'Sarah'
 *    - Email: 'sarah@test.com'
 *    - Message: 'Playwright'
 * 7. Submit the form.
 * 
 * Expected Results:
 * - The modal should appear with the correct title: 'Modal Containing A Form'.
 * - The form should be successfully filled and submitted.
 * - The form should validate the input correctly and provide feedback upon submission.
 */

test('Form Modal', async ({ page }) => {
    // Click on 'Modals' link to open the modals page
    await page.getByRole('link', { name: 'Modals' }).click();
    // Wait for network activity to stop (ensures that the page has loaded fully)
    await page.waitForLoadState('networkidle'); 
    // Ensure the 'Form Modal' button is attached and visible in the DOM
    await page.waitForSelector('#formModal', { state: 'attached' });
    await page.waitForSelector('#formModal', { state: 'visible' });
    // Wait for a short period to allow JavaScript to initialize or animations to complete
    await page.waitForTimeout(1000); // Adjust this if you need more/less time
    // Click the 'Form Modal' button
    await page.getByRole('button', { name: 'Form Modal' }).click();
    // Check text content to ensure that the button interaction worked
    const buttonText = await page.getByRole('button', { name: 'Form Modal' }).textContent();
    console.log(`Button Text: ${buttonText}`);
    // Check Form Modal content to see if the fields are loaded correcty
    console.log(await page.locator('#pum_popup_title_674').textContent())
    console.log (await page.getByText('Name(required)').textContent())
    console.log (await page.getByText('Email').textContent())
    console.log (await page.getByText('Message').textContent())
    console.log (await page.getByText('Submit').textContent())
    //Ensure that the modal is visible and check for errors
    const modal = page.locator('#pum_popup_title_674');
    try {
            await modal.waitFor({ state: 'visible', timeout: 20000 });  // Ajuste o timeout conforme necessário
        } catch (error) {
            console.error('The modal did not become visible within the expected time.');
            throw error;  // Relança o erro para falhar o teste
        }
        // Verify the modal title is correct
        const modalTitle = await modal.textContent();
        if (modalTitle.trim() === 'Modal Containing A Form') {
            console.log('The modal title is correct.');
        } else {
            console.error('The modal title is incorrect..');
            return;  // Encerra o teste se o título estiver incorreto
        }
        // Fill the form fields with the provided information
        const nameField = page.getByLabel('Name(required)');
        const emailField = page.getByLabel('Email');
        const messageField = page.getByLabel('Message');

            try {
            await nameField.fill('Sarah');
            await emailField.fill('sarah@test.com');
            await messageField.fill('Playwright');
        } catch (error) {
            console.error('Error while filling the form:', error);
            throw error; 
        }
        // Submit the form
        try {
            await page.getByRole('button', { name: 'Submit' }).click();
        } catch (error) {
            console.error('Erro ao submeter o formulário:', error);
            throw error;  
        }

    });
        