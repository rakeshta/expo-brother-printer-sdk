//
//  SettingsUtils.swift
//  Pods
//
//  Created by Rakesh Ayyaswami on 23/9/2024.
//

import BRLMPrinterKit


internal class SettingsUtils {
    
    private static func _printerModelFromName(_ name: String) throws -> BRLMPrinterModel {
        switch name {
        case "QL-710W":    return .QL_710W
        case "QL-720NW":   return .QL_720NW
        case "QL-810W":    return .QL_810W
        case "QL-820NWB":  return .QL_820NWB
        case "QL-1110NWB": return .QL_1110NWB
        case "QL-1115NWB": return .QL_1115NWB

        default:
            throw GenericError(description: "Unsupported printer model")
        }
    }
    
    private static func _parseSettings_QLSeries(_ reader: DictionaryReadWrite, model: BRLMPrinterModel) throws -> BRLMQLPrintSettings {
        guard let settings = BRLMQLPrintSettings(defaultPrintSettingsWith: model) else {
            throw GenericError(description: "Failed to initialize printer settings object")
        }
        
        settings.labelSize               = reader.read("labelSize",               nvl: settings.labelSize) { BRLMQLPrintSettingsLabelSize(rawValue: $0) }
        settings.autoCutForEachPageCount = reader.read("autoCutForEachPageCount", nvl: 1)
        settings.autoCut                 = reader.read("autoCut",                 nvl: false)
        settings.cutAtEnd                = reader.read("cutAtEnd",                nvl: false)
        settings.resolution              = reader.read("resolution",              nvl: .normal)            { BRLMPrintSettingsResolution(rawValue: $0) }
        settings.halftone                = reader.read("halftone",                nvl: .threshold)         { BRLMPrintSettingsHalftone(rawValue: $0) }
        settings.halftoneThreshold       = reader.read("halftoneThreshold",       nvl: 128)
        
        return settings
    }
    
    internal static func settingsFromDictionary(_ settings: [String: Any], modelName: String) throws  -> BRLMPrintSettingsProtocol {

        // decode supported model from name
        let model  = try _printerModelFromName(modelName)

        // parse settings based on model
        let reader = DictionaryReadWrite(settings)
        if  modelName.hasPrefix("QL") {
            return try _parseSettings_QLSeries(reader, model: model)
        }
        
        // unknown model
        throw GenericError(description: "Unsupported printer model")
    }
}
