import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

export default function TopDataDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [item, setItem] = useState<TopData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/topdata")
      .then(res => res.json())
      .then(data => {
        const found = (data.topDataList || []).find((d: TopData) => slugify(d.contentTitle) === slug);
        setItem(found || null);
        setLoading(false);
      })
      .catch(() => {
        setError("Top data API se data fetch nahi ho paaya.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!item) return <div className="text-center mt-10">Data nahi mila.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{item.contentTitle}</h1>
      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: item.contentDescription.replace(/\n/g, '<br/>') }} />
    </div>
  );
} 