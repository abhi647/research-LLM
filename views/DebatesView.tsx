import React from 'react';
import { Swords, ThumbsUp, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';

const ARGUMENTS = [
    {
        topic: "Redshift Explanation",
        standard: "Space itself is expanding, stretching the light waves as they travel.",
        hoax: "Photons are tired/decaying or looping through a Halosphere mirage.",
        votes: { standard: 45, hoax: 128 }
    },
    {
        topic: "Galaxy Formation",
        standard: "Small irregularities grew over billions of years into galaxies (Hierarchical).",
        hoax: "Massive galaxies existed 'too early' because time is not linear/expanding.",
        votes: { standard: 32, hoax: 94 }
    },
    {
        topic: "Dark Matter",
        standard: "Invisible matter needed to explain galactic rotation curves.",
        hoax: "A fudge factor invented to save a failing model. Plasma/Electric forces explain it.",
        votes: { standard: 55, hoax: 110 }
    }
];

export const DebatesView: React.FC = () => {
    return (
        <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
            <div className="max-w-5xl mx-auto mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-3">
                    <span className="text-blue-600">Standard Model</span>
                    <Swords size={24} className="text-slate-400" />
                    <span className="text-red-500">The Hoax</span>
                </h1>
                <p className="text-slate-500">Direct head-to-head comparison of evidence.</p>
            </div>

            <div className="space-y-6 max-w-5xl mx-auto">
                {ARGUMENTS.map((arg, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col md:flex-row">

                        {/* Standard Side */}
                        <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-100 bg-blue-50/10">
                            <h3 className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <CheckCircle2 size={14} /> Consensus Theory
                            </h3>
                            <p className="text-lg font-medium text-slate-700 mb-6 min-h-[60px]">
                                "{arg.standard}"
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm">
                                    <ThumbsUp size={16} /> {arg.votes.standard}
                                </button>
                                <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                    <MessageSquare size={16} />
                                </button>
                            </div>
                        </div>

                        {/* VS Badge (Desktop) */}
                        <div className="hidden md:flex items-center justify-center w-0 relative">
                            <div className="absolute bg-white border border-slate-200 text-slate-400 text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
                                VS
                            </div>
                        </div>

                        {/* Hoax Side */}
                        <div className="flex-1 p-6 md:p-8 bg-red-50/10">
                            <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <AlertCircle size={14} /> The Critique
                            </h3>
                            <p className="text-lg font-medium text-slate-800 mb-6 min-h-[60px]">
                                "{arg.hoax}"
                            </p>
                            <div className="flex items-center gap-4">
                                <button className="flex items-center gap-2 text-slate-400 hover:text-red-600 transition-colors font-bold text-sm">
                                    <ThumbsUp size={16} /> {arg.votes.hoax}
                                </button>
                                <button className="text-slate-400 hover:text-red-600 transition-colors">
                                    <MessageSquare size={16} />
                                </button>
                            </div>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
};
