import React, { useState } from 'react';
import axios from 'axios';
import { UserPlus, Mail, Lock, Store, Phone } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shopName, setShopName] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        shop_name: shopName,
        phone
      });
      setMessage(res.data.message || 'ගිණුම සාර්ථකව සාදන ලදී! දැන් ඔබට ලොග් විය හැක.');
    } catch (err) {
      setError(err.response?.data?.error || 'ගිණුම සැදීමට අපොහොසත් විය');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-2xl border border-slate-700 p-8">
        <div className="flex justify-center mb-6">
          <div className="bg-emerald-600/20 p-4 rounded-full border border-emerald-500/30">
            <UserPlus className="w-10 h-10 text-emerald-400" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-2">SaaS POS Register</h2>
        <p className="text-slate-400 text-center mb-6 text-sm">නව ව්‍යාපාරික ගිණුමක් සකසා ගන්න</p>

        {message && <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center">{message}</div>}
        {error && <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 rounded-xl text-sm text-center">{error}</div>}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">ඔබේ නම (Name)</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="සෙත්මිණ සිතුම්"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">ව්‍යාපාරයේ නම (Shop Name)</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="SSR Nexus Store"
              value={shopName}
              onChange={(e) => setShopName(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">විද්‍යුත් තැපෑල (Email)</label>
            <input
              type="email"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">දුරකථන අංකය (Phone)</label>
            <input
              type="text"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="0701234567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">මුරපදය (Password)</label>
            <input
              type="password"
              required
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-slate-100 focus:outline-none focus:border-emerald-500 transition-colors"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition-colors shadow-lg shadow-emerald-600/30 disabled:opacity-50"
          >
            {loading ? 'ගිණුම සෑදෙමින්...' : 'ගිණුම සාදන්න (Register)'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;