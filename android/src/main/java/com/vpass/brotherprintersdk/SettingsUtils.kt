package com.vpass.brotherprintersdk

import com.brother.sdk.lmprinter.PrinterModel
import com.brother.sdk.lmprinter.setting.PrintSettings
import com.brother.sdk.lmprinter.setting.QLPrintSettings

class SettingsUtil private constructor() {
  companion object {
    private fun _printerModelFromName(name: String): PrinterModel? {
      return when (name) {
        "QL-710W"    -> PrinterModel.QL_710W
        "QL-720NW"   -> PrinterModel.QL_720NW
        "QL-810W"    -> PrinterModel.QL_810W
        "QL-820NWB"  -> PrinterModel.QL_820NWB
        "QL-1110NWB" -> PrinterModel.QL_1110NWB
        "QL-1115NWB" -> PrinterModel.QL_1115NWB
        else -> null
      }
    }

    fun settingsFromDictionary(dictionary: Map<String, Any>): PrintSettings {
      val settings = QLPrintSettings(PrinterModel.QL_820NWB)

      dictionary.forEach { (key, value) ->
        when (key) {
          "autoCutForEachPageCount" -> {
            settings.autoCutForEachPageCount = if (value is Int) value else 1
          }
          "autoCut" -> {
            settings.isAutoCut = if (value is Boolean) value else false
          }
          "cutAtEnd" -> {
            settings.isCutAtEnd = if (value is Boolean) value else false
          }
          // Add more settings as needed
        }
      }

      return settings
    }
  }
}
