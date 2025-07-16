// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// interface TopData {
//   _id: string;
//   metaTitle: string;
//   metaDescription: string;
//   keywords: string[];
//   tags: string[];
//   contentTitle: string;
//   contentDescription: string;
//   colorCode: string;
// }

// function slugify(text: string) {
//   return text
//     .toLowerCase()
//     .replace(/[^a-z0-9\s-]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-")
//     .replace(/^-+|-+$/g, "");
// }

// export default function TopDataSection() {
//   const [topData, setTopData] = useState<TopData[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/topdata")
//       .then(res => res.json())
//       .then(data => {
//         setTopData(data.topDataList || []);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Top data API se data fetch nahi ho paaya.");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return null;
//   if (error) return <div className="text-center text-red-600 mt-4">{error}</div>;

//   return (
//     <div className="w-full max-w-6xl mx-auto px-4 mb-6">
//       <div className="grid grid-cols-4 gap-2">
//         {topData.slice(0, 8).map((item, index) => (
//           <button
//             key={item._id}
//             onClick={() => navigate(`/topdata/${slugify(item.contentTitle)}`)}
//             className="flex items-center justify-center rounded-none font-bold text-white text-center border border-white"
//             style={{
//               backgroundColor: item.colorCode,
//               height: 80,
//               fontSize: 16,
//               padding: '8px 12px',
//               whiteSpace: 'normal',
//               lineHeight: 1.2,
//               boxSizing: 'border-box',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               textAlign: 'center',
//               cursor: 'pointer',
//               border: '1px solid white',
//               minHeight: '80px',
//               wordWrap: 'break-word',
//               overflow: 'hidden'
//             }}
//           >
//             {item.contentTitle}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// } 