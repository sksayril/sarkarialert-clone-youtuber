import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SaleOfferPopup from "./SaleOfferPopup";
// import HomeFaqs from "./HomeFaqs";

interface MainCategory {
  _id: string;
  title: string;
}

interface SubCategory {
  _id: string;
  mainCategory: MainCategory;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  contentTitle: string;
  contentDescription: string;
}

// Utility to create slug from metaTitle
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-") // spaces to dashes
    .replace(/-+/g, "-") // collapse multiple dashes
    .replace(/^-+|-+$/g, ""); // trim dashes
}

export default function Home() {
  const [categories, setCategories] = useState<Record<string, SubCategory[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showSalePopup, setShowSalePopup] = useState(false);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/sub")
      .then(res => res.json())
      .then(data => {
        const grouped: Record<string, SubCategory[]> = {};
        data.subCategories.forEach((sub: SubCategory) => {
          const main = sub.mainCategory.title;
          if (!grouped[main]) grouped[main] = [];
          grouped[main].push(sub);
        });
        setCategories(grouped);
        setLoading(false);
      })
      .catch(() => {
        setError("API se data fetch nahi ho paaya.");
        setLoading(false);
      });
  }, []);

  // Show popup after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSalePopup(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleCloseSalePopup = () => {
    setShowSalePopup(false);
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <>
      <div className="grid grid-cols-3 gap-6 p-4">
        {Object.entries(categories).map(([main, subs]) => (
          <div key={main} className="border-2 border-red-700 rounded-lg bg-white">
            <h2 className="bg-red-700 text-white text-2xl font-bold text-center py-3 mb-2 rounded-t-lg">{main}</h2>
            <ul className="p-4">
              {subs.map(sub => (
                <li key={sub._id} className="mb-2">
                  <Link
                    to={`/subcategory/${slugify(sub.metaTitle)}`}
                    className="text-blue-700 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {sub.metaTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
      {/* Sale Offer Popup */}
      <SaleOfferPopup 
        isOpen={showSalePopup} 
        onClose={handleCloseSalePopup} 
      />
      
      {/* <HomeFaqs /> */}
    </>
  );
} 