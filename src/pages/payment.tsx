import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Balloons from "@/components/Balloons";

const UPI_ID = "9739904620.wa.edw@waaxis";

// Package details mapping
const PACKAGE_DETAILS: Record<string, { name: string; description: string; features: string[] }> = {
  vip: { name: "VIP Plan", description: "Premium celebration package", features: ["Return Gift", "10 Photos with Ashwani"] },
  friends: { name: "Friends Plan", description: "Perfect for friends group", features: ["3 Photos with Ashwani"] },
  bestfriends: { name: "Bestfriends Plan", description: "Special best friends package", features: ["Cake Parcel Available", "50 Photos with Ashwani"] },
};

export default function PaymentPage() {
  const router = useRouter();
  const { amount, package: packageId, name, phone } = router.query;
  const [isProcessing, setIsProcessing] = useState(false);

  const amountNum = parseFloat(amount as string) || 0;
  const userName = (name as string) || "";
  const userPhone = (phone as string) || "";
  const pkg = packageId ? PACKAGE_DETAILS[packageId as string] : null;

  const handlePayNow = () => {
    if (!userName || !userPhone) {
      alert("User details are missing. Please go back and fill in your details.");
      return;
    }

    setIsProcessing(true);

    // Create UPI payment link with user details in transaction note
    const transactionNote = encodeURIComponent(`Birthday-${userName}-${userPhone}`);
    const upiLink = `upi://pay?pa=${UPI_ID}&pn=Birthday%20Celebration&am=${amountNum.toFixed(2)}&tn=${transactionNote}`;

    // Redirect to UPI app
    window.location.href = upiLink;

    // Show message about UPI redirect
    setTimeout(() => {
      setIsProcessing(false);
    }, 2000);
  };

  const copyUPIId = () => {
    navigator.clipboard.writeText(UPI_ID);
    alert("UPI ID copied to clipboard!");
  };

  if (!pkg) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-8 relative">
        <Balloons />
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">No Package Selected</h1>
          <p className="text-gray-400">Please go back and select a package</p>
          <Link href="/cart">
            <Button className="bg-white text-black hover:bg-gray-200">Go to Cart</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-4 py-8 relative">
      <Balloons />
      <div className="max-w-lg w-full">
        {/* Header */}
        <div className="mb-8">
          <Link href={`/summary?package=${packageId}`} className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Bill Summary
          </Link>
          <h1 className="text-3xl font-semibold">Payment</h1>
          <p className="text-gray-400 mt-2">Complete your payment via UPI</p>
        </div>

        {/* Main Payment Card - Stripe Style */}
        <div className="bg-[#1a1a1a] rounded-2xl overflow-hidden shadow-2xl">
          {/* Amount Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4">
            <p className="text-white/80 text-sm">Total Amount to Pay</p>
            <p className="text-3xl font-bold text-white">₹{amountNum.toFixed(2)}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Summary */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Order Summary</h3>
              <div className="bg-[#252525] rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-300">Package</span>
                  <span className="font-medium">{pkg.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Customer</span>
                  <span className="font-medium">{userName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Phone</span>
                  <span className="font-medium">{userPhone}</span>
                </div>
              </div>
            </div>

            {/* UPI Payment Section */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Pay via UPI</h3>
              
              {/* UPI ID Display */}
              <div className="bg-[#252525] rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">UPI ID</p>
                      <p className="font-semibold text-white">{UPI_ID}</p>
                    </div>
                  </div>
                  <button
                    onClick={copyUPIId}
                    className="text-purple-400 hover:text-purple-300 text-sm font-medium px-3 py-1 rounded border border-purple-400/30 hover:border-purple-400/60 transition-colors"
                  >
                    Copy
                  </button>
                </div>
              </div>

              {/* OR Divider */}
              <div className="flex items-center space-x-4">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              {/* Pay Now Button - Opens UPI App */}
              <Button
                onClick={handlePayNow}
                disabled={isProcessing}
                className="w-full h-14 text-base font-semibold bg-white text-black hover:bg-gray-200 disabled:opacity-50"
              >
                {isProcessing ? (
                  <span className="flex items-center space-x-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Opening UPI App...</span>
                  </span>
                ) : (
                  <span className="flex items-center space-x-2">
                    <span>Pay ₹{amountNum.toFixed(2)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                )}
              </Button>

              <p className="text-xs text-gray-500 text-center">
                Clicking Pay Now will open your UPI app (GPay, PhonePe, Paytm, etc.) with payment details pre-filled.
              </p>
            </div>

            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-gray-500 text-sm pt-4 border-t border-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Secured by UPI</span>
            </div>
          </div>
        </div>

        {/* Payment Methods Icons */}
        <div className="mt-6 flex items-center justify-center space-x-6 opacity-50">
          <div className="text-center">
            <div className="w-10 h-6 bg-white/20 rounded mb-1"></div>
            <span className="text-xs text-gray-500">GPay</span>
          </div>
          <div className="text-center">
            <div className="w-10 h-6 bg-white/20 rounded mb-1"></div>
            <span className="text-xs text-gray-500">PhonePe</span>
          </div>
          <div className="text-center">
            <div className="w-10 h-6 bg-white/20 rounded mb-1"></div>
            <span className="text-xs text-gray-500">Paytm</span>
          </div>
          <div className="text-center">
            <div className="w-10 h-6 bg-white/20 rounded mb-1"></div>
            <span className="text-xs text-gray-500">UPI</span>
          </div>
        </div>
      </div>
    </main>
  );
}
