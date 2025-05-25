package com.vpass.brotherprintersdk

import android.util.Log
import com.brother.sdk.lmprinter.Channel
import com.brother.sdk.lmprinter.NetworkSearchOption
import com.brother.sdk.lmprinter.PrinterSearcher
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import java.lang.Thread
import kotlin.coroutines.suspendCoroutine
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch


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
        Log.d("ExpoBrotherPrinterSdk", "BT Model: $modelName, Address: $address")

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
      // Log.i("ExpoBrotherPrinterSdk", "Search using WiFi")
      println("ExpoBrotherPrinterSdk: Search using WiFi")

      val channels = kotlinx.coroutines.runBlocking { searchNetworkPrintersSync() }

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
      Log.i("ExpoBrotherPrinterSdk", "Search using WiFi Sync")
      val option   = NetworkSearchOption(15.toDouble(), false)
      val channels = mutableListOf<Map<String, Any>>()
      val result   = PrinterSearcher.startNetworkSearch(appContext.reactContext, option) { channel ->
        val extraInfo = channel.extraInfo

        val modelName = channel.extraInfo[Channel.ExtraInfoKey.ModelName] ?: ""
        val ipaddress = channel.channelInfo
        Log.d("TAG", "Model : $modelName, IP Address: $ipaddress")

        channels.add(
          mapOf(
            "type"         to Channel.ChannelType.Wifi,
            "address"      to channel.getChannelInfo(),
            "modelName"    to (extraInfo[Channel.ExtraInfoKey.ModelName]  ?: "Unknown"),
            "serialNumber" to "Unknown",
            "macAddress"   to (extraInfo[Channel.ExtraInfoKey.MACAddress] ?: "Unknown"),
            "nodeName"     to (extraInfo[Channel.ExtraInfoKey.NodeName]   ?: "Unknown"),
            "location"     to (extraInfo[Channel.ExtraInfoKey.Location]   ?: "Unknown")
          )
        )
      }
      Thread.sleep(1_000)
      continuation.resumeWith(Result.success(channels))
    }
}
