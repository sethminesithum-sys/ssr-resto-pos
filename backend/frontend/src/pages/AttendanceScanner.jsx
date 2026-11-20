import React, { useState } from 'react';
import { QrCode, CheckCircle2 } from 'lucide-react';

export default function AttendanceScanner() {
  const [studentCode, setStudentCode] = useState('');
  const [scanResult, setScanResult] = useState(null);

  const handleScanSubmit = (e) => {
    e.preventDefault();
    if (!studentCode) return;
    
    setScanResult({
      name: 'සෙත්මිණ රෝහණ',
      class: 'Advanced Level Combined Maths',
      time: new Date().toLocaleTimeString(),
      smsSent: true
    });
    setStudentCode('');
  };

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-2">QR පැමිණීමේ ස්කෑනරය (Attendance Scanner)</h1>
      <p className="text-gray-400 text-sm mb-6">ශිෂ්‍යයාගේ QR කේතය හෝ හැඳුනුම් අංකය ඇතුළත් කරන්න (ස්වයංක්‍රීයව මව්පියන්ට SMS යැවේ).</p>

      <form onSubmit={handleScanSubmit} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl mb-6 shadow-lg">
        <div className="flex gap-4">
          <div className="relative flex-1">
            <QrCode className="absolute left-3 top-3.5 text-gray-400" size={20} />
            <input 
              type="text" 
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              placeholder="Student ID / QR Code (උදා: STU-2026-001)" 
              className="w-full bg-slate-800 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
          <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-xl font-semibold transition">
            පැමිණීම සටහන් කරන්න
          </button>
        </div>
      </form>

      {scanResult && (
        <div className="bg-emerald-950/40 border border-emerald-600/50 p-6 rounded-2xl flex items-start gap-4">
          <CheckCircle2 className="text-emerald-400 flex-shrink-0 mt-1" size={28} />
          <div>
            <h3 className="text-lg font-bold text-emerald-200">පැමිණීම සාර්ථකයි!</h3>
            <p className="text-sm text-gray-300 mt-1">ශිෂ්‍යයා: <span className="font-semibold text-white">{scanResult.name}</span></p>
            <p className="text-sm text-gray-300">පන්තිය: <span className="font-semibold text-white">{scanResult.class}</span></p>
            <p className="text-sm text-gray-300">වේලාව: <span className="font-semibold text-white">{scanResult.time}</span></p>
            <span className="inline-block mt-3 bg-emerald-900 text-emerald-300 text-xs px-3 py-1 rounded-full font-medium">
              ✓ මාපිය SMS ස්වයංක්‍රීයව යවන ලදී
            </span>
          </div>
        </div>
      )}
    </div>
  );
}