import React from "react";

export default function KarnatakaBanner() {
  return (
    <div className="w-full sticky top-0 z-50 shadow-lg">
      {/* Message Banner */}
      <div className="w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808] py-3 sm:py-4 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-base sm:text-lg md:text-xl font-bold text-black tracking-wide">
            🙏 We Stand with Dboss 🙏
          </p>
          <p className="text-xs sm:text-sm text-gray-800 mt-1">
            Sponsor and Organise by R.Chiru Kannadiga
          </p>
        </div>
      </div>
    </div>
  );
}
