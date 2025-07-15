import React, { useState } from "react";
import { Link } from "react-router-dom";
import SearchPopup from "./SearchPopup";

const navItems = [
  { label: "Home", to: "/" },
  // { label: "Latest Jobs", to: "#" },
  { label: "Results", to: "/results" },
  { label: "Admit Card", to: "/admitcard" },
  { label: "Answer Key", to: "/answerkey" },
  { label: "Syllabus", to: "/syllabus" },
  { label: "Admission", to: "/admission" },
  { label: "Important", to: "/important" },
];

const Navbar: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <>
      <nav className="bg-black w-full">
        <div className="flex items-center justify-center">
          {/* Navigation Items */}
          <ul className="flex items-center divide-x divide-white/30">
            {navItems.map((item) => (
              <li
                key={item.label}
                className="px-6 py-4 text-white font-semibold text-lg hover:bg-white/10 cursor-pointer select-none"
              >
                <Link to={item.to} className="block w-full h-full">{item.label}</Link>
              </li>
            ))}
          </ul>
          
          {/* Search Icon */}
          <div className="flex items-center ml-4 px-4">
            <button
              onClick={handleSearchClick}
              className="p-2 text-white hover:bg-white/10 rounded-full transition-colors"
              title="Search"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Search Popup */}
      <SearchPopup isOpen={isSearchOpen} onClose={handleCloseSearch} />
    </>
  );
};

export default Navbar; 