import React from "react";
import MobileTaggingGenerator from "./generator";

const page = () => {
    return (
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full pt-5">
            <div className="space-y-6 mb-12 text-center">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 text-center">Mobile Tagging QR Code Generator</h1>
                    <p className="text-gray-600 mt-2">
                        Generate QR codes for mobile tagging: URLs, phone numbers, SMS, email, or geo locations.
                    </p>
                </div>
                <div>
                    <MobileTaggingGenerator />
                </div>
            </div>
        </div>
    );
};

export default page; 