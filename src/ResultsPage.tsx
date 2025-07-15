import React, { useEffect, useState } from "react";

interface ResultItem {
  _id: string;
  contentTitle: string;
  contentDescription: string;
}

const ResultsPage: React.FC = () => {
  const [results, setResults] = useState<ResultItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("https://7cvccltb-3110.inc1.devtunnels.ms/latest-jobs/public/results")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setResults(data.data);
        } else {
          setError("No results found");
        }
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch results");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">Results</h1>
      <ul className="space-y-6">
        {results.map((item) => (
          <li key={item._id} className="bg-white rounded shadow p-4">
            <div className="text-lg font-semibold text-blue-700 mb-2">{item.contentTitle}</div>
            <div className="text-gray-700">{item.contentDescription}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResultsPage; 