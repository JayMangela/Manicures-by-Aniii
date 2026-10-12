'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default admin pass code for Anishka / Polished Lounge
    if (password === 'ani2026' || password === 'admin') {
      if (typeof window !== 'undefined') {
        localStorage.setItem('polished_admin_authed', 'true');
      }
      router.push('/admin');
    } else {
      setError('Invalid admin passcode. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-3xl p-8 shadow-sm border border-accent/15"
      >
        <div className="text-center mb-8">
          <span className="text-xs font-sans font-semibold text-accent uppercase tracking-widest block mb-2">
            Polished Lounge &bull; Management Portal
          </span>
          <h1 className="font-serif text-3xl font-medium text-foreground">
            Owner Login
          </h1>
          <p className="text-xs text-muted-foreground font-sans mt-2">
            Enter your passcode to manage appointment bookings.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-2">
              Passcode
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin passcode..."
              className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white transition-all outline-none"
            />
          </div>

          {error && (
            <p className="text-xs font-sans text-red-500 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-accent text-white py-3.5 rounded-full font-sans font-medium text-sm hover:bg-accent-hover transition-colors shadow-md cursor-pointer"
          >
            Access Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
}
