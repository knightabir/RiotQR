import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pb-12 pt-5">
      <div className="max-w-2xl mx-auto text-center space-y-6 mt-12">
        <h1 className="text-4xl font-bold text-gray-900">About RiotQR</h1>
        <p className="text-lg text-gray-700">
          RiotQR is a modern, user-friendly web application for generating QR codes and barcodes in a wide variety of formats. Whether you need a QR code for a URL, contact, event, WiFi, or a barcode for retail, books, or logistics, RiotQR provides a seamless, customizable experience. Enjoy features like download, print, share, and save, all in a beautiful, responsive interface.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;