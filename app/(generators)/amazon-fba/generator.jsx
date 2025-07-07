"use client";

import { useState, useEffect, useRef } from "react";
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
import JsBarcode from "jsbarcode";

export default function Generator() {
    const [fnsSku, setFnsSku] = useState("");
    const [asin, setAsin] = useState("");
    const [productName, setProductName] = useState("");
    const [width, setWidth] = useState("2");
    const [height, setHeight] = useState("100");
    const [displayValue, setDisplayValue] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        generateBarcode();
        // eslint-disable-next-line
    }, [fnsSku, width, height, displayValue]);

    const isValidFNSKU = (value) => {
        return /^X[A-Z0-9]{9}$/.test(value.trim());
    };

    const isValidASIN = (value) => {
        return /^[A-Z0-9]{10}$/.test(value.trim());
    };

    const generateBarcode = () => {
        if (!fnsSku.trim() || !canvasRef.current) {
            return;
        }
        if (!isValidFNSKU(fnsSku)) {
            const ctx = canvasRef.current.getContext("2d");
            if (ctx)
                ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
            return;
        }
        try {
            JsBarcode(canvasRef.current, fnsSku.trim(), {
                format: "CODE128",
                width: parseInt(width),
                height: parseInt(height),
                displayValue: displayValue,
                text: displayValue ? fnsSku.trim() : undefined,
                fontSize: 16,
                margin: 10,
            });
        } catch (error) {
            console.error("Error generating FBA barcode:", error);
            toast.error("Error generating FBA barcode. Please check your input.");
        }
    };

    const downloadBarcode = () => {
        if (!canvasRef.current) return;
        try {
            const link = document.createElement("a");
            link.download = `amazon-fba-barcode-${fnsSku || "barcode"}-${Date.now()}.png`;
            link.href = canvasRef.current.toDataURL();
            link.click();
            toast.success("FBA barcode downloaded successfully!");
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
          <head><title>Print Amazon FBA Barcode</title></head>
          <body style="text-align: center; padding: 20px;">
            <div>
              <div style="font-size:18px;font-weight:bold;margin-bottom:8px;">${productName || ""}</div>
              <div style="font-size:14px;margin-bottom:4px;">ASIN: ${asin || ""}</div>
              <img src="${dataUrl}" style="max-width: 100%;" />
              <div style="font-size:14px;margin-top:4px;">FNSKU: ${fnsSku || ""}</div>
            </div>
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
                        const file = new File([blob], "amazon-fba-barcode.png", {
                            type: "image/png",
                        });
                        if (navigator.canShare({ files: [file] })) {
                            await navigator.share({
                                title: "Amazon FBA Barcode",
                                text: "Check out this Amazon FBA barcode",
                                files: [file],
                            });
                            toast.success("Barcode shared successfully!");
                            return;
                        }
                    }
                    // fallback if cannot share file
                    navigator.clipboard.writeText(fnsSku);
                    toast.success("FNSKU copied to clipboard!");
                }, "image/png");
            } else {
                navigator.clipboard.writeText(fnsSku);
                toast.success("FNSKU copied to clipboard!");
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
                    type: "amazon-fba-barcode",
                    data: fnsSku,
                    asin,
                    productName,
                }),
            });

            if (response.ok) {
                toast.success("FBA barcode saved to history!");
            } else {
                toast.error("Error saving barcode");
            }
        } catch (error) {
            toast.error("Error saving barcode");
        }
    };

    const isValid = fnsSku.trim() && isValidFNSKU(fnsSku);

    return (
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>FBA Barcode Settings</CardTitle>
                        <CardDescription>
                            Enter your FNSKU, ASIN, and product name. Adjust barcode appearance as needed.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <Label htmlFor="fnsSku" className="pb-3">FNSKU (e.g. X00000E5TX)</Label>
                            <Input
                                id="fnsSku"
                                value={fnsSku}
                                onChange={(e) => setFnsSku(e.target.value.toUpperCase())}
                                placeholder="X00000E5TX"
                                maxLength={10}
                                autoComplete="off"
                            />
                            {fnsSku && !isValidFNSKU(fnsSku) && (
                                <div className="text-sm text-red-500 mt-1">Invalid FNSKU (must start with X and be 10 characters)</div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="asin" className="pb-3">ASIN (e.g. B07PGL2ZSL)</Label>
                            <Input
                                id="asin"
                                value={asin}
                                onChange={(e) => setAsin(e.target.value.toUpperCase())}
                                placeholder="B07PGL2ZSL"
                                maxLength={10}
                                autoComplete="off"
                            />
                            {asin && !isValidASIN(asin) && (
                                <div className="text-sm text-red-500 mt-1">Invalid ASIN (10 uppercase letters/numbers)</div>
                            )}
                        </div>
                        <div>
                            <Label htmlFor="productName" className="pb-3">Product Name</Label>
                            <Input
                                id="productName"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                placeholder="Product Name"
                                maxLength={50}
                                autoComplete="off"
                            />
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
                                    onChange={(e) => setWidth(e.target.value)}
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
                                    onChange={(e) => setHeight(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="displayValue"
                                checked={displayValue}
                                onChange={(e) => setDisplayValue(e.target.checked)}
                                className="rounded"
                            />
                            <Label htmlFor="displayValue">Show FNSKU below barcode</Label>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Generated FBA Barcode</CardTitle>
                        <CardDescription>
                            Your Amazon FBA barcode will appear here if the FNSKU is valid.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                                {productName && (
                                    <div className="font-semibold text-base mb-1">{productName}</div>
                                )}
                                {asin && (
                                    <div className="text-xs text-gray-600 mb-1">ASIN: {asin}</div>
                                )}
                                <canvas ref={canvasRef} className="max-w-full"></canvas>
                                {fnsSku && (
                                    <div className="text-xs text-gray-600 mt-1">FNSKU: {fnsSku}</div>
                                )}
                            </div>
                            {/* Move the buttons to the very end of the card, outside the barcode display */}
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
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}