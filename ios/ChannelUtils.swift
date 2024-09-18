//
//  ChannelUtils.swift
//  Pods
//
//  Created by Rakesh Ayyaswami on 19/9/2024.
//
import BRLMPrinterKit


class ChannelUtils {
    
    static func channelFromDictionary(_ dictionary: [String: Any]) throws -> BRLMChannel {
        
        // parse type
        guard
            let typeRaw = dictionary["type"] as? Int,
            let type    = BRLMChannelType(rawValue: typeRaw) else {
            throw GenericError(description: "Invalid channel type")
        }
        
        // address
        guard let address = dictionary["address"] as? String else {
            throw GenericError(description: "Channel address not found")
        }
        
        // construct channel
        switch type {
        case .wiFi:
            return BRLMChannel(wifiIPAddress: address)
            
        case .bluetoothMFi:
            return BRLMChannel(bluetoothSerialNumber: address)
            
        case .bluetoothLowEnergy:
            return BRLMChannel(bleLocalName: address)
            
        @unknown default:
            throw GenericError(description: "Unsupported channel type")
        }
    }
}
