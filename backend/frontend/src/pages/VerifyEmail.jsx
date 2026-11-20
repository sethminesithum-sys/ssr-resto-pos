import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ShieldCheck, Mail, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default function VerifyEmail() {
    const navigate = useNavigate();
    const location = useLocation();
    const [email, setEmail] = useState(location.state?.email || '');
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVerify = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_URL}/api/verify-otp`, {
                email,
                otp: code
            });

            if (response.data.success) {
                if (response.data.token) {
                    localStorage.setItem('token', response.data.token);
                }

                // 🚀 Get user from localStorage or create user state to update trial/plan status
                const storedUser = localStorage.getItem('user');
                let userData = storedUser ? JSON.parse(storedUser) : { email };

                // Update plan selection status based on backend response (Promo code / 7-Day trial)
                userData.hasSelectedPlan = response.data.hasSelectedPlan || false;
                userData.isTrial = response.data.isTrial || false;
                if (userData.isTrial) {
                    userData.selectedPlan = '7-Day Trial';
                }
                localStorage.setItem('user', JSON.stringify(userData));

                setSuccess(response.data.message || 'Email verified successfully!');
                
                // 🚀 ඩෑශ්බෝර්ඩ් එකට හෝ සබ්ස්ක්‍රිප්ෂන් ප්ලෑන් එකට නිවැරදිව යැවීම
                setTimeout(() => {
                    if (userData.hasSelectedPlan) {
                        navigate('/dashboard'); // Promo code දුන්න නම් කෙළින්ම ඩෑශ්බෝර්ඩ් එකට!
                    } else {
                        navigate('/subscription-plans'); // නැත්නම් ප්ලෑන් පේජ් එකට
                    }
                }, 1500);
            } else {
                setError(response.data.error || 'Verification failed. Please check your code.');
            }

        } catch (err) {
            setError(err.response?.data?.error || 'Verification failed. Please check your code and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-100 items-center justify-center p-4 relative overflow-hidden font-sans">
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl border border-slate-800 p-8 rounded-3xl shadow-2xl relative z-10 space-y-6">
                <div className="flex justify-center">
                    <div className="bg-orange-600/20 p-4 rounded-2xl border border-orange-500/30 text-orange-400 shadow-lg">
                        <ShieldCheck className="w-10 h-10" />
                    </div>
                </div>

                <div className="text-center space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Verify Your Email</h2>
                    <p className="text-slate-400 text-xs">
                        Enter the 6-digit verification code sent to your email address.
                    </p>
                </div>

                {error && (
                    <div className="bg-rose-500/10 border border-rose-500/30 text-rose-400 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {success && (
                    <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3.5 rounded-2xl text-xs flex items-center space-x-2.5">
                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                        <span>{success} Redirecting...</span>
                    </div>
                )}

                <form onSubmit={handleVerify} className="space-y-4">
                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-slate-100 outline-none focus:border-orange-500 transition-all"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs text-slate-400 mb-1.5 font-medium">Verification Code (OTP)</label>
                        <input
                            type="text"
                            maxLength="6"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            required
                            className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-3 text-center text-xl tracking-widest font-mono font-bold text-orange-400 outline-none focus:border-orange-500 transition-all"
                            placeholder="123456"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mt-2"
                    >
                        <span>{loading ? 'Verifying...' : 'Verify Email & Proceed'}</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="text-center text-xs text-slate-400 pt-2">
                    Already verified? <a href="/login" className="text-orange-400 font-semibold hover:underline">Login here</a>
                </div>
            </div>
        </div>
    );
}