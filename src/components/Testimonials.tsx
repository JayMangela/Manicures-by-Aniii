'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Priya M.",
    role: "Regular Client",
    text: "Anishka is so incredibly talented! Every set she creates is a absolute work of art. The attention to detail is unreal and my Gel-X sets last over 3 weeks without a single lift.",
  },
  {
    id: 2,
    name: "Chloe T.",
    role: "First-Time Client",
    text: "I was so nervous booking a home studio, but Anishka made me feel right at home! Her space in Leicester is super clean, cozy, and relaxing. My nails look stunning!",
  },
  {
    id: 3,
    name: "Jasmine K.",
    role: "Bridal Nails Client",
    text: "The bridal set Anishka designed for my wedding was sheer perfection. She captured my vision with white lace detailing and subtle pearl accents. Everyone complimented my hands on the day!",
  },
  {
    id: 4,
    name: "Lauren H.",
    role: "BIAB Client",
    text: "I have been seeing Anishka for months now for BIAB overlays and my natural nails have never been longer or healthier. I won't go anywhere else in Leicester!",
  },
  {
    id: 5,
    name: "Simran R.",
    role: "Custom Art Client",
    text: "From selecting the design to the final topcoat, the entire experience is 10/10. Anishka's hand-painted chrome and aura nail art is unmatched!",
  },
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (isPaused) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(next, 6000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section id="testimonials" className="py-20 md:py-28 bg-background border-b border-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
          Kind Words
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-12 font-medium">
          Client Reviews
        </h2>

        <div 
          className="relative min-h-[260px] flex items-center justify-center bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-accent/15"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          role="region"
          aria-label="Client testimonials"
          aria-roledescription="carousel"
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="max-w-2xl mx-auto flex flex-col items-center"
              aria-live="polite"
            >
              {/* Quote Icon */}
              <svg className="w-8 h-8 text-accent/40 mb-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z"/>
              </svg>

              <p className="font-sans text-lg sm:text-xl text-foreground font-normal leading-relaxed italic mb-6">
                &ldquo;{TESTIMONIALS[current].text}&rdquo;
              </p>
              
              <footer className="flex flex-col items-center">
                <cite className="font-sans not-italic font-semibold text-foreground text-base">
                  {TESTIMONIALS[current].name}
                </cite>
                <span className="font-sans text-xs text-muted-foreground mt-0.5">
                  {TESTIMONIALS[current].role}
                </span>
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button 
            onClick={prev}
            className="w-10 h-10 rounded-full border border-accent/25 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent transition-all cursor-pointer bg-white"
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>

          {/* Indicators */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial slides">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className="cursor-pointer focus:outline-none rounded-full p-1"
                role="tab"
                aria-selected={current === idx}
                aria-label={`Testimonial ${idx + 1}`}
              >
                <div 
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    current === idx 
                      ? 'w-8 bg-accent' 
                      : 'w-2.5 bg-accent/30 hover:bg-accent/50'
                  }`}
                />
              </button>
            ))}
          </div>

          <button 
            onClick={next}
            className="w-10 h-10 rounded-full border border-accent/25 flex items-center justify-center text-foreground/70 hover:text-accent hover:border-accent transition-all cursor-pointer bg-white"
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
          </button>
        </div>

      </div>
    </section>
  );
}
