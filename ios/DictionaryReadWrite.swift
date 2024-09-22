//
//  DictionaryReadWrite.swift
//  Pods
//
//  Created by Rakesh Ayyaswami on 23/9/2024.
//

import Foundation


// MARK: - Dictionary

extension Dictionary {

    fileprivate func safeValue(for key: Key) -> Value? {
        guard let v = self[key] else { return nil }
        return v is NSNull ? nil : v
    }
}


// MARK: - DictionaryReadWrite

public struct DictionaryReadWrite {

    // MARK: - Members

    public private(set) var dictionary: [String: Any]
    public let defaults:                [String: Any]?


    // MARK: - Accessors

    public var mutableDictionary:        NSMutableDictionary {
        return NSMutableDictionary(dictionary: dictionary)
    }



    // MARK: - Init

    public init(defaults: [String: Any]? = nil) {
        self.init([:], defaults: defaults)
    }

    public init(_ dictionary: NSDictionary, defaults: [String: Any]? = nil) {
        self.init(dictionary as! [String : Any], defaults: defaults)
    }

    public init(_ dictionary: [String: Any], defaults: [String: Any]? = nil) {
        self.dictionary = dictionary
        self.defaults   = defaults
    }
}


// MARK: - Reading

extension DictionaryReadWrite {
    
    // WORKAROUND: for Swift bug(?) which returns Optiona.some(nil) when nil of type T? is
    // cast to Any?.
    public func read(_ key: String) -> Any? {
        return dictionary.safeValue(for: key) ?? defaults?.safeValue(for: key)
    }
    
    // WORKAROUND: for Swift bug(?) which returns Optiona.some(nil) when nil of type T? is
    // cast to Any?.
    public func read(_ keys: [String]) -> Any? {
        for k in keys {
            if  let v: Any = read(k) {
                return v
            }
        }
        return nil
    }
    

    // MARK: -

    public func read<T>(_ key: String) -> T? {
        return dictionary.safeValue(for: key) as? T ?? defaults?.safeValue(for: key) as? T
    }

    public func read<T>(_ keys: [String]) -> T? {
        for k in keys {
            if  let v: T = read(k) {
                return v
            }
        }
        return nil
    }

    public func read<T>(_ key: String, nvl: @autoclosure () -> T) -> T {
        return read(key) ?? nvl()
    }

    public func read<T>(_ keys: [String], nvl: @autoclosure () -> T) -> T {
        return read(keys) ?? nvl()
    }

    public func read<T, V>(_ key: String, map: (V) -> T?) -> T? {
        guard let v: V = read(key) else { return nil }
        return map(v)
    }

    public func read<T, V>(_ keys: [String], map: (V) -> T?) -> T? {
        guard let v: V = read(keys) else { return nil }
        return map(v)
    }

    public func read<T, V>(_ key: String, nvl: @autoclosure () -> T, map: (V) -> T?) -> T {
        return read(key, map: map) ?? nvl()
    }

    public func read<T, V>(_ keys: [String], nvl: @autoclosure () -> T, map: (V) -> T?) -> T {
        return read(keys, map: map) ?? nvl()
    }

    public func read<T, V>(_ key: String, map: (V) -> T?) -> [T]? {
        guard let arr: [V] = read(key) else { return nil }
        var ret = [T]()
        for val in arr {
            if  let o = map(val) {
                ret.append(o)
            }
        }
        return ret
    }

    public func read<T, V>(_ keys: [String], map: (V) -> T?) -> [T]? {
        guard let arr: [V] = read(keys) else { return nil }
        var ret = [T]()
        for val in arr {
            if  let o = map(val) {
                ret.append(o)
            }
        }
        return ret
    }

    public func read<T, V>(_ key: String, nvl: @autoclosure () -> [T], map: (V) -> T?) -> [T] {
        return read(key, map: map) ?? nvl()
    }

    public func read<T, V>(_ keys: [String], nvl: @autoclosure () -> [T], map: (V) -> T?) -> [T] {
        return read(keys, map: map) ?? nvl()
    }


    // MARK: -

    public func read(_ key: String) -> DictionaryReadWrite {
        return DictionaryReadWrite(read(key, nvl: [:]))
    }
}


// MARK: - Helpers

extension DictionaryReadWrite {

    private func shouldWrite(_ key: String, value: Any) -> Bool {

        if  let valueBool           = value as? Bool {
            if  let defaultBool     = defaults?[key] as? Bool {
                return valueBool   != defaultBool
            }
            return valueBool       != false
        }

        if  let valueDouble         = value as? Double {
            if  let defaultDouble   = defaults?[key] as? Double {
                return valueDouble != defaultDouble
            }
            return valueDouble     != 0.0
        }

        if  let valueStr            = value as? String {
            if  let defaultStr      = defaults?[key] as? String {
                return valueStr    != defaultStr
            }
            return true
        }

        if  let valueArr            = value as? [Any] {
            return valueArr.count   > 0
        }

        if  let valueDict           = value as? [String: Any] {
            return valueDict.count  > 0
        }

        return true
    }
}


// MARK: - Writing

extension DictionaryReadWrite {

    public mutating func write(_ key: String, value: Any?) {

        guard let valueU = value, shouldWrite(key, value: valueU) else {
            dictionary.removeValue(forKey: key)
            return
        }

        dictionary[key] = valueU
    }

    public mutating func write<T>(_ key: String, array: [T]?, transform: (T) -> Any) {
        write(key, value: array?.map(transform))
    }


    // MARK: -

    public mutating func write(_ key: String, value: DictionaryReadWrite?) {
        let valueDict = value?.dictionary
        write(key, value: valueDict)
    }


    // MARK: - Merge

    public mutating func merge(_ dictionary: [String: Any]) {
        for (key, value) in dictionary {
            write(key, value: value)
        }
    }

    public mutating func merge(_ dictionary: NSMutableDictionary) {
        merge(NSDictionary(dictionary: dictionary) as! [String : Any])
    }


    // MARK: - Subscript

    public subscript(key: String) -> Any? {
        get {
            return dictionary[key]
        }
        set {
            write(key, value: newValue)
        }
    }

    public subscript(key: String) -> DictionaryReadWrite {
        get {
            return read(key)
        }
        set {
            write(key, value: newValue)
        }
    }
}
