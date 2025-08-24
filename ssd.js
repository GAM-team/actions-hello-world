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

    let client;
    try {
        driver = await wdio.remote(opts);
        windows = await driver.getWindowHandles();
        login_window = windows[0]
        await driver.switchWindow(login_window);
        id_value = 'jay0lee@gmail.com';
        id_arr =  [...id_value];
        await driver.sendKeys(id_arr);
        await driver.sendKeys([Key.Tab]);
        token_value = process.argv[2];
        console.log('MyOTP length: ');
        console.log(token_value.length);
        token_arr =  [...token_value];
        await driver.sendKeys(token_arr);
        await driver.sendKeys([Key.Enter]);

    } catch (error) {
        console.error("Error during Appium run:", error);
    } finally {
        if (client) {
            await client.deleteSession(); // Close the Appium session
        }
    }
}

runNotepadTest();
