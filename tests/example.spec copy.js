import { test, expect } from '@playwright/test';

test.beforeEach(async({page}) => {
  await page.goto('https://practice-automation.com/');
})

// Helper function to handle dialog and log its message
//handleDialog function: This reusable function takes care of handling dialogs. 
async function handleDialog(page, expectedMessage, action = 'dismiss', inputText = null) {
  return new Promise((resolve) => {
    page.once('dialog', async dialog => {
      const message = dialog.message();
      console.log(`Dialog message: ${message}`);

      if (message === expectedMessage) {
        if (action === 'accept') {
          await dialog.accept(inputText);
        } else {
          await dialog.dismiss();
        }
      }
      resolve();
    });
  });
}

test('Has Title', async ({ page }) => {
  await expect(page).toHaveTitle("Learn and Practice Automation | automateNow");
});


                //Testing Buttons

//Java Script Button
// test('Testing Java Script Button', async ({ page }) => {
//   await page.getByRole('link', { name: 'JavaScript Delays' }).click();
//   await page.getByRole('button', { name: 'Start' }).click();
//   //Checking if the counting down is working
//   const countdownLabel = await page.locator('#delay').inputValue();
//   let previousValue = await countdownLabel.textContent();

  
//   console.info(`the previous value is: '${previousValue}'`);

//   expect(previousValue).toBe('10'); // Verifica se o countdown começa em 10

//  // Loop para verificar se o countdown diminui ao longo do tempo
//   for (let i = 0; i < 10; i++) { // Verificar por 10 segundos
//     await page.waitForTimeout(1000); // Espera 1 segundo entre as verificações
//     const currentValue = await countdownLabel.textContent();

//   // Verifica se o countdown não está mostrando 'Liftoff!' e se o valor mudou
//     if (previousValue !== 'Liftoff!') {
//     expect(currentValue).not.toBe(previousValue); // Verifica que o valor mudou
//     previousValue = currentValue; // Atualiza o valor anterior

//    // Verifica se o countdown terminou com 'Liftoff'
//     const finalValue = await countdownLabel.textContent();
//     expect(finalValue).toBe('Liftoff!'); // Verifica que o texto final é 'Liftoff'
//     }
//   }
// })

//Testing Form Fields Button

test('Testing Form Fields Button', async ({ page }) => {
  await page.getByRole('link', { name: 'Form Fields' }).click();
  await page.getByTestId('name-input').click();
  await page.getByTestId('name-input').fill('Sarah');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('pass');
  await page.getByText('Water').click();
  await page.getByText('Red', { exact: true }).click();
  await page.getByTestId('automation').selectOption('yes');
  await page.getByText('Playwright').click();
  await page.getByTestId('email').click();
  await page.getByTestId('email').fill('sarah@test.com');
  await page.getByTestId('message').fill('Studying Playwright');
  await page.getByTestId('message').click();
  await page.getByTestId('message').fill('Learning');
  await page.getByTestId('submit-btn').click();

  await handleDialog(page, "Message received!");

});

test('Pop-ups', async ({ page }) => {

  await page.getByRole('link', { name: 'Popups' }).click();
  await expect(page).toHaveTitle("Popups | Practice Automation");

  await page.getByRole('button', { name: 'Alert Popup' }).click();
  await handleDialog(page, "Hi there, pal!");

  await page.getByRole('button', { name: 'Confirm Popup' }).click();
  await handleDialog(page, "OK or Cancel, which will it be?");
  
  await page.getByRole('button', { name: 'Prompt Popup' }).click();
  await handleDialog(page, "Hi there, what's your name?", 'accept', 'Sarah');

});

//Testing a hint
test('Check tooltip text on click', async ({ page }) => {
  await page.goto('https://practice-automation.com/');
  await page.getByRole('link', { name: 'Popups' }).click();
  await page.getByText('<< click me to see a tooltip').click();

  const tooltip = await page.getByText('Cool text');
  await expect(tooltip).toBeVisible(); // Assertion to check visibility

  await page.getByText('Cool text').click();
});

//Testing Sliders

test('Sliders', async ({page}) => {

  //First aproach of how you can interact with sliders
  
    // //Update atributte
  
      // const tempGauge = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger circle')
      // await tempGauge.evaluate (node =>{
      //     node.setAttribute('cx', '232.630')
      //     node.setAttribute('cy', '232.630')
  
    // })
      // await tempGauge.click()
  
    //Second approach, to simulate the actual mouse movement to chage the value of Gauge
      const tempBox = page.locator ('[tabtitle="Temperature"] ngx-temperature-dragger ')
      await tempBox.scrollIntoViewIfNeeded()
      
      const box = await tempBox.boundingBox()  //Bounding Box = X,Y cordinate position
      const x = box.x + box.width/ 2
      const y = box.y + box.height / 2
          await page.mouse.move(x,y)
          await page.mouse.down() //to press the right click of the mouse
          await page.mouse.move(x +100, y)
          await page.mouse.move(x +100, y+100)
          await page.mouse.up() //to unpress the right click of the mouse
          await expect(tempBox).toContainText('30')
  
  })  
