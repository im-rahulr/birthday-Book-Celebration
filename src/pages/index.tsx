import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Balloons from "@/components/Balloons";
import KarnatakaBanner from "@/components/KarnatakaBanner";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const PHOTOS = [
  "/photos/IMG-20250527-WA0039.jpg",
  "/photos/IMG-20250527-WA0169.jpg",
  "/photos/IMG-20250527-WA0207.jpg",
  "/photos/one.png",
  "/photos/WhatsApp Image 2026-02-20 at 12.58.56 PM.jpeg",
  "/photos/WhatsApp Image 2026-02-20 at 12.58.59 PM (1).jpeg",
];

const BIRTHDAY_TARGET = new Date("2026-03-02T00:00:00+05:30").getTime();

function getTimeLeft(now: number): TimeLeft | null {
  const diff = BIRTHDAY_TARGET - now;
  if (diff <= 0) {
    return null;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds };
}

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    const updateTime = () => {
      setTimeLeft(getTimeLeft(Date.now()));
    };

    updateTime();

    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const birthdayPassed = isClient && timeLeft === null;

  return (
    <main className="min-h-screen bg-black text-foreground relative">
      <KarnatakaBanner />
      <Balloons />

      {/* Hero Section - Full viewport height, centered content */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-4xl">
          <Card className="w-full">
            <CardHeader className="text-center space-y-3">
              <CardTitle className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
                Ashwani's Birthday
              </CardTitle>
              <p className="text-base sm:text-lg text-muted leading-relaxed">
                Celebrating on {" "}
                <span className="font-semibold text-accent">2 March 2026</span>
              </p>
            </CardHeader>

            <CardContent className="space-y-10 pt-2 text-center">
              {!birthdayPassed && isClient ? (
                <div className="space-y-6">
                  <p className="text-base sm:text-lg text-muted/80">
                    Time remaining
                  </p>

                  <div className="grid grid-cols-4 gap-3 sm:gap-4">
                    <CountdownBox label="Days" value={timeLeft!.days} />
                    <CountdownBox label="Hours" value={timeLeft!.hours} />
                    <CountdownBox label="Minutes" value={timeLeft!.minutes} />
                    <CountdownBox label="Seconds" value={timeLeft!.seconds} />
                  </div>
                </div>
              ) : birthdayPassed && isClient ? (
                <div className="space-y-4 py-6">
                  <p className="text-2xl sm:text-3xl font-semibold">
                    Happy Birthday, Ashwani
                  </p>
                  <p className="text-base sm:text-lg text-muted">
                    The countdown is complete
                  </p>
                </div>
              ) : null}

              <div className="pt-4 space-y-4">
                <Link href="/booking">
                  <Button
                    size="lg"
                    className="w-full h-14 text-base sm:text-lg font-semibold"
                  >
                    Book Celebration
                  </Button>
                </Link>
                <p className="text-sm sm:text-base text-muted/70 leading-relaxed">
                  Plan the perfect birthday celebration
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Memories Section - Scroll down to see */}
      <section className="px-4 py-12 sm:py-16 bg-black/50">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              Memories
            </h2>
            <p className="text-base text-muted/80">
              Moments we've shared
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 auto-rows-[200px]">
            {/* Top left - large */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 sm:col-span-1 sm:row-span-2">
              <Image
                src={PHOTOS[0]}
                alt="Memory 1"
                width={300}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {/* Top middle - large */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 sm:col-span-1 sm:row-span-2">
              <Image
                src={PHOTOS[1]}
                alt="Memory 2"
                width={300}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                priority
              />
            </div>

            {/* Top right - large */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 sm:col-span-1 sm:row-span-2">
              <Image
                src={PHOTOS[2]}
                alt="Memory 3"
                width={300}
                height={600}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom left - small */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 sm:col-span-1">
              <Image
                src={PHOTOS[3]}
                alt="Memory 4"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom middle - small */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 sm:col-span-1">
              <Image
                src={PHOTOS[4]}
                alt="Memory 5"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Bottom right - small */}
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden hover:border-white/20 transition-all duration-300 sm:col-span-1">
              <Image
                src={PHOTOS[5]}
                alt="Memory 6"
                width={300}
                height={300}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

type CountdownBoxProps = {
  label: string;
  value: number;
};

function CountdownBox({ label, value }: CountdownBoxProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-3 py-5 sm:px-4 sm:py-7 flex flex-col items-center justify-center transition-all duration-300 hover:bg-white/10 hover:border-white/20">
      <div className="text-2xl sm:text-3xl md:text-5xl font-semibold tabular-nums tracking-tight">
        {value}
      </div>
      <div className="mt-2 text-[10px] sm:text-xs uppercase tracking-wider text-muted/70 font-medium">
        {label}
      </div>
    </div>
  );
}
