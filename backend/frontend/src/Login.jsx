import React, { useState } from 'react';
import axios from 'axios';
import { LogIn, Phone, KeyRound } from 'lucide-react';

const Login = () => {
  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify & Login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      setMessage(res.data.message || 'OTP යවන ලදී!');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || 'OTP යැවීමට අපොහොසත් විය');
    } finally {
      setLoading(false);
    }
  };

  // Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setMessage('ලොග් වීම සාර්ථකයි!');
      // ඊළඟට Dashboard එකට Redirect කිරීමට මෙතැන ඉදිරියට සකසමු
    } catch (err) {
      setError(err.response?.data?.error || 'ලොගින් වීමට අපොහොසත් විය');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-indigo-600/20 p-4 rounded-full border border-indigo-500/30">
            <LogIn className="w-10 h-10 text-indigo-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">SaaS POS System</h2>
        <p className="text-slate-400 text-center mb-6 text-sm">ඔබගේ ගිණුමට ප්‍රවේශ වන්න</p>

        {message && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center">{message}</div>}
        {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">විද්‍යුත් තැපෑල (Email)</label>
            <input
              type="email"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">මුරපදය (Password)</label>
            <input
              type="password"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-indigo-600/30 disabled:opacity-50"
          >
            {loading ? 'ප්‍රවේශ වෙමින්...' : 'ඇතුළු වන්න (Login)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;