
import React, { useState, useRef, useEffect } from 'react';
import { getLegalAdvice } from '../../services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const ChatView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hello! I am Lexi, your AI legal assistant. How can I help you navigate legal documents or terms today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await getLegalAdvice(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I encountered an error processing your request. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[70vh] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden animate-in fade-in duration-500">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-robot"></i>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Lexi AI</h3>
            <span className="flex items-center gap-1 text-[10px] text-green-500 font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              Online
            </span>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          <i className="fa-solid fa-ellipsis-vertical"></i>
        </button>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-4 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-tr-none' 
                : 'bg-white border border-slate-100 text-slate-700 shadow-sm rounded-tl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-tl-none flex gap-2">
              <span className="w-2 h-2 bg-indigo-200 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-indigo-300 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2">
          <input 
            type="text" 
            placeholder="Ask anything (e.g., 'Explain this NDA clause'...)"
            className="flex-1 px-4 py-3 bg-slate-50 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="w-12 h-12 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50"
          >
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2 uppercase tracking-tighter">AI can make mistakes. Verify important legal matters with professional council.</p>
      </div>
    </div>
  );
};

export default ChatView;
