package com.vpass.brotherprintersdk

import android.util.Log
import com.brother.sdk.lmprinter.Channel
import com.brother.sdk.lmprinter.NetworkSearchOption
import com.brother.sdk.lmprinter.PrinterSearcher
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.lang.Thread
import kotlin.coroutines.suspendCoroutine

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

      val channels = PrinterSearcher.startBluetoothSearch(appContext.reactContext).channels
      return@AsyncFunction channels.map { channel ->
        val extraInfo = channel.extraInfo
        mapOf(
                "type" to Channel.ChannelType.Bluetooth,
                "address" to channel.getChannelInfo(),
                "modelName" to (extraInfo[Channel.ExtraInfoKey.ModelName] ?: "Unknown"),
                "serialNumber" to "Unknown",
                "macAddress" to (extraInfo[Channel.ExtraInfoKey.MACAddress] ?: "Unknown"),
                "nodeName" to (extraInfo[Channel.ExtraInfoKey.NodeName] ?: "Unknown"),
                "location" to (extraInfo[Channel.ExtraInfoKey.Location] ?: "Unknown")
        )
      }

      // return@AsyncFunction listOf<Map<String, Any>>()
    }

    /// Search for printers available on the same WiFi network
    AsyncFunction("searchNetworkPrinters") { options: Map<String, Any> ->
      // Log.i("ExpoBrotherPrinterSdk", "Search using WiFi")

      val channels = kotlinx.coroutines.runBlocking { searchNetworkPrintersSync() }

      channels.add(
              mapOf(
                      "type" to 1,
                      "address" to "1234",
                      "modelName" to "Unknown",
                      "serialNumber" to "Unknown",
                      "macAddress" to "Unknown",
                      "nodeName" to "Unknown",
                      "location" to "Unknown"
              )
      )

      return@AsyncFunction channels
    }

    /// Print image with URL
    AsyncFunction("printImageWithURL") {
            url: String,
            channelsDict: Map<String, Any>,
            settingsDict: Map<String, Any> ->
      Log.i("ExpoBrotherPrinterSdk", "Print image with URL")
      return@AsyncFunction true
    }
  }

  suspend fun searchNetworkPrintersSync() =
          suspendCoroutine<MutableList<Map<String, Any>>> { continuation ->
            Log.i("ExpoBrotherPrinterSdk", "Search using WiFi")

            val option = NetworkSearchOption(15.toDouble(), false)

            val channels = mutableListOf<Map<String, Any>>()
            val result =
                    PrinterSearcher.startNetworkSearch(appContext.reactContext, option) { channel ->
                      val extraInfo = channel.extraInfo
                      channels.add(
                              mapOf(
                                      "type" to Channel.ChannelType.Wifi,
                                      "address" to channel.getChannelInfo(),
                                      "modelName" to
                                              (extraInfo[Channel.ExtraInfoKey.ModelName]
                                                      ?: "Unknown"),
                                      "serialNumber" to "Unknown",
                                      "macAddress" to
                                              (extraInfo[Channel.ExtraInfoKey.MACAddress]
                                                      ?: "Unknown"),
                                      "nodeName" to
                                              (extraInfo[Channel.ExtraInfoKey.NodeName]
                                                      ?: "Unknown"),
                                      "location" to
                                              (extraInfo[Channel.ExtraInfoKey.Location]
                                                      ?: "Unknown")
                              )
                      )
                    }

            Thread.sleep(1_000)

            continuation.resumeWith(Result.success(channels))
          }
}
