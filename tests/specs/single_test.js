const assert = require('assert');

const fs = require('fs');

describe('File Download Test', () => {
  it('should download the file and verify its existence and content', async () => {
      // Navigate to the URL
      await browser.url('https://file-examples.com/wp-content/storage/2017/02/file_example_XLSX_10.xlsx');
      
      // Wait for the file to be available (adjust the sleep time if necessary)
      await browser.pause(4000);

      // Check if the file exists
      const fileExists = await browser.execute('lambda-file-exists=file_example_XLSX_10.xlsx');
      console.assert(fileExists === true, 'File does not exist');

      // Retrieve file stats
      const fileStats = await browser.execute('lambda-file-stats=file_example_XLSX_10.xlsx');
      console.log(fileStats);

      // Download file content
      const base64EncodedFile = await browser.execute('lambda-file-content=file_example_XLSX_10.xlsx');
      console.log(base64EncodedFile);

      // Decode base64 and write to file
      const data = Buffer.from(base64EncodedFile, 'base64');
      fs.writeFileSync('file_example_XLSX_10.xlsx', data);
  });

    afterEach(async function () {
        if (this.currentTest.state === 'passed') {
            await browser.execute('lambda-status=passed');
        } else {
            await browser.execute('lambda-status=failed');
        }
        await browser.deleteSession();
    });
});
