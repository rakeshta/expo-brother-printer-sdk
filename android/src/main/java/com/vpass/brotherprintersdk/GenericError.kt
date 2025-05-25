package com.vpass.brotherprintersdk

class GenericError(private val description: String) : Exception(description) {
    override fun toString(): String {
        return "GenericError(description='$description')"
    }
}
