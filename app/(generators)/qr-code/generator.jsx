"use client";

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, Share2, Printer, Save } from 'lucide-react';
import { toast } from 'sonner';
import QRCode from 'qrcode';

export default function Generator() {
    const [qrData, setQrData] = useState('');
    const [qrType, setQrType] = useState('text');
    const [qrCodeUrl, setQrCodeUrl] = useState('');
    const [errorCorrectionLevel, setErrorCorrectionLevel] = useState('M');
    const [size, setSize] = useState('256');
    const qrRef = useRef(null);

    // Form fields for different QR types
    const [url, setUrl] = useState('');
    const [text, setText] = useState('');
    const [email, setEmail] = useState('');
    const [emailSubject, setEmailSubject] = useState('');
    const [emailBody, setEmailBody] = useState('');
    const [phone, setPhone] = useState('');
    const [sms, setSms] = useState('');
    const [smsMessage, setSmsMessage] = useState('');

    // Contact form fields
    const [contactName, setContactName] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactOrganization, setContactOrganization] = useState('');

    useEffect(() => {
        generateQRData();
        // eslint-disable-next-line
    }, [qrType, url, text, email, emailSubject, emailBody, phone, sms, smsMessage, contactName, contactPhone, contactEmail, contactOrganization]);

    useEffect(() => {
        if (qrData) {
            generateQRCode();
        } else {
            setQrCodeUrl('');
        }
        // eslint-disable-next-line
    }, [qrData, errorCorrectionLevel, size]);

    const generateQRData = () => {
        let data = '';
        switch (qrType) {
            case 'text':
                data = text;
                break;
            case 'url':
                data = url;
                break;
            case 'email':
                data = `mailto:${email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                break;
            case 'phone':
                data = `tel:${phone}`;
                break;
            case 'sms':
                data = `sms:${sms}?body=${encodeURIComponent(smsMessage)}`;
                break;
            case 'contact':
                data = `BEGIN:VCARD\nVERSION:3.0\nFN:${contactName}\nTEL:${contactPhone}\nEMAIL:${contactEmail}\nORG:${contactOrganization}\nEND:VCARD`;
                break;
            default:
                data = text;
        }
        setQrData(data);
    };

    const generateQRCode = async () => {
        if (!qrData.trim()) {
            setQrCodeUrl('');
            return;
        }
        try {
            const qrCodeDataUrl = await QRCode.toDataURL(qrData, {
                errorCorrectionLevel: errorCorrectionLevel,
                width: parseInt(size),
                margin: 2,
            });
            setQrCodeUrl(qrCodeDataUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
            toast.error('Error generating QR code');
        }
    };

    const downloadQRCode = () => {
        if (!qrCodeUrl) return;
        try {
            const link = document.createElement("a");
            link.download = `qr-code-${Date.now()}.png`;
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
                const file = new File([blob], 'qr-code.png', { type: 'image/png' });
                if (navigator.canShare({ files: [file] })) {
                    await navigator.share({
                        title: 'QR Code',
                        text: 'Check out this QR code',
                        files: [file],
                    });
                    toast.success('QR code shared successfully!');
                    return;
                }
            }
            // Fallback: copy QR data to clipboard
            navigator.clipboard.writeText(qrData);
            toast.success('QR code data copied to clipboard!');
        } catch (error) {
            toast.error('Error sharing QR code');
        }
    };

    const saveQRCode = async () => {
        try {
            const response = await fetch('/api/codes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'qr-code',
                    data: qrData,
                    format: qrType,
                }),
            });
            if (response.ok) {
                toast.success('QR code saved to history!');
            } else {
                toast.error('Error saving QR code');
            }
        } catch (error) {
            toast.error('Error saving QR code');
        }
    };

    const renderForm = () => {
        switch (qrType) {
            case 'text':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="text" className="pb-3">Text Content</Label>
                            <Textarea
                                id="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Enter your text here..."
                                rows={4}
                            />
                        </div>
                    </div>
                );
            case 'url':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="url" className="pb-3">Website URL</Label>
                            <Input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                            />
                        </div>
                    </div>
                );
            case 'email':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="email" className="pb-3">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="recipient@example.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="emailSubject" className="pb-3">Subject (Optional)</Label>
                            <Input
                                id="emailSubject"
                                value={emailSubject}
                                onChange={(e) => setEmailSubject(e.target.value)}
                                placeholder="Email subject"
                            />
                        </div>
                        <div>
                            <Label htmlFor="emailBody" className="pb-3">Message (Optional)</Label>
                            <Textarea
                                id="emailBody"
                                value={emailBody}
                                onChange={(e) => setEmailBody(e.target.value)}
                                placeholder="Email message"
                                rows={3}
                            />
                        </div>
                    </div>
                );
            case 'phone':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="phone" className="pb-3">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="+1234567890"
                            />
                        </div>
                    </div>
                );
            case 'sms':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="sms" className="pb-3">Phone Number</Label>
                            <Input
                                id="sms"
                                type="tel"
                                value={sms}
                                onChange={(e) => setSms(e.target.value)}
                                placeholder="+1234567890"
                            />
                        </div>
                        <div>
                            <Label htmlFor="smsMessage" className="pb-3">Message (Optional)</Label>
                            <Textarea
                                id="smsMessage"
                                value={smsMessage}
                                onChange={(e) => setSmsMessage(e.target.value)}
                                placeholder="SMS message"
                                rows={3}
                            />
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="space-y-4">
                        <div>
                            <Label htmlFor="contactName" className="pb-3">Full Name</Label>
                            <Input
                                id="contactName"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                placeholder="John Doe"
                            />
                        </div>
                        <div>
                            <Label htmlFor="contactPhone" className="pb-3">Phone Number</Label>
                            <Input
                                id="contactPhone"
                                type="tel"
                                value={contactPhone}
                                onChange={(e) => setContactPhone(e.target.value)}
                                placeholder="+1234567890"
                            />
                        </div>
                        <div>
                            <Label htmlFor="contactEmail" className="pb-3">Email</Label>
                            <Input
                                id="contactEmail"
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)}
                                placeholder="john@example.com"
                            />
                        </div>
                        <div>
                            <Label htmlFor="contactOrganization" className="pb-3">Organization</Label>
                            <Input
                                id="contactOrganization"
                                value={contactOrganization}
                                onChange={(e) => setContactOrganization(e.target.value)}
                                placeholder="Company Name"
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    const isValid = !!qrCodeUrl;

    return (
        <div className="bg-gradient-to-br from-green-100 via-blue-50 to-indigo-200 pb-12 min-h-screen w-full">
            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>QR Code Settings</CardTitle>
                        <CardDescription>
                            Configure your QR code content and appearance
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="w-full">
                            <Label htmlFor="qrType" className="pb-3">QR Code Type</Label>
                            <Select value={qrType} onValueChange={setQrType}>
                                <SelectTrigger className="w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="text">Plain Text</SelectItem>
                                    <SelectItem value="url">Website URL</SelectItem>
                                    <SelectItem value="email">Email</SelectItem>
                                    <SelectItem value="phone">Phone Number</SelectItem>
                                    <SelectItem value="sms">SMS</SelectItem>
                                    <SelectItem value="contact">Contact Card</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        {renderForm()}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="errorCorrection" className="pb-3">Error Correction</Label>
                                <Select value={errorCorrectionLevel} onValueChange={setErrorCorrectionLevel}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="L">Low (7%)</SelectItem>
                                        <SelectItem value="M">Medium (15%)</SelectItem>
                                        <SelectItem value="Q">Quartile (25%)</SelectItem>
                                        <SelectItem value="H">High (30%)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label htmlFor="size" className="pb-3">Size (px)</Label>
                                <Select value={size} onValueChange={setSize}>
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="128">128x128</SelectItem>
                                        <SelectItem value="256">256x256</SelectItem>
                                        <SelectItem value="512">512x512</SelectItem>
                                        <SelectItem value="1024">1024x1024</SelectItem>
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
                            Your QR code will appear here as you type
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex flex-col items-center p-4 bg-white rounded-lg border">
                                {qrCodeUrl ? (
                                    <img src={qrCodeUrl} alt="Generated QR Code" className="max-w-full h-auto" />
                                ) : (
                                    <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
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