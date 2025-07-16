import React from "react";
import { Routes, Route } from "react-router-dom";
import { Youtube, Instagram, Facebook, Twitter } from "lucide-react";
import Home from "./Home";
import ResultsPage from "./ResultsPage";
import AdmitCardPage from "./AdmitCardPage";
import AnswerKeyPage from "./AnswerKeyPage";
import SyllabusPage from "./SyllabusPage";
import AdmissionPage from "./AdmissionPage";
import ImportantPage from "./ImportantPage";
import AiChat from "./AiChat";
import Ticker from "./Ticker";
import Navbar from "./Navbar";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-800 to-red-900 text-white shadow-lg p-4">
        <div className="container mx-auto flex flex-row justify-between items-center space-y-0">
          {/* Social Media Icons */}
          <div className="flex items-center space-x-3">
            <a href="#" className="bg-red-600 p-3 rounded-full hover:bg-red-700 transition-colors duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center">
              <Youtube size={18} className="w-5 h-5" />
            </a>
            <a href="#" className="bg-green-500 p-3 rounded-full hover:bg-green-600 transition-colors duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
              </svg>
            </a>
            <a href="#" className="bg-purple-600 p-3 rounded-full hover:bg-purple-700 transition-colors duration-300 min-h-[48px] min-w-[48px] flex items-center justify-center">
              <Instagram size={18} className="w-5 h-5" />
            </a>
          </div>

          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="w-28"></div>
            <div className="text-center">
              <h1 className="text-5xl font-extrabold tracking-wider">SARKARI RESULT</h1>
              <p className="text-base font-light">www.sarkariresult.com</p>
            </div>
            <div className="w-28"></div>
          </div>

          {/* Right side - empty for balance */}
          <div className="flex items-center space-x-3">
            <div className="w-5 h-5"></div>
          </div>
        </div>
      </header>

      {/* Ticker */}
      <Ticker />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="w-full max-w-6xl mx-auto flex-1 px-8 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/admitcard" element={<AdmitCardPage />} />
          <Route path="/answerkey" element={<AnswerKeyPage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/important" element={<ImportantPage />} />
        </Routes>
      </main>

      {/* AI Chat */}
      <AiChat />
    </div>
  );
};

export default App;
