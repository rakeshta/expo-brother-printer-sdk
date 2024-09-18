# expo-brother-printer-sdk

Expo module to connect to Brother printers

<!-- # API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/brother-printer-sdk.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/brother-printer-sdk/)
 -->

# Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-brother-printer-sdk
```

### Configure for iOS

1. After installing the package, run `npx pod-install` to install dependencies & create the Xcode project.
2. Add the following entries to your expo `app.json` file:
   ```json
   {
    "expo": {
      ...
      "ios": {
        ...
        "infoPlist": {
          ...
          "NSLocalNetworkUsageDescription": "This app requires local network access to print to Brother printers using WiFi.",
          "NSBluetoothPeripheralUsageDescription": "This app requires Bluetooth access to print to Brother printers.",
          "NSBluetoothAlwaysUsageDescription": "This app requires Bluetooth access to print to Brother printers.",
          "UISupportedExternalAccessoryProtocols": [
             "com.brother.ptcbp"
          ],
          "NSBonjourServices": [
            "_ipp._tcp",
            "_pdl-datastream._tcp",
            "_printer._tcp"
          ],
          ...
        },
        ...
      }
      ...
    }
   }
   ```
3. Run `npx expo prebuild` to update the app configuration.


### Configure for Android



# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
