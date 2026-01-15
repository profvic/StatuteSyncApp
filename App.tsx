
import React, { useState, useEffect } from 'react';
import { AppView, UserProfile, LegalProfessional } from './types';
import Sidebar from './components/Sidebar';
import DashboardView from './components/views/DashboardView';
import LibraryView from './components/views/LibraryView';
import MarketplaceView from './components/views/MarketplaceView';
import VerifyView from './components/views/VerifyView';
import ChatView from './components/views/ChatView';
import HistoryView from './components/views/HistoryView';
import ProfileView from './components/views/ProfileView';
import AuthView from './components/views/AuthView';
import AdminView from './components/views/AdminView';
import ProDetailView from './components/views/ProDetailView';
import { storageService } from './services/storageService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.AUTH);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedPro, setSelectedPro] = useState<LegalProfessional | null>(null);

  useEffect(() => {
    const savedUser = storageService.getUser();
    if (savedUser && storageService.isAuthenticated()) {
      setUser(savedUser);
      setCurrentView(AppView.DASHBOARD);
    }
  }, []);

  const handleLogin = (u: UserProfile) => {
    setUser(u);
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    storageService.logout();
    setUser(null);
    setCurrentView(AppView.AUTH);
  };

  const navigateToPro = (pro: LegalProfessional) => {
    setSelectedPro(pro);
    setCurrentView(AppView.PRO_DETAIL);
  };

  if (currentView === AppView.AUTH) {
    return <AuthView onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD: return <DashboardView onNavigate={setCurrentView} />;
      case AppView.LIBRARY: return <LibraryView />;
      case AppView.MARKETPLACE: return <MarketplaceView onSelectPro={navigateToPro} />;
      case AppView.VERIFY: return <VerifyView />;
      case AppView.CHAT: return <ChatView />;
      case AppView.HISTORY: return <HistoryView />;
      case AppView.PROFILE: return <ProfileView onLogout={handleLogout} />;
      case AppView.ADMIN: return <AdminView />;
      case AppView.PRO_DETAIL: return <ProDetailView pro={selectedPro} onBack={() => setCurrentView(AppView.MARKETPLACE)} />;
      default: return <DashboardView onNavigate={setCurrentView} />;
    }
  };

  const getTitle = () => {
    switch(currentView) {
      case AppView.HISTORY: return "Activity & History";
      case AppView.PROFILE: return "User Profile";
      case AppView.VERIFY: return "LexVerify Forensic Analysis";
      case AppView.ADMIN: return "Admin Control Center";
      case AppView.PRO_DETAIL: return "Professional Profile";
      default: return currentView.toLowerCase().replace('_', ' ');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar 
        currentView={currentView} 
        onViewChange={setCurrentView} 
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        userRole={user?.role || 'USER'}
      />
      
      <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'ml-64' : 'ml-20'} p-8`}>
        <header className="flex justify-between items-center mb-10 sticky top-0 bg-slate-50/80 backdrop-blur-md z-40 py-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 capitalize animate-in fade-in slide-in-from-top-2 duration-700">
              {getTitle()}
            </h1>
            <p className="text-slate-500 text-sm font-sans tracking-wide">Welcome back, {user?.name || 'Counselor'}.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors relative group" onClick={() => setCurrentView(AppView.HISTORY)}>
              <i className="fa-solid fa-bell text-xl"></i>
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white group-hover:scale-110 transition-transform"></span>
            </button>
            <div 
              className="group flex items-center gap-3 bg-white p-1 pr-4 rounded-full border border-slate-200 cursor-pointer hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
              onClick={() => setCurrentView(AppView.PROFILE)}
            >
              <img src={user?.avatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" />
              <div className="hidden md:block">
                <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
                <p className="text-[10px] text-slate-400 font-sans font-bold uppercase mt-1 tracking-tighter">{user?.role}</p>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto pb-20">
          <div key={currentView} className="page-transition">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
