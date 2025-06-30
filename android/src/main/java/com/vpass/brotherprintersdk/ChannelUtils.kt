package com.vpass.brotherprintersdk

import android.bluetooth.BluetoothAdapter
import android.bluetooth.BluetoothManager
import android.content.Context
import com.brother.sdk.lmprinter.Channel

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
    }
}
