import React, { useEffect, useState } from "react";

interface TopData {
  _id: string;
  contentTitle: string;
  colorCode: string;
}

export default function SarkariResultSection() {
  const [topData, setTopData] = useState<TopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/topdata")
      .then(res => res.json())
      .then(data => {
        setTopData(data.topDataList || []);
        setLoading(false);
      })
      .catch(() => {
        setError("API se data fetch nahi ho paaya.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-4">Loading...</div>;
  if (error) return <div className="text-center text-red-600 py-4">{error}</div>;

  // Group data into rows of 4 items each
  const rows = [];
  for (let i = 0; i < topData.length; i += 4) {
    rows.push(topData.slice(i, i + 4));
  }

  return (
    <div className="w-full bg-white">
      <div className="max-w-4xl mx-auto">
        {/* Top Section - Text Links */}
        <div className="space-y-1 mb-6">
          {rows.map((row, rowIndex) => (
            <div key={rowIndex} className="text-center">
              {row.map((item, itemIndex) => (
                <React.Fragment key={item._id}>
                  <a 
                    href="#" 
                    className="text-blue-800 underline hover:text-blue-900 font-medium"
                    style={{ color: '#0000FF' }}
                  >
                    {item.contentTitle}
                  </a>
                  {itemIndex < row.length - 1 && (
                    <span className="text-blue-800 mx-3 font-medium">||</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
        
        {/* Bottom Section - Facebook Button */}
        <div className="text-center">
          <button className="bg-blue-800 text-white px-5 rounded-md font-bold text-lg hover:bg-blue-900 transition-colors">
            Join us on <span className="underline">Facebook</span>
          </button>
        </div>
      </div>
    </div>
  );
} 