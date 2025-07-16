// import React from "react";
// import { ChevronRight, Star, ArrowRight } from "lucide-react";

// interface Job {
//   id: string;
//   title: string;
// }

// interface LatestJobsCardProps {
//   jobs: Job[];
//   onViewMore?: () => void;
// }

// const LatestJobsCard: React.FC<LatestJobsCardProps> = ({ jobs, onViewMore }) => {
//   return (
//     <div className="border border-red-800 rounded-lg bg-white shadow-md">
//       {/* Header */}
//       <div className="bg-red-800 text-white text-center py-3 rounded-t-lg">
//         <h2 className="text-xl font-bold">Latest Jobs</h2>
//       </div>
      
//       {/* Job Listings */}
//       <div className="p-4">
//         {jobs.map((job, index) => (
//           <div key={job.id} className="flex items-center justify-between py-2">
//             <div className="flex items-center gap-2 flex-1">
//               <ChevronRight className="w-4 h-4 text-black" />
//               <span className="text-black text-sm">{job.title}</span>
//             </div>
//             <Star className="w-4 h-4 text-orange-500" />
//             {index < jobs.length - 1 && (
//               <div className="absolute left-0 right-0 h-px bg-gray-200 mt-8"></div>
//             )}
//           </div>
//         ))}
//       </div>
      
//       {/* View More Button */}
//       <div className="text-center pb-4">
//         <button 
//           onClick={onViewMore}
//           className="bg-red-100 text-red-800 px-6 py-2 rounded-lg font-medium hover:bg-red-200 transition-colors duration-200 flex items-center gap-2 mx-auto"
//         >
//           View More
//           <ArrowRight className="w-4 h-4" />
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LatestJobsCard; 