//
//  GenericError.swift
//  Pods
//
//  Created by Rakesh Ayyaswami on 19/9/2024.
//

struct GenericError: Error, CustomStringConvertible {
    let title:       String?
    let description: String
    
    init(title: String?, description: String) {
        self.title = title
        self.description = description
    }
    
    init(description: String) {
        self.init(title: nil, description: description)
    }
}
