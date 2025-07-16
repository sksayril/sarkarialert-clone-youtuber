import React, { useState, useEffect } from "react";

interface AnswerKeyItem {
  _id: string;
  contentTitle: string;
  contentDescription: string;
  createdAt: string;
  updatedAt: string;
}

const AnswerKeyPage: React.FC = () => {
  const [answerKeys, setAnswerKeys] = useState<AnswerKeyItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnswerKeys = async () => {
      try {
        const response = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/admin/users/answer-keys");
        if (!response.ok) {
          throw new Error("Failed to fetch answer keys");
        }
        const data = await response.json();
        if (data.success && data.data) {
          setAnswerKeys(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Set fallback data
        setAnswerKeys([
          {
            _id: "1",
            contentTitle: "UPSC Civil Services Answer Key 2025",
            contentDescription: "Union Public Service Commission Civil Services Answer Key 2025 has been released.",
            createdAt: "2025-01-15T10:00:00Z",
            updatedAt: "2025-01-15T10:00:00Z"
          },
          {
            _id: "2",
            contentTitle: "RRB JE Answer Key 2025",
            contentDescription: "Railway Recruitment Board Junior Engineer Answer Key 2025 is now available.",
            createdAt: "2025-01-14T10:00:00Z",
            updatedAt: "2025-01-14T10:00:00Z"
          },
          {
            _id: "3",
            contentTitle: "Bihar Teacher Answer Key 2025",
            contentDescription: "Bihar Teacher Recruitment Board Answer Key 2025 has been declared.",
            createdAt: "2025-01-13T10:00:00Z",
            updatedAt: "2025-01-13T10:00:00Z"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnswerKeys();
  }, []);

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
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest Answer Keys</h1>
      <ul className="space-y-6">
        {answerKeys.map((item) => (
          <li key={item._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-xl font-semibold text-blue-700 mb-3">{item.contentTitle}</div>
            <div className="text-gray-700 prose max-w-none text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item.contentDescription }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AnswerKeyPage; 