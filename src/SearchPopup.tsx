import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface SearchPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResult {
  id: string;
  title: string;
  description?: string;
  type: 'category' | 'topdata' | 'result' | 'important';
  link: string;
  keywords?: string[];
}

export default function SearchPopup({ isOpen, onClose }: SearchPopupProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [allData, setAllData] = useState<SearchResult[]>([]);

  // Fetch all data when popup opens
  useEffect(() => {
    if (isOpen) {
      fetchAllData();
    }
  }, [isOpen]);

  const fetchAllData = async () => {
    setIsSearching(true);
    const results: SearchResult[] = [];

    try {
      // Fetch categories data
      const categoriesResponse = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/sub");
      const categoriesData = await categoriesResponse.json();
      
      if (categoriesData.subCategories) {
        categoriesData.subCategories.forEach((sub: any) => {
          results.push({
            id: sub._id,
            title: sub.metaTitle,
            description: sub.metaDescription,
            type: 'category',
            link: `/subcategory/${slugify(sub.metaTitle)}`,
            keywords: sub.keywords || []
          });
        });
      }

      // Fetch top data
      const topDataResponse = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/category/topdata");
      const topDataData = await topDataResponse.json();
      
      if (topDataData.topDataList) {
        topDataData.topDataList.forEach((item: any) => {
          results.push({
            id: item._id,
            title: item.contentTitle,
            description: item.metaDescription,
            type: 'topdata',
            link: `/topdata/${slugify(item.contentTitle)}`,
            keywords: item.keywords || []
          });
        });
      }

      // Fetch results data
      const resultsResponse = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/latest-jobs/public/results");
      const resultsData = await resultsResponse.json();
      
      if (resultsData.success && resultsData.data) {
        resultsData.data.forEach((item: any) => {
          results.push({
            id: item._id,
            title: item.contentTitle,
            description: item.contentDescription,
            type: 'result',
            link: `/results`,
            keywords: []
          });
        });
      }

      // Fetch important data
      const importantResponse = await fetch("https://7cvccltb-3110.inc1.devtunnels.ms/latest-jobs/public/importance");
      const importantData = await importantResponse.json();
      
      if (importantData.success && importantData.data) {
        importantData.data.forEach((item: any) => {
          results.push({
            id: item._id,
            title: item.contentTitle,
            description: item.contentDescription,
            type: 'important',
            link: `/important`,
            keywords: []
          });
        });
      }

      setAllData(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Utility to create slug from text
  function slugify(text: string) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  // Search function
  const performSearch = (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = allData.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(searchTerm);
      const descriptionMatch = item.description?.toLowerCase().includes(searchTerm);
      const keywordMatch = item.keywords?.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      
      return titleMatch || descriptionMatch || keywordMatch;
    });

    setSearchResults(filtered);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    performSearch(value);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'category': return 'bg-blue-100 text-blue-800';
      case 'topdata': return 'bg-green-100 text-green-800';
      case 'result': return 'bg-purple-100 text-purple-800';
      case 'important': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'category': return 'Category';
      case 'topdata': return 'Top Data';
      case 'result': return 'Result';
      case 'important': return 'Important';
      default: return 'Other';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-2xl p-2 max-w-2xl w-full mx-4 max-h-[80vh] overflow-hidden">
        {/* Close button - positioned above search box */}
        <div className="flex justify-end mb-2">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Search Input with Red Top Border */}
        <form onSubmit={handleSubmit} className="relative mb-4">
          <div className="relative">
            {/* Red top border */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 rounded-t"></div>
            
            {/* Search input field with custom styling */}
            <div className="relative border border-gray-300 rounded bg-white">
              <input
                type="text"
                placeholder="Search jobs, results, categories..."
                value={searchQuery}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 bg-transparent focus:outline-none"
                autoFocus
              />
              
              {/* Red dot below the "h" in "Search" */}
              <div className="absolute left-16 top-8 w-1 h-1 bg-red-500 rounded-full"></div>
              
              {/* Dark blue vertical line on the right */}
              <div className="absolute right-12 top-0 bottom-0 w-0.5 bg-blue-800"></div>
              
              {/* Search icon */}
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <svg 
                  className="w-6 h-6 text-gray-400" 
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
              </div>
            </div>
          </div>
        </form>

        {/* Search Results */}
        <div className="overflow-y-auto max-h-[60vh]">
          {isSearching ? (
            <div className="text-center py-8">
              <div className="text-gray-500">Loading data...</div>
            </div>
          ) : searchQuery.trim() ? (
            searchResults.length > 0 ? (
              <div className="space-y-2">
                <div className="text-sm text-gray-500 mb-3">
                  Found {searchResults.length} result(s) for "{searchQuery}"
                </div>
                {searchResults.map((result) => (
                  <Link
                    key={result.id}
                    to={result.link}
                    onClick={onClose}
                    className="block p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 mb-1">
                          {result.title}
                        </div>
                        {result.description && (
                          <div className="text-sm text-gray-600 line-clamp-2">
                            {result.description}
                          </div>
                        )}
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ml-2 ${getTypeColor(result.type)}`}>
                        {getTypeLabel(result.type)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-gray-500">No results found for "{searchQuery}"</div>
                <div className="text-sm text-gray-400 mt-2">Try different keywords</div>
              </div>
            )
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">Start typing to search...</div>
              <div className="text-sm text-gray-400 mt-2">
                Search through jobs, results, categories, and important updates
              </div>
            </div>
          )}
        </div>
        
        {/* Instructions */}
        <div className="mt-4 text-center text-gray-500 text-sm border-t pt-2">
          Press Enter to search or Escape to close
        </div>
      </div>
    </div>
  );
} 