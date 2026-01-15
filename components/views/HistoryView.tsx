
import React, { useState, useEffect } from 'react';
import { storageService } from '../../services/storageService';
import { VerificationResult, Booking } from '../../types';

const HistoryView: React.FC = () => {
  const [verifications, setVerifications] = useState<VerificationResult[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<'VERIFICATIONS' | 'BOOKINGS'>('VERIFICATIONS');

  useEffect(() => {
    setVerifications(storageService.getVerifications());
    setBookings(storageService.getBookings());
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex gap-4 mb-8">
        <button 
          onClick={() => setActiveTab('VERIFICATIONS')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === 'VERIFICATIONS' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-500'
          }`}
        >
          Verification History
        </button>
        <button 
          onClick={() => setActiveTab('BOOKINGS')}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            activeTab === 'BOOKINGS' ? 'bg-indigo-600 text-white' : 'bg-white border border-slate-200 text-slate-500'
          }`}
        >
          My Bookings
        </button>
      </div>

      {activeTab === 'VERIFICATIONS' ? (
        <div className="space-y-4">
          {verifications.length > 0 ? verifications.map(v => (
            <div key={v.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-indigo-200 transition-colors">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${v.isAuthentic ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                  <i className={`fa-solid ${v.isAuthentic ? 'fa-circle-check' : 'fa-circle-xmark'} text-xl`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{v.fileName}</h4>
                  <p className="text-xs text-slate-400">Analyzed on {new Date(v.timestamp).toLocaleDateString()} • {new Date(v.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-xs font-bold px-2 py-1 rounded-lg ${v.isAuthentic ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {v.isAuthentic ? 'Authentic' : 'Suspicious'} ({(v.confidence * 100).toFixed(0)}%)
                </span>
                <button className="block mt-2 text-indigo-600 text-xs font-bold hover:underline">View Full Report</button>
              </div>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-100">
              <i className="fa-solid fa-box-open text-4xl text-slate-200 mb-4"></i>
              <p className="text-slate-400">No verification reports found.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.length > 0 ? bookings.map(b => (
            <div key={b.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <i className="fa-solid fa-user-tie text-xl"></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">Consultation with {b.proName}</h4>
                  <p className="text-xs text-slate-400">Request ID: {b.id} • Status: {b.status}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-slate-50 text-slate-600 text-xs font-bold rounded-lg hover:bg-slate-100">
                Cancel Request
              </button>
            </div>
          )) : (
            <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-100">
              <i className="fa-solid fa-calendar-xmark text-4xl text-slate-200 mb-4"></i>
              <p className="text-slate-400">You haven't booked any sessions yet.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HistoryView;
