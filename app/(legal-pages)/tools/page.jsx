import ItemCard from '@/components/itemCard';
import { Barcode, Book, Calendar, FileText, Link2, Mail, MapPin, MessageCircle, Phone, QrCode, Tag, User, Wifi } from 'lucide-react';
import React from 'react';

const ToolsPage = () => {
  const generators = [
    {
      name: "QR Code Generator",
      path: "/qr-code",
      description:
        "Create custom QR codes for URLs, text, and more. 100% FREE with RiotQR.",
      icon: (
        <QrCode
          className="w-8 h-8 text-blue-600 dark:text-blue-400"
          aria-label="QR Code Icon"
        />
      ),
    },
    {
      name: "URL QR Code Generator",
      path: "/url-qr",
      description:
        "Generate QR codes for any website or link. Free, unlimited, and secure with RiotQR.",
      icon: (
        <Link2
          className="w-8 h-8 text-green-600 dark:text-green-400"
          aria-label="URL QR Icon"
        />
      ),
    },
    {
      name: "WiFi QR Code Generator",
      path: "/wifi-to-qr",
      description: "Share WiFi credentials instantly with a free QR code from RiotQR.",
      icon: (
        <Wifi
          className="w-8 h-8 text-purple-600 dark:text-purple-400"
          aria-label="WiFi QR Icon"
        />
      ),
    },
    {
      name: "Amazon FBA Barcode Generator",
      path: "/amazon-fba",
      description:
        "Generate Amazon FBA barcodes for your products. No cost, no limits, only at RiotQR.",
      icon: (
        <Barcode
          className="w-8 h-8 text-orange-600 dark:text-orange-400"
          aria-label="Amazon FBA Barcode Icon"
        />
      ),
    },
    {
      name: "EAN/UPC Barcode Generator",
      path: "/ean-upc",
      description: "Create EAN and UPC barcodes for retail. Free, easy, and fast with RiotQR.",
      icon: (
        <Barcode
          className="w-8 h-8 text-pink-600 dark:text-pink-400"
          aria-label="EAN/UPC Barcode Icon"
        />
      ),
    },
    {
      name: "ISBN Barcode Generator",
      path: "/isbn",
      description: "Generate ISBN barcodes for books. 100% free and instant at RiotQR.",
      icon: (
        <Book
          className="w-8 h-8 text-yellow-600 dark:text-yellow-400"
          aria-label="ISBN Book Icon"
        />
      ),
    },
    {
      name: "Linear Barcode Generator",
      path: "/linear-barcode",
      description: "Create linear barcodes (Code 128, Code 39, etc.) for free with RiotQR.",
      icon: (
        <Barcode
          className="w-8 h-8 text-cyan-600 dark:text-cyan-400"
          aria-label="Linear Barcode Icon"
        />
      ),
    },
    {
      name: "Mobile Tagging Generator",
      path: "/mobile-tagging",
      description: "Generate mobile tagging codes for marketing. Always free at RiotQR.",
      icon: (
        <Tag
          className="w-8 h-8 text-teal-600 dark:text-teal-400"
          aria-label="Mobile Tagging Icon"
        />
      ),
    },
    {
      name: "Event QR Code Generator",
      path: "/event-to-qr",
      description:
        "Create event QR codes for tickets, RSVPs, and more. Free forever with RiotQR.",
      icon: (
        <Calendar
          className="w-8 h-8 text-red-600 dark:text-red-400"
          aria-label="Event Calendar Icon"
        />
      ),
    },
    {
      name: "Call to QR Code Generator",
      path: "/call-to-qr",
      description: "Generate QR codes to initiate phone calls. Free and easy with RiotQR.",
      icon: (
        <Phone
          className="w-8 h-8 text-lime-600 dark:text-lime-400"
          aria-label="Call QR Icon"
        />
      ),
    },
    {
      name: "Email to QR Code Generator",
      path: "/email-to-qr",
      description: "Generate QR codes for sending emails. Free and simple with RiotQR.",
      icon: (
        <Mail
          className="w-8 h-8 text-rose-600 dark:text-rose-400"
          aria-label="Email QR Icon"
        />
      ),
    },
    {
      name: "Location to QR Code Generator",
      path: "/location-to-qr",
      description: "Generate QR codes for map locations. Free and fast with RiotQR.",
      icon: (
        <MapPin
          className="w-8 h-8 text-amber-600 dark:text-amber-400"
          aria-label="Location QR Icon"
        />
      ),
    },
    {
      name: "SMS to QR Code Generator",
      path: "/sms-to-qr",
      description: "Generate QR codes for SMS messages. Free and instant with RiotQR.",
      icon: (
        <MessageCircle
          className="w-8 h-8 text-fuchsia-600 dark:text-fuchsia-400"
          aria-label="SMS QR Icon"
        />
      ),
    },
    {
      name: "Text to QR Code Generator",
      path: "/text-to-qr",
      description: "Generate QR codes for plain text. Free and unlimited with RiotQR.",
      icon: (
        <FileText
          className="w-8 h-8 text-gray-600 dark:text-gray-400"
          aria-label="Text QR Icon"
        />
      ),
    },
    {
      name: "vCard to QR Code Generator",
      path: "/vcard-to-qr",
      description: "Generate QR codes for contact vCards. Free and secure with RiotQR.",
      icon: (
        <User
          className="w-8 h-8 text-indigo-600 dark:text-indigo-400"
          aria-label="vCard QR Icon"
        />
      ),
    },
  ];

  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 min-h-screen w-full pt-5 pb-12">
      <div className="max-w-2xl mx-auto text-center space-y-6 mt-12 mb-12">
        <h1 className="text-4xl font-bold text-gray-900">Tools</h1>
      </div>
      {/* Section: Generator item cards grid */}
      <section className="container mx-auto px-4 mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-1">
          {generators.map((item, index) => (
            <ItemCard key={item.name} item={item} />
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <div className="text-center text-gray-700 dark:text-gray-300 text-base max-w-2xl mx-auto">
            <span role="img" aria-label="construction">🚧</span>{" "}
            <strong>More QR tools are coming soon to RiotQR!</strong> Our team is working hard to bring you even more powerful and innovative QR code and barcode solutions. Stay tuned for updates and new features!
          </div>
        </div>
      </section>
    </div>
  );
};

export default ToolsPage; 