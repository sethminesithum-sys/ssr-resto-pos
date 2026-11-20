import React, { useState } from 'react';
import { ShieldCheck, Zap } from 'lucide-react';

export default function SubscriptionSettings() {
  const [tier] = useState('Growth Plan (LKR 4,000/mo)');
  const [credits, setCredits] = useState(45);

  const handleTopup = (pkg, amount) => {
    alert(`Successfully requested topup: ${pkg} for LKR ${amount}`);
    setCredits(prev => prev + (pkg.includes('500') ? 500 : 1000));
  };

  return (
    <div className="p-6 text-white max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">දායකත්ව සහ SMS වොලට් කළමනාකරණය (Subscription & Billing)</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="text-emerald-400" size={28} />
            <h2 className="text-lg font-semibold">සක්‍රීය සැලැස්ම (Active Tier)</h2>
          </div>
          <p className="text-2xl font-bold text-indigo-400 mb-2">{tier}</p>
          <p className="text-gray-400 text-sm mb-4">ඔබගේ ව්‍යාපාරික අවශ්‍යතා සඳහා ස්වයංක්‍රීය සීමාවන් පාලනය කර ඇත.</p>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium transition">
            ප්‍රෝ සැලැස්ම වෙත යාවත්කාලීන කරන්න (Upgrade to Pro)
          </button>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Zap className="text-amber-400" size={26} />
              <h2 className="text-lg font-semibold">SMS ණය ශේෂය (SMS Wallet)</h2>
            </div>
            <p className="text-3xl font-extrabold text-emerald-400 mb-1">{credits} <span className="text-sm font-normal text-gray-400">Credits Left</span></p>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={() => handleTopup('500 SMS Package', 750)} className="flex-1 bg-slate-800 hover:bg-slate-700 py-2 rounded-xl text-xs font-semibold">
              500 SMS (Rs. 750)
            </button>
            <button onClick={() => handleTopup('1000 SMS Package', 1400)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 py-2 rounded-xl text-xs font-semibold">
              1000 SMS (Rs. 1,400)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}