import React, { useState } from 'react';
import { Mail, Lock, User, Building2, Heart, ShoppingCart, ArrowRight, ShieldCheck, Sparkles, Crown, Layout } from 'lucide-react';

// The CEO / Managing Director / Supervisor email — gets unrestricted Admin access
const CEO_EMAIL = 'faidanancy7908@gmail.com';

const ROLES = [
  { id: 'Farmer',   label: 'Farmer',        icon: User,      color: 'emerald' },
  { id: 'Seller',   label: 'Market Seller',  icon: ShoppingCart, color: 'amber' },
  { id: 'NGO',      label: 'NGO / Initiative', icon: Heart,   color: 'blue' },
  { id: 'Ministry', label: 'Ministry',       icon: Building2, color: 'purple' },
  { id: 'General',  label: 'Overview',       icon: Layout,    color: 'slate' },
];

const COLOR_MAP = {
  emerald: { active: 'bg-emerald-500/20 border-emerald-500 text-emerald-400', hover: 'hover:border-emerald-700 hover:text-emerald-400' },
  amber:   { active: 'bg-amber-500/20 border-amber-500 text-amber-400',     hover: 'hover:border-amber-700 hover:text-amber-400' },
  blue:    { active: 'bg-blue-500/20 border-blue-500 text-blue-400',         hover: 'hover:border-blue-700 hover:text-blue-400' },
  purple:  { active: 'bg-purple-500/20 border-purple-500 text-purple-400',   hover: 'hover:border-purple-700 hover:text-purple-400' },
  slate:   { active: 'bg-slate-500/20 border-slate-400 text-slate-300',      hover: 'hover:border-slate-500 hover:text-slate-300' },
};

export default function AuthScreen({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Farmer');

  const isCEO = email.trim().toLowerCase() === CEO_EMAIL;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Please enter both email/contact and password.');
      return;
    }

    // CEO gets unrestricted Admin role regardless of selected role
    if (isCEO) {
      onLogin('Admin', { email, displayName: 'Faida Nancy', title: 'Managing Director / CEO / Supervisor' });
      return;
    }

    // For Sign In: use the role the user picked
    // For Register: same
    onLogin(role, { email });
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-emerald-500/30">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px]"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px]"></div>
      
      <div className="w-full max-w-md relative z-10">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 shadow-2xl bg-slate-950/60 backdrop-blur-xl">
          
          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-emerald-500/30 shadow-lg relative bg-slate-900/50 mb-4">
              <img 
                src="farm_logo.png" 
                alt="FAIDA Logo" 
                className="absolute inset-0 w-full h-full object-cover object-bottom"
              />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-wider text-white text-center">FAIDA Harvest Hub</h1>
            <p className="text-emerald-400 text-xs font-bold uppercase tracking-widest mt-1 flex items-center gap-1">
              <ShieldCheck size={14} /> Secure Access
            </p>
          </div>

          {/* Sign In / Register Toggle */}
          <div className="flex bg-slate-900 rounded-xl p-1 mb-6 border border-slate-800">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${isLogin ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${!isLogin ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-400 hover:text-white'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Email or Phone Contact</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={16} className="text-slate-500" />
                </div>
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                  placeholder="Enter email or +256..."
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={16} className="text-slate-500" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 text-white rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-600"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {/* CEO / Admin Banner — shown when CEO email is detected */}
            {isCEO && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/10 border border-amber-500/40 animate-pulse-once">
                <Crown size={20} className="text-amber-400 shrink-0" />
                <div>
                  <p className="text-amber-300 text-xs font-black uppercase tracking-wider">Managing Director / CEO</p>
                  <p className="text-amber-400/70 text-[10px]">Full access to all portals — Farmer, NGO, Ministry, Seller & Admin</p>
                </div>
              </div>
            )}

            {/* Role Selection — shown for both Sign In and Register (unless CEO detected) */}
            {!isCEO && (
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider pl-1">
                  Select Your Role
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {ROLES.map(({ id, label, icon: Icon, color }) => {
                    const isActive = role === id;
                    const colors = COLOR_MAP[color];
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setRole(id)}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-center ${
                          isActive
                            ? colors.active
                            : `bg-slate-900 border-slate-800 text-slate-500 ${colors.hover}`
                        }`}
                      >
                        <Icon size={18} />
                        <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">{label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button 
              type="submit"
              className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl py-3.5 text-sm font-bold uppercase tracking-widest transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 group"
            >
              {isCEO ? (
                <>
                  <Crown size={16} className="text-amber-300" />
                  Enter Admin Dashboard
                </>
              ) : isLogin ? (
                <>Access Hub <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              ) : (
                <>Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              )}
            </button>
          </form>

        </div>
        
        <div className="mt-8 text-center text-xs text-slate-500 font-medium">
          By accessing this system, you agree to the FAIDA Privacy Policy &amp; Terms of Service.
        </div>
      </div>
    </div>
  );
}
