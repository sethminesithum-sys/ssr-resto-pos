import React, { useState } from 'react';
import { Store, TrendingUp, Printer, Phone, Mail, ArrowRight, CheckCircle2, Star, Send, ShieldCheck, Zap } from 'lucide-react';

const LandingPage = () => {
  const [contactForm, setContactForm] = useState({ name: '', phone: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.phone || !contactForm.message) {
      alert('Please fill in all fields!');
      return;
    }
    alert('✅ Your message has been successfully sent to SSR Cloud Solutions!');
    setContactForm({ name: '', phone: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col justify-between">
      
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="bg-orange-600/20 p-2.5 rounded-xl border border-orange-500/30 text-orange-400">
            <Store className="w-6 h-6" />
          </div>
          <span className="font-bold text-lg tracking-wide">SSR Cloud POS</span>
        </div>

        <nav className="flex items-center space-x-8 text-xs font-semibold text-slate-300">
          <a href="#features" className="hover:text-orange-400 transition-colors">Features</a>
          <a href="#pricing" className="hover:text-orange-400 transition-colors">Pricing</a>
          <a href="#testimonials" className="hover:text-orange-400 transition-colors">Testimonials</a>
          <a href="#contact" className="hover:text-orange-400 transition-colors">Contact Us</a>
        </nav>

        <div className="flex items-center space-x-4">
          <a href="/login" className="text-sm font-semibold text-slate-300 hover:text-white transition-colors">
            Login
          </a>
          <a href="/register" className="bg-orange-600 hover:bg-orange-500 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center space-x-2">
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </header>

      {/* Main Content */}
      <main className="space-y-24 pb-20">
        
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-8 pt-20 text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-orange-600/10 border border-orange-500/30 px-4 py-1.5 rounded-full text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Zap className="w-3.5 h-3.5" />
            <span>Next-Gen Restaurant POS System</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight">
            Empower Your Business With <span className="text-orange-500">Powerful Tools</span>
          </h1>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Everything you need to run your daily operations seamlessly, manage inventory, print receipts, and track financial growth in real-time.
          </p>
          <div className="pt-4 flex justify-center space-x-4">
            <a href="/register" className="bg-orange-600 hover:bg-orange-500 text-white font-bold px-8 py-3.5 rounded-2xl transition-all shadow-lg shadow-orange-600/30 flex items-center space-x-2 text-sm">
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Core Features</span>
            <h2 className="text-3xl font-bold">Designed for Maximum Efficiency</h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4 hover:border-orange-500/50 transition-all">
              <div className="bg-orange-600/20 w-fit p-3.5 rounded-xl border border-orange-500/30 text-orange-400">
                <Store className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Smart Menu Management</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Easily add, update, and manage your food items, categories, pricing, and active stock levels in real-time.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4 hover:border-orange-500/50 transition-all">
              <div className="bg-orange-600/20 w-fit p-3.5 rounded-xl border border-orange-500/30 text-orange-400">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Analytics Dashboard</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Track today's revenue, net profits, daily operational expenses, and detailed financial summaries instantly.
              </p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4 hover:border-orange-500/50 transition-all">
              <div className="bg-orange-600/20 w-fit p-3.5 rounded-xl border border-orange-500/30 text-orange-400">
                <Printer className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">Fast Billing & Thermal Print</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Process customer orders quickly, apply discounts, lookup customer visits, and print thermal receipts effortlessly.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans Section */}
        <section id="pricing" className="max-w-7xl mx-auto px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Pricing Plans</span>
            <h2 className="text-3xl font-bold">Choose the Best Plan for Your Business</h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Starter Plan */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] bg-slate-800 text-slate-300 px-3 py-1 rounded-full uppercase font-bold">Basic</span>
                <h3 className="text-2xl font-bold">Starter Plan</h3>
                <p className="text-xs text-slate-400">Perfect for small local restaurants getting started.</p>
                <div className="text-3xl font-extrabold text-orange-400 font-mono">
                  Rs. 3,500 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Smart Menu Management</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Standard Billing & Thermal Print</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Daily Revenue Analytics</span></li>
                </ul>
              </div>
              <a href="/register" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-all">
                Select Starter
              </a>
            </div>

            {/* Professional Plan */}
            <div className="bg-slate-900 border border-orange-500 ring-2 ring-orange-500/20 p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3 right-6 bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow">Most Popular</div>
              <div className="space-y-4">
                <span className="text-[10px] bg-orange-600/20 text-orange-400 px-3 py-1 rounded-full uppercase font-bold">Advanced</span>
                <h3 className="text-2xl font-bold">Professional Plan</h3>
                <p className="text-xs text-slate-400">Ideal for growing restaurants with customer loyalty.</p>
                <div className="text-3xl font-extrabold text-orange-400 font-mono">
                  Rs. 6,500 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Everything in Starter</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Customer Directory & Loyalty Tracking</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Marketing & Offers SMS Broadcast</span></li>
                </ul>
              </div>
              <a href="/register" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3 rounded-xl text-center text-sm transition-all shadow-lg shadow-orange-600/30">
                Select Professional
              </a>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[10px] bg-purple-600/20 text-purple-400 px-3 py-1 rounded-full uppercase font-bold">Unlimited</span>
                <h3 className="text-2xl font-bold">Enterprise Plan</h3>
                <p className="text-xs text-slate-400">For multi-branch or high-volume restaurants.</p>
                <div className="text-3xl font-extrabold text-orange-400 font-mono">
                  Rs. 12,000 <span className="text-xs text-slate-400 font-normal">/ month</span>
                </div>
                <ul className="space-y-3 text-xs text-slate-300 pt-2">
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Everything in Professional</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Priority 24/7 VIP Support Desk</span></li>
                  <li className="flex items-center space-x-2"><CheckCircle2 className="w-4 h-4 text-orange-400" /><span>Advanced Financial Analytics & Expenses</span></li>
                </ul>
              </div>
              <a href="/register" className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-3 rounded-xl text-center text-sm transition-all">
                Select Enterprise
              </a>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="max-w-7xl mx-auto px-8 space-y-12">
          <div className="text-center space-y-3">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Testimonials</span>
            <h2 className="text-3xl font-bold">Trusted by Restaurant Owners</h2>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "SSR Cloud POS transformed how we handle our daily restaurant orders and billing. Super fast and reliable!"
              </p>
              <div>
                <p className="font-bold text-sm">Dinuka Perera</p>
                <p className="text-[11px] text-slate-500">Perera Family Restaurant</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "The thermal printing and customer loyalty tracking features helped us boost repeat customers by 40%."
              </p>
              <div>
                <p className="font-bold text-sm">Kasun Silva</p>
                <p className="text-[11px] text-slate-500">Silva Resto & Cafe</p>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4">
              <div className="flex text-amber-400 space-x-1">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "Incredible support team and very user-friendly interface. Highly recommended for all restaurant owners."
              </p>
              <div>
                <p className="font-bold text-sm">Sanduni Mendis</p>
                <p className="text-[11px] text-slate-500">Mendis Foods</p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Us Section */}
        <section id="contact" className="max-w-7xl mx-auto px-8 grid grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Get in Touch</span>
            <h2 className="text-3xl font-bold">Have Questions? Reach Out to Us</h2>
            <p className="text-slate-400 text-sm leading-relaxed">
              Our support team is available 24/7 to assist you with any inquiries or technical assistance.
            </p>
            <div className="space-y-3 pt-2 text-sm text-slate-300">
              <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Phone className="w-5 h-5 text-orange-400" />
                <span className="font-mono">0765617093</span>
              </div>
              <div className="flex items-center space-x-3 bg-slate-900 p-4 rounded-xl border border-slate-800">
                <Mail className="w-5 h-5 text-orange-400" />
                <span>sethminesithum@gmail.com</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="bg-slate-900 border border-slate-800 p-8 rounded-2xl shadow-xl space-y-4">
            <h3 className="font-bold text-lg mb-2">Send Us a Message</h3>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Full Name</label>
              <input 
                type="text" placeholder="Your name"
                value={contactForm.name} onChange={(e) => setContactForm({...contactForm, name: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 text-slate-100"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Phone Number</label>
              <input 
                type="text" placeholder="0765617093"
                value={contactForm.phone} onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm outline-none focus:border-orange-500 text-slate-100 font-mono"
              />
            </div>
            <div>
              <label className="text-xs text-slate-400 block mb-1">Message</label>
              <textarea 
                rows="4" placeholder="How can we help you?"
                value={contactForm.message} onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm outline-none focus:border-orange-500 text-slate-100 resize-none"
              ></textarea>
            </div>
            <button type="submit" className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-orange-600/30 flex items-center justify-center space-x-2">
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/40 px-8 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-600/20 p-2 rounded-lg text-orange-400">
              <Store className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-sm">SSR Resto POS Platform</p>
              <p className="text-[11px] text-slate-500">© 2026 SSR Cloud Solutions. All rights reserved.</p>
            </div>
          </div>

          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-orange-400" />
              <span className="font-mono">0765617093</span>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-orange-400" />
              <span>sethminesithum@gmail.com</span>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;