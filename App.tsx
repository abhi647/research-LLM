import React, { useState } from 'react';
import Layout from './components/Layout';
import { LandingView } from './views/LandingView';
import { ChatView } from './views/ChatView';
import { CommunityView } from './views/CommunityView';
import { AdminView } from './views/AdminView';
import { ViewState } from './types';
import { Button, Card } from './components/UIComponents';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.LANDING);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [researchTopic, setResearchTopic] = useState<string | null>(null);

  // Mock Authentication Flow
  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentView(ViewState.COMMUNITY);
  };

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleCommunityResearch = (topic: string) => {
    setIsChatOpen(true);
    // Add "Research: " prefix to make it a clear command
    setResearchTopic(`Analyze the validity of this claim: "${topic}"`);
  };

  const renderContent = () => {
    if (currentView === ViewState.LANDING) return <LandingView onStart={() => setCurrentView(ViewState.AUTH)} />;
    
    if (currentView === ViewState.AUTH) {
         return (
          <div className="flex items-center justify-center h-full">
            <Card className="w-full max-w-md p-8 shadow-2xl shadow-pastel-lavender/50">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Welcome to Aura</h2>
                <p className="text-slate-500 mt-2">Sign in to access your research workspace.</p>
              </div>
              <div className="space-y-4">
                 <button onClick={handleLogin} className="w-full py-3 rounded-xl border border-slate-200 flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5"/>
                    <span className="text-sm font-medium text-slate-700">Continue with Google</span>
                 </button>
                 <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                    <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400">Or continue with email</span></div>
                 </div>
                 <div className="space-y-3">
                    <input type="email" placeholder="name@company.com" className="w-full p-3 rounded-xl border border-pastel-gray bg-slate-50 outline-none focus:ring-2 ring-slate-200 text-sm"/>
                    <Button onClick={handleLogin} className="w-full py-3">Sign In</Button>
                 </div>
              </div>
            </Card>
          </div>
        );
    }

    if (currentView === ViewState.ADMIN) return <AdminView />;

    // Main Workspace Layout (Community + Chat Split)
    return (
        <div className="flex h-full w-full relative overflow-hidden">
            {/* Left Panel: Chat (Expands to 50%) */}
            <div 
                className={`
                    absolute left-0 top-0 bottom-0 z-20 bg-white/50 backdrop-blur-xl border-r border-pastel-gray transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-2xl overflow-hidden
                    ${isChatOpen ? 'w-[50%] opacity-100 translate-x-0' : 'w-0 opacity-0 -translate-x-10'}
                `}
            >
                <ChatView 
                  onClose={() => setIsChatOpen(false)} 
                  startPrompt={researchTopic}
                />
            </div>

            {/* Right Panel: Community (Shrinks or Full Width) */}
            <div 
                className={`
                    h-full transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isChatOpen ? 'ml-[50%] w-[50%]' : 'ml-0 w-full'}
                `}
            >
                <CommunityView 
                  isSplitView={isChatOpen} 
                  onResearchTopic={handleCommunityResearch}
                />
            </div>
        </div>
    );
  };

  return (
    <Layout 
        activeView={currentView} 
        navigate={setCurrentView} 
        isLoggedIn={isLoggedIn}
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;