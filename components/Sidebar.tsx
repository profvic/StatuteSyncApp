
import React from 'react';
import { AppView, UserRole } from '../types';

interface SidebarProps {
  currentView: AppView;
  onViewChange: (view: AppView) => void;
  isOpen: boolean;
  onToggle: () => void;
  userRole: UserRole;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, isOpen, onToggle, userRole }) => {
  const menuItems = [
    { view: AppView.DASHBOARD, icon: 'fa-chart-pie', label: 'Dashboard' },
    { view: AppView.LIBRARY, icon: 'fa-book-open', label: 'Library' },
    { view: AppView.MARKETPLACE, icon: 'fa-users', label: 'Marketplace' },
    { view: AppView.VERIFY, icon: 'fa-shield-halved', label: 'LexVerify' },
    { view: AppView.HISTORY, icon: 'fa-clock-rotate-left', label: 'Activity' },
    { view: AppView.CHAT, icon: 'fa-message', label: 'AI Assistant' },
  ];

  if (userRole === 'ADMIN') {
    menuItems.push({ view: AppView.ADMIN, icon: 'fa-screwdriver-wrench', label: 'Admin Panel' });
  }

  return (
    <aside className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 transition-all duration-300 z-50 shadow-sm ${isOpen ? 'w-64' : 'w-20'}`}>
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
          <i className="fa-solid fa-gavel"></i>
        </div>
        {isOpen && <span className="text-xl font-bold tracking-tight text-slate-800">LexGuard</span>}
      </div>

      <nav className="mt-6 px-4 flex flex-col gap-2">
        {menuItems.map((item) => (
          <button
            key={item.view}
            onClick={() => onViewChange(item.view)}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 ${
              currentView === item.view 
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-[1.02]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg w-6 text-center`}></i>
            {isOpen && <span className="font-medium">{item.label}</span>}
          </button>
        ))}
      </nav>

      <div className="absolute bottom-6 left-0 w-full px-4">
        <button
          onClick={() => onViewChange(AppView.PROFILE)}
          className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
            currentView === AppView.PROFILE 
              ? 'bg-slate-100 text-indigo-600' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <i className="fa-solid fa-circle-user text-lg w-6 text-center"></i>
          {isOpen && <span className="font-medium">Profile</span>}
        </button>
      </div>

      <button 
        onClick={onToggle}
        className="absolute bottom-20 right-[-12px] w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-600 transition-all z-10 shadow-sm"
      >
        <i className={`fa-solid ${isOpen ? 'fa-chevron-left' : 'fa-chevron-right'} text-[10px]`}></i>
      </button>
    </aside>
  );
};

export default Sidebar;
