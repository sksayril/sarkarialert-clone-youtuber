import React, { useState, useEffect } from "react";

interface AdmitCardItem {
  _id: string;
  contentTitle: string;
  contentDescription: string;
  createdAt: string;
  updatedAt: string;
}

const AdmitCardPage: React.FC = () => {
  const [admitCards, setAdmitCards] = useState<AdmitCardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAdmitCards = async () => {
      try {
        const response = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/admin/users/admit-cards");
        if (!response.ok) {
          throw new Error("Failed to fetch admit cards");
        }
        const data = await response.json();
        if (data.success && data.data) {
          setAdmitCards(data.data);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
        // Set fallback data
        setAdmitCards([
          {
            _id: "1",
            contentTitle: "DDA Admit Card 2025",
            contentDescription: "Delhi Development Authority Admit Card 2025 is now available for download.",
            createdAt: "2025-01-15T10:00:00Z",
            updatedAt: "2025-01-15T10:00:00Z"
          },
          {
            _id: "2",
            contentTitle: "UP Police Constable Admit Card 2025",
            contentDescription: "Uttar Pradesh Police Constable Admit Card 2025 has been released.",
            createdAt: "2025-01-14T10:00:00Z",
            updatedAt: "2025-01-14T10:00:00Z"
          },
          {
            _id: "3",
            contentTitle: "Railway Group D Admit Card 2025",
            contentDescription: "Railway Group D Admit Card 2025 is now available for candidates.",
            createdAt: "2025-01-13T10:00:00Z",
            updatedAt: "2025-01-13T10:00:00Z"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmitCards();
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
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Latest Admit Cards</h1>
      <ul className="space-y-6">
        {admitCards.map((item) => (
          <li key={item._id} className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
            <div className="text-xl font-semibold text-blue-700 mb-3">{item.contentTitle}</div>
            <div className="text-gray-700 prose max-w-none text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: item.contentDescription }} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdmitCardPage; 