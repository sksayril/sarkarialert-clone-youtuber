import React from "react";

export default function ComparisonSection() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9]">
      <div className="flex gap-6 max-w-4xl mx-auto px-4">
        {/* Left Box - New */}
        <div className="flex-1 border border-red-600 rounded overflow-hidden">
          {/* Red Header */}
          <div className="bg-red-600 py-3 text-center">
            <h3 className="text-white font-bold text-lg">New</h3>
          </div>
          
          {/* White Content Area */}
          <div className="bg-white p-4">
            <div className="text-blue-600 font-medium mb-2">FullTack-Development</div>
            <div className="text-blue-600 font-medium">FullTack Development</div>
          </div>
        </div>

        {/* Right Box - Result */}
        <div className="flex-1 border border-red-600 rounded overflow-hidden">
          {/* Red Header */}
          <div className="bg-red-600 py-3 text-center">
            <h3 className="text-white font-bold text-lg">Result</h3>
          </div>
          
          {/* White Content Area */}
          <div className="bg-white p-4">
            <div className="text-blue-600 font-medium mb-2">FullTack Development</div>
            <div className="text-blue-600 font-medium">Web Development</div>
          </div>
        </div>
      </div>
    </div>
  );
} 