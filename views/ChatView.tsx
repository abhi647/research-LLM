import React, { useState, useRef, useEffect } from 'react';
import { Card, Button, Badge } from '../components/UIComponents';
import { ChatMessage, Document, Source } from '../types';
import { generateRAGResponse } from '../services/geminiService';
import { Upload, FileText, Send, Sparkles, Globe, BookOpen, Mic, X, ChevronDown, Paperclip, BrainCircuit, Lightbulb, Zap, Briefcase, FileSearch } from 'lucide-react';

const MOCK_DOCS: Document[] = [
    { id: 'new-1', title: 'The_Big_Bang_Hoax_Njaka_2025.pdf', size: '3.5MB', uploadDate: 'Just now', status: 'processed' },
    { id: '1', title: 'Q3_Financial_Report.pdf', size: '2.4MB', uploadDate: '2h ago', status: 'processed' },
    { id: '2', title: 'Competitor_Analysis_2024.pdf', size: '1.1MB', uploadDate: '5h ago', status: 'processed' },
    { id: '3', title: 'Product_Roadmap_v2.pdf', size: '800KB', uploadDate: '1d ago', status: 'processed' },
];

const SUGGESTIONS = [
    { icon: FileSearch, title: "Analyze Red Shift Data", desc: "Look for anomalies in sector 7" },
    { icon: BrainCircuit, title: "Review Big Bang Hoax", desc: "Analyze Dim O. Njaka's arguments" },
    { icon: BrainCircuit, title: "Deep Research: Tired Light", desc: "Cross reference Zwicky's theories" },
    { icon: Zap, title: "Funding Bias Check", desc: "Analyze grant approvals for non-BB theories" },
    { icon: Lightbulb, title: "Cosmic Egg Theory", desc: "Correlate ancient texts with CMB data" },
];

interface ChatViewProps {
    onClose: () => void;
    startPrompt?: string | null;
}

export const ChatView: React.FC<ChatViewProps> = ({ onClose, startPrompt }) => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [selectedModel, setSelectedModel] = useState<'flash' | 'pro' | 'deep'>('flash');
    const [selectedPersona, setSelectedPersona] = useState<'analyst' | 'creative'>('analyst');
    const [activeContext, setActiveContext] = useState<Source | null>(null);
    const [isDocsExpanded, setIsDocsExpanded] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);
    const processedPromptRef = useRef<string | null>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    // Handle incoming startPrompt from Community View
    useEffect(() => {
        if (startPrompt && startPrompt !== processedPromptRef.current) {
            processedPromptRef.current = startPrompt;
            handleSend(startPrompt);
        }
    }, [startPrompt]);

    const handleSend = async (text: string = input) => {
        if (!text.trim()) return;

        const userMsg: ChatMessage = {
            id: Date.now().toString(),
            role: 'user',
            content: text,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');

        const loadingMsgId = (Date.now() + 1).toString();
        const loadingMsg: ChatMessage = {
            id: loadingMsgId,
            role: 'model',
            content: '',
            timestamp: Date.now(),
            ragStatus: 'searching_pdf'
        };
        setMessages(prev => [...prev, loadingMsg]);

        // Trigger RAG flow
        const responseText = await generateRAGResponse(
            userMsg.content,
            MOCK_DOCS.map(d => d.title),
            (status) => {
                setMessages(prev => prev.map(m => m.id === loadingMsgId ? { ...m, ragStatus: status } : m));
            }
        );

        setMessages(prev => prev.map(m =>
            m.id === loadingMsgId ? {
                ...m,
                content: responseText,
                ragStatus: 'complete',
                sources: [
                    { id: 's1', title: 'Q3_Financial_Report.pdf', type: 'pdf', snippet: 'Anomaly detected in high-z galaxy formation rates.', page: 12 },
                    { id: 's2', title: 'Arxiv Pre-print', type: 'web', snippet: 'New observations challenge standard model timelines.', url: 'https://arxiv.org' }
                ]
            } : m
        ));
    };

    return (
        <div className="flex flex-col h-full w-full bg-white/60 relative">
            {/* Header: Persona & Docs Toggle */}
            <div className="h-14 border-b border-pastel-gray flex items-center justify-between px-4 bg-white/80 backdrop-blur-md z-10 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <button
                            className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors"
                            onClick={() => setSelectedPersona(selectedPersona === 'analyst' ? 'creative' : 'analyst')}
                        >
                            {selectedPersona === 'analyst' ? <Briefcase size={14} className="text-blue-500" /> : <Sparkles size={14} className="text-purple-500" />}
                            {selectedPersona === 'analyst' ? 'Research Analyst' : 'Creative Partner'}
                            <ChevronDown size={12} className="text-slate-400" />
                        </button>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsDocsExpanded(!isDocsExpanded)}
                        className={`flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-full border transition-all ${isDocsExpanded ? 'bg-pastel-blue border-pastel-blue text-slate-800' : 'bg-transparent border-pastel-gray text-slate-500 hover:text-slate-700'}`}
                    >
                        <FileText size={12} />
                        {MOCK_DOCS.length} Docs
                    </button>
                    <button onClick={onClose} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg text-slate-400 transition-colors">
                        <X size={16} />
                    </button>
                </div>
            </div>

            {/* Collapsible Docs Drawer */}
            <div className={`overflow-hidden transition-all duration-300 bg-slate-50 border-b border-pastel-gray shrink-0 ${isDocsExpanded ? 'max-h-48' : 'max-h-0'}`}>
                <div className="p-4 flex gap-3 overflow-x-auto">
                    <div className="flex-shrink-0 w-32 h-24 border-2 border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:bg-white hover:border-blue-400 hover:text-blue-500 cursor-pointer transition-colors">
                        <Upload size={20} />
                        <span className="text-[10px] font-bold mt-2 uppercase">Upload PDF</span>
                    </div>
                    {MOCK_DOCS.map(doc => (
                        <div key={doc.id} className="flex-shrink-0 w-48 p-3 bg-white border border-pastel-gray rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer group">
                            <div className="flex items-start justify-between mb-2">
                                <div className="p-1.5 bg-red-50 text-red-500 rounded-lg group-hover:scale-110 transition-transform">
                                    <FileText size={16} />
                                </div>
                                <span className="text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded font-medium">Indexed</span>
                            </div>
                            <p className="text-xs font-semibold text-slate-700 truncate">{doc.title}</p>
                            <p className="text-[10px] text-slate-400 mt-1">{doc.size} • {doc.uploadDate}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6" ref={scrollRef}>
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center opacity-0 animate-fade-in">
                        <div className="w-16 h-16 bg-gradient-to-tr from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                            <BrainCircuit size={32} className="text-slate-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-800 mb-2">Hello, Researcher</h3>
                        <p className="text-slate-500 text-center max-w-sm mb-8">
                            I'm ready to assist with your investigation. I have access to {MOCK_DOCS.length} documents and live web search.
                        </p>

                        <div className="grid grid-cols-2 gap-3 w-full max-w-md">
                            {SUGGESTIONS.map((s, i) => (
                                <button
                                    key={i}
                                    onClick={() => handleSend(s.title)}
                                    className="p-4 bg-white border border-pastel-gray rounded-xl text-left hover:border-pastel-blue hover:shadow-md transition-all group active:scale-95"
                                >
                                    <s.icon size={18} className="text-slate-400 mb-2 group-hover:text-blue-500 transition-colors" />
                                    <div className="text-sm font-semibold text-slate-700">{s.title}</div>
                                    <div className="text-xs text-slate-400">{s.desc}</div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] ${msg.role === 'user' ? 'ml-12' : 'mr-12'}`}>
                                <div className={`p-5 rounded-2xl shadow-sm border ${msg.role === 'user'
                                        ? 'bg-slate-900 text-white border-transparent rounded-tr-sm'
                                        : 'bg-white border-pastel-gray text-slate-700 rounded-tl-sm'
                                    }`}>
                                    <div className="leading-relaxed whitespace-pre-wrap text-sm" dangerouslySetInnerHTML={{ __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\n/g, '<br/>') }} />

                                    {/* RAG Status */}
                                    {msg.ragStatus && msg.ragStatus !== 'complete' && (
                                        <div className="mt-3 space-y-1.5">
                                            <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider transition-all ${msg.ragStatus === 'searching_pdf' ? 'text-blue-500' : 'text-slate-300'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full bg-blue-500 ${msg.ragStatus === 'searching_pdf' ? 'animate-pulse' : ''}`} />
                                                Scanning Knowledge Base
                                            </div>
                                            <div className={`flex items-center gap-2 text-[10px] uppercase font-bold tracking-wider transition-all ${msg.ragStatus === 'searching_web' ? 'text-purple-500' : 'text-slate-300'}`}>
                                                <div className={`w-1.5 h-1.5 rounded-full bg-purple-500 ${msg.ragStatus === 'searching_web' ? 'animate-pulse' : ''}`} />
                                                Web Verification
                                            </div>
                                        </div>
                                    )}

                                    {/* Sources */}
                                    {msg.sources && (
                                        <div className="mt-4 pt-3 border-t border-dashed border-gray-200/20 flex flex-wrap gap-2">
                                            {msg.sources.map(source => (
                                                <button
                                                    key={source.id}
                                                    onClick={() => setActiveContext(source)}
                                                    className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide flex items-center gap-1.5 transition-all ${msg.role === 'user' ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                                        }`}
                                                >
                                                    {source.type === 'pdf' ? <BookOpen size={10} /> : <Globe size={10} />}
                                                    {source.title.substring(0, 15)}...
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Advanced Input Bar */}
            <div className="p-4 bg-white border-t border-pastel-gray relative shrink-0">
                <div className="max-w-3xl mx-auto">
                    {/* Tool Bar */}
                    <div className="flex items-center justify-between mb-2 px-1">
                        <div className="flex gap-1">
                            <button
                                onClick={() => setSelectedModel('flash')}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${selectedModel === 'flash' ? 'bg-blue-100 text-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Fast
                            </button>
                            <button
                                onClick={() => setSelectedModel('pro')}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors ${selectedModel === 'pro' ? 'bg-purple-100 text-purple-700' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                Reasoning
                            </button>
                            <button
                                onClick={() => setSelectedModel('deep')}
                                className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 ${selectedModel === 'deep' ? 'bg-orange-100 text-orange-700' : 'text-slate-400 hover:text-slate-600'}`}
                            >
                                <BrainCircuit size={10} /> Deep Research
                            </button>
                        </div>
                    </div>

                    <div className="relative bg-slate-50 rounded-2xl border border-pastel-gray hover:border-pastel-blue transition-colors focus-within:ring-2 focus-within:ring-pastel-blue/50 focus-within:border-pastel-blue">
                        <textarea
                            rows={1}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                            placeholder={selectedPersona === 'analyst' ? "Ask a research question..." : "What are we creating today?"}
                            className="w-full p-3 pr-24 bg-transparent border-none outline-none text-slate-700 placeholder:text-slate-400 text-sm resize-none"
                            style={{ minHeight: '50px' }}
                        />
                        <div className="absolute right-2 bottom-2 flex items-center gap-1">
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                                <Paperclip size={16} />
                            </button>
                            <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
                                <Mic size={16} />
                            </button>
                            <button
                                onClick={() => handleSend()}
                                disabled={!input.trim()}
                                className="p-2 rounded-lg bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-50 transition-colors shadow-md active:scale-95"
                            >
                                <Send size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="text-center mt-2 flex items-center justify-center gap-2">
                        <span className="text-[10px] text-slate-400">Powered by Gemini 2.5 • Private Workspace</span>
                    </div>
                </div>
            </div>
        </div>
    );
};