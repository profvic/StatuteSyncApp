
import React, { useState } from 'react';
import { LegalProfessional } from '../../types';
import { storageService } from '../../services/storageService';

const MOCK_PROS: LegalProfessional[] = [
  { id: 'p1', name: 'Sarah Jenkins', specialty: 'Criminal Law & Forensics', rating: 4.9, experience: '12 yrs', avatar: 'https://picsum.photos/seed/p1/200', online: true, bio: 'Expert in forensic analysis and digital crime detection.', education: ['Harvard Law', 'MSc Cybersecurity'], languages: ['English', 'French'] },
  { id: 'p2', name: 'Dr. Marcus Thorne', specialty: 'Digital Fraud Specialist', rating: 4.8, experience: '15 yrs', avatar: 'https://picsum.photos/seed/p2/200', online: false, bio: 'Pioneering researcher in AI fraud prevention.', education: ['Oxford University'], languages: ['English', 'German'] },
  { id: 'p3', name: 'Elena Rodriguez', specialty: 'IP & Corporate Compliance', rating: 5.0, experience: '8 yrs', avatar: 'https://picsum.photos/seed/p3/200', online: true, bio: 'Intellectual property specialist for tech startups.', education: ['Stanford Law'], languages: ['Spanish', 'English'] },
  { id: 'p4', name: 'James Wilson', specialty: 'Contract Disputes', rating: 4.7, experience: '10 yrs', avatar: 'https://picsum.photos/seed/p4/200', online: true, bio: 'Experienced litigator for commercial contracts.', education: ['Yale Law'], languages: ['English'] },
];

interface MarketplaceViewProps {
  onSelectPro: (pro: LegalProfessional) => void;
}

const MarketplaceView: React.FC<MarketplaceViewProps> = ({ onSelectPro }) => {
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const handleBook = (pro: LegalProfessional) => {
    storageService.createBooking(pro.id, pro.name);
    setBookingSuccess(pro.name);
    setTimeout(() => setBookingSuccess(null), 3000);
  };

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold">Top Legal Providers</h2>
          <p className="text-slate-500 text-sm">Verified experts ready to assist you in real-time.</p>
        </div>
        <div className="flex bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
          <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-bold shadow-sm">All Experts</button>
          <button className="px-4 py-2 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-50 transition-colors">Online Now</button>
        </div>
      </div>

      {bookingSuccess && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl border border-green-200 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <i className="fa-solid fa-circle-check"></i>
          <p className="text-sm font-bold">Successfully requested consultation with {bookingSuccess}!</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_PROS.map(pro => (
          <div key={pro.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-center flex flex-col items-center hover:-translate-y-2 transition-all duration-300 group">
            <div className="relative mb-4 cursor-pointer" onClick={() => onSelectPro(pro)}>
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full scale-0 group-hover:scale-110 transition-transform duration-500"></div>
              <img src={pro.avatar} alt={pro.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
              {pro.online && <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 border-4 border-white rounded-full animate-pulse"></div>}
            </div>
            
            <h3 
              className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 cursor-pointer transition-colors"
              onClick={() => onSelectPro(pro)}
            >
              {pro.name}
            </h3>
            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mt-1 mb-4">{pro.specialty}</p>
            
            <div className="flex gap-4 w-full justify-center mb-6">
              <div className="text-center">
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Rating</p>
                <p className="font-bold text-slate-800 text-sm"><i className="fa-solid fa-star text-amber-400 mr-1"></i>{pro.rating}</p>
              </div>
              <div className="w-px h-8 bg-slate-100 self-center"></div>
              <div className="text-center">
                <p className="text-[9px] font-bold text-slate-300 uppercase tracking-widest mb-0.5">Exp</p>
                <p className="font-bold text-slate-800 text-sm">{pro.experience}</p>
              </div>
            </div>

            <div className="flex gap-2 w-full mt-auto">
              <button 
                onClick={() => handleBook(pro)}
                className="flex-1 py-2.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-md shadow-indigo-100 transition-all"
              >
                Book Session
              </button>
              <button 
                onClick={() => onSelectPro(pro)}
                className="p-2.5 px-3.5 rounded-xl border border-slate-200 text-slate-400 hover:text-indigo-600 hover:border-indigo-600 hover:bg-indigo-50 transition-all"
              >
                <i className="fa-solid fa-id-card"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceView;
