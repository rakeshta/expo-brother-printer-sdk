import ExpoModulesCore
import BRLMPrinterKit


public class ExpoBrotherPrinterSdkModule: Module {

    // Each module class must implement the definition function. The definition consists of components
    // that describes the module's functionality and behavior.
    // See https://docs.expo.dev/modules/module-api for more details about available components.
    public func definition() -> ModuleDefinition {

        /// Name of the module visible from JavaScript
        Name("ExpoBrotherPrinterSdk")

        /// Search for printers connected via Bluetooth classic
        AsyncFunction("searchBluetoothPrinters") {
            NSLog("Search using Bluetooth")
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

        /// Search for printers available on the same WiFi network
        AsyncFunction("searchNetworkPrinters") { (optionsDict: [String: Any]) in
            NSLog("Search using WiFi")

            let options = try OptionsUtils.networkSearchOptionsFromDictionary(optionsDict)
            NSLog("-  Options: \(optionsDict)")

            var channels = []
            let _ = BRLMPrinterSearcher.startNetworkSearch(options) { channel in
                channels.append([
                    "type": BRLMChannelType.wiFi.rawValue,
                    "address": channel.channelInfo,
                    "modelName": channel.extraInfo?[BRLMChannelExtraInfoKeyModelName] ?? "Unknown",
                    "serialNumber": channel.extraInfo?[BRLMChannelExtraInfoKeySerialNumber] ?? "Unknown",
                    "macAddress": channel.extraInfo?[BRLMChannelExtraInfoKeyMacAddress] as Any,
                    "nodeName": channel.extraInfo?[BRLMChannelExtraInfoKeyNodeName] as Any,
                    "location": channel.extraInfo?[BRLMChannelExtraInfoKeyLocation] as Any
                ])
            }

            return channels
        }

        /// Print image with URL
        AsyncFunction("printImageWithURL") { (urlString: String, channelDict: [String: Any], settingsDict: [String: Any]) in
            NSLog("Print image with URL")

            // parse URL
            guard let url = URL(string: urlString) else {
                throw GenericError(description: "Invalid image URL")
            }
            NSLog("-  URL: \(url)")

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
            NSLog("...Connecting to \(modelName) at \(channel.channelInfo)")
            let driverResult = BRLMPrinterDriverGenerator.open(channel)
            guard
                driverResult.error.code == .noError,
                let driver = driverResult.driver
            else {
                throw GenericError(title: "Connection failed", description: driverResult.error.description())
            }

            // close connection before exit
            defer {
            NSLog("...Disconnecting")
                driver.closeChannel()
            }

            // print image
            NSLog("...Printing")
            let error = driver.printImage(with: url, settings: settings)
            if  error.code != BRLMPrintErrorCode.noError {
                NSLog("Print failed - \(error)")
                throw GenericError(title: "Print failed", description: "\(error.code) - \(error.description)")
            }
        }

        // Print image with PDF
        AsyncFunction("printPDFWithURL") { (urlString: String, pages: [Int], channelDict: [String: Any], settingsDict: [String: Any]) in
            NSLog("Print PDF with URL")

            // parse URL
            guard let url = URL(string: urlString) else {
                throw GenericError(description: "Invalid PDF URL")
            }
            NSLog("-  URL: \(url)")

            // log pages
            if !pages.isEmpty {
                NSLog("-  Pages: \(pages)")
            }

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
            NSLog("...Connecting to \(modelName) at \(channel.channelInfo)")
            let driverResult = BRLMPrinterDriverGenerator.open(channel)
            guard
                driverResult.error.code == .noError,
                let driver = driverResult.driver
            else {
                throw GenericError(title: "Connection failed", description: driverResult.error.description())
            }

            // close connection before exit
            defer {
            NSLog("...Disconnecting")
                driver.closeChannel()
            }

            // print pdf
            NSLog("...Printing")
            let error = pages.isEmpty
                ? driver.printPDF(with: url, settings: settings)
                : driver.printPDF(with: url, pages: pages.map { NSNumber(value: $0) }, settings: settings)
            if  error.code != BRLMPrintErrorCode.noError {
                NSLog("Print failed - \(error)")
                throw GenericError(title: "Print failed", description: "\(error.code) - \(error.description)")
            }
        }
    }
}
