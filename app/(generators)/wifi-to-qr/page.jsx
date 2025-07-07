import React from 'react'
import WifiToQrGenerator from './wifiToQrGenerator'

const page = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full pt-5">
      <div className="space-y-6 mb-12 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">WiFi to QR Code Generator</h1>
          <p className="text-gray-600 mt-2">
            Enter your WiFi credentials to generate a QR code for easy sharing.
          </p>
        </div>
        <div><WifiToQrGenerator /></div>
      </div>
    </div>
  )
}

export default page