"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Share2, Printer, Save } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import clsx from "clsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Minimal country list with flags and codes for demo
const COUNTRY_CODES = [
    { code: "+1", name: "United States", flag: "🇺🇸", pattern: /^[2-9]\d{2}[2-9]\d{2}\d{4}$/ },
    { code: "+44", name: "United Kingdom", flag: "🇬🇧", pattern: /^\d{10}$/ },
    { code: "+91", name: "India", flag: "🇮🇳", pattern: /^[6-9]\d{9}$/ },
    { code: "+61", name: "Australia", flag: "🇦🇺", pattern: /^4\d{8}$/ },
    { code: "+81", name: "Japan", flag: "🇯🇵", pattern: /^\d{10}$/ },
    { code: "+49", name: "Germany", flag: "🇩🇪", pattern: /^1[5-7]\d{8}$/ },
    { code: "+33", name: "France", flag: "🇫🇷", pattern: /^6\d{8}$/ },
    { code: "+39", name: "Italy", flag: "🇮🇹", pattern: /^3\d{9}$/ },
    { code: "+34", name: "Spain", flag: "🇪🇸", pattern: /^6\d{8}$/ },
    { code: "+7", name: "Russia", flag: "🇷🇺", pattern: /^9\d{9}$/ },
    { code: "+86", name: "China", flag: "🇨🇳", pattern: /^1[3-9]\d{9}$/ },
    { code: "+82", name: "South Korea", flag: "🇰🇷", pattern: /^1[0-9]\d{7,8}$/ },
    { code: "+55", name: "Brazil", flag: "🇧🇷", pattern: /^[1-9]{2}9\d{8}$/ },
    { code: "+27", name: "South Africa", flag: "🇿🇦", pattern: /^([6-8])\d{8}$/ },
    { code: "+62", name: "Indonesia", flag: "🇮🇩", pattern: /^8[1-9]\d{6,9}$/ },
    // Add more as needed
];

const ERROR_CORRECTION_LEVELS = [
    { label: "L", value: "L", description: "Low (~7%)" },
    { label: "M", value: "M", description: "Medium (~15%)" },
    { label: "Q", value: "Q", description: "Quartile (~25%)" },
    { label: "H", value: "H", description: "High (~30%)" },
];

export default function CallToQrGenerator() {
    // Default to US
    const [country, setCountry] = useState(COUNTRY_CODES[0]);
    const [phone, setPhone] = useState("");
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
    const [phoneError, setPhoneError] = useState("");
    // Make width and height configurable
    const [width, setWidth] = useState(256);
    const [height, setHeight] = useState(256);

    // Validate phone number based on country
    function validatePhone(num, countryObj) {
        if (!num.trim()) return "Phone number is required";
        if (!countryObj.pattern.test(num.replace(/\D/g, ""))) {
            return `Invalid phone number for ${countryObj.name}`;
        }
        return "";
    }

    useEffect(() => {
        if (phone.trim()) {
            const err = validatePhone(phone, country);
            setPhoneError(err);
            if (!err) {
                generateQRCode();
            } else {
                setQrCodeUrl("");
            }
        } else {
            setPhoneError("");
            setQrCodeUrl("");
        }
        // eslint-disable-next-line
    }, [phone, country, errorCorrectionLevel, width, height]);

    const generateQRCode = async () => {
        const fullNumber = `${country.code}${phone.replace(/\D/g, "")}`;
        const data = `tel:${fullNumber}`;
        try {
            const qrCodeDataUrl = await QRCode.toDataURL(data, {
                errorCorrectionLevel,
                width,
                margin: 2,
            });
            setQrCodeUrl(qrCodeDataUrl);
        } catch (error) {
            console.error("Error generating QR code:", error);
            toast.error("Error generating QR code");
        }
    };

    const downloadQRCode = () => {
        if (!qrCodeUrl) return;
        try {
            const link = document.createElement("a");
            link.download = `call-qr-code-${Date.now()}.png`;
            link.href = qrCodeUrl;
            link.click();
            toast.success("QR code downloaded successfully!");
        } catch (error) {
            toast.error("Error downloading QR code");
        }
    };

    const printQRCode = () => {
        if (!qrCodeUrl) return;
        const printWindow = window.open("", "_blank");
        if (printWindow) {
            printWindow.document.write(`
                <html>
                  <head><title>Print Call QR Code</title></head>
                  <body style="text-align: center; padding: 20px;">
                    <img src="${qrCodeUrl}" style="max-width: 100%; width: ${width}px; height: ${height}px;" />
                    <script>window.onload = function() { window.print(); window.close(); }<\/script>
                  </body>
                </html>
            `);
            printWindow.document.close();
        }
    };

    const shareQRCode = async () => {
        if (!qrCodeUrl) return;
        try {
            if (navigator.share && navigator.canShare) {
                const response = await fetch(qrCodeUrl);
                const blob = await response.blob();
                const file = new File([blob], "call-qr-code.png", { type: "image/png" });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: "Call QR Code",
                        text: "Scan to call this number",
                        files: [file],
                    });
                    toast.success("QR code shared successfully!");
                    return;
                }
            }
            // Fallback: copy phone number to clipboard
            navigator.clipboard.writeText(`${country.code}${phone.replace(/\D/g, "")}`);
            toast.success("Phone number copied to clipboard!");
        } catch (error) {
            toast.error("Error sharing QR code");
        }
    };

    const saveQRCode = async () => {
        try {
            const response = await fetch("/api/codes", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "call-qr-code",
                    data: `${country.code}${phone.replace(/\D/g, "")}`,
                    width,
                    height,
                    errorCorrectionLevel,
                    country: country.name,
                }),
            });
            if (response.ok) {
                toast.success("QR code saved to history!");
            } else {
                toast.error("Error saving QR code");
            }
        } catch (error) {
            toast.error("Error saving QR code");
        }
    };

    const isValid = !!qrCodeUrl && !phoneError;

    return (
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Call QR Code Settings</CardTitle>
                        <CardDescription>
                            Enter a phone number to generate a QR code that will initiate a call when scanned.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="country" className="pb-3">Country</Label>
                            <div className="flex gap-2">
                                <select
                                    id="country"
                                    value={country.code}
                                    onChange={e => {
                                        const selected = COUNTRY_CODES.find(c => c.code === e.target.value);
                                        setCountry(selected || COUNTRY_CODES[0]);
                                    }}
                                    className="rounded border px-2 py-2 bg-white"
                                    style={{ minWidth: 120 }}
                                >
                                    {COUNTRY_CODES.map(c => (
                                        <option key={c.code} value={c.code}>
                                            {c.flag} {c.name} ({c.code})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phone" className="pb-3">Phone Number</Label>
                            <div className="flex items-center gap-2">
                                <span className="inline-flex items-center px-2 py-1 bg-gray-100 rounded border text-base font-medium">
                                    {country.flag} {country.code}
                                </span>
                                <Input
                                    id="phone"
                                    type="tel"
                                    value={phone}
                                    onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ""))}
                                    placeholder={
                                        country.code === "+1" ? "5551234567"
                                            : country.code === "+44" ? "7123456789"
                                                : country.code === "+91" ? "9123456789"
                                                    : ""
                                    }
                                    className="w-48"
                                    maxLength={12}
                                    autoComplete="off"
                                />
                            </div>
                            {phoneError && (
                                <div className="text-sm text-red-500 mt-1">{phoneError}</div>
                            )}
                        </div>
                        <div className="grid grid-cols-2">
                            <div>
                                <Label htmlFor="qr-ecc" className="pb-3">Error Correction Level</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <Select
                                        value={errorCorrectionLevel}
                                        onValueChange={setErrorCorrectionLevel}
                                    >
                                        <SelectTrigger
                                            id="qr-ecc"
                                            className="w-40"
                                        >
                                            <SelectValue placeholder="Select error correction" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {ERROR_CORRECTION_LEVELS.map(opt => (
                                                <SelectItem key={opt.value} value={opt.value}>
                                                    {opt.description}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <Label className="pb-3">QR Code Size</Label>
                                <div className="flex items-center gap-2 mt-2">
                                    <Select
                                        value={String(width)}
                                        onValueChange={val => {
                                            const size = parseInt(val, 10);
                                            setWidth(size);
                                            setHeight(size);
                                        }}
                                    >
                                        <SelectTrigger className="w-40">
                                            <SelectValue placeholder="Select size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="128">128 x 128 px</SelectItem>
                                            <SelectItem value="256">256 x 256 px</SelectItem>
                                            <SelectItem value="512">512 x 512 px</SelectItem>
                                            <SelectItem value="1024">1024 x 1024 px</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>Generated Call QR Code</CardTitle>
                        <CardDescription>
                            Your call QR code will appear here as you type
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                                {qrCodeUrl ? (
                                    <img
                                        src={qrCodeUrl}
                                        alt="Generated Call QR Code"
                                        style={{
                                            width: `${width}px`,
                                            height: `${height}px`,
                                            maxWidth: "100%",
                                            objectFit: "contain"
                                        }}
                                        className="h-auto"
                                    />
                                ) : (
                                    <div
                                        className="bg-gray-100 rounded-lg flex items-center justify-center text-gray-500"
                                        style={{ width: `${width}px`, height: `${height}px` }}
                                    >
                                        QR Code Preview
                                    </div>
                                )}
                            </div>
                        </div>
                        {isValid && (
                            <div className="flex flex-wrap gap-2 mt-40">
                                <Button onClick={downloadQRCode} size="sm">
                                    <Download className="w-4 h-4 mr-2" />
                                    Download
                                </Button>
                                <Button onClick={printQRCode} variant="outline" size="sm">
                                    <Printer className="w-4 h-4 mr-2" />
                                    Print
                                </Button>
                                <Button onClick={shareQRCode} variant="outline" size="sm">
                                    <Share2 className="w-4 h-4 mr-2" />
                                    Share
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}