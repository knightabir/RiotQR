"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

const AddToolRequest = () => {
  const [form, setForm] = useState({
    toolName: "",
    toolDescription: "",
    toolCategory: "",
    yourEmail: "",
    additionalInfo: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.toolName || !form.toolDescription || !form.yourEmail) {
      setError("Please fill in all required fields.");
      return;
    }
    // Simulate submission
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <Card className="max-w-md mx-auto mt-10 bg-green-50 border-green-100">
        <CardHeader className="flex flex-col items-center">
          <CheckCircle2 className="w-10 h-10 text-green-600 mb-2" />
          <CardTitle className="text-green-700 text-2xl font-bold mb-1">Thank you!</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-green-900">
          <p>Your tool request has been submitted to the admin.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-indigo-900">Request a New Tool</CardTitle>
        <CardDescription className="mb-2 text-gray-600">
          Can't find the tool you need? Let us know and we'll consider adding it!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="toolName"
              value={form.toolName}
              onChange={handleChange}
              required
              placeholder="e.g. QR Code Generator"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Description <span className="text-red-500">*</span>
            </label>
            <Textarea
              name="toolDescription"
              value={form.toolDescription}
              onChange={handleChange}
              required
              placeholder="Describe what the tool should do"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tool Category
            </label>
            <Input
              type="text"
              name="toolCategory"
              value={form.toolCategory}
              onChange={handleChange}
              placeholder="e.g. Barcode, PDF, Image"
              autoComplete="off"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              name="yourEmail"
              value={form.yourEmail}
              onChange={handleChange}
              required
              placeholder="you@example.com"
              autoComplete="email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Info
            </label>
            <Textarea
              name="additionalInfo"
              value={form.additionalInfo}
              onChange={handleChange}
              placeholder="Any extra details or requirements"
              rows={2}
            />
          </div>
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}
          <Button
            type="submit"
            className="w-full"
            variant="default"
            size="lg"
          >
            Submit Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddToolRequest;