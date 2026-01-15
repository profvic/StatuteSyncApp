
import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { UserProfile, AppView } from '../../types';

interface ProfileViewProps {
  onLogout: () => void;
  onNavigate: (view: AppView) => void;
  isAdmin: boolean;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout, onNavigate, isAdmin }) => {
  const [user, setUser] = useState<UserProfile>(storageService.getUser()!);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    storageService.saveUser(user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="h-32 md:h-40 bg-indigo-600 relative">
          <div className="absolute -bottom-10 left-6 md:left-10 p-1 bg-white rounded-2xl shadow-lg">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-20 h-20 md:w-28 md:h-28 rounded-xl border-2 border-slate-50 object-cover"
            />
          </div>
        </div>
        
        <div className="pt-14 p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 font-medium text-sm">{user.email}</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="flex-1 md:flex-none px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold active:scale-95 transition-all"
              >
                {isEditing ? 'Save' : 'Edit'}
              </button>
              <button 
                onClick={onLogout}
                className="flex-1 md:flex-none px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold active:scale-95 transition-all"
              >
                Logout
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Account Level</label>
              <div className="flex items-center gap-2 text-indigo-700 font-bold">
                <i className="fa-solid fa-crown text-amber-500"></i>
                {user.role} Member
              </div>
            </div>

            {isAdmin && (
              <button 
                onClick={() => onNavigate(AppView.ADMIN)}
                className="w-full p-4 bg-slate-900 text-white rounded-2xl flex items-center justify-between group active:scale-[0.98] transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
                    <i className="fa-solid fa-screwdriver-wrench"></i>
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-sm leading-none">Admin Panel</p>
                    <p className="text-[10px] text-slate-400 mt-1">Management Controls</p>
                  </div>
                </div>
                <i className="fa-solid fa-chevron-right text-xs opacity-50 group-hover:translate-x-1 transition-transform"></i>
              </button>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Total Scans</p>
                <p className="text-xl font-bold text-slate-800">24</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl text-center">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Accuracy</p>
                <p className="text-xl font-bold text-slate-800">99%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
