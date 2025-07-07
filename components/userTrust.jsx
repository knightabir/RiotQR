import React from 'react';
import { ShieldCheck, Lock, Globe, Award } from 'lucide-react';

const UserTrust = () => {
    return (
        <section
            className="container mx-auto px-4 py-12 flex flex-col items-center text-center shadow-md"
            itemScope
            itemType="https://schema.org/WebApplication"
        >
            {/* SEO Headings and Meta for RiotQR */}
            <h1 className="sr-only" itemProp="name">
                RiotQR - Free QR Code Generator & Barcode Generator Online | Unlimited, Secure, Fast
            </h1>
            <meta itemProp="applicationCategory" content="Utility" />
            <meta itemProp="operatingSystem" content="All" />
            <meta
                itemProp="description"
                content="RiotQR is the best free QR code generator and barcode generator online. Instantly create unlimited QR codes and barcodes for URLs, WiFi, events, contacts, and more. No registration required. Secure, private, and trusted by millions."
            />
            <meta
                itemProp="url"
                content="https://riotqr.com/"
            />
            <meta
                itemProp="keywords"
                content="QR code generator, barcode generator, free QR code, online QR code, secure QR code, privacy QR code, RiotQR, create QR code, generate barcode, no data stored, HTTPS, global QR code, trusted QR code app, unlimited QR code, QR code for WiFi, QR code for URL, QR code for event, QR code for contact, QR code for SMS, QR code for email, QR code for location, vCard QR code, Amazon FBA barcode, EAN barcode, UPC barcode, ISBN barcode, Code 128, Code 39, mobile tagging"
            />
            <meta
                itemProp="applicationSubCategory"
                content="QR Code Generator, Barcode Generator"
            />
            <meta
                itemProp="aggregateRating"
                content="4.9"
            />
            <meta
                itemProp="author"
                content="RiotQR Team"
            />
            <meta
                itemProp="creator"
                content="RiotQR"
            />
            <meta
                itemProp="inLanguage"
                content="en"
            />
            <meta
                itemProp="offers"
                content="Free, Unlimited Usage"
            />
            <div className="flex items-center justify-center gap-3 mb-12">
                <ShieldCheck className="w-8 h-8 text-green-600" aria-label="Trusted by millions" />
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 " itemProp="headline">
                    Trusted by millions of users worldwide
                </h2>
            </div>
            <p className="text-gray-700 text-base md:text-lg mb-12 max-w-2xl" itemProp="about">
                <strong>RiotQR</strong> is your all-in-one online platform for creating, customizing, and managing QR codes and barcodes with ease. Instantly generate high-quality QR codes for URLs, text, WiFi, business cards, events, and more. <strong>No registration required</strong> and <strong>no data is ever stored</strong>—your privacy and security are our top priorities. RiotQR uses HTTPS for every connection and is accessible worldwide. Join millions who trust RiotQR for their QR code and barcode needs.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mb-12">
                <div className="flex items-center gap-2">
                    <Lock className="w-6 h-6 text-green-600" aria-label="Secure Connection" />
                    <span className="font-medium text-gray-800" itemProp="feature">
                        Secure Connection (HTTPS)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Globe className="w-6 h-6 text-indigo-600" aria-label="Global Accessibility" />
                    <span className="font-medium text-gray-800" itemProp="feature">
                        Accessible Worldwide
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-500" aria-label="Privacy First" />
                    <span className="font-medium text-gray-800" itemProp="feature">
                        Privacy First: No Data Stored
                    </span>
                </div>
            </div>
            {/* SEO: Additional hidden content for better ranking */}
            <div className="sr-only" itemProp="keywords">
                QR code generator, barcode generator, free QR code, online QR code, secure QR code, privacy QR code, RiotQR, create QR code, generate barcode, no data stored, HTTPS, global QR code, trusted QR code app, unlimited QR code, QR code for WiFi, QR code for URL, QR code for event, QR code for contact, QR code for SMS, QR code for email, QR code for location, vCard QR code, Amazon FBA barcode, EAN barcode, UPC barcode, ISBN barcode, Code 128, Code 39, mobile tagging
            </div>
            {/* SEO: Additional hidden content for Google Rich Results */}
            <div className="sr-only" itemProp="slogan">
                Free, Unlimited, Secure QR Code & Barcode Generator Online – No Registration, No Data Stored, Trusted by Millions.
            </div>
            <div className="sr-only" itemProp="softwareVersion">
                2024.1
            </div>
        </section>
    );
};

export default UserTrust;