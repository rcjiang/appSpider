import type { RemoteOptions } from 'webdriverio'
import { remote } from 'webdriverio'

const appPakge = 'com.ss.android.ugc.aweme'
const appActivityMap = {
  // 启动页
  start: 'com.ss.android.ugc.aweme.splash.SplashActivity',
  // 抖音短剧
  playlet: 'com.ss.android.ugc.aweme.playlet.cinema.PlayletCinemaActivity',
}

const wdOpts: RemoteOptions = {
  hostname: process.env.APPIUM_HOST || 'localhost',
  port: parseInt(process.env.APPIUM_PORT || "4723", 10),
  logLevel: 'info',
  capabilities: {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'Android',
    'appium:appPackage': appPakge,
    'appium:appActivity': appActivityMap.start,
    'appium:noReset': true
  }
}

async function main() {
  const driver = await remote(wdOpts)
  await driver.activateApp(appPakge)
  try {
    // 点击搜索图标按钮
    const searchBtnSelector = `new UiSelector().description("搜索").className("android.widget.Button")`
    const searchBtn = await driver.$(`android=${searchBtnSelector}`)
    await searchBtn.click()

    // 输入关键字
    const keyword = '短剧'
    const searchInputId = 'com.ss.android.ugc.aweme:id/et_search_kw'
    const searchInputSelector = `new UiSelector().resourceId("${searchInputId}")`
    const searchInput = await driver.$(`android=${searchInputSelector}`)
    await searchInput.addValue(keyword)

    // 搜索关键字
    const searchInputBtnSelector = `new UiSelector().text("搜索").className("android.widget.TextView")`
    const searchInputBtn = await driver.$(`android=${searchInputBtnSelector}`)
    await searchInputBtn.click()

    // 点击抖音短剧追到爽
    // NATIVE_APP, WEBVIEW_JsEngine_com.ss.android.ugc.aweme
    await driver.switchContext('WEBVIEW_JsEngine_com.ss.android.ugc.aweme')
    const selector1 = `new UiSelector().text("去看看")`
    const btn1 = await driver.$(`android=${selector1}`)
    await btn1.click()
    console.log('成功进入短剧页面')
  } finally {
    await driver.pause(1000)
    await driver.deleteSession()
  }
}

main().catch(console.error)