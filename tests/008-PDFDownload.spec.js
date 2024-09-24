//A modal is a special type of dialog that is used to present the user with some information or
// to get data from the end user of an application. 

import { test, expect } from '@playwright/test';

//You need to declare const path = require('path'); and const fs = require('fs'); 
//because these modules provide essential functionality for handling file paths and interacting with the file system in Node.js.
const path = require('path');
const fs = require('fs'); 
// Declare the file path at the top so it can be used in both the test and the beforeEach hook
const https = require('https'); // Import https module
const filePath = 'C:\\Users\\Sarah\\Downloads\\test.pdf'; // Location of the PDF file


test.beforeEach(async({page}) => {
    // Step 1: Go to Main Page
    await page.goto('https://practice-automation.com/');
    
    // Step 2: Click on File Download button
    await page.getByRole('link', { name: 'File Download' }).click();
  
     // Step 3: Check if the file exists and delete if it does
    if (fs.existsSync(filePath)) {
        console.log('test.pdf found.');
      
        // If the file exists, delete it
        try {
          fs.unlinkSync(filePath);
          console.log('test.pdf successfully deleted.');
         } catch (err) {
          console.error('Error deleting file:', err);
         }
    } else {
      console.log('test.pdf not found.');
  }
});

test('Title-Files to Download ', async ({ page }) => {
    await expect(page).toHaveTitle("File Download | Practice Automation");
    console.log(await page.locator('title').textContent())
})

test('Files to Download ', async ({ page }) => {
    // Step 1: Check if there's file into "File Download"
    await page.waitForSelector('a');

    // Step 2: Locate all anchor tags
    const links = await page.locator('a');
    const linkCount = await links.count();

    // Debugging: Print out all href attributes and link texts
    console.log(`Total links found: ${linkCount}`);
    const fileLinks = [];
   
    for (let i = 0; i < linkCount; i++) {
       const href = await links.nth(i).getAttribute('href');
       const text = await links.nth(i).textContent();
       console.log(`Link ${i + 1}: ${href}`);
       console.log(`Link Text ${i + 1}: ${text}`);

       // Step: Check if the href attribute ends with a file extension or if the text contains file information
       if (href && (href.endsWith('.pdf') || href.endsWith('.docx') || href.endsWith('.xlsx') || href.endsWith('.txt'))) {
           fileLinks.push(href);
       }
       
       // Step:  Check if the text contains file names
       if (text && (text.includes('.pdf') || text.includes('.docx') || text.includes('.xlsx') || text.includes('.txt'))) {
           fileLinks.push(href);
       }
   }

     //Assert that at least one file was found
    expect(fileLinks.length).toBeGreaterThan(0);

   if (fileLinks.length > 0) {
       console.log('Files found:');
       fileLinks.forEach((file, index) => console.log(`${index + 1}. ${file}`));
   } else {
       console.error('No files found on the page.');
   }
});


test('Files Name ', async ({ page }) => {
    // Step: Check PDF's name directly on the 'File Download' page
    const downloadLink = await page.getByRole('link', { name: 'Sandbox Download Form - .pdf' });
    await expect(downloadLink).toHaveText('Sandbox Download Form - .pdf');
    const linkText = await downloadLink.textContent();
    
    // Step: Validate if the file name is correct
    const expectedFileName = 'Sandbox Download Form - .pdf';
    
    if (linkText.trim() === expectedFileName) {
            console.log('The file name is correct.');
        } else {
            console.error('The file name is incorrect.');
            console.log(`Name found: ${linkText.trim()}`);
        }

});

test('Home Link', async ({ page }) => {
        //Click "Home" Link
        await page.getByRole('link', { name: 'Home' }).click();
        await page.goto('https://practice-automation.com/');
    })
  
test('Downloading PDF File by File name', async ({ page }) => {
    // Preconditions: Check if the file exists and delete if it does
    // Step 1: Click on the file name to download
    await page.getByRole('link', { name: 'Sandbox Download Form - .pdf' }).click();
 
    // Step 2: Wait for the download event after clicking the download link
    const downloadPromise = page.waitForEvent('download', { timeout: 60000 }); // Increase timeout
    await page.click('a:has-text("Download")');

    // Step 3: Capture the download event
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

test('Downloading PDF File by Download Button', async ({ page }) => {
    // Preconditions: Check if the file exists and delete if it does
    // Step 1: Capture the file URL from the 'data-downloadurl' attribute
    const downloadUrl = await page.getAttribute('a.wpdm-download-link', 'data-downloadurl');
    
    if (downloadUrl) {
        const downloadDir = 'C:\\Users\\Sarah\\Downloads';
        const filePath = path.join(downloadDir, 'test.pdf');

        // Download the file manually using https.get
        const file = fs.createWriteStream(filePath);
        https.get(downloadUrl, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log('Download completed.');

                // Verify the file exists
                const fileExists = fs.existsSync(filePath);
                expect(fileExists).toBe(true); 
                console.log(fileExists ? 'PDF file was downloaded successfully.' : 'File not found.');

                // Optionally check the file size or content
                const stats = fs.statSync(filePath);
                console.log(`File size: ${stats.size} bytes`);
            });
        }).on('error', (err) => {
            console.error('Error downloading the file:', err);
        });
    } else {
        console.log('Download link not found.');
    }
});
