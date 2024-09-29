import ExpoModulesCore
import BRLMPrinterKit


public class ExpoBrotherPrinterSdkModule: Module {
    
    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {
        
        /// Name of the module visible from JavaScript
        Name("ExpoBrotherPrinterSdk")
        
        /// Search for Bluetooth classic printers
        AsyncFunction("searchBluetoothPrinters") {
            let searcher = BRLMPrinterSearcher.startBluetoothSearch()
            return searcher.channels.map { channel in
                return [
                    "type": BRLMChannelType.bluetoothMFi.rawValue,
                    "address": channel.channelInfo,
                    "modelName": channel.extraInfo?[BRLMChannelExtraInfoKeyModelName] ?? "Unknown",
                    "serialNumber": channel.extraInfo?[BRLMChannelExtraInfoKeySerialNumber] ?? "Unknown",
                    "macAddress": channel.extraInfo?[BRLMChannelExtraInfoKeyMacAddress] as Any,
                    "nodeName": channel.extraInfo?[BRLMChannelExtraInfoKeyNodeName] as Any,
                    "location": channel.extraInfo?[BRLMChannelExtraInfoKeyLocation] as Any
                ]
            }
        }
        
        /// Print image with URL
        AsyncFunction("printImageWithURL") { (urlString: String, channelDict: [String: Any], settingsDict: [String: Any]) in
            
            // parse URL
            guard let url = URL(string: urlString) else {
                throw GenericError(description: "Invalid image URL")
            }
            
            NSLog("DEBUG: printImageWithURL - \(url)")
            
            // re-construct chanel
            let channel = try ChannelUtils.channelFromDictionary(channelDict)
            NSLog("-  Address: \(channel.channelInfo)")
            
            // extract model name
            // fallback to model name we got back from JS (for BLE printers, channels created from address do not have
            // model info or other details.)
            guard
                let modelName = (channel.extraInfo?[BRLMChannelExtraInfoKeyModelName] ?? channelDict["modelName"]) as? String
            else {
                throw GenericError(description: "Model name could not be retrieved")
            }
            NSLog("-  Model Name: \(modelName)")

            // parse settings
            let settings = try SettingsUtils.settingsFromDictionary(settingsDict, modelName: modelName)
            NSLog("-  Settings: \(settingsDict)")
            
            // connect to printer
            let printerName   = "\(modelName) (\(channel.channelInfo))"
            NSLog("Connecting to \(printerName)")
            let driverResult = BRLMPrinterDriverGenerator.open(channel)
            guard
                driverResult.error.code == .noError,
                let driver = driverResult.driver
            else {
                throw GenericError(description: "Connection failed - \(driverResult.error.code)")
            }

            // close connection before exit
            defer {
                driver.closeChannel()
            }
            
            // print image
            driver.printImage(with: url, settings: settings)
        }
    }
}
