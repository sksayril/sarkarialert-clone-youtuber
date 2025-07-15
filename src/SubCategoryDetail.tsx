import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function SubCategoryDetail() {
  const { id: slug } = useParams<{ id: string }>();
  const [sub, setSub] = useState<SubCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/sub")
      .then(res => res.json())
      .then(data => {
        const found = data.subCategories.find((s: SubCategory) => slugify(s.metaTitle) === slug);
        setSub(found || null);
        setLoading(false);
      })
      .catch(() => {
        setError("API se data fetch nahi ho paaya.");
        setLoading(false);
      });
  }, [slug]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;
  if (!sub) return <div className="text-center mt-10">Sub-category nahi mili.</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{sub.metaTitle}</h1>
      <div className="mb-4 text-gray-600">{sub.metaDescription}</div>
      <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: sub.contentDescription.replace(/\n/g, '<br/>') }} />
      <div className="mt-4">
        <strong>Keywords:</strong> {sub.keywords.join(", ")}
      </div>
      <div>
        <strong>Tags:</strong> {sub.tags.join(", ")}
      </div>
    </div>
  );
} 