//
//  OptionsUtils.swift
//  Pods
//
//  Created by Rakesh Ayyaswami on 30/1/2025.
//

import BRLMPrinterKit


internal class OptionsUtils {
    
    internal static func networkSearchOptionsFromDictionary(_ dict: [String: Any]) throws -> BRLMNetworkSearchOption {
        let reader = DictionaryReadWrite(dict)

        let options = BRLMNetworkSearchOption()
        options.printerList    = reader.read("printerList")
        options.searchDuration = reader.read("searchDuration", nvl: 1000) { $0 / 1000 }

        return options
    }
}
