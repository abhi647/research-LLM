import React, { ReactNode } from 'react';
import { ViewState } from '../types';

interface LayoutProps {
  children: ReactNode;
  activeView: ViewState;
  navigate: (view: ViewState) => void;
  isLoggedIn: boolean;
  isChatOpen: boolean;
  toggleChat: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, navigate, isLoggedIn, isChatOpen, toggleChat }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#F8FAFC] overflow-hidden text-pastel-text selection:bg-pastel-blue selection:text-pastel-dark font-sans">
      {/* Sci-fi Grid Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(128, 128, 128, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(128, 128, 128, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: '32px 32px'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/80 via-transparent to-transparent" />
      </div>

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-pastel-gray bg-white/60 backdrop-blur-md px-6 flex items-center justify-between transition-all duration-300">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate(ViewState.LANDING)}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg shadow-slate-200/50 group hover:scale-105 transition-transform overflow-hidden relative">
             {/* Big Bang Hoax Logo */}
             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-white relative z-10 group-hover:scale-110 transition-transform duration-500">
                <path d="M12 2L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.92993 4.92999L19.0721 19.0721" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                <path d="M19.0721 4.92999L4.92993 19.0721" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
                <circle cx="12" cy="12" r="4" fill="currentColor" className="group-hover:scale-125 transition-transform duration-300"/>
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="0.5" className="animate-pulse-soft"/>
            </svg>
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Big Bang Hoax</span>
        </div>

        <div className="flex items-center gap-6">
            {isLoggedIn && (
                <>
                <button 
                    onClick={toggleChat}
                    className={`flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-full transition-all duration-300 border ${isChatOpen ? 'bg-slate-900 text-white border-slate-900 shadow-md' : 'bg-white text-slate-600 border-pastel-gray hover:border-slate-300 hover:text-slate-900'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                    Research Assistant
                </button>
                <button 
                    onClick={() => navigate(ViewState.COMMUNITY)}
                    className={`text-sm font-medium transition-colors ${activeView === ViewState.COMMUNITY && !isChatOpen ? 'text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    Community
                </button>
                <button 
                    onClick={() => navigate(ViewState.ADMIN)}
                    className={`text-sm font-medium transition-colors ${activeView === ViewState.ADMIN ? 'text-slate-900' : 'text-slate-500 hover:text-slate-800'}`}
                >
                    Admin
                </button>
                </>
            )}
        </div>

        <div className="flex items-center gap-3">
          {!isLoggedIn ? (
             <button 
                onClick={() => navigate(ViewState.AUTH)}
                className="px-4 py-2 rounded-full bg-slate-900 text-white text-sm font-medium hover:bg-slate-800 transition-all shadow-lg shadow-slate-200"
            >
                Sign In
            </button>
          ) : (
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-pastel-sage to-pastel-blue border-2 border-white shadow-sm flex items-center justify-center text-xs font-bold text-slate-700 cursor-pointer">
                JD
            </div>
          )}
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 pt-16 h-screen flex flex-col">
        {children}
      </main>
    </div>
  );
};

export default Layout;