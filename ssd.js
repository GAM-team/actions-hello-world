const wdio = require("webdriverio");
const { Key } = require('webdriverio');
const { exec } = require('child_process');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function runSSD() {
    const opts = {
        port: 4723,
        logLevel: "silent",
        capabilities: {
            platformName: "Windows",
            "appium:app": "C:\\Program Files\\Certum\\SimplySign Desktop\\SimplySignDesktop.exe",
            "appium:automationName": "Windows",
        },
    };

    let driver;
    try {
        driver = await wdio.remote(opts);
        
        // Win ARM64 is stuck on a OOB screen that steals focus
        // These enter / escapes should dismiss it.
        const runner_arch =  process.env.RUNNER_ARCH;
        if ( runner_arch === "ARM64" ) {
          console.log('Running on ARM64...');
          await sleep(3000); // Pause execution for 3 seconds
          await driver.saveScreenshot("oob1.png");
          await driver.sendKeys([Key.Enter]);
          await sleep(3000); // Pause execution for 3 seconds
          await driver.saveScreenshot("oob2.png");
          await driver.sendKeys([Key.Enter]);
          await sleep(3000); // Pause execution for 3 seconds
          await driver.saveScreenshot("oob3.png");
          await driver.sendKeys([Key.Escape]);
          await driver.saveScreenshot("oob6.png");
        } else {
          console.log('NOT running on ARM64');
        }

        //  Execute SSD again to open login dialog
        exec('"C:\\Program Files\\Certum\\SimplySign Desktop\\SimplySignDesktop.exe"', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
        });
        await sleep(3000); // Pause execution for 3 seconds

        // Login
        windows = await driver.getWindowHandles();
        //if (!Array.isArray(windows) || windows.length === 0) {
        //  console.log('No windows for app. Quitting.');
        //  return;
        //} else {
        //  console.log('There are ' + windows.length + ' windows.');
        //}
        //for (let i = 0; i < windows.length; i++) {
        //  await driver.switchWindow(windows[i]);
        //  console.log(await driver.getTitle());
          //await driver.saveScreenshot(`window{i}.png`);
        //}
        login_window = windows[0]
        await driver.switchWindow(login_window);
        await driver.saveScreenshot('login01.png');
        id_value = 'jay0lee@gmail.com';
        id_arr =  [...id_value];
        await driver.sendKeys(id_arr);
        await driver.saveScreenshot('login02.png');
        await driver.sendKeys([Key.Tab]);
        //token_value = process.argv[4];
        let token_value;
        exec('"venv\\scripts\\python.exe" totp.py', (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          token_value = stdout;
        });
        console.log(`MyOTP length: ${token_value.length}`);
        token_arr =  [...token_value];
        await driver.sendKeys(token_arr);
        await driver.saveScreenshot('login03.png');
        await driver.sendKeys([Key.Enter]);
        await driver.saveScreenshot('login04.png');
        await sleep(500);
        await driver.saveScreenshot('login05.png');
        await sleep(500);
        await driver.saveScreenshot('login06.png');
        await sleep(500);
        await driver.saveScreenshot('login07.png');
        await sleep(500);
        await driver.saveScreenshot('login08.png');
        await sleep(500);
        await driver.saveScreenshot('login09.png');
        await sleep(500);
        await driver.saveScreenshot('login10.png');
        await sleep(500);
        await driver.saveScreenshot('login11.png');
        await sleep(500);
        await driver.saveScreenshot('login12.png');

    } catch (error) {
        if (error.name === 'WebDriverError') {
          console.log('WebDriverError (may be expected)');
        }
        console.error("Error during Appium run:", error);
    }

    // INTENTIONALL Keep driver open so tray icon for Certum doesn't close
    // finally {
    //    if (driver) {
    //        await driver.deleteSession(); // Close the Appium session
    //    }
    //}
}

runSSD();
