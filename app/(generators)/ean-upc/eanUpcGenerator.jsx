"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Share2, Printer, Save } from "lucide-react";
import { toast } from "sonner";
import JsBarcode from "jsbarcode";

export default function EanUpcGenerator() {
  const [code, setCode] = useState("");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [barcodeError, setBarcodeError] = useState("");
  const canvasRef = useRef(null);

  function validateCode(val) {
    if (!val.trim()) return "Code is required";
    if (!/^\d{12,13}$/.test(val.trim())) return "Code must be 12 (UPC) or 13 (EAN) digits";
    return "";
  }

  function getBarcodeFormat(val) {
    if (val.length === 13) return "EAN13";
    if (val.length === 12) return "UPC";
    return "EAN13";
  }

  useEffect(() => {
    const err = validateCode(code);
    setBarcodeError(err);
    if (!err && code.trim() && canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, code.trim(), {
          format: getBarcodeFormat(code.trim()),
          width: Number(width),
          height: Number(height),
          displayValue: true,
          fontSize: 16,
          margin: 10,
        });
      } catch (error) {
        setBarcodeError("Error generating barcode");
      }
    } else if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d");
      ctx && ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    // eslint-disable-next-line
  }, [code, width, height]);

  const downloadBarcode = () => {
    if (!canvasRef.current) return;
    try {
      const link = document.createElement("a");
      link.download = `ean-upc-barcode-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL();
      link.click();
      toast.success("Barcode downloaded successfully!");
    } catch (error) {
      toast.error("Error downloading barcode");
    }
  };

  const printBarcode = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL();
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head><title>Print EAN/UPC Barcode</title></head>
          <body style="text-align: center; padding: 20px;">
            <img src="${dataUrl}" style="max-width: 100%; width: ${width * 50}px; height: ${height}px;" />
            <script>window.onload = function() { window.print(); window.close(); }<\/script>
          </body>
        </html>
      `);
      printWindow.document.close();
    }
  };

  const shareBarcode = async () => {
    if (!canvasRef.current) return;
    try {
      if (navigator.share && navigator.canShare) {
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            const file = new File([blob], "ean-upc-barcode.png", { type: "image/png" });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: "EAN/UPC Barcode",
                text: "Scan this EAN/UPC barcode",
                files: [file],
              });
              toast.success("Barcode shared successfully!");
              return;
            }
          }
          navigator.clipboard.writeText(code);
          toast.success("Code copied to clipboard!");
        }, "image/png");
      } else {
        navigator.clipboard.writeText(code);
        toast.success("Code copied to clipboard!");
      }
    } catch (error) {
      toast.error("Error sharing barcode");
    }
  };

  const saveBarcode = async () => {
    try {
      const response = await fetch("/api/codes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type: "ean-upc-barcode",
          code,
          width,
          height,
        }),
      });
      if (response.ok) {
        toast.success("Barcode saved to history!");
      } else {
        toast.error("Error saving barcode");
      }
    } catch (error) {
      toast.error("Error saving barcode");
    }
  };

  const isValid = !!code && !barcodeError;

  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>EAN/UPC Barcode Settings</CardTitle>
            <CardDescription>
              Enter a 12 or 13 digit code to generate an EAN or UPC barcode.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="code" className="pb-3">Code</Label>
              <Input
                id="code"
                value={code}
                onChange={e => setCode(e.target.value.replace(/[^\d]/g, ""))}
                placeholder="1234567890123"
                autoComplete="off"
                maxLength={13}
              />
              {barcodeError && (
                <div className="text-sm text-red-500 mt-1">{barcodeError}</div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="width" className="pb-3">Width</Label>
                <Input
                  id="width"
                  type="number"
                  min={1}
                  max={6}
                  value={width}
                  onChange={e => setWidth(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="height" className="pb-3">Height</Label>
                <Input
                  id="height"
                  type="number"
                  min={50}
                  max={300}
                  value={height}
                  onChange={e => setHeight(e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Generated EAN/UPC Barcode</CardTitle>
            <CardDescription>
              Your EAN/UPC barcode will appear here as you type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                <canvas ref={canvasRef} className="max-w-full"></canvas>
                {code && (
                  <div className="text-xs text-gray-600 mt-1">{code}</div>
                )}
              </div>
            </div>
            {isValid && (
              <div className="flex flex-wrap gap-2 mt-40">
                <Button onClick={downloadBarcode} size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button onClick={printBarcode} variant="outline" size="sm">
                  <Printer className="w-4 h-4 mr-2" />
                  Print
                </Button>
                <Button onClick={shareBarcode} variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={saveBarcode} variant="outline" size="sm">
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