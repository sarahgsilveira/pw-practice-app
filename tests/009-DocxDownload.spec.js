//A modal is a special type of dialog that is used to present the user with some information or
// to get data from the end user of an application. 

import { test, expect } from '@playwright/test';

//You need to declare const path = require('path'); and const fs = require('fs'); 
//because these modules provide essential functionality for handling file paths and interacting with the file system in Node.js.
const path = require('path');
const fs = require('fs'); 
// Declare the file path at the top so it can be used in both the test and the beforeEach hook
const https = require('https'); // Import https module
const filePath = 'C:\\Users\\Sarah\\Downloads\\test.docx'; // Location of the PDF file

test.beforeEach(async({page}) => {
    // Step 1: Go to Main Page
    await page.goto('https://practice-automation.com/');
    
    // Step 2: Click on File Download button
    await page.getByRole('link', { name: 'File Download' }).click();
  
     // Step 3: Check if the file exists and delete if it does
    if (fs.existsSync(filePath)) {
        console.log('test.docx found.');
      
        // If the file exists, delete it
        try {
          fs.unlinkSync(filePath);
          console.log('test.docx successfully deleted.');
         } catch (err) {
          console.error('Error deleting file:', err);
         }
    } else {
      console.log('test.docx not found.');
  }
});

// Requirements:
// Navigate to the page and click on the link to open the download page.
// Click on the "Download" button, which triggers a modal.
// Enter the password into the modal and click the "Submit" button.
// Check and delete an existing file called test.docx from C:\Users\Sarah\Downloads before proceeding with the download.
// Download the new file and ensure the workflow completes successfully.

test('Downloading .Docx File via File name', async ({ page }) => {
    // Click on the Sandbox Download Form link
    await page.click('h3.package-title >> text=Sandbox Download Form - .docx');

    // Wait for the download button to be visible
    await page.waitForSelector('a.wpdm-download-link');
    
    // Click the download button
    await page.click('a.wpdm-download-link');

    //Wait for network activity to stop (ensures that the page has loaded fully)
    await page.waitForLoadState('networkidle'); 

    // Ensure the modal is visible and enabled
    await page.getByTestId('modal-content', { state: 'visible' });
    await page.getByTestId('modal-content', { state: 'enabled' });

    // Wait for a short period to allow JavaScript to initialize or animations to complete
    await page.waitForTimeout(2000); // Adjust this if you need more/less time

    const downloadText = await page.getByRole('Download');
    console.log('Text content inside modal:', downloadText);

 // Handle the frame containing the password field (if it's in an iframe)
 const frame = await page.frameLocator('#wpdm-lock-frame'); // Ensure frame is correctly targeted

 // Wait for the password input inside the frame
 await frame.locator('#wpdm-lock-frame').waitFor({ timeout: 5000 });


 // Fill the password field in the modal inside the frame
 await frame.locator('#password_66f43ef2bac10_921').fill('automateNow');

 // Click the submit button inside the frame
 await frame.locator('#wpdm_submit_66f43ef2bac10_921').click();

 // Wait for the download to trigger (adjust timeout if needed)
 await page.waitForTimeout(3000);

 // Monitor for the download event
 const [download] = await Promise.all([
     page.waitForEvent('download'),
     // Perform action that triggers the download
 ]);

 // Define the path for the downloaded file
 const downloadFolder = 'C:\\Users\\Sarah\\Downloads';
 const downloadPath = path.join(downloadFolder, await download.suggestedFilename());

 // Save the downloaded file to your preferred directory
 await download.saveAs(downloadPath);

 console.log(`File downloaded to: ${downloadPath}`);
});