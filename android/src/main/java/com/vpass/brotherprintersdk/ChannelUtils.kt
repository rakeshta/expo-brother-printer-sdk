package com.vpass.brotherprintersdk

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import android.util.Log
import com.brother.sdk.lmprinter.Channel
import com.brother.sdk.lmprinter.OpenChannelError
import com.brother.sdk.lmprinter.PrinterDriver
import com.brother.sdk.lmprinter.PrinterDriverGenerator

class ChannelUtils private constructor() {
  companion object {
    /**
      * Creates a Brother SDK Channel from a dictionary representation
      *
      * @param dictionary The dictionary containing channel information
      * @param context Android application context needed for BLE channels
      * @return A Channel object that can be used with the Brother SDK
      * @throws GenericError if the channel type is invalid or required parameters are missing
      */
    fun channelFromDictionary(dictionary: Map<String, Any>, context: Context): Channel {
      // Parse type
      val typeRaw = dictionary["type"] as? Double
        ?: throw GenericError("Channel type not found")

      // Get address
      val address = dictionary["address"] as? String
        ?: throw GenericError("Channel address not found")

      // Create appropriate channel based on type
      return when (typeRaw) {
        0.0 -> { // Bluetooth MFi
          val bluetoothAdapter = getBluetoothAdapter(context)
            ?: throw GenericError("Bluetooth not supported on this device")
          if(!bluetoothAdapter.isEnabled){
            bluetoothAdapter.enable()
          }
          Channel.newBluetoothChannel(address, bluetoothAdapter)
        }
        1.0 -> { // WiFi
          Channel.newWifiChannel(address)
        }
        2.0 -> { // Bluetooth Low Energy (BLE)
          val bluetoothAdapter = BluetoothAdapter.getDefaultAdapter()
            ?: throw GenericError("Bluetooth not supported on this device")
          Channel.newBluetoothLowEnergyChannel(address, context, bluetoothAdapter)
        }
        else -> throw GenericError("Unsupported channel type: $typeRaw")
      }
    }


    private fun getBluetoothAdapter(context: Context): BluetoothAdapter? {
      val manager = context.getSystemService(Context.BLUETOOTH_SERVICE) as BluetoothManager
      return manager.adapter
    }

    /**
      * Helper function to handle connecting to a printer, executing an operation, and safely closing the connection
      *
      * @param channelDict The dictionary containing channel information
      * @param context Android application context needed for creating channels
      * @param operation A lambda that will be called with the printer driver if connection is successful
      * @throws GenericError if connection fails or if modelName is not available
      * @returns The value returned by the operation lambda
      */
    fun <T> withPrinterDriver(
        channelDict: Map<String, Any>,
        context: Context,
        operation: (printerDriver: PrinterDriver, modelName: String) -> T
    ): T {
      // Reconstruct channel
      val channel = channelFromDictionary(channelDict, context)
      Log.d("ExpoBrotherPrinterSdk", "-  Address: ${channel.channelInfo}")

      // Extract model name (fallback to modelName from dictionary for BLE printers)
      val modelName = (channel.extraInfo[Channel.ExtraInfoKey.ModelName]
        ?: channelDict["modelName"] as? String)
        ?: throw GenericError("Model name could not be retrieved")
      Log.d("ExpoBrotherPrinterSdk", "-  Model Name: $modelName")

      // Connect to printer
      Log.d("ExpoBrotherPrinterSdk", "...Connecting to $modelName at ${channel.channelInfo}")
      val driverResult = PrinterDriverGenerator.openChannel(channel)
      if (driverResult.error.code != OpenChannelError.ErrorCode.NoError || driverResult.driver == null) {
        Log.e("ExpoBrotherPrinterSdk", "Connection failed: ${driverResult.error}")
        throw GenericError("Connection failed: ${driverResult.error.code}")
      }


      val printerDriver = driverResult.driver

      try {
        // Execute the operation and return its result
        return operation(printerDriver, modelName)
      } finally {
        // Always close the channel, whether operation succeeded or failed
        Log.d("ExpoBrotherPrinterSdk", "...Disconnecting")
        printerDriver.closeChannel()
      }
    }
  }
}
