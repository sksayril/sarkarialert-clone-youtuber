import React, { useEffect, useState } from "react";

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/home-content/public/active")
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data?.faqs) {
          setFaqs(data.data.faqs);
        } else {
          setError("No FAQs found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch FAQs");
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error) return null;
  if (!faqs.length) return null;

  return (
    <div className="w-full bg-[#f9f9f9] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#2c2c2c] mb-2">Frequently Asked Questions</h2>
          <div className="w-24 h-1 bg-[var(--main-red)] mx-auto"></div>
        </div>
        
        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={faq._id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Question Header - Red Background */}
              <div 
                className="text-white text-center py-4 px-6 text-xl font-bold cursor-pointer select-none"
                style={{ backgroundColor: '#b90927' }}
              >
                {faq.question}
              </div>
              
              {/* Answer Content - White Background with Red Border */}
              <div 
                className="bg-white p-6 text-gray-800 leading-relaxed"
                style={{ border: '2px solid #b90927', borderTop: 'none' }}
              >
                <div className="text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 