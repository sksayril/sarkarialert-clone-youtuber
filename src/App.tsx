import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import SubCategoryDetail from "./SubCategoryDetail";
import TopDataSection from "./TopDataSection";
import TopDataDetail from "./TopDataDetail";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ResultsPage from "./ResultsPage";
import ImportantPage from "./ImportantPage";

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#f9f9f9]">
      <header className="w-full bg-[var(--main-red)] py-2 px-0 flex flex-col items-center">
        <div className="text-center">
          <div className="font-bold text-white text-3xl leading-tight" style={{fontFamily: 'Arial'}}>सरकारी अलर्ट</div>
          <div className="uppercase text-white text-xl tracking-wide font-bold">SARKARIALERT.NET</div>
        </div>
      </header>
      <Navbar />
      <div className="w-full bg-[#f1f9f7] border-b border-[#dbdbdb] py-2 px-2 text-center">
        <span className="text-[14px] text-[color:var(--link-blue)] font-semibold">Sarkari Result</span>
        <span className="text-[13px] text-[#333]"> is a page on SarkariAlert.NET where you can easily access government job notifications in 2025, including the latest Sarkari Job Updates, admit cards, and Sarkari Naukri results and Rojgar Result.</span>
      </div>
      <TopDataSection />
      <main className="w-full max-w-6xl mx-auto flex-1 px-1 md:px-8 py-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/subcategory/:id" element={<SubCategoryDetail />} />
          <Route path="/topdata/:slug" element={<TopDataDetail />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/important" element={<ImportantPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
