package com.vpass.brotherprintersdk

import android.util.Log
import com.brother.sdk.lmprinter.PrinterModel
import com.brother.sdk.lmprinter.setting.PrintImageSettings
import com.brother.sdk.lmprinter.setting.PrintSettings
import com.brother.sdk.lmprinter.setting.QLPrintSettings

class SettingsUtil private constructor() {
  companion object {
    private fun _printerModelFromName(name: String): PrinterModel? {
      if (name.startsWith("QL-710W")) {
        Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - Found QL-710W")
        return PrinterModel.QL_710W
      }
      if (name.startsWith("QL-720NW")) {
        Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - Found QL-720NW")
        return PrinterModel.QL_720NW
      }
      if (name.startsWith("QL-810W")) {
        Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - Found QL-810W")
        return PrinterModel.QL_810W
      }
      if (name.startsWith("QL-820NWB")) {
        Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - Found QL-820NWB")
        return PrinterModel.QL_820NWB
      }
      if (name.startsWith("QL-1110NWB")) {
        Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - Found QL-1110NWB")
        return PrinterModel.QL_1110NWB
      }
      if (name.startsWith("QL-1115NWB")) {
        Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - Found QL-1115NWB")
        return PrinterModel.QL_1115NWB
      }
      Log.d("ExpoBrotherPrinterSdk", "_printerModelFromName - No matching model found for: $name")
      return null;
    }

    private fun _labelSizeFromValue(value: Int): QLPrintSettings.LabelSize {
      return when (value) {
        0 -> QLPrintSettings.LabelSize.DieCutW17H54
        1 -> QLPrintSettings.LabelSize.DieCutW17H87
        2 -> QLPrintSettings.LabelSize.DieCutW23H23
        3 -> QLPrintSettings.LabelSize.DieCutW29H42
        4 -> QLPrintSettings.LabelSize.DieCutW29H90
        5 -> QLPrintSettings.LabelSize.DieCutW38H90
        6 -> QLPrintSettings.LabelSize.DieCutW39H48
        7 -> QLPrintSettings.LabelSize.DieCutW52H29
        8 -> QLPrintSettings.LabelSize.DieCutW62H29
        9 -> QLPrintSettings.LabelSize.DieCutW62H60
        10 -> QLPrintSettings.LabelSize.DieCutW62H75
        11 -> QLPrintSettings.LabelSize.DieCutW62H100
        12 -> QLPrintSettings.LabelSize.DieCutW60H86
        13 -> QLPrintSettings.LabelSize.DieCutW54H29
        14 -> QLPrintSettings.LabelSize.DieCutW102H51
        15 -> QLPrintSettings.LabelSize.DieCutW102H152
        16 -> QLPrintSettings.LabelSize.DieCutW103H164
        17 -> QLPrintSettings.LabelSize.RollW12
        18 -> QLPrintSettings.LabelSize.RollW29
        19 -> QLPrintSettings.LabelSize.RollW38
        20 -> QLPrintSettings.LabelSize.RollW50
        21 -> QLPrintSettings.LabelSize.RollW54
        22 -> QLPrintSettings.LabelSize.RollW62
        23 -> QLPrintSettings.LabelSize.RollW62RB
        24 -> QLPrintSettings.LabelSize.RollW102
        25 -> QLPrintSettings.LabelSize.RollW103
        26 -> QLPrintSettings.LabelSize.DTRollW90
        27 -> QLPrintSettings.LabelSize.DTRollW102
        28 -> QLPrintSettings.LabelSize.DTRollW102H51
        29 -> QLPrintSettings.LabelSize.DTRollW102H152
        30 -> QLPrintSettings.LabelSize.RoundW12DIA
        31 -> QLPrintSettings.LabelSize.RoundW24DIA
        32 -> QLPrintSettings.LabelSize.RoundW58DIA
        else -> QLPrintSettings.LabelSize.DieCutW62H29 // Default value
      }
    }

    private fun _resolutionFromValue(value: Int): PrintImageSettings.Resolution {
      return when (value) {
        0 -> PrintImageSettings.Resolution.Low
        1 -> PrintImageSettings.Resolution.Normal
        2 -> PrintImageSettings.Resolution.High
        else -> PrintImageSettings.Resolution.Normal // Default value
      }
    }

    private fun _halftoneFromValue(value: Int): PrintImageSettings.Halftone {
      return when (value) {
        0 -> PrintImageSettings.Halftone.Threshold
        1 -> PrintImageSettings.Halftone.ErrorDiffusion
        2 -> PrintImageSettings.Halftone.PatternDither
        else -> PrintImageSettings.Halftone.Threshold // Default value
      }
    }

    fun settingsFromDictionary(dictionary: Map<String, Any>, modelName: String): PrintSettings {
      // decode supported model from name
      var model = _printerModelFromName(modelName)
      if (model == null) {
        throw GenericError("Unsupported printer model: $modelName")
      }

      // construct default settings for the model
      val settings = QLPrintSettings(model)

      // parse settings from dictionary
      dictionary.forEach { (key, value) ->
        when (key) {
          "labelSize" -> {
            if (value is Int) {
              settings.labelSize = _labelSizeFromValue(value)
            }
          }
          "autoCutForEachPageCount" -> {
            settings.autoCutForEachPageCount = if (value is Int) value else 1
          }
          "autoCut" -> {
            settings.isAutoCut = if (value is Boolean) value else false
          }
          "cutAtEnd" -> {
            settings.isCutAtEnd = if (value is Boolean) value else false
          }
          "resolution" -> {
            if (value is Int) {
              settings.resolution = _resolutionFromValue(value)
            }
          }
          "halftone" -> {
            if (value is Int) {
              settings.halftone = _halftoneFromValue(value)
            }
          }
          "halftoneThreshold" -> {
            if (value is Int) {
              settings.halftoneThreshold = value
            }
          }
        }
      }

      return settings
    }
  }
}
