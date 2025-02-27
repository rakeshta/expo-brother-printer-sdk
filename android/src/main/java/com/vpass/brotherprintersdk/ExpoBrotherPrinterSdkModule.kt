package com.vpass.brotherprintersdk

import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition

class ExpoBrotherPrinterSdkModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    /// Name of the module visible from JavaScript
    Name("ExpoBrotherPrinterSdk")

    /// Search for printers connected via Bluetooth classic
    AsyncFunction("searchBluetoothPrinters") {
      return@AsyncFunction listOf<Map<String, Any>>()
    }
    /// Search for printers connected via Bluetooth classic
    AsyncFunction("searchBluetoothPrinters") {
      return@AsyncFunction listOf<Map<String, Any>>()
    }
    /// Search for printers available on the same WiFi network
    AsyncFunction("searchNetworkPrinters") { options: Map<String, Any> ->
      return@AsyncFunction listOf<Map<String, Any>>()
    }

    /// Print image with URL
    AsyncFunction("printImageWithURL") {
            url: String,
            channelsDict: Map<String, Any>,
            settingsDict: Map<String, Any> ->
      return@AsyncFunction true
    }
  }
}
