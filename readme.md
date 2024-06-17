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

3. 安装Appium驱动器
   ```sh
   appium driver install uiautomator2
   ```