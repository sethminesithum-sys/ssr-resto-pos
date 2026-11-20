import React, { useState } from 'react';
import { Store, Mail, Lock, LogIn, AlertCircle, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter both email address and password!');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const storedUser = localStorage.getItem('user');
      let userData = storedUser ? JSON.parse(storedUser) : null;

      if (userData && userData.email) {
        if (userData.email.toLowerCase() === email.toLowerCase()) {
          localStorage.setItem('token', 'ssr-token-secured-999');
          
          if (!userData.hasSelectedPlan) {
            window.location.href = '/subscription-plans';
          } else {
            window.location.href = '/dashboard';
          }
          return;
        }
      }

      if (email.includes('@')) {
        const defaultUser = {
          shopName: "Dinuka's Family Restaurant & Dine",
          email: email,
          phone: "0712345678",
          hasSelectedPlan: false
        };
        localStorage.setItem('user', JSON.stringify(defaultUser));
        localStorage.setItem('token', 'ssr-token-secured-999');
        window.location.href = '/subscription-plans';
      } else {
        setErrorMsg('Invalid email address or password. Please check again.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100 font-sans relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative z-10">
        
        <div className="text-center space-y-2">
          <div className="inline-flex bg-orange-600/20 p-3.5 rounded-2xl border border-orange-500/30 text-orange-400 shadow-lg shadow-orange-600/10 animate-pulse">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight">Welcome Back to SSR POS</h1>
          <p className="text-xs text-slate-400">Sign in securely to access your restaurant dashboard</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="email" 
                placeholder="name@example.com"
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1.5 font-medium">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="password" 
                placeholder="••••••••"
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>{isLoading ? 'Signing in...' : 'Login to Dashboard'}</span>
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400">
          Don't have an account? <a href="/register" className="text-orange-400 font-semibold hover:underline inline-flex items-center space-x-1"><span>Get Started Now</span> <ArrowRight className="w-3 h-3 ml-0.5" /></a>
        </div>

      </div>
    </div>
  );
};

export default Login;