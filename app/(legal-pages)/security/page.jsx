import React from 'react';

const SecurityPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pb-12 pt-5">
      <div className="max-w-3xl mx-auto space-y-6 mt-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Security</h1>
        <div className="text-gray-700 space-y-4 text-justify">
          <p>
            <strong>Protecting your data is a top priority at RiotQR.</strong>
          </p>
          <p>
            All data you enter to generate QR codes or barcodes is processed securely in your browser and is not stored or shared unless you explicitly use the save feature. RiotQR uses HTTPS to encrypt all communications between your device and our servers.
          </p>
          <p>
            We regularly update our application to address security vulnerabilities and follow best practices for web application security. If you discover a security issue, please contact us immediately so we can investigate and resolve it.
          </p>
          <p>
            For more information about how we handle your data, please review our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage; 