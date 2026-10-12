'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Link from 'next/link';

export function Hero() {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden border-b border-accent/10 pt-16 pb-12">
      
      {/* Background Ambient Glows */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <motion.div 
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.05, 1],
            opacity: [0.15, 0.25, 0.15]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -right-1/4 w-[650px] h-[650px] rounded-full bg-accent/20 blur-[120px]"
        />
        <motion.div 
          animate={{
            y: [0, 25, 0],
            scale: [1, 1.08, 1],
            opacity: [0.12, 0.2, 0.12]
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -bottom-1/4 -left-1/4 w-[550px] h-[550px] rounded-full bg-accent/15 blur-[100px]"
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center z-10 flex flex-col items-center">
        
        <motion.span 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-xs sm:text-sm font-sans font-semibold tracking-[0.25em] text-accent uppercase mb-4"
        >
          Manicures by Anishka &bull; Leicester, UK
        </motion.span>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-6xl lg:text-7xl font-serif font-medium text-foreground leading-[1.1] tracking-tight mb-6"
        >
          Polished Lounge
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl font-sans font-normal leading-relaxed mb-10"
        >
          Boutique home-based nail artistry specializing in Gel Manicures, Gel-X extensions, BIAB, and detailed custom nail art.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <MagneticButton distance={0.5}>
            <Link 
              href="/book" 
              className="inline-flex items-center justify-center bg-foreground text-background px-8 py-4 rounded-full font-sans font-medium text-base sm:text-lg hover:bg-accent transition-all duration-300 shadow-md hover:shadow-xl hover:text-white"
            >
              Book an Appointment
            </Link>
          </MagneticButton>
          
          <Link
            href="/#services"
            className="inline-flex items-center justify-center px-6 py-3.5 rounded-full font-sans font-medium text-foreground/80 hover:text-accent transition-colors text-base"
          >
            Explore Services
          </Link>
        </motion.div>

      </div>

      {/* Scroll Cue */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="mt-16 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-muted-foreground/70">Scroll Down</span>
        <motion.div 
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-accent/60 to-transparent rounded-full"
        />
      </motion.div>

    </section>
  );
}
