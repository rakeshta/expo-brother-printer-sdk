package com.vpass.brotherprintersdk

import android.util.Log
import com.brother.sdk.lmprinter.NetworkSearchOption

class OptionsUtils private constructor() {
  companion object {
    /**
      * Creates a NetworkSearchOption from a map representation
      *
      * @param map The map containing search options
      * @return A NetworkSearchOption object configured based on the input map
      */
    fun networkSearchOptionsFromDictionary(dictionary: Map<String, Any>): NetworkSearchOption {

      // Parse duration
      val searchDurationSeconds = when (val duration = dictionary["searchDuration"]) {
        is Number -> duration.toDouble() / 1000.0 // Convert milliseconds to seconds
        else -> 1.0 // Default to 1 second
      }

      // Parse isTethering
      val isTethering = when (val tethering = dictionary["isTethering"]) {
        is Boolean -> tethering
        else -> false // Default to false
      }

      // Create and return the NetworkSearchOption
      return NetworkSearchOption(searchDurationSeconds, isTethering)
    }
  }
}
