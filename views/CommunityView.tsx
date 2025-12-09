import React from 'react';
import { Card, Button, Badge } from '../components/UIComponents';
import { CommunityPost } from '../types';
import { MessageSquare, ArrowBigUp, Share2, TrendingUp, Search, Hash, Users, Flame, Zap, MoreHorizontal, Filter, Globe, BookOpen, Layers } from 'lucide-react';
import { EvidenceBoardView } from './EvidenceBoardView';
import { TheoriesView } from './TheoriesView';
import { DebatesView } from './DebatesView';
import { OffTopicView } from './OffTopicView';

const MOCK_POSTS: CommunityPost[] = [
    {
        id: 'new-1',
        author: 'Dim_O_Njaka',
        title: 'THE BIG BANG HOAX: A Lineal Fallacy',
        content: 'New data problem created by the NASA/ESA/CSA James Webb Space Telescope: there seems to be too many large galaxies in the "early" Universe to fit the predictions of the Standard Model of cosmology ⸺ the BIG BANG Linearity. So, scientists want to invent a Supermassive DARK STAR... SILLY. PREPOSTEROUS.',
        upvotes: 1542,
        comments: 423,
        tags: ['Cosmology', 'Alternative Physics', 'Big Bang Hoax'],
        timestamp: 'Just now'
    },
    {
        id: '1',
        author: 'Sarah_Research',
        title: 'Contradictions in the Red Shift data sets from 2024',
        content: 'I have been analyzing the raw spectral data from the James Webb telescope released yesterday. The red shift anomalies in Sector 7 don\'t align with standard expansion models. Check the attached PDF for the breakdown of the variance.',
        upvotes: 342,
        comments: 89,
        tags: ['Cosmology', 'Data Analysis', 'Webb Telescope'],
        timestamp: '15m ago'
    },
    {
        id: '2',
        author: 'Quantum_Dave',
        title: 'The "Tired Light" theory deserves a second look',
        content: 'Everyone dismisses Zwicky\'s hypothesis, but if you factor in the new dark matter distribution maps, the energy loss over vast distances becomes mathematically plausible without needing an expanding universe constant.',
        upvotes: 128,
        comments: 45,
        tags: ['Theory', 'Physics'],
        timestamp: '1h ago'
    },
    {
        id: '3',
        author: 'History_Buff_99',
        title: 'New translation of the Sumerian tablets regarding celestial origins',
        content: 'Uploading a comparative linguistic analysis. The metaphor of the "Cosmic Egg" might be more literal than we thought, but interpreted through a lens of cyclical creation rather than a singular bang.',
        upvotes: 856,
        comments: 210,
        tags: ['History', 'Linguistics'],
        timestamp: '3h ago'
    },
    {
        id: '4',
        author: 'Anon_Analyst',
        title: 'Funding bias in astrophysical research grants',
        content: 'Look at this graph of grant approvals over the last decade. 98% of funding goes to projects that presuppose the Big Bang. Alternative cosmologies are being systematically starved.',
        upvotes: 1200,
        comments: 340,
        tags: ['Meta', 'Politics'],
        timestamp: '5h ago'
    }
];

const CHANNELS = [
    { name: 'General', icon: Globe },
    { name: 'Evidence Board', icon: Zap },
    { name: 'Theories', icon: Hash },
    { name: 'Debates', icon: MessageSquare },
    { name: 'Off-Topic', icon: Users },
];

const TRENDING = [
    { tag: '#WebbTelescope', count: '12.5k posts' },
    { tag: '#DarkEnergyFake', count: '8.2k posts' },
    { tag: '#AlternativePhysics', count: '5.1k posts' },
    { tag: '#CosmicBackground', count: '3.4k posts' },
];

interface CommunityViewProps {
    isSplitView?: boolean;
    onResearchTopic?: (topic: string) => void;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ isSplitView = false, onResearchTopic }) => {
    const [activeChannel, setActiveChannel] = React.useState('General');

    const renderContent = () => {
        switch (activeChannel) {
            case 'Evidence Board': return <EvidenceBoardView />;
            case 'Theories': return <TheoriesView />;
            case 'Debates': return <DebatesView />;
            case 'Off-Topic': return <OffTopicView />;
            default: return (
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">

                    {/* Feed Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl border border-pastel-gray shadow-sm">
                        <div className="w-full md:w-auto">
                            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <span className="bg-yellow-100 text-yellow-700 p-1.5 rounded-lg"><Flame size={20} /></span>
                                Top Discussions
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">What the community is researching today.</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search theories..."
                                    className="pl-10 pr-4 py-2.5 rounded-xl border border-pastel-gray bg-slate-50 w-full focus:ring-2 focus:ring-pastel-blue/50 outline-none text-sm"
                                />
                            </div>
                            <Button variant="secondary" className="px-3"><Filter size={18} /></Button>
                        </div>
                    </div>

                    {/* Posts Layout */}
                    <div className="space-y-4">
                        {MOCK_POSTS.map(post => (
                            <div key={post.id} className="bg-white rounded-2xl border border-pastel-gray p-0 hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row overflow-hidden group">
                                {/* Vote Column */}
                                <div className="bg-slate-50/50 w-full md:w-16 flex flex-row md:flex-col items-center justify-center md:justify-start p-2 md:pt-6 gap-1 md:gap-2 md:border-r border-b md:border-b-0 border-slate-100">
                                    <button className="p-1 text-slate-400 hover:bg-white hover:text-orange-500 hover:shadow-sm rounded transition-all">
                                        <ArrowBigUp size={24} />
                                    </button>
                                    <span className="text-sm font-bold text-slate-700">{post.upvotes}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-5 md:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="bg-pastel-sage/50 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-pastel-sage">
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="text-xs text-slate-400">Posted by <span className="font-medium text-slate-600 hover:underline cursor-pointer">u/{post.author}</span> • {post.timestamp}</span>
                                        </div>
                                        <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 leading-snug cursor-pointer group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-2 pt-2 flex-wrap">
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                                            <MessageSquare size={16} /> {post.comments} Comments
                                        </button>
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                                            <Share2 size={16} /> Share
                                        </button>

                                        {/* New Research Action */}
                                        <button
                                            onClick={() => onResearchTopic && onResearchTopic(post.title)}
                                            className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-pastel-blue/30 hover:bg-pastel-blue/60 border border-pastel-blue/40 px-3 py-1.5 rounded-lg transition-colors ml-auto group/research"
                                        >
                                            <BookOpen size={16} className="text-slate-500 group-hover/research:text-slate-800" />
                                            Research This
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="py-8 flex justify-center">
                        <Button variant="ghost">Load More Theories</Button>
                    </div>
                </div>
            );
        }
    };

    return (
        <div className="flex h-full w-full bg-[#F8FAFC] overflow-hidden">

            {/* Left Sidebar: Channels */}
            <div className={`flex flex-col border-r border-pastel-gray bg-white/50 backdrop-blur-sm transition-all duration-300 ${isSplitView ? 'w-[70px] items-center py-4' : 'w-64 p-4'}`}>
                {!isSplitView && (
                    <div className="mb-6 px-2">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Navigation</h2>
                    </div>
                )}

                <div className="space-y-1 w-full">
                    {CHANNELS.map((channel) => (
                        <button
                            key={channel.name}
                            onClick={() => setActiveChannel(channel.name)}
                            className={`flex items-center gap-3 w-full p-2 rounded-xl transition-colors ${activeChannel === channel.name ? 'bg-slate-100 text-slate-900 font-medium' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'} ${isSplitView ? 'justify-center' : ''}`}
                        >
                            <channel.icon size={20} />
                            {!isSplitView && <span>{channel.name}</span>}
                        </button>
                    ))}
                </div>

                {!isSplitView && (
                    <div className="mt-8 px-2">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Active Researchers</h2>
                        <div className="flex -space-x-2 overflow-hidden py-2">
                            {[1, 2, 3, 4, 5].map(i => (
                                <div key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gradient-to-br from-pastel-blue to-pastel-lavender" />
                            ))}
                            <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-500 ring-2 ring-white">+4k</div>
                        </div>
                    </div>
                )}
            </div>

            {/* Main Feed: Stretched */}
            <div className="flex-1 overflow-y-auto">
                <div className="w-full max-w-5xl mx-auto p-4 md:p-8">

                    {/* Feed Header */}
                    <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 bg-white p-6 rounded-2xl border border-pastel-gray shadow-sm">
                        <div className="w-full md:w-auto">
                            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                                <span className="bg-yellow-100 text-yellow-700 p-1.5 rounded-lg"><Flame size={20} /></span>
                                Top Discussions
                            </h1>
                            <p className="text-slate-500 text-sm mt-1">What the community is researching today.</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search theories..."
                                    className="pl-10 pr-4 py-2.5 rounded-xl border border-pastel-gray bg-slate-50 w-full focus:ring-2 focus:ring-pastel-blue/50 outline-none text-sm"
                                />
                            </div>
                            <Button variant="secondary" className="px-3"><Filter size={18} /></Button>
                        </div>
                    </div>

                    {/* Posts Layout */}
                    <div className="space-y-4">
                        {MOCK_POSTS.map(post => (
                            <div key={post.id} className="bg-white rounded-2xl border border-pastel-gray p-0 hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row overflow-hidden group">
                                {/* Vote Column */}
                                <div className="bg-slate-50/50 w-full md:w-16 flex flex-row md:flex-col items-center justify-center md:justify-start p-2 md:pt-6 gap-1 md:gap-2 md:border-r border-b md:border-b-0 border-slate-100">
                                    <button className="p-1 text-slate-400 hover:bg-white hover:text-orange-500 hover:shadow-sm rounded transition-all">
                                        <ArrowBigUp size={24} />
                                    </button>
                                    <span className="text-sm font-bold text-slate-700">{post.upvotes}</span>
                                </div>

                                {/* Content */}
                                <div className="flex-1 p-5 md:p-6">
                                    <div className="flex items-start justify-between mb-2">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            {post.tags.map(tag => (
                                                <span key={tag} className="bg-pastel-sage/50 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider border border-pastel-sage">
                                                    {tag}
                                                </span>
                                            ))}
                                            <span className="text-xs text-slate-400">Posted by <span className="font-medium text-slate-600 hover:underline cursor-pointer">u/{post.author}</span> • {post.timestamp}</span>
                                        </div>
                                        <button className="text-slate-300 hover:text-slate-600"><MoreHorizontal size={16} /></button>
                                    </div>

                                    <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-2 leading-snug cursor-pointer group-hover:text-blue-600 transition-colors">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                        {post.content}
                                    </p>

                                    <div className="flex items-center gap-2 pt-2 flex-wrap">
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                                            <MessageSquare size={16} /> {post.comments} Comments
                                        </button>
                                        <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors">
                                            <Share2 size={16} /> Share
                                        </button>

                                        {/* New Research Action */}
                                        <button
                                            onClick={() => onResearchTopic && onResearchTopic(post.title)}
                                            className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-pastel-blue/30 hover:bg-pastel-blue/60 border border-pastel-blue/40 px-3 py-1.5 rounded-lg transition-colors ml-auto group/research"
                                        >
                                            <BookOpen size={16} className="text-slate-500 group-hover/research:text-slate-800" />
                                            Research This
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="py-8 flex justify-center">
                        <Button variant="ghost">Load More Theories</Button>
                    </div>
                </div>
            </div>

            {/* Right Sidebar: Trending (Hide on Split View) */}
            {!isSplitView && (
                <div className="w-80 border-l border-pastel-gray bg-white/50 p-6 hidden xl:block">
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white mb-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-xl"></div>
                        <h3 className="font-bold text-lg mb-2 relative z-10">Premium Access</h3>
                        <p className="text-sm text-slate-300 mb-4 relative z-10">Unlock deep search on the James Webb database.</p>
                        <button className="w-full bg-white text-slate-900 py-2 rounded-lg text-xs font-bold hover:bg-slate-100 transition-colors relative z-10">Upgrade Now</button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <TrendingUp size={16} /> Trending Topics
                    </h3>
                    <div className="space-y-4">
                        {TRENDING.map((topic, i) => (
                            <div key={i} className="flex justify-between items-start group cursor-pointer">
                                <div>
                                    <p className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{topic.tag}</p>
                                    <p className="text-xs text-slate-400">{topic.count}</p>
                                </div>
                                <button className="text-slate-300 group-hover:text-slate-500">
                                    <MoreHorizontal size={14} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 border-t border-pastel-gray pt-6">
                        <p className="text-xs text-slate-400 leading-relaxed">
                            Big Bang Hoax © 2024. <br />
                            <span className="hover:underline cursor-pointer">Privacy</span> • <span className="hover:underline cursor-pointer">Terms</span> • <span className="hover:underline cursor-pointer">Content Policy</span>
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};