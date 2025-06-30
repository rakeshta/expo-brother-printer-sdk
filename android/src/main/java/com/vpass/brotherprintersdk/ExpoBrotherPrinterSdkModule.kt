package com.vpass.brotherprintersdk

import android.util.Log
import com.brother.sdk.lmprinter.Channel
import com.brother.sdk.lmprinter.NetworkSearchOption
import com.brother.sdk.lmprinter.OpenChannelError
import com.brother.sdk.lmprinter.PrintError
import com.brother.sdk.lmprinter.PrinterDriverGenerator
import com.brother.sdk.lmprinter.PrinterSearcher
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.net.URI


class ExpoBrotherPrinterSdkModule : Module() {
  // Each module class must implement the definition function. The definition consists of components
  // that describes the module's functionality and behavior.
  // See https://docs.expo.dev/modules/module-api for more details about available components.
  override fun definition() = ModuleDefinition {
    /// Name of the module visible from JavaScript
    Name("ExpoBrotherPrinterSdk")

    /// Search for printers connected via Bluetooth classic
    AsyncFunction("searchBluetoothPrinters") {
      Log.i("ExpoBrotherPrinterSdk", "Search using Bluetooth")

      // Use non-null assertion for reactContext since we've checked above
      val context = appContext.reactContext ?: throw Exception("React context is null")
      val result = PrinterSearcher.startBluetoothSearch(context)
      Log.i("ExpoBrotherPrinterSdk", "Found ${result.channels.size} Bluetooth printers")

      // Map the results and return them properly
      return@AsyncFunction result.channels.map { channel ->
        val extraInfo = channel.extraInfo
        val modelName = extraInfo[Channel.ExtraInfoKey.ModelName] ?: ""
        val address = channel.channelInfo
        Log.d("ExpoBrotherPrinterSdk", "-  BT Model: $modelName, Address: $address")

        mapOf(
          "type"      to 0, // 0 = TypeScript BPChannelType.BluetoothMFi
          "address"   to address,
          "modelName" to modelName,
          "alias"     to (extraInfo[Channel.ExtraInfoKey.BluetoothAlias] ?: ""),
        )
      }
    }

    /// Search for printers available on the same WiFi network
    AsyncFunction("searchNetworkPrinters") { options: Map<String, Any> ->
      Log.i("ExpoBrotherPrinterSdk", "Search using WiFi")
      Log.d("ExpoBrotherPrinterSdk", "-  Options: $options")

      // parse network search options
      val option = OptionsUtils.networkSearchOptionsFromDictionary(options)

      // debug
      val context = appContext.reactContext ?: throw Exception("React context is null")
      val result = PrinterSearcher.startNetworkSearch(context, option) { channel ->
        val modelName = channel.extraInfo[Channel.ExtraInfoKey.ModelName] ?: ""
        val ipaddress = channel.channelInfo
        Log.d("ExpoBrotherPrinterSdk", "-  WiFi Model: $modelName, IP Address: $ipaddress")
      }
      Log.i("ExpoBrotherPrinterSdk", "Found ${result.channels.size} WiFi printers")

      // Map the results and return them properly
      return@AsyncFunction result.channels.map { channel ->
        val extraInfo = channel.extraInfo
        val modelName = extraInfo[Channel.ExtraInfoKey.ModelName] ?: ""
        val address = channel.channelInfo
        Log.d("ExpoBrotherPrinterSdk", "BT Model: $modelName, Address: $address")

        mapOf(
          "type"         to  1, // 1 = TypeScript BPChannelType.WiFi
          "address"      to  address,
          "modelName"    to  modelName,
          "serialNumber" to (extraInfo[Channel.ExtraInfoKey.SerialNubmer] ?: ""), // Yup - typo in SDK
          "macAddress"   to (extraInfo[Channel.ExtraInfoKey.MACAddress]   ?: ""),
          "nodeName"     to (extraInfo[Channel.ExtraInfoKey.NodeName]     ?: ""),
          "location"     to (extraInfo[Channel.ExtraInfoKey.Location]     ?: ""),
        )
      }
    }

    /// Print image with URL
    AsyncFunction("printImageWithURL") {
      urlString: String,
      channelDict: Map<String, Any>,
      settingsDict: Map<String, Any> ->
      Log.i("ExpoBrotherPrinterSdk", "Print image with URL")

      // get context for creating channel
      val context = appContext.reactContext ?: throw GenericError("React context is null")

      // parse URI
      var uri = URI(urlString)
      Log.d("ExpoBrotherPrinterSdk", "-  URL: ${uri.getPath()}")

      // re-construct chanel
      val channel = ChannelUtils.channelFromDictionary(channelDict, context)
      Log.d("ExpoBrotherPrinterSdk", "-  Channel: $channel")
      Log.d("ExpoBrotherPrinterSdk", "-     Address: ${channel.channelInfo}")
      Log.d("ExpoBrotherPrinterSdk", "-     Model:   ${channel.extraInfo[Channel.ExtraInfoKey.ModelName]}")

      // get model name from channel info or from channelDict
      val modelName = (channel.extraInfo[Channel.ExtraInfoKey.ModelName]
        ?: channelDict["modelName"] as? String)
        ?: throw GenericError("Model name could not be retrieved")
      Log.d("ExpoBrotherPrinterSdk", "-  Model Name: $modelName")

      // parse settings from dictionary
      val settings = SettingsUtil.settingsFromDictionary(
        settingsDict,
        modelName,
        context.applicationContext.filesDir.absolutePath
      )

      // connect to printer
      var result = PrinterDriverGenerator.openChannel(channel);
      if (result.getError().getCode() != OpenChannelError.ErrorCode.NoError) {
        Log.e("ExpoBrotherPrinterSdk", "Connection failed: ${result.getError()}")
        throw GenericError("Connection failed: ${result.getError().getCode()}")
      }

      var printerDriver = result.getDriver();

      // print image
      var printError = printerDriver.printImage(uri.getPath(), settings)
      if (printError.getCode() != PrintError.ErrorCode.NoError) {
        printerDriver.closeChannel();
        Log.e("ExpoBrotherPrinterSdk", "Print failed: ${printError.getErrorDescription()}")
        throw GenericError("Print failed: ${printError.getCode()}")
      }

      // close channel
      printerDriver.closeChannel();
    }

    /// Print image with URL
    AsyncFunction("printPDFWithURL") {
      urlString: String,
      pages: List<Int>,
      channelDict: Map<String, Any>,
      settingsDict: Map<String, Any> ->
      Log.i("ExpoBrotherPrinterSdk", "Print PDF with URL")
      throw GenericError("PDF printing is not implemented yet")
      return@AsyncFunction
    }
  }
}
