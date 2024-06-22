import type { RemoteOptions } from 'webdriverio'
import { remote } from 'webdriverio'

const wdOpts: RemoteOptions = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT || "4723", 10),
  capabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:appPackage': 'com.ss.android.ugc.aweme',
    'appium:appActivity': 'com.ss.android.ugc.aweme.splash.SplashActivity',
    'appium:noReset': true,
  }
}

async function main() {
  const driver = await remote(wdOpts);
  try {
    const batteryItem = await driver.$('//*[@text="Battery"]');
    await batteryItem.click();
  } finally {
    await driver.pause(1000);
    await driver.deleteSession();
  }
}

main().catch(console.error);