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
        AsyncFunction("printImageWithURL") { (url: String, channelDict: [String: Any], settingsDict: [String: Any]) in
            
            let channel = try ChannelUtils.channelFromDictionary(channelDict)
            
        }
    }
}
