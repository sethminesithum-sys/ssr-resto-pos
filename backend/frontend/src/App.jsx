import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyEmail from './pages/VerifyEmail';
import SubscriptionPlans from './pages/SubscriptionPlans';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel'; // 👈 මෙන්න මේක මෙතනට ඉම්පෝර්ට් කරන්න (ඔයාගේ ෆෝල්ඩර් ස්ට্রක්චර් එක අනුව පාත් එක දෙන්න)

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/subscription-plans" element={<SubscriptionPlans />} />
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* 🚀 Master Admin Panel Route */}
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
}

export default App;