import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SubCategoryDetail from "./SubCategoryDetail";
import TopDataSection from "./TopDataSection";
import TopDataDetail from "./TopDataDetail";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ResultsPage from "./ResultsPage";
import ImportantPage from "./ImportantPage";
import AdmitCardPage from "./AdmitCardPage";
import AnswerKeyPage from "./AnswerKeyPage";
import SyllabusPage from "./SyllabusPage";
import AdmissionPage from "./AdmissionPage";
import SarkariResultSection from "./SarkariResultSection";
import SocialMediaSection from "./SocialMediaSection";
import FaqSection from "./FaqSection";
import SarkariResultPagesSection from "./SarkariResultPagesSection";
import AiChat from "./AiChat";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f9f9f9]">
      {/* Top thin strip */}
      <div className="w-full h-1 bg-gray-700"></div>
      
      {/* Main header with maroon background */}
      <header className="w-full bg-red-800 py-6 px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="relative w-20 h-20">
              {/* Outer light purple ring */}
              <div className="absolute inset-0 rounded-full bg-purple-300 border-2 border-purple-400"></div>
              
              {/* Darker purple inner ring */}
              <div className="absolute inset-2 rounded-full bg-purple-400 flex items-center justify-center">
                <div className="text-center text-xs text-blue-800 font-semibold">
                  SARKARI RESULT.COM
                </div>
              </div>
              
              {/* Inner light grey circle */}
              <div className="absolute inset-4 rounded-full bg-gray-200 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-blue-800 font-bold text-sm leading-tight">Sarkari</div>
                  <div className="text-red-700 font-bold text-sm">Result</div>
                  <div className="w-6 h-px bg-gray-400 mx-auto mt-1"></div>
                  <div className="text-xs text-blue-800 mt-1">S.R.S.R.S.R</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center - Title and URL */}
          <div className="flex-1 flex justify-center">
            <div className="text-center">
              <div className="font-bold text-white text-4xl leading-tight mb-2">SARKARI RESULT</div>
              <div className="text-white text-lg tracking-wide">WWW.SARKARIRESULT.COM</div>
            </div>
          </div>
          
          {/* Right side - Empty space for balance */}
          <div className="w-20"></div>
        </div>
      </header>
      
      <Navbar />
      <div className="w-full bg-[#f1f9f7] border-b border-[#dbdbdb] py-2 px-2 text-center">
        <SarkariResultSection />
      </div>
      <TopDataSection />
      
      <main className="w-full max-w-6xl mx-auto flex-1 px-8 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subcategory/:id" element={<SubCategoryDetail />} />
          <Route path="/topdata/:slug" element={<TopDataDetail />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/admitcard" element={<AdmitCardPage />} />
          <Route path="/answerkey" element={<AnswerKeyPage />} />
          <Route path="/syllabus" element={<SyllabusPage />} />
          <Route path="/admission" element={<AdmissionPage />} />
          <Route path="/important" element={<ImportantPage />} />
        </Routes>
      </main>
      
      {/* Sarkari Result Pages Section - Above FAQ */}
      <SarkariResultPagesSection />
      
      {/* FAQ Section - Above Social Media */}
      <FaqSection />
      
      {/* Social Media Section - Above Footer */}
      <SocialMediaSection />
      
      <Footer />
      
      {/* AI Chat - Available on all pages */}
      <AiChat />
    </div>
  );
}

export default App;
