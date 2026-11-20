import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Users, AlertCircle, Trash2, Ban, CheckCircle2, 
  Megaphone, Send, LogOut, DollarSign, RefreshCw, Store, Lock, User
} from 'lucide-react';

const AdminPanel = () => {
  // 🚀 Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('adminAuth') === 'true';
  });
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    if (usernameInput === 'SABHA' && passwordInput === 'QWer12@*') {
      localStorage.setItem('adminAuth', 'true');
      setIsAdminAuthenticated(true);
    } else {
      setLoginError('Invalid Admin Username or Password!');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('adminAuth');
    setIsAdminAuthenticated(false);
  };

  const [restaurants, setRestaurants] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [financialStats, setFinancialStats] = useState({ totalRestaurants: 0, activeSubscriptions: 0, totalRevenue: 0 });
  const [loading, setLoading] = useState(false);

  // Broadcast SMS State
  const [broadcastTarget, setBroadcastTarget] = useState('ALL');
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const restoRes = await fetch('http://localhost:5000/api/admin/restaurants');
      const restoData = await restoRes.json();
      if (restoData.success) setRestaurants(restoData.data);

      const compRes = await fetch('http://localhost:5000/api/admin/complaints');
      const compData = await compRes.json();
      if (compData.success) setComplaints(compData.data);

      const statsRes = await fetch('http://localhost:5000/api/admin/financial-stats');
      const statsData = await statsRes.json();
      if (statsData.success) setFinancialStats(statsData.stats);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdminAuthenticated) {
      fetchData();
    }
  }, [isAdminAuthenticated]);

  const toggleStatus = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/admin/restaurants/${id}/status`, {
        method: 'PATCH'
      });
      const data = await res.json();
      if (data.success) {
        setRestaurants(restaurants.map(r => r._id === id ? { ...r, is_active: data.is_active } : r));
      }
    } catch (err) {
      alert('Failed to update restaurant status.');
    }
  };

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMsg.trim()) return alert('Please enter a broadcast message!');
    
    if (broadcastTarget === 'ALL') {
      alert(`🚀 Broadcast SMS successfully sent to ALL restaurants! Message: "${broadcastMsg}"`);
    } else {
      alert(`🚀 SMS successfully sent to restaurant ID: ${broadcastTarget}!`);
    }
    setBroadcastMsg('');
  };

  // 🔐 Login Screen if not authenticated
  if (!isAdminAuthenticated) {
    return (
      <div className="flex min-h-screen bg-slate-950 text-slate-100 items-center justify-center p-4 relative overflow-hidden font-sans">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="w-full max-w-md bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="bg-orange-600/20 w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-orange-400 border border-orange-500/30 shadow-lg">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Master Admin Login</h1>
            <p className="text-xs text-slate-400">Enter secure credentials to access SSR Admin Panel</p>
          </div>

          {loginError && (
            <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1.5 font-medium">Username</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                <input 
                  type="text" 
                  placeholder="Enter username"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all font-mono"
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
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-orange-500 text-slate-100 transition-all font-mono"
                />
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 text-sm mt-2"
            >
              <span>Login to Admin Panel</span>
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex justify-between items-center bg-slate-900 border border-slate-800 p-6 rounded-3xl shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-600/20 p-3 rounded-2xl border border-orange-500/30 text-orange-400">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold tracking-tight">SSR Cloud POS - Master Admin Panel</h1>
              <p className="text-xs text-slate-400">Manage all registered restaurants, subscriptions, complaints, and system broadcasts.</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button onClick={fetchData} className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all">
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Data</span>
            </button>
            <button onClick={handleAdminLogout} className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center space-x-2 transition-all">
              <LogOut className="w-4 h-4" />
              <span>Logout Admin</span>
            </button>
          </div>
        </div>

        {/* Financial Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
            <p className="text-xs text-slate-400">Total Registered Restaurants</p>
            <h3 className="text-3xl font-extrabold text-orange-400">{restaurants.length}</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
            <p className="text-xs text-slate-400">Active Subscriptions</p>
            <h3 className="text-3xl font-extrabold text-emerald-400">{restaurants.filter(r => r.is_active !== false).length}</h3>
          </div>
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-2">
            <p className="text-xs text-slate-400">Estimated Total Revenue</p>
            <h3 className="text-3xl font-extrabold text-purple-400 font-mono">Rs. {(restaurants.length * 5000).toLocaleString()}.00</h3>
          </div>
        </div>

        {/* Broadcast SMS Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="font-bold text-sm text-orange-400 flex items-center space-x-2">
            <Megaphone className="w-4 h-4" />
            <span>Master Admin Broadcast SMS to Restaurants</span>
          </h3>

          <form onSubmit={handleSendBroadcast} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Target Restaurant</label>
              <select 
                value={broadcastTarget}
                onChange={(e) => setBroadcastTarget(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-orange-500"
              >
                <option value="ALL">ALL Restaurants ({restaurants.length})</option>
                {restaurants.map((r, i) => (
                  <option key={i} value={r._id}>{r.shopName || r.name} ({r.phone || 'N/A'})</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="text-xs text-slate-400 block mb-1">Broadcast Message</label>
              <input 
                type="text" 
                placeholder="Type system notice or promotional message..."
                value={broadcastMsg}
                onChange={(e) => setBroadcastMsg(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-100 outline-none focus:border-orange-500"
              />
            </div>

            <button 
              type="submit"
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Broadcast SMS</span>
            </button>
          </form>
        </div>

        {/* Restaurants Table */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-200">Registered Restaurants Management</h3>

          {restaurants.length === 0 ? (
            <p className="text-slate-500 text-xs py-8 text-center">No restaurants registered yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">Shop / Restaurant Name</th>
                    <th className="p-3">Owner Name</th>
                    <th className="p-3">Email & Phone</th>
                    <th className="p-3">Plan</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {restaurants.map((resto) => (
                    <tr key={resto._id} className="hover:bg-slate-950/50 transition-colors">
                      <td className="p-3 font-bold text-slate-200">{resto.shopName || 'My Restaurant'}</td>
                      <td className="p-3">{resto.name || 'N/A'}</td>
                      <td className="p-3">
                        <p className="text-orange-400">{resto.email}</p>
                        <p className="text-[11px] text-slate-400 font-mono">{resto.phone || 'N/A'}</p>
                      </td>
                      <td className="p-3">
                        <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-full font-bold">{resto.plan || 'Starter'}</span>
                      </td>
                      <td className="p-3">
                        {resto.is_active !== false ? (
                          <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full font-bold flex items-center space-x-1 w-max">
                            <CheckCircle2 className="w-3 h-3" /><span>Active</span>
                          </span>
                        ) : (
                          <span className="bg-rose-500/20 text-rose-400 px-2.5 py-1 rounded-full font-bold flex items-center space-x-1 w-max">
                            <Ban className="w-3 h-3" /><span>Blocked</span>
                          </span>
                        )}
                      </td>
                      <td className="p-3 text-right">
                        <button 
                          onClick={() => toggleStatus(resto._id)}
                          className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${resto.is_active !== false ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20' : 'bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'}`}
                        >
                          {resto.is_active !== false ? 'Block Access' : 'Unblock'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Support Tickets / Complaints Section */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
          <h3 className="font-bold text-base text-slate-200">Support Tickets & Complaints from Restaurants</h3>

          {complaints.length === 0 ? (
            <p className="text-slate-500 text-xs py-8 text-center">No complaints or support tickets submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {complaints.map((comp, index) => (
                <div key={index} className="bg-slate-950 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-orange-400">{comp.shopName} ({comp.name})</span>
                    <span className="text-xs text-slate-400">{comp.date}</span>
                  </div>
                  <p className="text-xs text-slate-300"><b>Subject:</b> {comp.subject}</p>
                  <p className="text-xs text-slate-400"><b>Message:</b> {comp.description}</p>
                  <p className="text-[11px] text-orange-400 font-mono">Contact: {comp.phone} | {comp.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminPanel;