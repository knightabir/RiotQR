import React from 'react';

const FAQPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pb-12 pt-5">
      <div className="max-w-2xl mx-auto space-y-6 mt-12">
        <h1 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <div className="text-left space-y-4 mt-8">
          <div>
            <h2 className="font-semibold text-lg">What is RiotQR?</h2>
            <p>RiotQR is a web app for generating QR codes and barcodes in many formats, with features like download, print, share, and save.</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Is RiotQR free to use?</h2>
            <p>Yes, RiotQR is free for personal and commercial use.</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Do you store my data?</h2>
            <p>No, your data is processed in your browser and not stored unless you use the save feature.</p>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Can I use RiotQR on mobile?</h2>
            <p>Absolutely! RiotQR is fully responsive and works on all devices.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage; 