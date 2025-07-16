import React, { useState, useEffect, useRef } from "react";
import { Mic, MicOff, Send, Volume2 } from "lucide-react"; // Add Volume2 import

// Add TypeScript declarations for Web Speech API
declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface SystemPromptResponse {
  success: boolean;
  data: {
    _id: string;
    systemPrompt: string;
    description: string;
    isActive: boolean;
    createdBy: {
      _id: string;
      name: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  };
}

const AiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm your AI assistant powered by Gemini. How can I help you with Sarkari jobs and results today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false); // NEW: Voice listening state
  const [isSpeaking, setIsSpeaking] = useState(false); // NEW: Voice speaking state
  const [speakingMessageId, setSpeakingMessageId] = useState<string | null>(null); // NEW: Track which message is speaking
  const [indianFemaleVoice, setIndianFemaleVoice] = useState<SpeechSynthesisVoice | null>(null); // NEW: Voice state
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); // NEW: Speech recognition ref

  const GEMINI_API_KEY = "AIzaSyDOIvVe16RTrp_lYsE9WwS7WIJsOFiu4RA";
  const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
  const SYSTEM_PROMPT_URL = "https://7cvccltb-3110.inc1.devtunnels.ms/admin/users/system-prompt";

  // NEW: Voice synthesis function
  const speak = (text: string, messageId?: string) => {
    if (!text || typeof window.speechSynthesis === 'undefined') {
      console.error("Speech synthesis not supported or no text provided.");
      return;
    }
    
    const getBestVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return null;
      let bestVoice = voices.find(voice => voice.lang === 'hi-IN' && voice.name.includes('Google'));
      if (bestVoice) return bestVoice;
      return voices.find(voice => voice.lang === 'hi-IN') || null;
    };
    
    let voiceToUse = indianFemaleVoice;
    if (!voiceToUse) {
      voiceToUse = getBestVoice();
      setIndianFemaleVoice(voiceToUse);
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voiceToUse) {
      utterance.voice = voiceToUse;
    }
    utterance.lang = 'hi-IN';
    utterance.pitch = 1.0;
    utterance.rate = 0.95;
    utterance.onstart = () => {
      setIsSpeaking(true);
      if (messageId) setSpeakingMessageId(messageId);
    };
    utterance.onend = () => {
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };
    utterance.onerror = (e) => {
      console.error("An error occurred during speech synthesis:", e);
      setIsSpeaking(false);
      setSpeakingMessageId(null);
    };
    window.speechSynthesis.speak(utterance);
  };

  // NEW: Handle speak button click for specific message
  const handleSpeakMessage = (messageText: string, messageId: string) => {
    speak(messageText, messageId);
  };

  // NEW: Setup voice APIs
  useEffect(() => {
    const setupApis = () => {
      if (typeof window.speechSynthesis !== 'undefined') {
        window.speechSynthesis.onvoiceschanged = () => {
          const voices = window.speechSynthesis.getVoices();
          const selectedVoice = voices.find(voice => voice.lang === 'hi-IN' && voice.name.includes('Google'));
          setIndianFemaleVoice(selectedVoice || voices.find(voice => voice.lang === 'hi-IN') || null);
        };
      }
      
      if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.lang = 'hi-IN';
        recognition.interimResults = false;
        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInputMessage(transcript);
          handleSendMessage(transcript);
        };
        recognitionRef.current = recognition;
      }
    };
    setupApis();
  }, []);

  // NEW: Handle microphone click
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Your browser doesn't support voice recognition.");
      return;
    }
    
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      window.speechSynthesis.cancel();
      setInputMessage('');
      recognitionRef.current.start();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchSystemPrompt = async (): Promise<string> => {
    try {
      console.log("Fetching system prompt from:", SYSTEM_PROMPT_URL);
      
      const response = await fetch(SYSTEM_PROMPT_URL);
      console.log("System prompt response status:", response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: SystemPromptResponse = await response.json();
      console.log("System prompt API response:", data);
      
      if (data.success && data.data && data.data.systemPrompt) {
        console.log("Retrieved system prompt:", data.data.systemPrompt);
        return data.data.systemPrompt;
      } else {
        console.log("Invalid system prompt response, using fallback");
        return "You are a helpful assistant for Sarkari Result website. Help users with government jobs, exam results, admit cards, and other Sarkari-related topics.";
      }
    } catch (error) {
      console.error('Error fetching system prompt:', error);
      return "You are a helpful assistant for Sarkari Result website. Help users with government jobs, exam results, admit cards, and other Sarkari-related topics.";
    }
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    try {
      // First, fetch the latest system prompt
      console.log("Fetching fresh system prompt for user message:", userMessage);
      const systemPrompt = await fetchSystemPrompt();
      
      console.log("Current system prompt:", systemPrompt);
      console.log("User message:", userMessage);
      
      // Combine system prompt with user message
      const combinedPrompt = `${systemPrompt}\n\nUser Question: ${userMessage}\n\nPlease provide a helpful response:`;
      
      console.log("Combined prompt for Gemini:", combinedPrompt);

      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: combinedPrompt
                }
              ]
            }
          ]
        })
      });

      console.log("Gemini API response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Gemini API response:", data);
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0]) {
        const geminiResponse = data.candidates[0].content.parts[0].text;
        console.log("Gemini response text:", geminiResponse);
        return geminiResponse;
      } else {
        throw new Error('Invalid response format from Gemini API');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      return generateFallbackResponse(userMessage);
    }
  };

  const generateFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("job") || lowerMessage.includes("vacancy")) {
      return "I can help you find the latest government job vacancies! You can check our 'Latest Jobs' section or search for specific job categories. What type of job are you looking for?";
    }
    
    if (lowerMessage.includes("result") || lowerMessage.includes("exam")) {
      return "For exam results, you can check our 'Results' section. We regularly update with the latest exam results from various government departments. Which exam result are you looking for?";
    }
    
    if (lowerMessage.includes("admit card")) {
      return "Admit cards are available in our 'Admit Card' section. Make sure to download and print your admit card before the exam date. Do you need help finding a specific admit card?";
    }
    
    if (lowerMessage.includes("syllabus")) {
      return "You can find detailed syllabi for various government exams in our 'Syllabus' section. Which exam syllabus are you interested in?";
    }
    
    if (lowerMessage.includes("answer key")) {
      return "Answer keys are posted in our 'Answer Key' section after exams. This helps you verify your answers. Which exam's answer key are you looking for?";
    }
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! Welcome to Sarkari Result. I'm here to help you with government jobs, exam results, admit cards, and more. What would you like to know?";
    }
    
    if (lowerMessage.includes("help")) {
      return "I can help you with:\n• Latest government job vacancies\n• Exam results and answer keys\n• Admit card downloads\n• Syllabus information\n• Application procedures\nWhat specific information do you need?";
    }
    
    return "Thank you for your message! I'm here to help you with government jobs, exam results, admit cards, and other Sarkari-related information. You can also browse our website sections for detailed information. Is there anything specific you'd like to know?";
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputMessage;
    if (!messageText.trim() || isTyping) return;

    console.log("User sending message:", messageText);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call Gemini API with fresh system prompt and user message
      const aiResponse = await callGeminiAPI(messageText);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // NEW: Speak the AI response
      speak(aiResponse, aiMessage.id);
    } catch (error) {
      console.error('Error in handleSendMessage:', error);
      // Fallback response
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateFallbackResponse(messageText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, fallbackMessage]);
      
      // NEW: Speak the fallback response
      speak(fallbackMessage.text, fallbackMessage.id);
    } finally {
      setIsTyping(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <>
      {/* Ultra Premium Floating AI Chat Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 text-white rounded-2xl shadow-2xl flex items-center justify-center transition-all duration-500 z-40 transform hover:scale-110 hover:shadow-3xl group backdrop-blur-sm"
        title="AI Chat Assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 rounded-2xl animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl"></div>
        <svg className="w-7 h-7 relative z-10 group-hover:rotate-12 transition-transform duration-500 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full animate-ping shadow-lg"></div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full shadow-lg"></div>
      </button>

      {/* Ultra Premium AI Chat Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fadeIn">
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl w-full max-w-md h-[600px] flex flex-col overflow-hidden border border-white/20 animate-slideUp">
            {/* Ultra Premium Header */}
            <div className="bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white p-6 rounded-t-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-16 -translate-x-16 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-white/5 rounded-full -translate-x-12 -translate-y-12 animate-pulse" style={{ animationDelay: '2s' }}></div>
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center border border-white/30 shadow-lg">
                    <svg className="w-7 h-7 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl drop-shadow-lg">AI Assistant</h3>
                    <p className="text-sm opacity-90 flex items-center">
                      <span className="w-3 h-3 bg-emerald-400 rounded-full mr-2 animate-pulse shadow-lg"></span>
                      Powered by Gemini - Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-gray-200 transition-all duration-300 p-3 hover:bg-white/10 rounded-2xl backdrop-blur-sm"
                >
                  <svg className="w-6 h-6 drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Ultra Premium Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-gray-50/80 via-white/90 to-gray-50/80 backdrop-blur-sm">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'} animate-fadeInUp`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-5 py-4 rounded-3xl shadow-lg backdrop-blur-sm ${
                      message.isUser
                        ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-indigo-500/25'
                        : 'bg-white/90 text-gray-800 border border-gray-200/50 shadow-gray-500/10'
                    }`}
                  >
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</div>
                    <div className={`flex items-center justify-between mt-3 ${
                      message.isUser ? 'text-indigo-100' : 'text-gray-500'
                    }`}>
                      <span className="text-xs">{formatTime(message.timestamp)}</span>
                      
                      {/* NEW: Speak button for AI messages */}
                      {!message.isUser && (
                        <button
                          onClick={() => handleSpeakMessage(message.text, message.id)}
                          className={`ml-2 p-1.5 rounded-full transition-all duration-300 ${
                            speakingMessageId === message.id
                              ? 'bg-red-500 text-white animate-pulse'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-600 hover:text-gray-800'
                          }`}
                          title={speakingMessageId === message.id ? "Stop speaking" : "Listen to message"}
                        >
                          {speakingMessageId === message.id ? (
                            <Volume2 size={14} />
                          ) : (
                            <Volume2 size={14} />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Ultra Premium Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start animate-fadeInUp">
                  <div className="bg-white/90 text-gray-800 max-w-xs lg:max-w-md px-5 py-4 rounded-3xl shadow-lg border border-gray-200/50 backdrop-blur-sm">
                    <div className="flex items-center space-x-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-xs text-gray-600 font-medium">Gemini is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Ultra Premium Input Form */}
            <div className="p-6 border-t border-gray-200/50 bg-white/95 backdrop-blur-sm">
              <form onSubmit={handleFormSubmit} className="flex space-x-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Ask me about Sarkari jobs, results, admit cards..."
                    className="w-full px-5 py-4 border border-gray-200/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 bg-white/80 focus:bg-white backdrop-blur-sm shadow-sm"
                    disabled={isTyping}
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                
                {/* NEW: Voice Input Button */}
                <button
                  type="button"
                  onClick={handleMicClick}
                  className={`px-4 py-4 rounded-2xl transition-all duration-300 ${
                    isListening 
                      ? 'bg-red-500 text-white animate-pulse' 
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                  }`}
                  disabled={isTyping}
                  title={isListening ? "Stop listening" : "Voice input"}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isTyping}
                  className="px-6 py-4 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 text-white rounded-2xl hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Send className="w-5 h-5 drop-shadow-lg" />
                </button>
              </form>
              
              {/* Ultra Premium Quick Actions */}
              <div className="mt-4 flex flex-wrap gap-2">
                {['Jobs', 'Results', 'Admit Card', 'Syllabus'].map((action) => (
                  <button
                    key={action}
                    onClick={() => setInputMessage(`Tell me about ${action.toLowerCase()}`)}
                    className="px-4 py-2 text-xs bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-700 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-sm hover:shadow-md border border-gray-200/50"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AiChat; 