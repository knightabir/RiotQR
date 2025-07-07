"use client";

import { useState, useEffect } from "react";
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
import { Download, Printer, Share2, Save } from "lucide-react";
import { toast } from "sonner";
import QRCode from "qrcode";

export default function UrlQRCodeGeneratorPage() {
  const [url, setUrl] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [size, setSize] = useState("256");
  const [errorCorrectionLevel, setErrorCorrectionLevel] = useState("M");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!url.trim()) {
      setQrCodeUrl("");
      setError("");
      return;
    }
    if (!/^https?:\/\//.test(url.trim())) {
      setQrCodeUrl("");
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    setError("");
    generateQRCode();
    // eslint-disable-next-line
  }, [url, size, errorCorrectionLevel]);

  const generateQRCode = async () => {
    if (!url.trim()) {
      setQrCodeUrl("");
      return;
    }
    try {
      const qrCodeDataUrl = await QRCode.toDataURL(url.trim(), {
        errorCorrectionLevel: errorCorrectionLevel,
        width: parseInt(size),
        margin: 2,
      });
      setQrCodeUrl(qrCodeDataUrl);
    } catch (error) {
      toast.error("Error generating QR code");
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    try {
      const link = document.createElement("a");
      link.download = `url-qr-code-${Date.now()}.png`;
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
          <head><title>Print QR Code</title></head>
          <body style="text-align: center; padding: 20px;">
            <img src="${qrCodeUrl}" style="max-width: 100%;" />
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
      toast.success("QR code sent to printer!");
    }
  };

  const shareQRCode = async () => {
    if (!qrCodeUrl) return;
    if (navigator.share) {
      try {
        // Convert data URL to blob
        const res = await fetch(qrCodeUrl);
        const blob = await res.blob();
        const file = new File([blob], "qr-code.png", { type: blob.type });
        await navigator.share({
          title: "QR Code",
          text: "Here is a QR code for the URL you requested.",
          files: [file],
        });
        toast.success("QR code shared!");
      } catch (error) {
        toast.error("Error sharing QR code");
      }
    } else {
      try {
        await navigator.clipboard.writeText(qrCodeUrl);
        toast.success("QR code image copied to clipboard!");
      } catch (error) {
        toast.error("Sharing not supported on this device.");
      }
    }
  };

  const saveQRCode = async () => {
    if (!qrCodeUrl || !url.trim()) return;
    try {
      const response = await fetch("/api/codes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "url-qr-code",
          data: url.trim(),
          size,
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

  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>URL QR Code Settings</CardTitle>
            <CardDescription>
              Enter your website URL and customize the QR code.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="url" className="pb-3">Website URL</Label>
              <Input
                id="url"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="e.g. https://example.com"
                autoComplete="off"
              />
              {error && (
                <div className="text-sm text-red-500 mt-1">{error}</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size" className="pb-3">Size (px)</Label>
                <Input
                  id="size"
                  type="number"
                  min={128}
                  max={1024}
                  value={size}
                  onChange={e => setSize(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="errorCorrectionLevel" className="pb-3">Error Correction</Label>
                <select
                  id="errorCorrectionLevel"
                  className="w-full border rounded px-2 py-1"
                  value={errorCorrectionLevel}
                  onChange={e => setErrorCorrectionLevel(e.target.value)}
                >
                  <option value="L">L (Low)</option>
                  <option value="M">M (Medium)</option>
                  <option value="Q">Q (Quartile)</option>
                  <option value="H">H (High)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated QR Code</CardTitle>
            <CardDescription>
              Your QR code will appear here if the URL is valid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                {qrCodeUrl ? (
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    width={parseInt(size)}
                    height={parseInt(size)}
                    className="border rounded"
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    Enter a valid URL to generate a QR code.
                  </div>
                )}
              </div>
              {qrCodeUrl && (
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