'use client';

import { motion } from 'framer-motion';

export default function AdminLoading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center" style={{ backgroundColor: '#FAF7F5' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-6 px-6"
      >
        {/* Admin icon */}
        <div className="relative w-16 h-16">
          <svg
            viewBox="0 0 48 48"
            className="w-full h-full text-accent"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="6" y="6" width="36" height="36" rx="6" />
            <path d="M12 18h24M12 24h16M12 30h20" />
          </svg>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 48 48" className="w-full h-full text-accent/30" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="24" cy="24" r="18" strokeDasharray="60" strokeDashoffset="0" strokeLinecap="round" />
            </svg>
          </motion.div>
        </div>

        <div className="text-center">
          <p className="font-serif text-xl font-medium text-foreground">Owner Portal</p>
          <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mt-1">Loading dashboard...</p>
        </div>

        <div className="relative w-8 h-8">
          <motion.svg
            className="w-full h-full text-accent/20"
            viewBox="0 0 32 32"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          >
            <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="45" strokeDashoffset="0" strokeLinecap="round" />
          </motion.svg>
          <motion.svg
            className="absolute inset-0 w-full h-full text-accent"
            viewBox="0 0 32 32"
            animate={{
              pathLength: [0, 1, 0],
              pathOffset: [0, 0.25, 1],
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <circle cx="16" cy="16" r="12" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="45" strokeDashoffset="0" strokeLinecap="round" />
          </motion.svg>
        </div>
      </motion.div>
    </div>
  );
}