import React from 'react';
import { Card, Button, Badge } from '../components/UIComponents';
import { BookOpen, Star, AlertCircle } from 'lucide-react';

const THEORIES = [
    {
        title: "The Halosphere / Time-Lensed Photons",
        author: "Dim O. Njaka",
        year: "2025",
        summary: "Proposes that the redshift of distant galaxies is not due to expansion, but a mirage caused by photons looping through a 'Halosphere'—a chronologically stacked panorama of our own local history.",
        keyPoints: ["Space is infinite but closed-loop", "Redshift is a decay/lens effect", "No Big Bang Singularity"],
        status: "trending"
    },
    {
        title: "Tired Light",
        author: "Fritz Zwicky",
        year: "1929",
        summary: "Suggests that photons lose energy over vast distances due to interaction with matter or other mechanisms, causing a redshift without recession velocity.",
        keyPoints: ["Alternative to Doppler shift", "Static Universe", "Energy loss mechanism"],
        status: "historical"
    },
    {
        title: "Plasma Cosmology / Electric Universe",
        author: "Hannes Alfvén",
        year: "1960s",
        summary: "Argues that electricity and magnetic fields play a much larger role in the structure of the universe than gravity alone, forming filaments and circuits.",
        keyPoints: ["Scalable plasma physics", "Birkeland currents", "No Dark Matter needed"],
        status: "controversial"
    },
    {
        title: "Steady State Theory",
        author: "Hoyle, Bondi, Gold",
        year: "1948",
        summary: "Posits that the universe is eternal and unchanging on large scales. New matter is continuously created to maintain density as the universe expands.",
        keyPoints: ["Perfect Cosmological Principle", "Continuous Creation", "Displaced by CMB discovery"],
        status: "debunked"
    }
];

export const TheoriesView: React.FC = () => {
    return (
        <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
            <div className="max-w-5xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Alternative Cosmologies</h1>
                <p className="text-slate-500">Explore the theories that challenge the standard model.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                {THEORIES.map((theory, idx) => (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden">
                        <div className={`absolute top-0 left-0 w-1 h-full ${theory.status === 'trending' ? 'bg-orange-500' : 'bg-slate-200'}`}></div>

                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors">{theory.title}</h2>
                                <p className="text-sm text-slate-500">{theory.author}, {theory.year}</p>
                            </div>
                            {theory.status === 'trending' && (
                                <Badge variant="warning" className="flex items-center gap-1">
                                    <Star size={10} fill="currentColor" /> Trending
                                </Badge>
                            )}
                        </div>

                        <p className="text-slate-600 mb-6 leading-relaxed">
                            {theory.summary}
                        </p>

                        <div className="space-y-2 mb-6">
                            {theory.keyPoints.map((point, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                    {point}
                                </div>
                            ))}
                        </div>

                        <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{theory.status}</span>
                            <Button variant="secondary" className="text-xs">Read Abstract</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
