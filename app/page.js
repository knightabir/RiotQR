import AddToolRequest from "@/components/addToolRequest";
import ItemCard from "@/components/itemCard";
import UserTrust from "@/components/userTrust";
import { QrCode, Wifi, Globe, Barcode, Book, Tag, Calendar, Link2, Download, Zap, Shield, Phone, Mail, MapPin, MessageCircle, User, FileText } from "lucide-react";
import Image from "next/image";
import Head from "next/head";

export default function Home() {
  // Section: List of generator items with their properties and icons
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
    <>
      {/* SEO Meta Tags for RiotQR */}
      <Head>
        <title>RiotQR | Free QR Code & Barcode Generator Online - Unlimited, Secure, Fast</title>
        <meta
          name="description"
          content="RiotQR is the ultimate free QR code and barcode generator. Instantly create unlimited QR codes and barcodes for URLs, WiFi, events, contacts, and more. No registration required. Secure, private"
        />
        <meta
          name="keywords"
          content="QR code generator, free QR code, barcode generator, RiotQR, online QR code, create QR code, QR code for WiFi, QR code for URL, QR code for event, QR code for contact, QR code for SMS, QR code for email, QR code for location, QR code for text, vCard QR code, Amazon FBA barcode, EAN barcode, UPC barcode, ISBN barcode, Code 128, Code 39, mobile tagging, secure QR code, privacy QR code"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="RiotQR | Free QR Code & Barcode Generator Online" />
        <meta property="og:description" content="Create unlimited free QR codes and barcodes for all your business, marketing, and personal needs. No registration. Secure, private." />
        <meta property="og:url" content="https://riotqr.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://riotqr.com/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="RiotQR | Free QR Code & Barcode Generator Online" />
        <meta name="twitter:description" content="Create unlimited free QR codes and barcodes for all your business, marketing, and personal needs. No registration. Secure, private." />
        <meta name="twitter:image" content="https://riotqr.com/og-image.png" />
        <link rel="canonical" href="https://riotqr.com/" />
      </Head>
      {/* Section: Main container with background gradient */}
      <main className="min-h-screen bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 transition-colors duration-300">
        {/* Section: Header with title and description */}
        <header className="container mx-auto px-4 py-12 text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-indigo-900 dark:text-indigo-100">
            RiotQR: Free QR Code & Barcode Generator
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
            Welcome to <strong>RiotQR</strong> – your all-in-one platform to instantly create <strong>free</strong> QR codes and barcodes for business, marketing, education, and personal use. No registration required. Unlimited usage. Secure, and privacy-focused.
          </p>
        </header>

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

        {/* Section: Feature highlights (Live Generation, Export Options, Secure & Privacy) */}
        <section className="container mx-auto px-4 mb-12">
          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Feature: Live Generation */}
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <Zap
                className="w-10 h-10 text-blue-600 mb-2"
                aria-label="Live Generation Icon"
              />
              <h2 className="font-bold text-lg mb-1 text-gray-900">
                Real-Time QR & Barcode Generation
              </h2>
              <p className="text-gray-700 text-sm">
                Instantly generate QR codes and barcodes as you type. No server processing required. Fast, reliable, and always free with RiotQR.
              </p>
            </div>
            {/* Feature: Export Options */}
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <Download
                className="w-10 h-10 text-blue-600 mb-2"
                aria-label="Export Options Icon"
              />
              <h2 className="font-bold text-lg mb-1 text-gray-900">
                Multiple Export & Sharing Options
              </h2>
              <p className="text-gray-700 text-sm">
                Download your QR codes and barcodes as PNG, SVG, or PDF. Print, share, or embed them anywhere. All features are free on RiotQR.
              </p>
            </div>
            {/* Feature: Secure & Privacy */}
            <div className="bg-blue-50 rounded-xl p-6 flex flex-col items-center text-center shadow">
              <Shield
                className="w-10 h-10 text-blue-600 mb-2"
                aria-label="Secure & Privacy Icon"
              />
              <h2 className="font-bold text-lg mb-1 text-gray-900">
                Secure & Private by Design
              </h2>
              <p className="text-gray-700 text-sm">
                Your data is never stored or shared. RiotQR is built with privacy and security in mind, so you can generate codes with confidence.
              </p>
            </div>
          </div>
        </section>

        {/* User trust section */}
        <div>
          <UserTrust />
        </div>
        {/* <AddToolRequest /> */}
      </main>
    </>
  );
}
