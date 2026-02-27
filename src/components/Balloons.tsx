import React, { useEffect, useState } from "react";

interface Balloon {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  color: string;
}

const COLORS = [
  "#FF6B6B", // Red
  "#4ECDC4", // Teal
  "#45B7D1", // Blue
  "#FFA07A", // Light Salmon
  "#98D8C8", // Mint
  "#F7DC6F", // Yellow
  "#BB8FCE", // Purple
  "#85C1E2", // Sky Blue
  "#F8B500", // Gold
  "#FF69B4", // Hot Pink
];

export default function Balloons() {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  useEffect(() => {
    // Create initial balloons
    const initialBalloons: Balloon[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: 5 + Math.random() * 90, // Keep within 5-95% to avoid edges
      delay: Math.random() * 8,
      duration: 10 + Math.random() * 10,
      size: 25 + Math.random() * 35,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
    setBalloons(initialBalloons);

    // Add new balloons periodically
    const interval = setInterval(() => {
      setBalloons((prev) => {
        const newBalloon: Balloon = {
          id: Date.now(),
          left: 5 + Math.random() * 90,
          delay: 0,
          duration: 10 + Math.random() * 10,
          size: 25 + Math.random() * 35,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
        };
        // Keep only last 15 balloons for performance
        const updated = [...prev.slice(-14), newBalloon];
        return updated;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {balloons.map((balloon) => (
        <div
          key={balloon.id}
          className="balloon-container"
          style={{
            left: `${balloon.left}%`,
            animationDelay: `${balloon.delay}s`,
            animationDuration: `${balloon.duration}s`,
          }}
        >
          {/* Balloon */}
          <div
            className="balloon"
            style={{
              width: `${balloon.size}px`,
              height: `${balloon.size * 1.2}px`,
              background: `radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), ${balloon.color})`,
              boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.15), 0 5px 15px rgba(0,0,0,0.2)`,
            }}
          >
            {/* Balloon shine */}
            <div
              className="balloon-shine"
              style={{
                width: `${balloon.size * 0.25}px`,
                height: `${balloon.size * 0.35}px`,
                top: `${balloon.size * 0.12}px`,
                left: `${balloon.size * 0.15}px`,
              }}
            />
          </div>
          {/* String */}
          <div
            className="balloon-string"
            style={{
              height: `${balloon.size * 1.5}px`,
            }}
          />
        </div>
      ))}

      <style jsx>{`
        .balloon-container {
          position: absolute;
          bottom: -150px;
          animation: float-up linear forwards;
        }

        @keyframes float-up {
          0% {
            transform: translateY(0) translateX(0) rotate(-3deg);
            opacity: 0;
          }
          5% {
            opacity: 0.9;
          }
          25% {
            transform: translateY(-25vh) translateX(10px) rotate(3deg);
          }
          50% {
            transform: translateY(-50vh) translateX(-10px) rotate(-2deg);
          }
          75% {
            transform: translateY(-75vh) translateX(8px) rotate(2deg);
          }
          95% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-120vh) translateX(0) rotate(0deg);
            opacity: 0;
          }
        }

        .balloon {
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          position: relative;
        }

        .balloon::after {
          content: '';
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 8px;
          height: 8px;
          background: inherit;
          border-radius: 50%;
        }

        .balloon-shine {
          position: absolute;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 50%;
          filter: blur(1px);
        }

        .balloon-string {
          position: absolute;
          width: 2px;
          background: linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0.1));
          left: 50%;
          top: 100%;
          transform: translateX(-50%);
          margin-top: -2px;
        }
      `}</style>
    </div>
  );
}
