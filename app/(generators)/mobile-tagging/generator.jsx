"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Share2, Printer, Save } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MOBILE_TAGGING_TYPES = [
  { value: "url", label: "Website URL" },
  { value: "phone", label: "Phone Number" },
  { value: "sms", label: "SMS Message" },
  { value: "email", label: "Email Address" },
  { value: "geo", label: "Geo Location" },
];

const ERROR_CORRECTION_LEVELS = [
  { value: "L", label: "Low (L)" },
  { value: "M", label: "Medium (M)" },
  { value: "Q", label: "Quartile (Q)" },
  { value: "H", label: "High (H)" },
];

const QR_SIZES = [
  { value: "128", label: "128 x 128 px" },
  { value: "256", label: "256 x 256 px" },
  { value: "512", label: "512 x 512 px" },
  { value: "1024", label: "1024 x 1024 px" },
];

export default function MobileTaggingGenerator() {
  const [type, setType] = useState("url");
  const [url, setUrl] = useState("");
  const [phone, setPhone] = useState("");
  const [smsNumber, setSmsNumber] = useState("");
  const [smsMessage, setSmsMessage] = useState("");
  const [email, setEmail] = useState("");
  const [geoLat, setGeoLat] = useState("");
  const [geoLng, setGeoLng] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState("256");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [error, setError] = useState("");
  const qrRef = useRef(null);

  const getQRData = useCallback(() => {
    switch (type) {
      case "url":
        return url.trim();
      case "phone":
        return phone.trim() ? `tel:${phone.trim()}` : "";
      case "sms":
        if (smsNumber.trim()) {
          return `sms:${smsNumber.trim()}${smsMessage.trim() ? `?body=${encodeURIComponent(smsMessage)}` : ""}`;
        }
        return "";
      case "email":
        return email.trim() ? `mailto:${email.trim()}` : "";
      case "geo":
        if (geoLat.trim() && geoLng.trim()) {
          return `geo:${geoLat.trim()},${geoLng.trim()}`;
        }
        return "";
      default:
        return "";
    }
  }, [type, url, phone, smsNumber, smsMessage, email, geoLat, geoLng]);

  const generateQRCode = useCallback(async () => {
    const data = getQRData();
    if (!data) {
      setQrCodeUrl("");
      setError("");
      return;
    }
    setError("");
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(data, {
        errorCorrectionLevel: errorCorrectionLevel,
        width: parseInt(size),
        margin: 2,
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      toast.error("Error generating QR code");
    }
  }, [getQRData, errorCorrectionLevel, size]);

  useEffect(() => {
    generateQRCode();
    // eslint-disable-next-line
  }, [type, url, phone, smsNumber, smsMessage, email, geoLat, geoLng, size, errorCorrectionLevel]);

  const handleInputChange = setter => e => setter(e.target.value);

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    try {
      const link = document.createElement("a");
      link.download = `mobile-tagging-qr-${Date.now()}.png`;
      link.href = qrCodeUrl;
      link.click();
      toast.success("QR code downloaded successfully!");
    } catch (error) {
      toast.error("Error downloading QR code");
    }
  };

  const printQRCode = () => {
    if (!qrCodeUrl) return;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print Mobile Tagging QR Code</title></head>
        <body style="text-align: center; padding: 20px;">
          <img id="print-img" src="${qrCodeUrl}" style="max-width: 100%;" />
        </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.onload = () => {
        const img = printWindow.document.getElementById('print-img');
        if (img) {
          img.onload = () => {
            printWindow.focus();
            printWindow.print();
            printWindow.close();
            toast.success('QR code sent to printer!');
          };
        } else {
          printWindow.focus();
          printWindow.print();
          printWindow.close();
          toast.success('QR code sent to printer!');
        }
      };
    }
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;
    try {
      if (navigator.share && navigator.canShare()) {
        const res = await fetch(qrCodeUrl);
        const blob = await res.blob();
        const file = new File([blob], "mobile-tagging-qr.png", { type: "image/png" });
        await navigator.share({
          title: "Mobile Tagging QR Code",
          text: "Scan this QR code",
          files: [file],
        });
        toast.success("QR code shared successfully!");
      } else {
        navigator.clipboard.writeText(getQRData());
        toast.success("QR data copied to clipboard!");
      }
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
          type: "mobile-tagging-qr",
          data: getQRData(),
          qrType: type,
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

  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Mobile Tagging QR Code Settings</CardTitle>
            <CardDescription>
              Choose the type of mobile tag and enter the relevant information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="type">Mobile Tag Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type" className="w-full mt-1">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {MOBILE_TAGGING_TYPES.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {type === "url" && (
              <div>
                <Label htmlFor="url">Website URL</Label>
                <Input
                  id="url"
                  value={url}
                  onChange={handleInputChange(setUrl)}
                  placeholder="https://example.com"
                  autoComplete="off"
                />
              </div>
            )}
            {type === "phone" && (
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={phone}
                  onChange={handleInputChange(setPhone)}
                  placeholder="+1234567890"
                  autoComplete="off"
                />
              </div>
            )}
            {type === "sms" && (
              <>
                <div>
                  <Label htmlFor="smsNumber">SMS Number</Label>
                  <Input
                    id="smsNumber"
                    value={smsNumber}
                    onChange={handleInputChange(setSmsNumber)}
                    placeholder="+1234567890"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="smsMessage">SMS Message</Label>
                  <Input
                    id="smsMessage"
                    value={smsMessage}
                    onChange={handleInputChange(setSmsMessage)}
                    placeholder="Type your message"
                    autoComplete="off"
                  />
                </div>
              </>
            )}
            {type === "email" && (
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="user@example.com"
                  autoComplete="off"
                />
              </div>
            )}
            {type === "geo" && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="geoLat">Latitude</Label>
                  <Input
                    id="geoLat"
                    value={geoLat}
                    onChange={handleInputChange(setGeoLat)}
                    placeholder="37.7749"
                    autoComplete="off"
                  />
                </div>
                <div>
                  <Label htmlFor="geoLng">Longitude</Label>
                  <Input
                    id="geoLng"
                    value={geoLng}
                    onChange={handleInputChange(setGeoLng)}
                    placeholder="-122.4194"
                    autoComplete="off"
                  />
                </div>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size">QR Code Size</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger id="size" className="w-full mt-1">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {QR_SIZES.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="errorCorrectionLevel">Error Correction</Label>
                <Select value={errorCorrectionLevel} onValueChange={setErrorCorrectionLevel}>
                  <SelectTrigger id="errorCorrectionLevel" className="w-full mt-1">
                    <SelectValue placeholder="Select error correction" />
                  </SelectTrigger>
                  <SelectContent>
                    {ERROR_CORRECTION_LEVELS.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>
                        {opt.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
            <CardDescription>
              Your mobile tagging QR code will appear here.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border" ref={qrRef}>
                {qrCodeUrl ? (
                  <img src={qrCodeUrl} alt="Mobile Tagging QR Code" className="max-w-full" />
                ) : (
                  <div className="text-gray-400">Enter data to generate QR code</div>
                )}
              </div>
              {getQRData() && (
                <div className="flex flex-wrap gap-2 mt-4 justify-center">
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
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}