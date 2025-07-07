"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Share2, Printer, Save } from "lucide-react";
import { toast } from "sonner";
import JsBarcode from "jsbarcode";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BARCODE_TYPES = [
  { label: "Code 128", value: "CODE128" },
  { label: "Code 39", value: "CODE39" },
  { label: "EAN-13", value: "EAN13" },
  { label: "UPC", value: "UPC" },
  { label: "ITF", value: "ITF" },
  { label: "MSI", value: "MSI" },
  { label: "Pharmacode", value: "Pharmacode" },
];

export default function LinearBarcodeGenerator() {
  const [data, setData] = useState("");
  const [type, setType] = useState("CODE128");
  const [width, setWidth] = useState(2);
  const [height, setHeight] = useState(100);
  const [barcodeError, setBarcodeError] = useState("");
  const canvasRef = useRef(null);

  function validateData(val, type) {
    if (!val.trim()) return "Barcode data is required";
    if (type === "EAN13" && !/^\d{12,13}$/.test(val.trim())) return "EAN-13 must be 12 or 13 digits";
    if (type === "UPC" && !/^\d{11,12}$/.test(val.trim())) return "UPC must be 11 or 12 digits";
    if (type === "CODE39" && /[^A-Z0-9 \-\.\$\/\+%]/i.test(val.trim())) return "Code 39 allows A-Z, 0-9, space, - . $ / + %";
    return "";
  }

  useEffect(() => {
    const err = validateData(data, type);
    setBarcodeError(err);
    if (!err && data.trim() && canvasRef.current) {
      try {
        JsBarcode(canvasRef.current, data.trim(), {
          format: type,
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
  }, [data, type, width, height]);

  const downloadBarcode = () => {
    if (!canvasRef.current) return;
    try {
      const link = document.createElement("a");
      link.download = `linear-barcode-${type}-${Date.now()}.png`;
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
          <head><title>Print Linear Barcode</title></head>
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
            const file = new File([blob], "linear-barcode.png", { type: "image/png" });
            if (navigator.canShare({ files: [file] })) {
              await navigator.share({
                title: "Linear Barcode",
                text: "Scan this barcode",
                files: [file],
              });
              toast.success("Barcode shared successfully!");
              return;
            }
          }
          navigator.clipboard.writeText(data);
          toast.success("Barcode data copied to clipboard!");
        }, "image/png");
      } else {
        navigator.clipboard.writeText(data);
        toast.success("Barcode data copied to clipboard!");
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
          type: "linear-barcode",
          data,
          format: type,
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

  const isValid = !!data && !barcodeError;

  return (
    <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Linear Barcode Settings</CardTitle>
            <CardDescription>
              Enter data and select a barcode type to generate a linear barcode.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="type" className="pb-3">Barcode Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select barcode type" />
                </SelectTrigger>
                <SelectContent>
                  {BARCODE_TYPES.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="data" className="pb-3">Barcode Data</Label>
              <Input
                id="data"
                value={data}
                onChange={e => setData(e.target.value)}
                placeholder="Enter barcode data"
                autoComplete="off"
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
            <CardTitle>Generated Linear Barcode</CardTitle>
            <CardDescription>
              Your linear barcode will appear here as you type
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                <canvas ref={canvasRef} className="max-w-full"></canvas>
                {data && (
                  <div className="text-xs text-gray-600 mt-1">{data}</div>
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