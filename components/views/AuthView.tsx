
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../../types';
import { storageService } from '../../services/storageService';

interface AuthViewProps {
  onLogin: (user: UserProfile) => void;
}

const AuthView: React.FC<AuthViewProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('USER');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = storageService.login(email || 'demo@lexguard.ai', role);
    onLogin(user);
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px]"></div>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden relative z-10 animate-in zoom-in-95 duration-500">
        <div className="bg-slate-50 p-8 text-center border-b border-slate-100">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white text-3xl mx-auto mb-4 shadow-xl shadow-indigo-100">
            <i className="fa-solid fa-gavel"></i>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">LexGuard AI</h2>
          <p className="text-slate-400 text-sm mt-1">Professional Legal Protection Hub</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
            <button 
              type="button" 
              onClick={() => setRole('USER')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'USER' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Standard User
            </button>
            <button 
              type="button" 
              onClick={() => setRole('ADMIN')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === 'ADMIN' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500'}`}
            >
              Admin Access
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Email Address</label>
              <div className="relative">
                <i className="fa-solid fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="email" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  placeholder="lawyer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Password</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-slate-300"></i>
                <input 
                  type="password" 
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-sm"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
          </div>

          <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all">
            {isRegister ? 'Create Account' : 'Sign In Now'}
          </button>

          <div className="text-center">
            <button 
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs font-semibold text-slate-400 hover:text-indigo-600"
            >
              {isRegister ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthView;
