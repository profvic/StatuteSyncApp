
import React, { useState } from 'react';
import { storageService } from '../../services/storageService';
import { UserProfile } from '../../types';

interface ProfileViewProps {
  onLogout: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ onLogout }) => {
  const [user, setUser] = useState<UserProfile>(storageService.getUser()!);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    storageService.saveUser(user);
    setIsEditing(false);
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-indigo-600 to-blue-600 relative">
          <div className="absolute -bottom-14 left-10 p-1.5 bg-white rounded-3xl shadow-lg">
            <img 
              src={user.avatar} 
              alt="Profile" 
              className="w-28 h-28 rounded-2xl border-4 border-slate-50 object-cover"
            />
          </div>
          <div className="absolute top-4 right-6 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/30 text-white text-[10px] font-bold uppercase tracking-widest">
            {user.role} Status
          </div>
        </div>
        
        <div className="pt-20 p-10">
          <div className="flex justify-between items-start mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-slate-500 font-medium">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md"
              >
                {isEditing ? 'Save Profile' : 'Edit Info'}
              </button>
              <button 
                onClick={onLogout}
                className="px-6 py-2.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-sm font-bold hover:bg-red-100 transition-all"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Full Name</label>
                {isEditing ? (
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                    value={user.name}
                    onChange={(e) => setUser({...user, name: e.target.value})}
                  />
                ) : (
                  <p className="text-slate-700 font-bold">{user.name}</p>
                )}
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Account Role</label>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
                  <i className="fa-solid fa-user-shield"></i>
                  {user.role}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Security Level</label>
                <p className="text-slate-700 font-bold">Encrypted End-to-End</p>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Member Since</label>
                <p className="text-slate-700 font-bold">Jan 2024</p>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-10 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-6">User Stats Summary</h4>
            <div className="grid grid-cols-3 gap-4">
              <div className="p-5 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Verifications</p>
                <p className="text-2xl font-bold text-indigo-600">12</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Templates</p>
                <p className="text-2xl font-bold text-indigo-600">8</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl text-center border border-slate-100">
                <p className="text-[9px] font-bold text-slate-400 uppercase mb-1">Tokens Used</p>
                <p className="text-2xl font-bold text-indigo-600">1.2k</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
