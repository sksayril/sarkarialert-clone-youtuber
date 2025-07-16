import React, { useState } from "react";
import { BrainCircuit, FileText, Smile, Search, GraduationCap, Phone } from "lucide-react";

interface SearchSectionProps {
  onSearch?: (query: string) => void;
  onOpenResumeAI?: () => void;
  onOpenQuizAI?: () => void;
  onOpenDostAI?: () => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({
  onSearch,
  onOpenResumeAI,
  onOpenQuizAI,
  onOpenDostAI
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && onSearch) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="mx-auto py-6 text-center px-4">
      {/* AI Tools Section */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 mb-6">
        <button 
          onClick={onOpenQuizAI}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-auto min-h-[48px]"
        >
          <BrainCircuit size={18} /> 
          <span className="text-base">AI Quiz & Test</span>
        </button>
        {/* <button 
          onClick={onOpenResumeAI}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-auto min-h-[48px]"
        >
          <FileText size={18} /> 
          <span className="text-base">AI Resume Sahayak</span>
        </button> */}
        <button 
          onClick={onOpenDostAI}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold py-2 px-5 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 w-auto min-h-[48px]"
        >
          <Smile size={18} /> 
          <span className="text-base">AI Dost se Baatein Karein</span>
        </button>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="max-w-8xl mx-auto mb-8">
        <div className="relative max-w-8xl flex items-center shadow-md rounded-full">
          <input 
            type="text" 
            value={query} 
            onChange={(e) => setQuery(e.target.value)} 
            placeholder="Naukri, result, admit card khojein..." 
            className="w-full p-4 pl-6 text-lg border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent" 
          />
          <button 
            type="submit" 
            className="absolute right-1 top-1 bottom-1 bg-red-800 text-white p-3 rounded-full hover:bg-red-900 transition-colors duration-300 min-w-[48px] min-h-[48px] flex items-center justify-center"
          >
            <Search size={20} className="w-6 h-6" />
          </button>
        </div>
      </form>

      {/* Quick Action Buttons */}
      {/* <div className="flex flex-wrap justify-center gap-4">
        <button className="flex items-center justify-center text-white font-semibold bg-red-600 px-4 py-2 rounded-md shadow-md hover:bg-red-700 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🔴</span> RSMSSB JE Result
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-green-600 px-4 py-2 rounded-md shadow-md hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🟢</span> JPSC MO Online Form
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-blue-600 px-4 py-2 rounded-md shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🔵</span> DDA Admit Card
        </button>
        <button className="flex items-center justify-center text-black font-semibold bg-yellow-400 px-4 py-2 rounded-md shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🟡</span> UP Police Constable
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-purple-600 px-4 py-2 rounded-md shadow-md hover:bg-purple-700 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🟣</span> Bihar Teacher Vacancy
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-pink-500 px-4 py-2 rounded-md shadow-md hover:bg-pink-600 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🌸</span> Anganwadi Bharti
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-indigo-600 px-4 py-2 rounded-md shadow-md hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">🔷</span> Railway Group D
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-teal-500 px-4 py-2 rounded-md shadow-md hover:bg-teal-600 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">✳️</span> Answer Key
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-orange-500 px-4 py-2 rounded-md shadow-md hover:bg-orange-600 transition-all duration-300 transform hover:-translate-y-1">
          <span className="mr-2 text-lg">✴️</span> Syllabus
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-cyan-500 px-4 py-2 rounded-md shadow-md hover:bg-cyan-600 transition-all duration-300 transform hover:-translate-y-1">
          <GraduationCap className="mr-2" size={18}/> Admission
        </button>
        <button className="flex items-center justify-center text-white font-semibold bg-gray-500 px-4 py-2 rounded-md shadow-md hover:bg-gray-600 transition-all duration-300 transform hover:-translate-y-1">
          <Phone className="mr-2" size={18}/> Contact Us
        </button>
      </div> */}
    </div>
  );
};

export default SearchSection; 