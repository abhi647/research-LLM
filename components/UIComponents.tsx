import React from 'react';

export const Card: React.FC<{ children: React.ReactNode; className?: string; onClick?: () => void }> = ({ children, className = '', onClick }) => (
  <div 
    onClick={onClick}
    className={`bg-white/80 backdrop-blur-sm border border-pastel-gray rounded-2xl shadow-[0_2px_8px_rgba(0,0,0,0.02)] ${className}`}
  >
    {children}
  </div>
);

export const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' }> = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 active:scale-95";
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-md shadow-slate-200 hover:shadow-lg",
    secondary: "bg-pastel-blue text-slate-700 hover:brightness-95 border border-transparent",
    ghost: "bg-transparent text-slate-500 hover:bg-slate-100",
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export const Badge: React.FC<{ children: React.ReactNode; color?: string }> = ({ children, color = 'bg-pastel-gray' }) => (
    <span className={`${color} px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold text-slate-600 border border-black/5`}>
        {children}
    </span>
);