'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Loading() {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Minimum display time for brand impression (1.5s)
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="fixed inset-0 z-[9999] bg-background flex items-center justify-center"
      style={{ backgroundColor: '#FAF7F5' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center gap-8 px-6"
      >
        {/* Logo / Brand Mark */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative w-24 h-24 md:w-32 md:h-32">
            {/* Nail polish bottle silhouette with sparkle animation */}
            <svg
              viewBox="0 0 100 140"
              className="w-full h-full text-accent"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Bottle body */}
              <path d="M30 120 L30 40 Q30 25 40 25 L60 25 Q70 25 70 40 L70 120" />
              {/* Bottle neck */}
              <rect x="42" y="15" width="16" height="25" rx="2" />
              {/* Cap */}
              <rect x="38" y="8" width="24" height="10" rx="3" />
              {/* Liquid level */}
              <path d="M34 90 L66 90" strokeWidth="1.5" opacity="0.6" />
              {/* Sparkle accents */}
              <g className="sparkles" strokeWidth="1.5">
                <line x1="38" y1="50" x2="32" y2="44" />
                <line x1="38" y1="50" x2="38" y2="42" />
                <line x1="38" y1="50" x2="44" y2="44" />
                <line x1="62" y1="65" x2="56" y2="59" />
                <line x1="62" y1="65" x2="62" y2="57" />
                <line x1="62" y1="65" x2="68" y2="59" />
                <line x1="45" y1="100" x2="39" y2="94" />
                <line x1="45" y1="100" x2="45" y2="92" />
                <line x1="45" y1="100" x2="51" y2="94" />
              </g>
            </svg>
            {/* Animated sparkle overlay */}
            <motion.div
              className="absolute inset-0 pointer-events-none"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <svg viewBox="0 0 100 140" className="w-full h-full text-accent/40">
                <g strokeWidth="1" opacity="0.7">
                  <line x1="28" y1="55" x2="22" y2="49" />
                  <line x1="28" y1="55" x2="28" y2="47" />
                  <line x1="28" y1="55" x2="34" y2="49" />
                  <line x1="72" y1="70" x2="66" y2="64" />
                  <line x1="72" y1="70" x2="72" y2="62" />
                  <line x1="72" y1="70" x2="78" y2="64" />
                </g>
              </svg>
            </motion.div>
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="font-serif text-3xl md:text-4xl font-medium text-foreground tracking-tight">
            Manicures by Ani
          </p>
          <p className="font-sans text-xs md:text-sm text-muted-foreground uppercase tracking-widest mt-1">
            Polished Lounge &bull; Leicester
          </p>
        </motion.div>

        {/* Loading Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          {/* Custom animated loader */}
          <div className="relative w-10 h-10">
            <motion.svg
              className="w-full h-full text-accent/20"
              viewBox="0 0 40 40"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="60"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </motion.svg>
            <motion.svg
              className="absolute inset-0 w-full h-full text-accent"
              viewBox="0 0 40 40"
              animate={{
                rotate: [0, 360],
                pathLength: [0, 1, 0],
                pathOffset: [0, 0.25, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <circle
                cx="20"
                cy="20"
                r="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeDasharray="60"
                strokeDashoffset="0"
                strokeLinecap="round"
              />
            </motion.svg>
          </div>

          <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider">
            Loading your lounge...
          </p>
        </motion.div>

        {/* Subtle decorative elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex items-center gap-3 opacity-40"
        >
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="w-2 h-2 rounded-full bg-accent" />
          <div className="w-1 h-1 rounded-full bg-accent/50" />
          <div className="w-16 h-px bg-gradient-to-r from-accent via-transparent to-transparent" />
        </motion.div>
      </motion.div>

      {/* Exit animation - fade out when content loads */}
      <motion.div
        initial={false}
        animate={{ opacity: showContent ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, delay: showContent ? 0 : 0.2 }}
        className="fixed inset-0 bg-background z-[9999]"
        style={{ backgroundColor: '#FAF7F5' }}
      />
    </div>
  );
}