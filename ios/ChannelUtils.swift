//
//  ChannelUtils.swift
//  Pods
//
//  Created by Rakesh Ayyaswami on 19/9/2024.
//

import BRLMPrinterKit

internal class ChannelUtils {

  internal static func channelFromDictionary(_ dictionary: [String: Any]) throws -> BRLMChannel {

    // parse type
    guard
      let typeRaw = dictionary["type"] as? Int,
      let type = BRLMChannelType(rawValue: typeRaw)
    else {
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

  /**
   * Helper function to handle connecting to a printer, executing an operation, and safely closing the connection
   *
   * @param channelDict The dictionary containing channel information
   * @param operation A closure that will be called with the printer driver if connection is successful
   * @throws GenericError if connection fails or if modelName is not available
   * @returns The value returned by the operation closure
   */
  internal static func withPrinterDriver<T>(
    _ channelDict: [String: Any], operation: (BRLMPrinterDriver, String) throws -> T
  ) throws -> T {
    // Reconstruct channel
    let channel = try channelFromDictionary(channelDict)
    NSLog("-  Address: \(channel.channelInfo)")

    // Extract model name (fallback to modelName from dictionary for BLE printers)
    guard
      let modelName =
        (channel.extraInfo?[BRLMChannelExtraInfoKeyModelName] ?? channelDict["modelName"])
        as? String
    else {
      throw GenericError(description: "Model name could not be retrieved")
    }
    NSLog("-  Model Name: \(modelName)")

    // Connect to printer
    NSLog("...Connecting to \(modelName) at \(channel.channelInfo)")
    let driverResult = BRLMPrinterDriverGenerator.open(channel)
    guard
      driverResult.error.code == .noError,
      let driver = driverResult.driver
    else {
      throw GenericError(
        title: "Connection failed", description: driverResult.error.description())
    }

    // Close connection before returning
    defer {
      NSLog("...Disconnecting")
      driver.closeChannel()
    }

    // Execute the operation and return its result
    return try operation(driver, modelName)
  }
}
