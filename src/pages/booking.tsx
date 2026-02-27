import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Balloons from "@/components/Balloons";

export default function BookingPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4 bg-black text-foreground relative">
      <Balloons />
      <Card className="max-w-md w-full">
        <CardHeader className="text-center space-y-3">
          <CardTitle className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Plan Ashwani&apos;s Birthday
          </CardTitle>
          <p className="text-base sm:text-lg text-muted leading-relaxed">
            Choose a package to celebrate. Select from VIP, Friends, or Bestfriends plans.
          </p>
        </CardHeader>

        <CardContent className="space-y-4 pt-2">
          <div className="space-y-3">
            <Link href="/cart" className="block">
              <Button className="w-full h-12 text-base font-semibold">
                Choose Package
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button
                variant="outline"
                className="w-full h-12 text-base font-semibold"
              >
                Back to Countdown
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
