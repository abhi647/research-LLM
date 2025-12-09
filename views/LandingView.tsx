import React from 'react';
import { Button, Card } from '../components/UIComponents';
import { ViewState } from '../types';
import { ChevronRight, ShieldCheck, Zap, Database } from 'lucide-react';

interface LandingProps {
    onStart: () => void;
}

export const LandingView: React.FC<LandingProps> = ({ onStart }) => {
    return (
        <div className="flex flex-col items-center justify-center h-full overflow-y-auto">
            <div className="max-w-4xl mx-auto px-6 py-20 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pastel-blue/30 text-slate-600 text-xs font-bold uppercase tracking-widest mb-6">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                    Now with Gemini 2.5
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold text-slate-800 mb-6 tracking-tight leading-[1.1]">
                    Question Everything.<br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-700 to-slate-400">Research the Truth.</span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
                    Big Bang Hoax combines your proprietary PDF knowledge base with real-time web search and deep reasoning. Challenge established theories with data.
                </p>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-20">
                    <Button onClick={onStart} className="px-8 py-4 text-lg rounded-2xl shadow-xl shadow-slate-200 hover:shadow-2xl hover:-translate-y-1 transition-all">
                        Start Investigation <ChevronRight className="ml-2 w-5 h-5" />
                    </Button>
                    <Button variant="ghost" className="px-8 py-4 text-lg">View Demo</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                    {[
                        { icon: Database, title: "Secure RAG", desc: "Upload PDFs to build your own evidence board." },
                        { icon: Zap, title: "Instant Reasoning", desc: "Powered by Gemini 2.5 Flash for sub-second synthesis." },
                        { icon: ShieldCheck, title: "Source Verified", desc: "Every claim is cited back to your specific PDF page." }
                    ].map((feature, i) => (
                        <Card key={i} className="p-6 border-none bg-white/40 hover:bg-white/60 transition-colors">
                            <div className="w-12 h-12 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4 text-slate-700">
                                <feature.icon />
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2">{feature.title}</h3>
                            <p className="text-sm text-slate-500 leading-relaxed">{feature.desc}</p>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};