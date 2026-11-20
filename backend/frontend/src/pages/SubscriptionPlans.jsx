import React, { useState } from 'react';
import { Store, CheckCircle2, ArrowRight, Tag } from 'lucide-react';

const SubscriptionPlans = () => {
  const [promoCode, setPromoCode] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();

    if (!code) {
      alert('Please enter a Promo Code!');
      return;
    }

    const isValid = (
      code.startsWith('SSR2026') || 
      code.startsWith('SSR-PROMO') || 
      code.startsWith('SSR-TRIAL')
    );

    if (isValid) {
      const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
      const updatedUser = {
        ...existingUser,
        selectedPlan: '7-Day Trial',
        isTrial: true
      };

      localStorage.setItem('user', JSON.stringify(updatedUser));
      localStorage.setItem('ssr_selected_plan', '7-Day Trial');
      if (!localStorage.getItem('token')) {
        localStorage.setItem('token', 'ssr_trial_token');
      }

      alert('🎉 7-Day Free Trial Activated! Redirecting to Dashboard...');
      window.location.href = '/dashboard'; // කෙලින්ම ඩෑෂ්බෝඩ් එකට යවනවා
    } else {
      alert('❌ Invalid Promo Code! Please enter a valid code (e.g. SSR2026-01)');
    }
  };

  const handleSelectPlan = (planName) => {
    const existingUser = JSON.parse(localStorage.getItem('user') || '{}');
    const updatedUser = {
      ...existingUser,
      selectedPlan: planName
    };

    localStorage.setItem('user', JSON.stringify(updatedUser));
    localStorage.setItem('ssr_selected_plan', planName);
    alert(`🎉 Successfully subscribed to ${planName} plan! Opening Dashboard...`);
    window.location.href = '/dashboard';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full space-y-8">
        
        <div className="text-center space-y-2">
          <div className="bg-orange-600/20 w-12 h-12 rounded-xl flex items-center justify-center mx-auto border border-orange-500/30 text-orange-400">
            <Store className="w-6 h-6" />
          </div>
          <h1 className="text-3xl font-bold">SSR Cloud POS — Subscription Plans</h1>
          <p className="text-sm text-slate-400">Choose the best and fastest cloud POS plan tailored for your restaurant business scale.</p>
        </div>

        {/* Promo Code Box */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl max-w-xl mx-auto space-y-3">
          <h3 className="font-bold text-sm text-orange-400 flex items-center space-x-2">
            <Tag className="w-4 h-4" />
            <span>Do you have a Promo Code? (Optional)</span>
          </h3>
          <form onSubmit={handleApplyPromo} className="flex space-x-3">
            <input 
              type="text" placeholder="E.G. SSR2026-01"
              value={promoCode} onChange={(e) => setPromoCode(e.target.value)}
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-orange-500 text-slate-100 uppercase font-mono"
            />
            <button type="submit" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all shadow cursor-pointer">
              Apply & Enter
            </button>
          </form>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-3 gap-6">
          
          {/* Starter Plan */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full uppercase font-bold">Starter</span>
                <h3 className="text-xl font-bold mt-2 text-slate-100">Starter Plan</h3>
                <p className="text-xs text-slate-400 mt-1">Perfect for small local restaurants getting started.</p>
              </div>
              <div className="text-2xl font-extrabold text-orange-400 font-mono">
                Rs. 2,500 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Basic POS Billing</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Thermal Printer Support</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Customer Directory</span></li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectPlan('Starter')}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all shadow bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              Select Starter
            </button>
          </div>

          {/* Professional Plan */}
          <div className="bg-slate-900 border border-orange-500 ring-2 ring-orange-500/20 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 relative">
            <div className="absolute -top-3 right-6 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">Most Popular</div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] bg-orange-600/20 text-orange-400 px-2.5 py-1 rounded-full uppercase font-bold">Pro Business</span>
                <h3 className="text-xl font-bold mt-2 text-slate-100">Professional Plan</h3>
                <p className="text-xs text-slate-400 mt-1">Ideal for growing restaurants with customer loyalty.</p>
              </div>
              <div className="text-2xl font-extrabold text-orange-400 font-mono">
                Rs. 5,000 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>All Starter Features</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Marketing SMS Campaigns</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Full Billing History</span></li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectPlan('Professional')}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all shadow bg-orange-600 hover:bg-orange-500 text-white cursor-pointer"
            >
              Select Pro Plan →
            </button>
          </div>

          {/* Enterprise Plan */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[10px] bg-purple-600/20 text-purple-400 px-2.5 py-1 rounded-full uppercase font-bold">Enterprise</span>
                <h3 className="text-xl font-bold mt-2 text-slate-100">Enterprise Plan</h3>
                <p className="text-xs text-slate-400 mt-1">For multi-branch or high-volume restaurants.</p>
              </div>
              <div className="text-2xl font-extrabold text-orange-400 font-mono">
                Rs. 10,000 <span className="text-xs text-slate-400 font-normal">/ month</span>
              </div>
              <ul className="space-y-2.5 text-xs text-slate-300">
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Multi-Branch Management</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Advanced Analytics & Reports</span></li>
                <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>24/7 VIP Technical Support</span></li>
              </ul>
            </div>
            <button 
              onClick={() => handleSelectPlan('Enterprise')}
              className="w-full py-3 rounded-xl font-bold text-sm transition-all shadow bg-slate-800 hover:bg-slate-700 text-slate-200 cursor-pointer"
            >
              Select Enterprise
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;