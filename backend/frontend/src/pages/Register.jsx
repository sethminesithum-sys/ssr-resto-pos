import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, Mail, Lock, User, Phone, ArrowRight, AlertCircle } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    ownerName: '',
    shopName: '',
    businessType: 'Restaurant / Dine-in',
    email: '',
    phone: '',
    password: '',
    promoCode: ''
  });

  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!formData.ownerName || !formData.shopName || !formData.email || !formData.phone || !formData.password) {
      setErrorMsg('Please fill in all required fields!');
      return;
    }

    try {
      setLoading(true);

      // 🚀 බෑක්-එන්ඩ් එකේ /api/register එන්ඩ්පොයින්ට් එකට ඩේටා යැවීම (මෙතනින් තමයි Nodemailer එකෙන් ඊමේල් එක යවන්නේ)
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.ownerName,
          email: formData.email,
          password: formData.password,
          promoCode: formData.promoCode,
          plan: 'Starter'
        }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok && data.success) {
        // Temp details localStorage එකේ තබා ගැනීම
        localStorage.setItem('user', JSON.stringify(formData));

        // 🚀 ඊමේල් එකට OTP යැවීම සාර්ථක නම් Verify Email පේජ් එකට යැවීම
        navigate('/verify-email', { state: { email: formData.email } });
      } else {
        setErrorMsg(data.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      setLoading(false);
      console.error('Network Error:', err);
      setErrorMsg('Unable to connect to the server. Make sure backend is running on port 5000!');
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-slate-950 text-slate-100 font-sans overflow-y-auto py-10 relative">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-lg bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl space-y-6 relative z-10 my-auto">
        
        <div className="text-center space-y-2">
          <div className="inline-flex bg-orange-600/20 p-3.5 rounded-2xl border border-orange-500/30 text-orange-400 shadow-lg shadow-orange-600/10">
            <Store className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">Create a New Account</h1>
          <p className="text-xs text-slate-400">Get Started Now with SSR Cloud POS Platform</p>
        </div>

        {errorMsg && (
          <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegisterSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-slate-400 block mb-1">Owner Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="text" placeholder="Your Name"
                value={formData.ownerName} onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Business / Shop Name</label>
            <div className="relative">
              <Store className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="text" placeholder="Dinuka Family Restaurant"
                value={formData.shopName} onChange={(e) => setFormData({...formData, shopName: e.target.value})}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Business Type</label>
            <select 
              value={formData.businessType} onChange={(e) => setFormData({...formData, businessType: e.target.value})}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
            >
              <option value="Restaurant">Restaurant / Dine-in</option>
              <option value="Cafe">Cafe & Bakery</option>
              <option value="Hotel">Hotel & Resort</option>
            </select>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="email" placeholder="example@gmail.com"
                value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
            <div className="relative">
              <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="text" placeholder="0712345678"
                value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 font-mono transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input 
                type="password" placeholder="••••••••"
                value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Promo Code (Optional)</label>
            <input 
              type="text" placeholder="Enter promo code if available"
              value={formData.promoCode} onChange={(e) => setFormData({...formData, promoCode: e.target.value})}
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 uppercase font-mono transition-all"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl flex items-center justify-center space-x-2 transition-all shadow-lg shadow-orange-600/30 hover:scale-[1.02] active:scale-[0.98] mt-2 disabled:opacity-50"
          >
            <span>{loading ? 'Processing...' : 'Register & Verify Email'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center pt-2 text-xs text-slate-400">
          Already have an account? <a href="/login" className="text-orange-400 font-semibold hover:underline">Login here</a>
        </div>

      </div>
    </div>
  );
};

export default Register;