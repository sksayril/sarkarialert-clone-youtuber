import React, { useState, useEffect } from "react";

interface SaleOfferPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SaleOfferPopup({ isOpen, onClose }: SaleOfferPopupProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0
  });

  useEffect(() => {
    if (!isOpen) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          onClose();
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
        {/* Red Header Strip */}
        <div className="bg-red-600 h-2"></div>
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 text-center">
          {/* Sale Badge */}
          <div className="bg-red-600 text-white text-sm font-bold px-4 py-1 rounded-full inline-block mb-4">
            �� LIMITED TIME OFFER ��
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Special Sarkari Job Alert
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 mb-4">
            Get instant notifications for all government job updates
          </p>

          {/* Timer */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Offer Ends In:</p>
            <div className="flex justify-center space-x-2">
              <div className="bg-red-600 text-white rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.hours.toString().padStart(2, '0')}</div>
                <div className="text-xs">Hours</div>
              </div>
              <div className="bg-red-600 text-white rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.minutes.toString().padStart(2, '0')}</div>
                <div className="text-xs">Minutes</div>
              </div>
              <div className="bg-red-600 text-white rounded-lg p-2 min-w-[50px]">
                <div className="text-xl font-bold">{timeLeft.seconds.toString().padStart(2, '0')}</div>
                <div className="text-xs">Seconds</div>
              </div>
            </div>
          </div>

          {/* Offer Details */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-600 line-through">₹999</span>
              <span className="text-2xl font-bold text-red-600">₹299</span>
            </div>
            <div className="text-green-600 font-semibold text-sm">
              Save ₹700 (70% OFF)
            </div>
          </div>

          {/* Features */}
          <div className="text-left mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">What You Get:</h3>
            <ul className="space-y-1 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Instant job notifications
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                All government departments covered
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Result updates & admit cards
              </li>
              <li className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                Priority customer support
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full bg-red-600 text-white py-3 px-6 rounded-lg font-bold text-lg hover:bg-red-700 transition-colors">
              Get Offer Now - ₹299
            </button>
            <button 
              onClick={onClose}
              className="w-full bg-gray-200 text-gray-700 py-2 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              No Thanks, Maybe Later
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-4 text-xs text-gray-500">
            <p>�� Secure Payment • ⚡ Instant Access • 💯 Money Back Guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
} 