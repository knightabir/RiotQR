"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Share2, Printer, Save } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const ERROR_CORRECTION_LEVELS = [
    { label: "L", value: "L", description: "Low (~7%)" },
    { label: "M", value: "M", description: "Medium (~15%)" },
    { label: "Q", value: "Q", description: "Quartile (~25%)" },
    { label: "H", value: "H", description: "High (~30%)" },
];

const ENCRYPTION_TYPES = [
    { label: "WPA/WPA2", value: "WPA" },
    { label: "WEP", value: "WEP" },
    { label: "None (Open)", value: "nopass" },
];

export default function WifiToQrGenerator() {
    const [ssid, setSsid] = useState("");
    const [password, setPassword] = useState("");
    const [encryption, setEncryption] = useState("WPA");
    const [hidden, setHidden] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState("");
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
    const [width, setWidth] = useState(256);
    const [height, setHeight] = useState(256);
    const [wifiError, setWifiError] = useState("");

    function validateWifi() {
        if (!ssid.trim()) return "SSID is required";
        if (encryption !== "nopass" && !password.trim()) return "Password is required for secured networks";
        return "";
    }

    useEffect(() => {
        const err = validateWifi();
        setWifiError(err);
        if (!err) {
            generateQRCode();
        } else {
            setQrCodeUrl("");
        }
        // eslint-disable-next-line
    }, [ssid, password, encryption, hidden, errorCorrectionLevel, width, height]);

    const generateQRCode = async () => {
        // WIFI:T:WPA;S:SSID;P:PASSWORD;H:true/false;;
        let data = `WIFI:T:${encryption};S:${ssid};`;
        if (encryption !== "nopass") {
            data += `P:${password};`;
        }
        if (hidden) {
            data += `H:true;`;
        }
        data += ";";
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
            link.download = `wifi-qr-code-${Date.now()}.png`;
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
                  <head><title>Print WiFi QR Code</title></head>
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
                const file = new File([blob], "wifi-qr-code.png", { type: "image/png" });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: "WiFi QR Code",
                        text: "Scan to connect to WiFi",
                        files: [file],
                    });
                    toast.success("QR code shared successfully!");
                    return;
                }
            }
            // Fallback: copy SSID to clipboard
            navigator.clipboard.writeText(ssid);
            toast.success("SSID copied to clipboard!");
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
                    type: "wifi-qr-code",
                    ssid,
                    password,
                    encryption,
                    hidden,
                    width,
                    height,
                    errorCorrectionLevel,
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

    const isValid = !!qrCodeUrl && !wifiError;

    return (
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>WiFi QR Code Settings</CardTitle>
                        <CardDescription>
                            Enter WiFi credentials to generate a QR code for connecting to a wireless network.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="ssid" className="pb-3">SSID (Network Name)</Label>
                            <Input
                                id="ssid"
                                value={ssid}
                                onChange={e => setSsid(e.target.value)}
                                placeholder="WiFi Network"
                                autoComplete="off"
                            />
                        </div>
                        <div>
                            <Label htmlFor="encryption" className="pb-3">Encryption</Label>
                            <Select value={encryption} onValueChange={setEncryption}>
                                <SelectTrigger className="w-40">
                                    <SelectValue placeholder="Select encryption" />
                                </SelectTrigger>
                                <SelectContent>
                                    {ENCRYPTION_TYPES.map(opt => (
                                        <SelectItem key={opt.value} value={opt.value}>
                                            {opt.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        {encryption !== "nopass" && (
                            <div>
                                <Label htmlFor="password" className="pb-3">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="WiFi Password"
                                    autoComplete="off"
                                />
                            </div>
                        )}
                        <div className="flex items-center gap-2">
                            <input
                                id="hidden"
                                type="checkbox"
                                checked={hidden}
                                onChange={e => setHidden(e.target.checked)}
                                className="rounded"
                            />
                            <Label htmlFor="hidden">Hidden Network</Label>
                        </div>
                        {wifiError && (
                            <div className="text-sm text-red-500 mt-1">{wifiError}</div>
                        )}
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
                        <CardTitle>Generated WiFi QR Code</CardTitle>
                        <CardDescription>
                            Your WiFi QR code will appear here as you type
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                                {qrCodeUrl ? (
                                    <img
                                        src={qrCodeUrl}
                                        alt="Generated WiFi QR Code"
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
                                <Button onClick={saveQRCode} variant="outline" size="sm">
                                    <Save className="w-4 h-4 mr-2" />
                                    Save
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
} 