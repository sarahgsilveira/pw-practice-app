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

test('Downloading .Docx File via File name', async ({ page }) => {
    // Preconditions: Check if the file exists and delete if it does
    // Step 1: Click on the file name to download
    await page.getByRole('link', { name: 'Sandbox Download Form - .docx' }).click();
  
    // Step 2: Wait for the download event after clicking the download link
    const downloadPromise = page.waitForEvent('download', { timeout: 60000 }); // Increase timeout

    // Step 3: Click on the download link
    await page.click('a.wpdm-download-link'); // Use the correct selector

    // Step 4: Wait for the download to complete
    const download = await downloadPromise;

    // Step 4: Define the folder where the file should be saved (C:\Users\Sarah\Downloads)
    const downloadDir = 'C:\\Users\\Sarah\\Downloads'; // Windows-specific path

    // Step 5: Define the file path and save the downloaded file
    const filePath = path.join(downloadDir, 'test.pdf');
    await download.saveAs(filePath);

    // Step 6: Verify that the file exists in the folder
    const fileExists = fs.existsSync(filePath);
    expect(fileExists).toBe(true); // Check if the file exists
    console.log(fileExists ? 'PDF file was downloaded successfully.' : 'File not found.');

    // Optional: Add more verification such as checking file size or content
    const stats = fs.statSync(filePath);
    console.log(`File size: ${stats.size} bytes`);
   


   
});

test('Downloading .Docx File via File name - Wrong PSD', async ({ page }) => {
    await page.getByRole('link', { name: 'Sandbox Download Form - .docx' }).click();
    await page.getByRole('link', { name: 'Download' }).click();

    await page.waitForLoadState('networkidle'); 
    await page.waitForSelector('#modal-content', { state: 'attached' });
    await page.waitForSelector('#modal-content', { state: 'visible' });
    // await page.locator('#wpdm-lock-frame').contentFrame().getByPlaceholder('Enter Password').click();
    // await page.locator('#wpdm-lock-frame').contentFrame().getByPlaceholder('Enter Password').fill('automatenow');
    // await page.locator('#wpdm-lock-frame').contentFrame().getByRole('button', { name: 'Submit' }).click();
    // await page.locator('#wpdm-lock-frame').contentFrame().getByText('Wrong Password! Try Again').click();
});

