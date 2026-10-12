'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col items-center justify-center overflow-hidden border-b border-accent/10 pt-20">
      
      {/* Subtle Background Motion */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, -5, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-accent/10 blur-[120px]"
        />
        <motion.div 
          animate={{
            y: [0, 30, 0],
            rotate: [0, -5, 5, 0],
            opacity: [0.1, 0.15, 0.1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-accent/20 blur-[100px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-foreground leading-tight tracking-tight mb-6"
        >
          Polished Lounge
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-foreground/80 max-w-2xl font-light mb-12"
        >
          Boutique home-based nail artistry in Leicester, UK.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <MagneticButton distance={0.5}>
            <Link 
              href="/book" 
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-full font-medium text-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl"
            >
              Book an Appointment
            </Link>
          </MagneticButton>
        </motion.div>

      </div>

      {/* Scroll Cue */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs uppercase tracking-widest text-foreground/50">Scroll</span>
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
        />
      </motion.div>

    </section>
  );
}
