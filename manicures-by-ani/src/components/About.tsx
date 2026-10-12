'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-[2rem] overflow-hidden shadow-2xl border border-accent/10">
              <Image 
                src="/assets/set-02-white-lace-bridal.jpg" 
                alt="Detailed bridal style nail art with white lace and rhinestones" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay"></div>
            </div>
            
            {/* Decorative element */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-8 -right-8 md:-bottom-12 md:-right-12 w-24 h-24 md:w-32 md:h-32 rounded-full border border-accent/30 border-dashed"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-center lg:text-left"
          >
            <h2 className="text-sm font-semibold tracking-widest text-accent uppercase mb-4">Behind the Art</h2>
            <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-8 leading-tight">
              Crafting confidence, one set at a time.
            </h3>
            
            <div className="space-y-6 text-foreground/80 font-light text-lg leading-relaxed">
              {/* PLACEHOLDER — replace with Anishka's real bio text */}
              <p>
                Hi, I am Ani. My journey into nail artistry started from a deep appreciation for the little details. I believe that your nails are more than just an accessory; they are a form of self-expression, a quiet confidence, and a canvas for beautiful art.
              </p>
              <p>
                Operating from my cozy home studio in Leicester, I created Polished Lounge to offer a boutique, one-on-one experience. Whether we are crafting a minimal French tip or an intricate Gel-X extension with heavy designs, my goal is to ensure you walk out feeling absolutely radiant and pampered.
              </p>
              <p>
                I prioritize nail health just as much as aesthetics, carefully sourcing high-quality products and constantly refining my techniques to give you durable, stunning results.
              </p>
              {/* END PLACEHOLDER */}
            </div>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="w-16 h-px bg-accent/30 hidden sm:block"></div>
              <div className="flex flex-col items-center sm:items-start">
                <span className="text-sm font-medium text-foreground uppercase tracking-widest mb-1">
                  As seen on Instagram
                </span>
                <a 
                  href="https://www.instagram.com/manicuresbyaniii" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif italic text-accent hover:text-accent-hover transition-colors text-lg flex items-center gap-2"
                >
                  @manicuresbyaniii
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-1"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
