# expo-brother-printer-sdk

Expo module to connect to Brother printers

<!-- # API documentation

- [Documentation for the main branch](https://github.com/expo/expo/blob/main/docs/pages/versions/unversioned/sdk/brother-printer-sdk.md)
- [Documentation for the latest stable release](https://docs.expo.dev/versions/latest/sdk/brother-printer-sdk/)
 -->

## Installation in managed Expo projects

For [managed](https://docs.expo.dev/archive/managed-vs-bare/) Expo projects, please follow the installation instructions in the [API documentation for the latest stable release](#api-documentation). If you follow the link and there is no documentation available then this library is not yet usable within managed projects &mdash; it is likely to be included in an upcoming Expo SDK release.

## Installation in bare React Native projects

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

TODO: Android support coming soon


## Searching for printers

The SDK supports connecting to printers via both Bluetooth & via WiFi.

### Connect via Bluetooth:

_NOTE: Connecting via Bluetooth does not work in the Simulator. You will need a physical device for this feature._

1. Connect the printer to the iPhone or Android device via the Bluetooth devices page in settings.
2. Then use the `searchBluetoothPrinters` function to enumerate all Brother printers connected via Bluetooth.
   ```ts
   const blChannels = await BrotherPrinterSDK.searchBluetoothPrinters();
   ```

### Connect via WiFi

_NOTE: Connecting via WiFi works in both the Simulator and physical devices._

1. Connect the printer to a WiFi network.
2. Ensure the phone (or the mac running the Simulator) is connected to the same WiFi network.
3. Use the `searchNetworkPrinters` function to enumerate all Brother printers detected on the same WiFi network.
   Note that this method requires you to specify the model(s) of printers to search for.
   ```ts
   const wifiChannels = await BrotherPrinterSDK.searchNetworkPrinters({
     printerList: ['QL-820NWB'], // required
     searchDuration: 2000,       // optional; defaults to 1000ms
   });
   ```

## Printing

Once a printer channel is acquired, you can send a print job to it by specifying a URL to an image.

_NOTE: The image URL must be a local file URL. Passing a remote URL will fail silently._

Use the `printImage` function to send a print job to the chosen printer channel.

```ts
const imageUri = 'file:///path/to/local/image.png'; // PNG & JPEG formats are supported

const channel  = /* channel obtained using Bluetooth or Wifi search methods above. */

// all settings are optional. see BPrintSettings documentation for details
const settings: BPrintSettings = {
  labelSize: BPQLLabelSize.RollW62,
  autoCutForEachPageCount: 1,
  autoCut: true,
  cutAtEnd: true,
  resolution: BPResolution.Normal,
};

await BrotherPrinterSDK.printImage(imageUri, channel, settings);
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
