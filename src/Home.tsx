import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchSection from "./SearchSection";
import SarkariResultSection from "./SarkariResultSection";
import SarkariResultPagesSection from "./SarkariResultPagesSection";
import FaqSection from "./FaqSection";
import SocialMediaSection from "./SocialMediaSection";
import Footer from "./Footer";

interface TopData {
  _id: string;
  contentTitle: string;
  contentDescription: string;
  mainCategory: string;
  subCategory: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

const Home: React.FC = () => {
  const [topData, setTopData] = useState<TopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopData = async () => {
      try {
        const response = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/admin/users/top-data");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data.success && data.data) {
          setTopData(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Set fallback data
        setTopData([
          {
            _id: "1",
            contentTitle: "RRB JE CBT 2 Result 2025",
            contentDescription: "Railway Recruitment Board Junior Engineer CBT 2 Result has been declared. Check your result now.",
            mainCategory: "Results",
            subCategory: "Railway",
            slug: "rrb-je-cbt-2-result-2025",
            createdAt: "2025-01-15T10:00:00Z",
            updatedAt: "2025-01-15T10:00:00Z"
          },
          {
            _id: "2",
            contentTitle: "JPSC MO Online Form 2025",
            contentDescription: "Jharkhand Public Service Commission Medical Officer Online Application Form is now available.",
            mainCategory: "Jobs",
            subCategory: "Medical",
            slug: "jpsc-mo-online-form-2025",
            createdAt: "2025-01-14T10:00:00Z",
            updatedAt: "2025-01-14T10:00:00Z"
          },
          {
            _id: "3",
            contentTitle: "DDA Form Correction 2025",
            contentDescription: "Delhi Development Authority Form Correction window is now open for candidates.",
            mainCategory: "Admit Card",
            subCategory: "Delhi",
            slug: "dda-form-correction-2025",
            createdAt: "2025-01-13T10:00:00Z",
            updatedAt: "2025-01-13T10:00:00Z"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopData();
  }, []);

  // Group data by main category
  const groupedData = topData.reduce((acc, item) => {
    if (!acc[item.mainCategory]) {
      acc[item.mainCategory] = [];
    }
    acc[item.mainCategory].push(item);
    return acc;
  }, {} as Record<string, TopData[]>);

  // Add handlers for search and AI features
  const handleSearch = (query: string) => {
    console.log('Search query:', query);
    // Implement your search logic here
  };

  const handleOpenResumeAI = () => {
    console.log('Opening Resume AI');
    // Implement Resume AI logic
  };

  const handleOpenQuizAI = () => {
    console.log('Opening Quiz AI');
    // Implement Quiz AI logic
  };

  const handleOpenDostAI = () => {
    console.log('Opening AI Dost');
    // Implement AI Dost logic
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* SearchSection component */}
      <SearchSection 
        onSearch={handleSearch}
        onOpenResumeAI={handleOpenResumeAI}
        onOpenQuizAI={handleOpenQuizAI}
        onOpenDostAI={handleOpenDostAI}
      />

      {/* SarkariResultSection - shown on all pages */}
      <div className="w-full bg-[#f1f9f7] border-b border-[#dbdbdb] py-2 px-2 text-center">
        <SarkariResultSection />
      </div>

      {/* Top Data Section */}
      <div className="grid grid-cols-3 gap-6 p-4">
        {Object.entries(groupedData).map(([main, items]) => (
          <div key={main} className="bg-white rounded-lg shadow-md overflow-hidden">
            <h2 className="bg-red-700 text-white text-2xl font-bold text-center py-4 mb-2 rounded-t-lg px-2">{main}</h2>
            <ul className="p-4 space-y-2">
              {items.slice(0, 5).map((item) => (
                <li key={item._id}>
                  <Link
                    to={`/topdata/${item.slug}`}
                    className="text-blue-700 hover:underline text-base font-medium block py-1 hover:text-blue-900 transition-colors"
                  >
                    {item.contentTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Sarkari Result Pages Section - Above FAQ */}
      <SarkariResultPagesSection />
      
      {/* FAQ Section - Above Social Media */}
      <FaqSection />
      
      {/* Social Media Section - Above Footer */}
      <SocialMediaSection />
      
      <Footer />
    </div>
  );
};

export default Home; 