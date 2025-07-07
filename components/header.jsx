import React from "react";
import Link from "next/link";
import Head from "next/head";
import { QrCode, Shield, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/tools" }
];

const Header = () => {
    return (
        <>
            {/* SEO Meta Tags for RiotQR */}
            <Head>
                <title>RiotQR | Free QR Code & Barcode Generator Online - Unlimited, Secure, Fast</title>
                <meta
                    name="description"
                    content="RiotQR is the ultimate free QR code and barcode generator. Instantly create unlimited QR codes and barcodes for URLs, WiFi, events, contacts, and more. No registration required. Secure, private, and trusted by millions."
                />
                <meta
                    name="keywords"
                    content="RiotQR, QR code generator, free QR code, barcode generator, online QR code, create QR code, QR code for WiFi, QR code for URL, QR code for event, QR code for contact, QR code for SMS, QR code for email, QR code for location, QR code for text, vCard QR code, Amazon FBA barcode, EAN barcode, UPC barcode, ISBN barcode, Code 128, Code 39, mobile tagging, secure QR code, privacy QR code"
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
            <header className="w-full bg-white/80 dark:bg-gray-950/80 backdrop-blur border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40">
                <div className="container mx-auto px-4 flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group" aria-label="RiotQR Home">
                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 p-2">
                            <QrCode className="w-6 h-6 text-indigo-700 dark:text-indigo-300 transition-transform group-hover:rotate-6" />
                        </span>
                        <span className="ml-2 text-lg font-extrabold text-indigo-800 dark:text-indigo-100 tracking-tight">
                            RiotQR
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link href="/security">
                            <Button
                                variant="outline"
                                size="sm"
                                className="ml-2 flex items-center gap-1 border-indigo-200 dark:border-indigo-800"
                            >
                                <Shield className="w-4 h-4 mr-1 text-indigo-700 dark:text-blue-300" />
                                <span className="text-indigo-700 dark:text-blue-300">Security</span>
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Nav */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Open menu">
                                    <Menu className="w-6 h-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 w-64">
                                {/* Accessibility: Hidden DialogTitle for screen readers */}
                                <VisuallyHidden>
                                    <DialogTitle>Mobile Navigation Menu</DialogTitle>
                                </VisuallyHidden>
                                <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-800">
                                    <Link href="/" className="flex items-center gap-2" aria-label="RiotQR Home">
                                        <span className="inline-flex items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900 p-2">
                                            <QrCode className="w-6 h-6 text-indigo-700 dark:text-indigo-300" />
                                        </span>
                                        <span className="ml-2 text-lg font-extrabold text-indigo-800 dark:text-indigo-100 tracking-tight text-center">
                                            RiotQR <span className="text-indigo-600 dark:text-blue-300">QR & Barcode Generator</span>
                                        </span>
                                    </Link>
                                    {/* No close button for now */}
                                </div>
                                <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile navigation">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-indigo-50 dark:hover:bg-indigo-900 hover:text-indigo-700 dark:hover:text-indigo-300 transition"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <Link href="/security">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="mt-2 flex items-center gap-1 w-full justify-center"
                                        >
                                            <Shield className="w-4 h-4 mr-1 text-indigo-700 dark:text-blue-300" />
                                            <span className="text-indigo-700 dark:text-blue-300">Security</span>
                                        </Button>
                                    </Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;