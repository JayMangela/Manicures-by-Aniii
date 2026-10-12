'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 150 && latest > previous) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 flex justify-center transition-all duration-300 ${isScrolled ? 'pt-4 px-4' : 'pt-0 px-0'}`}
    >
      <div 
        className={`w-full flex justify-between items-center transition-all duration-300 ${
          isScrolled 
            ? 'max-w-4xl bg-background/85 backdrop-blur-lg border border-accent/20 rounded-full px-6 h-16 shadow-lg shadow-accent/5' 
            : 'max-w-7xl bg-background/80 backdrop-blur-md border-b border-accent/10 px-4 sm:px-6 lg:px-8 h-20'
        }`}
      >
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <Image 
              src="/assets/logo.jpg" 
              alt="Manicures by Ani Logo" 
              width={isScrolled ? 36 : 48} 
              height={isScrolled ? 36 : 48} 
              className="rounded-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <span className={`font-serif font-medium text-foreground transition-all duration-300 hidden sm:block ${isScrolled ? 'text-lg' : 'text-xl'}`}>
              Manicures by Ani
            </span>
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/#about" className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm">About</Link>
          <Link href="/#services" className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm">Services</Link>
          <Link href="/#gallery" className="text-foreground/80 hover:text-accent transition-colors font-medium text-sm">Gallery</Link>
        </div>
        <div className="flex items-center space-x-4">
          <a 
            href="https://www.instagram.com/manicuresbyaniii" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground hover:text-accent transition-colors"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          <Link 
            href="/book" 
            className={`bg-accent text-white rounded-full font-medium hover:bg-accent-hover transition-all shadow-sm hover:shadow-md ${isScrolled ? 'px-4 py-1.5 text-sm' : 'px-5 py-2'}`}
          >
            Book
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
