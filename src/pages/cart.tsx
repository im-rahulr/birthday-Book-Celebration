import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import Balloons from "@/components/Balloons";

type Package = {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
};

const PACKAGES: Package[] = [
  {
    id: "vip",
    name: "VIP Plan",
    price: 999,
    description: "Premium celebration package",
    features: ["Return Gift", "10 Photos with Ashwani"],
  },
  {
    id: "friends",
    name: "Friends Plan",
    price: 120,
    description: "Perfect for friends group",
    features: ["3 Photos with Ashwani"],
  },
  {
    id: "bestfriends",
    name: "Bestfriends Plan",
    price: 499,
    description: "Special best friends package",
    features: ["Cake Parcel Available", "50 Photos with Ashwani"],
  },
];

export default function CartPage() {
  const router = useRouter();
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);

  const handleProceedToSummary = () => {
    if (!selectedPackage) {
      alert("Please select a package");
      return;
    }
    
    // Navigate to summary page with selected package
    router.push(`/summary?package=${selectedPackage.id}`);
  };

  return (
    <main className="min-h-screen bg-black text-foreground flex items-center justify-center px-4 py-8 relative">
      <Balloons />
      <div className="max-w-2xl w-full space-y-8">
        <div className="text-center space-y-3">
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            Choose Your Package
          </h1>
          <p className="text-lg text-muted/80">
            Select a plan to celebrate Ashwani's birthday
          </p>
        </div>

        {/* Package Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackage(pkg)}
              className={`rounded-2xl border p-6 space-y-4 cursor-pointer transition-all duration-300 ${
                selectedPackage?.id === pkg.id
                  ? "border-accent bg-accent/10"
                  : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
              }`}
            >
              <h2 className="text-xl font-semibold">{pkg.name}</h2>
              <p className="text-sm text-muted/70">{pkg.description}</p>
              <ul className="space-y-2">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="space-y-2">
                <p className="text-muted/70 text-sm">Price</p>
                <p className="text-3xl font-bold text-accent">₹{pkg.price}</p>
              </div>
              <Button
                onClick={() => setSelectedPackage(pkg)}
                variant={selectedPackage?.id === pkg.id ? "default" : "outline"}
                className="w-full h-11"
              >
                {selectedPackage?.id === pkg.id ? "Selected" : "Select Plan"}
              </Button>
            </div>
          ))}
        </div>

        {/* Proceed Button */}
        <div className="pt-4">
          <Button
            onClick={handleProceedToSummary}
            disabled={!selectedPackage}
            className="w-full h-14 text-lg font-semibold"
          >
            {selectedPackage ? `Continue with ${selectedPackage.name}` : "Select a Package to Continue"}
          </Button>
        </div>

        <div className="text-center">
          <Link href="/booking">
            <Button variant="outline" className="h-11 px-8">
              Back to Booking
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
