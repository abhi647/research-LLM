import React from 'react';
import { FileText, TrendingUp, AlertTriangle, Infinity, Quote, Microscope, Layers } from 'lucide-react';
import { Card } from '../components/UIComponents';

export const EvidenceBoardView: React.FC = () => {
    return (
        <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <Microscope className="text-purple-600" /> Evidence Board
                </h1>
                <p className="text-slate-500">Visualizing the anomalies and contradictions in the Standard Model.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-3 gap-4 h-auto md:h-[800px]">

                {/* 1. Main Feature: The Halosphere (Large) */}
                <div className="md:col-span-2 md:row-span-2 relative group overflow-hidden rounded-3xl border border-slate-200 shadow-sm bg-black">
                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-black z-0"></div>
                    <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at center, white 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                    <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4">
                                <Infinity size={14} /> Core Concept
                            </div>
                            <h2 className="text-4xl font-bold text-white mb-4 leading-tight">The Halosphere <br />Mirage</h2>
                            <p className="text-slate-300 max-w-md leading-relaxed">
                                A shroud of redshifted, spaceless but timeless mirage that seamlessly marks the end of our observable Universe. Photons are not stretching in an expanding space, but looping in a chronologically stacked panorama.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-400">13.9B</div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Light Years Radius</div>
                            </div>
                            <div className="w-px h-8 bg-white/20"></div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-400">∞</div>
                                <div className="text-[10px] text-slate-400 uppercase tracking-widest">Closed Loop</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Key Stat: Redshift Anomaly */}
                <div className="md:col-span-1 md:row-span-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                        <div className="p-2 bg-red-100 text-red-600 rounded-xl">
                            <TrendingUp size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-400 uppercase">JADES-GS-z14-0</span>
                    </div>
                    <div>
                        <div className="text-4xl font-bold text-slate-800 mb-1">14.32</div>
                        <div className="text-sm font-medium text-red-500 flex items-center gap-1">
                            <AlertTriangle size={14} /> Too massive, too early
                        </div>
                        <p className="text-xs text-slate-400 mt-2">
                            Current record-holder. Contradicts hierarchical formation models.
                        </p>
                    </div>
                </div>

                {/* 3. Quote Card */}
                <div className="md:col-span-1 md:row-span-2 bg-amber-50 rounded-3xl p-8 border border-amber-100 flex flex-col justify-center relative overflow-hidden">
                    <Quote className="absolute top-4 right-4 text-amber-200" size={80} />
                    <div className="relative z-10">
                        <p className="text-xl font-serif italic text-amber-900 leading-relaxed mb-6">
                            "So, scientists want to invent a Supermassive DARK STAR, a farce that emits the equivalent light of an entire galaxy... SILLY. PREPOSTEROUS."
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-200 flex items-center justify-center text-amber-700 font-bold">DN</div>
                            <div>
                                <div className="font-bold text-amber-900 text-sm">Dim O. Njaka</div>
                                <div className="text-xs text-amber-700/70">Author, The Big Bang Hoax</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 4. Graph Placeholder */}
                <div className="md:col-span-2 md:row-span-1 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex items-center gap-8">
                    <div className="flex-1">
                        <h3 className="font-bold text-slate-700 mb-2">Galaxy Size vs Age Prediction</h3>
                        <p className="text-sm text-slate-500 mb-4">Standard model predicts smaller, irregular galaxies at high redshift. JWST observes fully formed massive galaxies.</p>
                        <div className="flex gap-2">
                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">Standard Model</span>
                            <span className="px-2 py-1 bg-red-100 text-red-600 text-xs font-bold rounded">Observed (JWST)</span>
                        </div>
                    </div>
                    <div className="h-32 flex-1 bg-slate-50 rounded-xl relative overflow-hidden flex items-end justify-around px-4 pb-4">
                        {/* Mock Bar Chart */}
                        <div className="w-8 bg-slate-300 h-[40%] rounded-t-sm"></div>
                        <div className="w-8 bg-slate-300 h-[50%] rounded-t-sm"></div>
                        <div className="w-8 bg-red-400 h-[90%] rounded-t-sm relative group">
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                                Impossible Mass
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. Document Link */}
                <div className="md:col-span-1 md:row-span-1 bg-blue-50 rounded-3xl p-6 border border-blue-100 flex flex-col justify-center items-center text-center cursor-pointer hover:bg-blue-100 transition-colors group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-500 mb-3 shadow-sm group-hover:scale-110 transition-transform">
                        <FileText size={24} />
                    </div>
                    <h3 className="font-bold text-blue-900 text-sm">Read Full Paper</h3>
                    <p className="text-xs text-blue-700 mt-1">The Big Bang Hoax (2025)</p>
                </div>

                {/* 6. Layers */}
                <div className="md:col-span-1 md:row-span-1 bg-purple-50 rounded-3xl p-6 border border-purple-100 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-purple-800 font-bold mb-2">
                            <Layers size={18} /> Nested Gravity
                        </div>
                        <p className="text-xs text-purple-700 leading-snug">
                            We sit in 7 nested gravitational wells, acting like a Russian Matryoshka doll lens.
                        </p>
                    </div>
                    <div className="flex -space-x-2 mt-4">
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-purple-200 flex items-center justify-center text-[10px] text-purple-800 font-bold" style={{ opacity: 1 - (i * 0.15) }}>
                                G{i}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};
