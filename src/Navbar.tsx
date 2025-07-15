import React from "react";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Latest Jobs", to: "#" },
  { label: "Results", to: "/results" },
  { label: "Admit Card", to: "#" },
  { label: "Answer Key", to: "#" },
  { label: "Syllabus", to: "#" },
  { label: "Admission", to: "#" },
  { label: "Important", to: "/important" },
];

const Navbar: React.FC = () => {
  return (
    <nav className="bg-black w-full">
      <ul className="flex justify-center items-center divide-x divide-white/30">
        {navItems.map((item) => (
          <li
            key={item.label}
            className="px-8 py-4 text-white font-semibold text-lg hover:bg-white/10 cursor-pointer select-none"
          >
            <Link to={item.to} className="block w-full h-full">{item.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar; 