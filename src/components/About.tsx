'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export function About() {
  return (
    <section id="about" className="scroll-mt-24 py-20 md:py-28 overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-xl border border-accent/15">
              <Image 
                src="/assets/set-02-white-lace-bridal.jpg" 
                alt="Detailed bridal style nail art crafted by Anishka" 
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-accent/5 mix-blend-overlay"></div>
            </div>
            
            {/* Decorative ring */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 w-20 h-20 md:w-28 md:h-28 rounded-full border border-accent/30 border-dashed pointer-events-none"
            />
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
            className="w-full lg:w-1/2 flex flex-col justify-center text-left"
          >
            <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
              Behind the Art
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-6 leading-tight font-medium">
              Crafting confidence, one set at a time.
            </h2>
            
            <div className="space-y-4 font-sans text-foreground/90 text-base sm:text-lg leading-relaxed">
              <p>
                Hi, I&apos;m <strong className="font-semibold text-foreground">Anishka</strong>. My passion for nail artistry stems from a devotion to precision, detail, and quality. I believe your nails are more than just an accessory—they are a personalized expression of confidence and individual style.
              </p>
              <p>
                Operating from my dedicated home studio in <strong className="font-semibold text-foreground">Leicester, UK</strong>, I established <em className="font-serif italic text-accent font-medium">Polished Lounge</em> to offer a relaxed, 1-on-1 luxury appointment experience. Whether you want a clean minimalist set or intricate custom nail art, every detail is tailored for you.
              </p>
              <p>
                Nail health is at the core of every service. I use premium, gentle gel products and meticulous prep techniques so your natural nails stay strong, healthy, and pristine.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4 border-t border-accent/10 pt-6">
              <div className="flex flex-col">
                <span className="text-xs font-sans font-semibold text-muted-foreground uppercase tracking-widest mb-1">
                  Follow the Portfolio
                </span>
                <a 
                  href="https://www.instagram.com/manicuresbyaniii" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-serif italic text-accent hover:text-accent-hover transition-colors text-lg flex items-center gap-2 font-medium"
                >
                  @manicuresbyaniii
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
