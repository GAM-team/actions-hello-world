const wdio = require("webdriverio");
const { Key } = require('webdriverio');

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
        console.log('env variables;');
        console.log(process.env);
        driver.sendKeys([Key.Tab, Key.Tab, Key.Tab, Key.Tab, Key.Tab, Key.Tab, Key.Enter]);
        windows = await driver.getWindowHandles();
        if (!Array.isArray(windows) || windows.length === 0) {
          console.log('No windows for app. Quitting.');
          return;
        } else {
          console.log('There are ' + windows.length + ' windows.');
        }
        for (let i = 0; i < windows.length; i++) {
          await driver.switchWindow(windows[i]);
          console.log(await driver.getTitle());
          await driver.saveScreenshot(`window{i}.png`);
        }
        login_window = windows[0]
        await driver.switchWindow(login_window);
        id_value = 'jay0lee@gmail.com';
        id_arr =  [...id_value];
        await driver.sendKeys(id_arr);
        await driver.sendKeys([Key.Tab]);
        token_value = process.argv[4];
        console.log('MyOTP length: ');
        console.log(token_value.length);
        token_arr =  [...token_value];
        await driver.sendKeys(token_arr);
        await driver.sendKeys([Key.Enter]);
        for (let i = 0; i < 10; i++) {
          await driver.saveScreenshot(`ss${i}.png`);
        }

    } catch (error) {
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
