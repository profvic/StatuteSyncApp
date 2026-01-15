
import React from 'react';
import { AppView } from '../../types';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-6 md:space-y-12 pb-10">
      <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-4 px-4 md:grid md:grid-cols-3 md:mx-0 md:px-0 md:pb-0">
        <div className="min-w-[280px] md:min-w-0 bg-indigo-600 rounded-3xl p-6 md:p-8 text-white flex flex-col justify-between shadow-xl shadow-indigo-100 flex-shrink-0">
          <div>
            <h3 className="text-sm font-bold opacity-80 uppercase tracking-widest">Trust Score</h3>
            <p className="text-4xl md:text-5xl font-bold mt-2">98.2%</p>
          </div>
          <p className="mt-4 text-xs opacity-60 font-medium italic">Active forensic monitoring</p>
        </div>
        
        <div className="min-w-[280px] md:min-w-0 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between flex-shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Active Cases</h3>
            <p className="text-4xl md:text-5xl font-bold text-slate-800 mt-2">12</p>
          </div>
          <div className="mt-4 flex -space-x-2">
            {[1, 2, 3, 4].map(i => (
              <img key={i} className="w-8 h-8 rounded-full border-2 border-white shadow-sm" src={`https://i.pravatar.cc/100?u=${i}`} />
            ))}
          </div>
        </div>

        <div className="min-w-[280px] md:min-w-0 bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm flex flex-col justify-between flex-shrink-0">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Library</h3>
            <p className="text-4xl md:text-5xl font-bold text-slate-800 mt-2">1.2k</p>
          </div>
          <button onClick={() => onNavigate(AppView.LIBRARY)} className="mt-4 text-indigo-600 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
            Explore <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        <section className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-xl md:text-3xl font-bold">LexVerify Scan</h2>
          </div>
          <div 
            className="border-2 border-dashed border-slate-200 rounded-3xl p-8 md:p-14 flex flex-col items-center justify-center text-center bg-slate-50/30 active:bg-indigo-50/30 transition-all cursor-pointer" 
            onClick={() => onNavigate(AppView.VERIFY)}
          >
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center text-slate-400 mb-4">
              <i className="fa-solid fa-magnifying-glass-chart text-2xl"></i>
            </div>
            <p className="text-lg font-bold text-slate-700">Scan for Deepfakes</p>
            <p className="text-xs text-slate-400 mt-1 italic">Identify anomalies in seconds.</p>
          </div>
        </section>

        <section className="bg-white p-6 md:p-10 rounded-[2rem] border border-slate-200 shadow-sm">
          <h2 className="text-xl md:text-3xl font-bold mb-6">Latest Updates</h2>
          <div className="space-y-4">
            {[
              { title: "Forensics Act of 2025", icon: "fa-landmark" },
              { title: "AI Fraud in Litigation", icon: "fa-warning" },
              { title: "Smart Contract Standards", icon: "fa-file-code" },
            ].map((news, i) => (
              <div key={i} className="flex gap-4 items-center p-3 hover:bg-slate-50 rounded-xl transition-all active:bg-slate-100">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex-shrink-0 flex items-center justify-center">
                  <i className={`fa-solid ${news.icon}`}></i>
                </div>
                <h4 className="text-sm font-bold text-slate-800 leading-tight">{news.title}</h4>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardView;
