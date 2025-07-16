import React from "react";
import { Link } from "react-router-dom";

const SarkariResultSection: React.FC = () => {
  const quickActions = [
    { name: "Latest Jobs", icon: "🔴", color: "bg-red-600", href: "#" },
    { name: "Results", icon: "🟢", color: "bg-green-600", href: "/results" },
    { name: "Admit Card", icon: "🔵", color: "bg-blue-600", href: "/admitcard" },
    { name: "Answer Key", icon: "🟡", color: "bg-yellow-500", href: "/answerkey" },
    { name: "Syllabus", icon: "🟣", color: "bg-purple-600", href: "/syllabus" },
    { name: "Admission", icon: "🌸", color: "bg-pink-500", href: "/admission" },
    { name: "Important", icon: "🔷", color: "bg-indigo-600", href: "/important" },
    { name: "Contact", icon: "✳️", color: "bg-teal-500", href: "#" },
  ];

  const trendingTopics = [
    { name: "UP Police Constable", icon: "👮", color: "bg-blue-600", href: "#" },
    { name: "Railway Group D", icon: "🚂", color: "bg-green-600", href: "#" },
    { name: "Bihar Teacher", icon: "📚", color: "bg-purple-600", href: "#" },
    { name: "Anganwadi Bharti", icon: "🏠", color: "bg-pink-500", href: "#" },
    { name: "Bank Clerk", icon: "🏦", color: "bg-indigo-600", href: "#" },
  ];

  return (
    <div className="py-4">
      {/* Quick Actions */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {quickActions.map((action) => (
          <Link
            key={action.name}
            to={action.href}
            className={`flex items-center justify-center text-white font-bold px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[80px] ${action.color}`}
          >
            <span className="mr-3 text-2xl">
              {action.icon}
            </span>
            <span className="text-base leading-tight font-semibold">
              {action.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Trending Topics */}
      <div className="grid grid-cols-5 gap-4 mb-6">
        {trendingTopics.map((topic) => (
          <Link
            key={topic.name}
            to={topic.href}
            className={`flex items-center justify-center text-white font-bold px-6 py-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[80px] ${topic.color}`}
          >
            <span className="mr-3 text-2xl">
              {topic.icon}
            </span>
            <span className="text-base leading-tight font-semibold">
              {topic.name}
            </span>
          </Link>
        ))}
      </div>

      {/* WhatsApp Join Button */}
      <div className="text-center">
        <a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center bg-green-500 text-white font-bold px-8 py-4 rounded-2xl shadow-lg hover:bg-green-600 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 min-h-[80px]"
        >
          <span className="text-2xl mr-3">📱</span>
          <span className="text-lg">Join us on WhatsApp</span>
        </a>
      </div>
    </div>
  );
};

export default SarkariResultSection; 