import React from 'react';

const TermsOfServicePage = () => {
  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pb-12 pt-5">
      <div className="max-w-3xl mx-auto space-y-6 mt-12">
        <h1 className="text-4xl font-bold text-gray-900 text-center">Terms of Service</h1>
        <div className="text-gray-700 space-y-4 text-justify">
          <p>
            <strong>Effective Date:</strong> [Insert Date Here]
          </p>
          <p>
            By using RiotQR, you agree to use the service for lawful purposes only. You are responsible for any content you generate and share. RiotQR is provided as-is, without warranty of any kind. We are not liable for any damages or losses resulting from the use of this application.
          </p>
          <p>
            We reserve the right to update these terms at any time. Continued use of the service constitutes acceptance of the new terms. If you do not agree, please discontinue use of RiotQR.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;