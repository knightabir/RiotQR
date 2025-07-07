import React from 'react';

const PrivacyPolicyPage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pb-12 pt-5">
      <div className="max-w-3xl mx-auto space-y-6 mt-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Privacy Policy</h1>
        <div className="text-gray-700 space-y-4 text-justify">
          <p>
            <strong>Effective Date:</strong> [Insert Date Here]
          </p>
          <p>
            RiotQR values your privacy. We do not sell, trade, or rent your personal information to third parties. Any data you enter to generate QR codes or barcodes is processed securely and is not stored or shared unless you explicitly use the save feature.
          </p>
          <p>
            We may collect non-personal analytics data to improve the service. If you contact us, we may retain your email for support purposes only. For more details, please contact us.
          </p>
          <p>
            By using RiotQR, you agree to this privacy policy. This policy may be updated from time to time. Please review it periodically.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;