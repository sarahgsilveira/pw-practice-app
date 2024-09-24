//A modal is a special type of dialog that is used to present the user with some information or
// to get data from the end user of an application. 

import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})

test('Simple Modal', async ({ page }) => {
    // Clicar no link 'Modals'
    await page.getByRole('link', { name: 'Modals' }).click(); // Acesse a página de Modals

    // Clicar no botão 'Simple Modal'
    await page.getByRole('button', { name: 'Simple Modal' }).click(); // Certifique-se de que o seletor corresponde ao botão correto

    // Verificar o conteúdo do modal
    const modalTitle = await page.locator('#pum_popup_title_1318').textContent(); // Extraindo o texto do título
    const modalBody = await page.getByText('Hi, I’m a simple modal.').textContent(); // Extraindo o texto do corpo do modal
  
    // Validar se o conteúdo é o esperado
    if (modalTitle.trim() === 'Simple Modal' && modalBody.trim() === "Hi, I'm a simple modal.") {
      console.log('O conteúdo do modal está correto.');
    } else {
      console.error('O conteúdo do modal está incorreto.');
      console.log(`modalTitle: ${modalTitle.trim()}`);
      console.log(`modalBody: ${modalBody.trim()}`);
    }
  
    // Clicar no botão 'X' para fechar o modal
    await page.getByRole('button', { name: 'Close' }).click(); // Certifique-se de que o seletor corresponde ao botão de fechar corretamente
});


//Form Modal

test('Form Modal', async ({ page }) => {

   // Step 1: Click on 'Modals' link to open the modals page
   await page.getByRole('link', { name: 'Modals' }).click();

   // Step 2: Wait for network activity to stop (ensures that the page has loaded fully)
   await page.waitForLoadState('networkidle'); 

   // Step 3: Ensure the 'Form Modal' button is attached and visible in the DOM
   await page.waitForSelector('#formModal', { state: 'attached' });
   await page.waitForSelector('#formModal', { state: 'visible' });

   // Step 4: Wait for a short period to allow JavaScript to initialize or animations to complete
   await page.waitForTimeout(1000); // Adjust this if you need more/less time

   // Step 5: Click the 'Form Modal' button
   await page.getByRole('button', { name: 'Form Modal' }).click();

   // Step 6: Check text content to ensure that the button interaction worked
   const buttonText = await page.getByRole('button', { name: 'Form Modal' }).textContent();
   console.log(`Button Text: ${buttonText}`);

   //Check Form Modal content to see if the fields are loaded correcty
   console.log(await page.locator('#pum_popup_title_674').textContent())
   console.log (await page.getByText('Name(required)').textContent())
   console.log (await page.getByText('Email').textContent())
   console.log (await page.getByText('Message').textContent())
   console.log (await page.getByText('Submit').textContent())

   const modal = page.locator('#pum_popup_title_674');
   try {
        await modal.waitFor({ state: 'visible', timeout: 20000 });  // Ajuste o timeout conforme necessário
    } catch (error) {
        console.error('O modal não ficou visível no tempo esperado.');
        throw error;  // Relança o erro para falhar o teste
    }

    // Verificar o título do modal
    const modalTitle = await modal.textContent();
    if (modalTitle.trim() === 'Modal Containing A Form') {
        console.log('O título do modal está correto.');
    } else {
        console.error('O título do modal está incorreto.');
        return;  // Encerra o teste se o título estiver incorreto
    }

   //Preencher o formulário
    const nameField = page.getByLabel('Name(required)');
    const emailField = page.getByLabel('Email');
    const messageField = page.getByLabel('Message');

        try {
        await nameField.fill('Sarah');
        await emailField.fill('sarah@test.com');
        await messageField.fill('Playwright');
    } catch (error) {
        console.error('Erro ao preencher o formulário:', error);
        throw error;  // Relança o erro para falhar o teste
    }

    // Submeter o formulário
    try {
        await page.getByRole('button', { name: 'Submit' }).click();
    } catch (error) {
        console.error('Erro ao submeter o formulário:', error);
        throw error;  // Relança o erro para falhar o teste
    }

  });
    