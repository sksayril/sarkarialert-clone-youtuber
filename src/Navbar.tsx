import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Results", path: "/results" },
    { name: "Admit Card", path: "/admitcard" },
    { name: "Answer Key", path: "/answerkey" },
    { name: "Syllabus", path: "/syllabus" },
    { name: "Admission", path: "/admission" },
    { name: "Important", path: "/important" },
  ];

  return (
    <nav className="bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto flex justify-center items-center p-4">
        {/* Desktop Navigation */}
        <div className="flex space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="text-gray-700 hover:text-red-600 font-medium transition-colors duration-300 py-2 px-3 rounded-md hover:bg-red-50"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 