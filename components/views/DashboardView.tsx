
import React from 'react';
import { AppView } from '../../types';

interface DashboardViewProps {
  onNavigate: (view: AppView) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-12 page-transition">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-indigo-600 rounded-3xl p-8 text-white flex flex-col justify-between shadow-2xl shadow-indigo-200 transform hover:-translate-y-1 transition-transform">
          <div>
            <h3 className="text-xl font-bold opacity-80">Verification Health</h3>
            <p className="text-5xl font-bold mt-4">98.2%</p>
          </div>
          <p className="mt-6 text-sm opacity-60 font-sans italic">Detection accuracy across all forensic modules.</p>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-xl font-bold text-slate-400">Total Consultations</h3>
            <p className="text-5xl font-bold text-slate-800 mt-4">12</p>
          </div>
          <div className="mt-6 flex -space-x-3">
            {[1, 2, 3, 4, 5].map(i => (
              <img key={i} className="w-10 h-10 rounded-full border-4 border-white shadow-sm object-cover" src={`https://picsum.photos/seed/${i+10}/100`} alt="Pro" />
            ))}
            <div className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-500 font-sans font-bold">+8</div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
          <div>
            <h3 className="text-xl font-bold text-slate-400">Library Docs</h3>
            <p className="text-5xl font-bold text-slate-800 mt-4">1.2k</p>
          </div>
          <button onClick={() => onNavigate(AppView.LIBRARY)} className="mt-6 text-indigo-600 font-bold hover:underline text-sm flex items-center gap-2 group">
            Browse Catalog <i className="fa-solid fa-arrow-right text-[10px] group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">LexVerify Upload</h2>
            <i className="fa-solid fa-circle-info text-slate-300 cursor-help"></i>
          </div>
          <div className="border-2 border-dashed border-slate-200 rounded-3xl p-14 flex flex-col items-center justify-center text-center group hover:border-indigo-400 transition-all cursor-pointer bg-slate-50/30" onClick={() => onNavigate(AppView.VERIFY)}>
            <div className="w-20 h-20 bg-white rounded-3xl shadow-sm flex items-center justify-center text-slate-400 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-100 transition-all mb-6">
              <i className="fa-solid fa-cloud-arrow-up text-3xl"></i>
            </div>
            <p className="text-xl font-bold text-slate-700">Verify Legal Authenticity</p>
            <p className="text-sm text-slate-400 mt-2 font-sans italic">Drop a document, video, or image for deepfake analysis.</p>
          </div>
        </section>

        <section className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
          <h2 className="text-3xl font-bold mb-8">Legal Intelligence</h2>
          <div className="space-y-6">
            {[
              { title: "Forensics Act of 2025: Regulatory Overview", time: "2h ago", icon: "fa-landmark" },
              { title: "AI Fraud Trends in Commercial Litigation", time: "5h ago", icon: "fa-warning" },
              { title: "Smart Contract Execution Standards", time: "1d ago", icon: "fa-file-code" },
            ].map((news, i) => (
              <div key={i} className="flex gap-5 items-start p-4 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer group">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex-shrink-0 flex items-center justify-center text-slate-500 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  <i className={`fa-solid ${news.icon} text-lg`}></i>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">{news.title}</h4>
                  <p className="text-xs text-slate-400 mt-2 font-sans font-medium uppercase tracking-wider">{news.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DashboardView;
