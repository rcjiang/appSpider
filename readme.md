# App Spider

## 安装appium

1. 环境要求:  
   node.js 建议使用最新的lts版本，如20.12.1
2. 使用npm在全局范围内安装Appium
   
    ```sh
    npm i -g appium
    ```
3. 安装完成后，您应该可以从命令行运行Appium
   
   ```sh
   appium
   ```

## 安装 UiAutomator2 驱动

1. 安装`Android SDK`并设置`ANDROID_HOME`环境变量  
   [Android Studio下载](https://developer.android.com/studio)

2. 安装`Java JDK`并设置`JAVA_HOME`环境变量  
   [Java JDK下载地址1](https://jdk.java.net/)  
   [Java JDK下载地址2](https://adoptium.net/en-GB/temurin/releases/)

3. 创建模拟器
4. 启动模拟器
   ```
   # 查看模拟器列表
   emulator -list-avds
   emulator -avd <name>
   ```

5. 安装Appium驱动器
   ```sh
   appium driver install uiautomator2
   ```

## 安装客户端
   ```sh
   npm i --save-dev webdriverio
   ```

## 虚拟机安装app
   ```sh
   # 启动虚拟机
   emulator -avd <name>
   # 安装app
   adb install app.apk
   ```

## 常见问题

小米手机和oppo手机appium启动时报错:writing to settings requires:android.permission.WRITE_SECURE_SETTINGS
小米手机：打开“USB调试(安全设置)”
oppo: 打开“禁止权限监控"

经过以上配置后oppo手机安装时提示输入手机密码，输入正确后仍然安装失败（显示安装包异常），
预计与appium server等待超时导致（会发现它又重新发起了安装命令）
此时可以放弃使用appium自动安装settings_apk-debug.apk， 改用手动通过adb安装
安装成功appium检测到已安装后将不再自动安装

## 列出包名
```bash
adb shell pm list packages
adb shell pm list packages -3
# 搜索带google的包名
adb shell pm list packages | grep google
```

## 获取app启动页
```bash
# step1: 启动app
# step2：
adb shell dumpsys window | grep mCurrentFocus
adb shell dumpsys window | findstr mCurrentFocus
```

查看app当前页面布局
```bash
adb shell uiautomator dump
adb pull /sdcard/window_dump.xml
```
自动下载chromedriver版本
appium --allow-insecure chromedriver_autodownload

https://github.com/appium/appium/issues/17276