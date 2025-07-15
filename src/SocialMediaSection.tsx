import React, { useEffect, useState } from "react";

interface SocialMediaData {
  telegramLink: string;
  whatsappLink: string;
}

export default function SocialMediaSection() {
  const [socialData, setSocialData] = useState<SocialMediaData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/home-content/public/active")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setSocialData({
            telegramLink: data.data.telegramLink,
            whatsappLink: data.data.whatsappLink
          });
        } else {
          setError("Failed to fetch social media links");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch social media links");
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error) return null;
  if (!socialData) return null;

  return (
    <div className="w-full bg-white border-t border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center space-x-4">
          {/* WhatsApp Icon */}
          <a 
            href={socialData.whatsappLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
              alt="WhatsApp" 
              className="w-8 h-8"
            />
            <span className="font-semibold">WhatsApp</span>
          </a>
          
          {/* Telegram Icon */}
          <a 
            href={socialData.telegramLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-blue-500 hover:text-blue-600 transition-colors"
          >
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/8/83/Telegram_2019_Logo.svg" 
              alt="Telegram" 
              className="w-8 h-8"
            />
            <span className="font-semibold">Telegram</span>
          </a>
        </div>
      </div>
    </div>
  );
} 