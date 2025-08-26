const wdio = require("webdriverio");
const { Key } = require('webdriverio');

async function runSSD() {
    const opts = {
        port: 4723,
        logLevel: "silent",
        capabilities: {
            platformName: "Windows",
            "appium:app": "C:\\Windows\\System32\\notepad.exe",
            "appium:automationName": "Windows",
        },
    };

    let driver;
    try {
        driver = await wdio.remote(opts);
        await driver.saveScreenshot("np0.png");
        await driver.sendKeys([Key.Enter]);
        await driver.saveScreenshot("np1.png");
        await driver.sendKeys([Key.Enter]);
        await driver.saveScreenshot("np2.png");
        await driver.sendKeys([Key.Escape]);
        await driver.saveScreenshot("np3.png");
        
    } catch (error) {
        console.error("Error during Notepad run:", error);
    }

     finally {
        if (driver) {
            await driver.deleteSession(); // Close the Appium session
        }
    }
}

runSSD();
