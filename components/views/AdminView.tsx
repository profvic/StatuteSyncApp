
import React, { useState, useEffect } from 'react';
import { LegalProfessional } from '../../types';
import { storageService } from '../../services/storageService';

const AdminView: React.FC = () => {
  const [pros, setPros] = useState<LegalProfessional[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newPro, setNewPro] = useState<Omit<LegalProfessional, 'id' | 'rating' | 'online'>>({
    name: '',
    specialty: 'Corporate Law',
    experience: '5 yrs',
    avatar: 'https://i.pravatar.cc/150?u=new',
    bio: '',
    education: [],
    languages: ['English']
  });

  useEffect(() => {
    setPros(storageService.getPros());
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPro.name) return;
    const added = storageService.addPro(newPro);
    setPros([added, ...pros]);
    setIsAdding(false);
    setNewPro({ name: '', specialty: 'Corporate Law', experience: '5 yrs', avatar: `https://i.pravatar.cc/150?u=${Date.now()}`, bio: '', education: [], languages: ['English'] });
  };

  const handleRemove = (id: string) => {
    if (confirm('Revoke access for this professional?')) {
      storageService.removePro(id);
      setPros(pros.filter(p => p.id !== id));
    }
  };

  const stats = [
    { label: 'Active Users', value: '14,204', trend: '+12%', icon: 'fa-users' },
    { label: 'Deepfakes Blocked', value: '829', trend: '+5%', icon: 'fa-shield-virus' },
    { label: 'Vetted Lawyers', value: pros.length.toString(), trend: '+2', icon: 'fa-user-tie' },
    { label: 'Rev (MTD)', value: '$24.5k', trend: '+18%', icon: 'fa-sack-dollar' },
  ];

  return (
    <div className="space-y-10 page-transition">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <i className={`fa-solid ${stat.icon}`}></i>
              </div>
              <span className="text-[10px] font-bold text-green-500 bg-green-50 px-2 py-1 rounded-lg font-sans">{stat.trend}</span>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">{stat.label}</p>
            <p className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <div>
            <h3 className="text-2xl font-bold text-slate-800">Lawyer Roster Management</h3>
            <p className="text-sm text-slate-400">Onboard or deactivate verified legal providers.</p>
          </div>
          <button 
            onClick={() => setIsAdding(!isAdding)}
            className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold font-sans hover:bg-indigo-700 transition-all flex items-center gap-2"
          >
            <i className={`fa-solid ${isAdding ? 'fa-xmark' : 'fa-user-plus'}`}></i>
            {isAdding ? 'Cancel' : 'Onboard Lawyer'}
          </button>
        </div>

        {isAdding && (
          <div className="p-8 border-b border-slate-100 bg-slate-50/30 animate-in slide-in-from-top-4 duration-300">
            <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-sans text-sm"
                  value={newPro.name}
                  onChange={e => setNewPro({...newPro, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">Specialty</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-sans text-sm"
                  value={newPro.specialty}
                  onChange={e => setNewPro({...newPro, specialty: e.target.value})}
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-1 font-sans">Experience</label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none font-sans text-sm"
                  value={newPro.experience}
                  onChange={e => setNewPro({...newPro, experience: e.target.value})}
                />
              </div>
              <button type="submit" className="md:col-span-3 py-3 bg-slate-900 text-white rounded-xl font-sans font-bold hover:bg-slate-800 transition-all">
                Authorize Practitioner
              </button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Professional</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Expertise</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Experience</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans">Status</th>
                <th className="px-8 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest font-sans text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {pros.map((pro) => (
                <tr key={pro.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <img src={pro.avatar} className="w-10 h-10 rounded-full border border-slate-100" />
                      <span className="font-bold text-slate-800">{pro.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-sm text-slate-500">{pro.specialty}</td>
                  <td className="px-8 py-5 text-sm text-slate-500">{pro.experience}</td>
                  <td className="px-8 py-5">
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded-lg uppercase font-sans">Active</span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button 
                      onClick={() => handleRemove(pro.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                      title="Deactivate Account"
                    >
                      <i className="fa-solid fa-user-slash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
