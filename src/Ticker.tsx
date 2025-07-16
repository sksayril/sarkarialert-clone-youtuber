import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const Ticker: React.FC = () => {
  const [isMuted, setIsMuted] = useState(false);

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="bg-yellow-400 text-black py-3 relative overflow-hidden">
      <div className="flex items-center justify-between px-4">
        {/* Mute/Unmute Button */}
        <button
          onClick={toggleMute}
          className="flex-shrink-0 px-4 py-3 min-h-[48px] min-w-[48px] flex items-center justify-center"
        >
          {isMuted ? 
            <VolumeX size={20} className="text-red-600 w-6 h-6" /> :
            <Volume2 size={20} className="text-black w-6 h-6" />
          }
        </button>

        {/* Ticker Content */}
        <div className="py-3 animate-marquee whitespace-nowrap">
          <span className="font-semibold text-base">
            <span className="mx-4">RRB JE CBT 2 Result 2025 Declared</span> |
            <span className="mx-4">JPSC MO Apply Last Date Extended</span> |
            <span className="mx-4">DDA Form Correction Open</span> |
            <span className="mx-4">UPSC Civil Services Final Result 2025</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Ticker; 