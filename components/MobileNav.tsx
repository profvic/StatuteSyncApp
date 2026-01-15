
import React from 'react';
import { AppView } from '../types';

interface MobileNavProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentView, onViewChange }) => {
  const tabs = [
    { view: AppView.DASHBOARD, icon: 'fa-house', label: 'Home' },
    { view: AppView.LIBRARY, icon: 'fa-book-open', label: 'Docs' },
    { view: AppView.VERIFY, icon: 'fa-shield-halved', label: 'Verify' },
    { view: AppView.MARKETPLACE, icon: 'fa-users', label: 'Market' },
    { view: AppView.PROFILE, icon: 'fa-user', label: 'Me' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-slate-200 z-50 pb-safe">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.view}
            onClick={() => onViewChange(tab.view)}
            className={`flex flex-col items-center justify-center gap-1 w-full h-full transition-all active:scale-90 ${
              currentView === tab.view ? 'text-indigo-600' : 'text-slate-400'
            }`}
          >
            <i className={`fa-solid ${tab.icon} text-lg`}></i>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{tab.label}</span>
            {currentView === tab.view && (
              <span className="w-1 h-1 bg-indigo-600 rounded-full mt-0.5"></span>
            )}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default MobileNav;
