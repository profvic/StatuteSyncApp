
import React from 'react';
import { LegalProfessional } from '../../types';
import { storageService } from '../../services/storageService';

interface ProDetailViewProps {
  pro: LegalProfessional | null;
  onBack: () => void;
}

const ProDetailView: React.FC<ProDetailViewProps> = ({ pro, onBack }) => {
  if (!pro) return null;

  const handleBook = () => {
    storageService.createBooking(pro.id, pro.name);
    alert(`Booking request sent to ${pro.name}!`);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold text-sm transition-colors"
      >
        <i className="fa-solid fa-arrow-left"></i> Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center">
            <div className="relative inline-block mb-4">
              <img src={pro.avatar} className="w-40 h-40 rounded-3xl object-cover border-4 border-slate-50 shadow-xl" />
              {pro.online && <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 border-4 border-white rounded-full"></div>}
            </div>
            <h2 className="text-2xl font-bold text-slate-900">{pro.name}</h2>
            <p className="text-indigo-600 font-bold text-sm mb-6 uppercase tracking-wider">{pro.specialty}</p>
            
            <div className="grid grid-cols-3 gap-2 mb-8">
              <div className="p-3 bg-slate-50 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Rating</p>
                <p className="text-sm font-bold">{pro.rating}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Exp</p>
                <p className="text-sm font-bold">{pro.experience}</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-2xl">
                <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Solved</p>
                <p className="text-sm font-bold">142</p>
              </div>
            </div>

            <button 
              onClick={handleBook}
              className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
            >
              <i className="fa-solid fa-calendar-plus"></i> Request Session
            </button>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-4">Languages</h4>
            <div className="flex flex-wrap gap-2">
              {pro.languages?.map(lang => (
                <span key={lang} className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-xs font-bold text-slate-500">{lang}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-10 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Professional Biography</h3>
            <p className="text-slate-600 leading-relaxed mb-10">{pro.bio || "No biography provided yet."}</p>

            <h3 className="text-xl font-bold text-slate-900 mb-6">Expertise & Education</h3>
            <div className="space-y-6">
              {pro.education?.map((edu, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center flex-shrink-0">
                    <i className="fa-solid fa-graduation-cap"></i>
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800">{edu}</h5>
                    <p className="text-sm text-slate-400">Bachelor of Laws & Forensic Sciences</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Client Reviews</h3>
              <div className="space-y-4">
                {[1, 2].map(i => (
                  <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-200"></div>
                        <span className="text-xs font-bold">Verified User</span>
                      </div>
                      <div className="flex text-amber-400 text-[10px]">
                        {[1, 2, 3, 4, 5].map(s => <i key={s} className="fa-solid fa-star"></i>)}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 leading-normal italic">"Extremely professional and detected a fraudulent clause in my contract within minutes. Highly recommend for any digital verification."</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProDetailView;
