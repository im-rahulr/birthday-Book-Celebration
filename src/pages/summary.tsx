import React, { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Balloons from "@/components/Balloons";

type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

const PACKAGES: Record<string, Package> = {
  vip: {
    id: "vip",
    name: "VIP Plan",
    price: 999,
    description: "Premium celebration package",
    features: ["Return Gift", "10 Photos with Ashwani"],
  },
  friends: {
    id: "friends",
    name: "Friends Plan",
    price: 120,
    description: "Perfect for friends group",
    features: ["3 Photos with Ashwani"],
  },
  bestfriends: {
    id: "bestfriends",
    name: "Bestfriends Plan",
    price: 499,
    description: "Special best friends package",
    features: ["Cake Parcel Available", "50 Photos with Ashwani"],
  },
};

const GST_RATE = 0.05; // 5% GST

export default function SummaryPage() {
  const router = useRouter();
  const { package: packageId } = router.query;
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");

  const selectedPackage = packageId ? PACKAGES[packageId as string] : null;
  const gstAmount = selectedPackage ? selectedPackage.price * GST_RATE : 0;
  const totalAmount = selectedPackage ? selectedPackage.price + gstAmount : 0;

  const handleProceedToPayment = () => {
    if (!userName.trim() || !userPhone.trim()) {
      alert("Please enter your name and phone number");
      return;
    }
    if (!selectedPackage) {
      alert("Please select a package");
      return;
    }

    router.push(
      `/payment?amount=${totalAmount}&package=${selectedPackage.id}&name=${encodeURIComponent(
        userName
      )}&phone=${encodeURIComponent(userPhone)}`
    );
  };

  if (!selectedPackage) {
    return (
      <main className="min-h-screen bg-black text-foreground flex items-center justify-center px-4 py-8 relative">
        <Balloons />
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold">No Package Selected</h1>
          <p className="text-muted/70">Please go back and select a package</p>
          <Link href="/cart">
            <Button>Go to Cart</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-foreground flex items-center justify-center px-4 py-8 relative">
      <Balloons />
      <div className="max-w-xl w-full space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Bill Summary
          </h1>
          <p className="text-lg text-muted/80">
            Review your order and enter your details
          </p>
        </div>

        {/* Bill Summary Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-8">
          {/* Package Details */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold border-b border-white/10 pb-3">
              Package Details
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted/70">Package</span>
                <span className="font-semibold text-lg">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between items-start">
                <span className="text-muted/70">Description</span>
                <span className="font-medium text-right text-sm max-w-[200px]">
                  {selectedPackage.description}
                </span>
              </div>
              <div className="pt-2">
                <span className="text-muted/70 text-sm">Features Included:</span>
                <ul className="mt-2 space-y-2">
                  {selectedPackage.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-center text-sm text-gray-300 bg-white/5 rounded-lg px-3 py-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 text-green-400 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Customer Details Form */}
          <div className="space-y-4 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold">Customer Details</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userName" className="text-muted/70">
                  Full Name
                </Label>
                <Input
                  id="userName"
                  type="text"
                  placeholder="Enter your full name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="h-12 bg-white/5 border-white/10"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="userPhone" className="text-muted/70">
                  Phone Number
                </Label>
                <Input
                  id="userPhone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={userPhone}
                  onChange={(e) => setUserPhone(e.target.value)}
                  className="h-12 bg-white/5 border-white/10"
                />
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="space-y-3 border-t border-white/10 pt-6">
            <h2 className="text-xl font-semibold">Price Breakdown</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted/70">Base Price</span>
                <span className="font-medium">
                  ₹{selectedPackage.price.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted/70">GST (5%)</span>
                <span className="font-medium">₹{gstAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-white/10 pt-3 flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-accent">₹{totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-white/10">
            <Button
              onClick={handleProceedToPayment}
              disabled={!userName.trim() || !userPhone.trim()}
              className="w-full h-14 text-lg font-semibold"
            >
              Proceed to Payment
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link href="/cart">
            <Button variant="outline" className="h-11 px-8">
              Back to Cart
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
