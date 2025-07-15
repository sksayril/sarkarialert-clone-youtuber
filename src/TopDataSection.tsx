import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface TopData {
  _id: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  tags: string[];
  contentTitle: string;
  contentDescription: string;
  colorCode: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function TopDataSection() {
  const [topData, setTopData] = useState<TopData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/topdata")
      .then(res => res.json())
      .then(data => {
        setTopData(data.topDataList || []);
        setLoading(false);
      })
      .catch(() => {
        setError("Top data API se data fetch nahi ho paaya.");
        setLoading(false);
      });
  }, []);

  if (loading) return null;
  if (error) return <div className="text-center text-red-600 mt-4">{error}</div>;

  return (
    <div className="w-full flex flex-wrap gap-2 justify-center items-center mb-4">
      {topData.map(item => (
        <button
          key={item._id}
          onClick={() => navigate(`/topdata/${slugify(item.contentTitle)}`)}
          className="flex items-center justify-center rounded-sm font-bold text-white text-center"
          style={{
            backgroundColor: item.colorCode,
            minWidth: 320,
            maxWidth: 420,
            width: '100%',
            height: 80,
            fontSize: 22,
            padding: '0 12px',
            marginBottom: 0,
            marginTop: 0,
            marginLeft: 0,
            marginRight: 0,
            whiteSpace: 'normal',
            lineHeight: 1.2,
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            cursor: 'pointer',
            border: 'none',
          }}
        >
          {item.contentTitle}
        </button>
      ))}
    </div>
  );
} 