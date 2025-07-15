import { useEffect, useState } from "react";

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

export default function HomeFaqs() {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/home-content/public/active")
      .then(res => res.json())
      .then(data => {
        setFaqs(data.data?.faqs || []);
        setLoading(false);
      })
      .catch(() => {
        setError("FAQs API se data fetch nahi ho paaya.");
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error) return <div className="text-center text-red-600 mt-4">{error}</div>;
  if (!faqs.length) return null;

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 mb-8">
      {faqs.map(faq => (
        <div key={faq._id} className="mb-6">
          {/* FAQ Question Header - Red Background */}
          <div 
            className="text-white text-center py-4 px-6 text-xl font-bold"
            style={{ backgroundColor: '#ba0621' }}
          >
            {faq.question}
          </div>
          
          {/* FAQ Answer Content - White Background with Red Border */}
          <div 
            className="bg-white p-6 text-gray-800 leading-relaxed"
            style={{ border: '2px solid #ba0621', borderTop: 'none' }}
          >
            <div className="text-base">
              {faq.answer}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}