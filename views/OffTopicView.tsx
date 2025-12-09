import React from 'react';
import { Card, Button, Badge } from '../components/UIComponents';
import { Rocket, Aperture, Gamepad2, Coffee, MessageCircle } from 'lucide-react';

const TOPICS = [
    {
        icon: Rocket,
        title: "Sci-Fi Book Club: Three Body Problem",
        desc: "Does Liu Cixin's Dark Forest theory hold more water than the Standard Model?",
        comments: 342,
        color: "text-blue-500 bg-blue-50"
    },
    {
        icon: Aperture,
        title: "Alien Life & The Fermi Paradox",
        desc: "If the universe is infinite/looping, where is everybody? Discussing the Great Filter.",
        comments: 890,
        color: "text-green-500 bg-green-50"
    },
    {
        icon: Gamepad2,
        title: "Kerbal Space Program 2 Physics",
        desc: "How realistic is the orbital mechanics engine? Comparing to our Halosphere model.",
        comments: 124,
        color: "text-purple-500 bg-purple-50"
    },
    {
        icon: Coffee,
        title: "Late Night Philosophy",
        desc: "Is math invented or discovered? Free-form discussion thread.",
        comments: 56,
        color: "text-amber-500 bg-amber-50"
    }
];

export const OffTopicView: React.FC = () => {
    return (
        <div className="h-full overflow-y-auto p-4 md:p-8 bg-slate-50">
            <div className="max-w-4xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-slate-800 mb-2">Off-Topic Lounge</h1>
                <p className="text-slate-500">Take a break from the heavy physics. Chill vibes only.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                {TOPICS.map((topic, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 hover:shadow-md transition-all cursor-pointer group">
                        <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${topic.color} group-hover:scale-110 transition-transform`}>
                                <topic.icon size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-slate-800 mb-1 group-hover:text-blue-600 transition-colors">{topic.title}</h3>
                                <p className="text-sm text-slate-500 mb-4">{topic.desc}</p>
                                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                                    <MessageCircle size={14} /> {topic.comments} Comments
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
