import React from 'react'
import EventToQrGenerator from './eventToQrGenerator'

const page = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full pt-5">
      <div className="space-y-6 mb-12 text-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Event to QR Code Generator</h1>
          <p className="text-gray-600 mt-2">
            Enter event details to generate a QR code for calendar events.
          </p>
        </div>
        <div><EventToQrGenerator /></div>
      </div>
    </div>
  )
}

export default page