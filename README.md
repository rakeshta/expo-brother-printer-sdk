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

### Native Configuration

1. Add the config plugin to `app.json` to add the necessary native configurations.
   ```json
   {
    "expo": {
      ...
      "plugins": [
        ...,
        "expo-brother-printer-sdk"
      ],
    }
   }
   ```
2. Run `npx expo prebuild --clean` to update the app configuration.

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
     printerList: ['QL-820NWB'], // iOS only
     isTethering: false,         // Android only
     searchDuration: 2000,       // optional; defaults to 1000ms
   });
   ```

## Printing Images

Once a printer channel is acquired, you can send a print job to it by specifying a URL to an image.

_NOTE: The image URL must be a local file URL. Passing a remote URL will fail silently._

Use the `printImage` function to send a print job to the chosen printer channel.

```ts
const imageUri = 'file:///path/to/local/image.png'; // PNG & JPEG formats are supported

const channel  = /* channel obtained using Bluetooth or WiFi search methods above. */

// all settings are optional. see BPrintSettings documentation for details
const settings: BPPrintSettings = {
  labelSize: BPQLLabelSize.RollW62,
  autoCutForEachPageCount: 1,
  autoCut: true,
  cutAtEnd: true,
  resolution: BPResolution.Normal,
  halftone: BPHalftone.PatternDither,
};

await BrotherPrinterSDK.printImage(imageUri, channel, settings);
```

## Printing PDFs

The SDK also supports printing PDFs. The functionality is very similar to when printing images.

Use the `printPDF` function to send a PDF print job.

```ts
const pdfUri = 'file:///path/to/local/doc.pdf'; // local PDF file URL

const channel  = /* channel obtained using Bluetooth or WiFi search methods above. */

// all settings are optional. see BPrintSettings documentation for details
const settings: BPPrintSettings = {
  labelSize: BPQLLabelSize.RollW62,
  autoCutForEachPageCount: 1,
  autoCut: true,
  cutAtEnd: true,
  resolution: BPResolution.Normal,
  halftone: BPHalftone.PatternDither,
};

await BrotherPrinterSDK.printPDF(pdfUri, channel, settings);
```

# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide](https://github.com/expo/expo#contributing).
