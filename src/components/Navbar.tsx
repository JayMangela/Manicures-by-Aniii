'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 50) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > 150 && latest > previous && !isMobileMenuOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    closeMobileMenu();
    if (typeof window !== 'undefined' && window.location.pathname === '/') {
      e.preventDefault();
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }
  };

  return (
    <motion.nav 
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 w-full z-50 flex flex-col items-center transition-all duration-300 ${isScrolled ? 'pt-3 px-3 sm:pt-4 sm:px-4' : 'pt-0 px-0'}`}
    >
      <div 
        className={`w-full flex justify-between items-center transition-all duration-300 ${
          isScrolled 
            ? 'max-w-6xl bg-background/95 backdrop-blur-lg border border-accent/20 rounded-2xl sm:rounded-full px-4 sm:px-6 h-16 shadow-lg shadow-accent/5' 
            : 'max-w-7xl bg-background/90 backdrop-blur-md border-b border-accent/10 px-4 sm:px-6 lg:px-8 h-20'
        }`}
      >
        <div className="flex-shrink-0 flex items-center">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center gap-2.5 sm:gap-3 group">
            <Image 
              src="/assets/logo.jpg" 
              alt="Manicures by Ani Logo" 
              width={isScrolled ? 36 : 42} 
              height={isScrolled ? 36 : 42} 
              className="rounded-full object-cover transition-all duration-300 group-hover:scale-105"
            />
            <span className={`font-serif font-medium text-foreground transition-all duration-300 ${isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
              Manicures by Ani
            </span>
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link href="/#about" onClick={(e) => handleScrollTo(e, 'about')} className="text-foreground/80 hover:text-accent transition-colors font-sans font-medium text-sm">About</Link>
          <Link href="/#services" onClick={(e) => handleScrollTo(e, 'services')} className="text-foreground/80 hover:text-accent transition-colors font-sans font-medium text-sm">Services</Link>
          <Link href="/#gallery" onClick={(e) => handleScrollTo(e, 'gallery')} className="text-foreground/80 hover:text-accent transition-colors font-sans font-medium text-sm">Portfolio</Link>
          <Link href="/design-calculator" className="text-accent hover:text-accent-hover transition-colors font-sans font-semibold text-sm">Custom Calculator</Link>
          <Link href="/care-guide" className="text-foreground/80 hover:text-accent transition-colors font-sans font-medium text-sm">Care Guide</Link>
        </div>

        {/* Action Buttons & Mobile Hamburger */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <a 
            href="https://www.instagram.com/manicuresbyaniii" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-foreground/80 hover:text-accent transition-colors p-2 hidden lg:block"
            aria-label="Instagram"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
          </a>
          
          <Link 
            href="/admin" 
            className="border border-foreground/20 hover:border-accent text-foreground hover:text-accent px-3 py-1.5 rounded-full font-sans font-medium text-xs hidden sm:inline-block transition-all"
          >
            Admin
          </Link>

          <Link 
            href="/book" 
            className={`bg-accent text-white rounded-full font-sans font-medium hover:bg-accent-hover transition-all shadow-sm hover:shadow-md hidden sm:inline-block ${isScrolled ? 'px-4 py-1.5 text-xs sm:text-sm' : 'px-5 py-2 text-sm'}`}
          >
            Book Appointment
          </Link>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Mobile Menu"
            className="md:hidden p-2 rounded-xl text-foreground hover:text-accent hover:bg-accent/10 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="w-full max-w-6xl md:hidden bg-white border border-accent/20 rounded-2xl shadow-xl mt-2 overflow-hidden px-6 py-6"
          >
            <div className="flex flex-col space-y-4 font-sans font-medium text-base">
              <Link 
                href="/#about" 
                onClick={(e) => handleScrollTo(e, 'about')}
                className="text-foreground hover:text-accent transition-colors py-1.5 border-b border-accent/10"
              >
                About Ani
              </Link>
              <Link 
                href="/#services" 
                onClick={(e) => handleScrollTo(e, 'services')}
                className="text-foreground hover:text-accent transition-colors py-1.5 border-b border-accent/10"
              >
                Services & Pricing
              </Link>
              <Link 
                href="/#gallery" 
                onClick={(e) => handleScrollTo(e, 'gallery')}
                className="text-foreground hover:text-accent transition-colors py-1.5 border-b border-accent/10"
              >
                Portfolio & Gallery
              </Link>
              <Link 
                href="/design-calculator" 
                onClick={closeMobileMenu}
                className="text-accent font-semibold transition-colors py-1.5 border-b border-accent/10"
              >
                Custom Set Calculator
              </Link>
              <Link 
                href="/care-guide" 
                onClick={closeMobileMenu}
                className="text-foreground hover:text-accent transition-colors py-1.5 border-b border-accent/10"
              >
                Care & Prep Guide
              </Link>
              <Link 
                href="/admin" 
                onClick={closeMobileMenu}
                className="text-foreground/80 hover:text-accent transition-colors py-1.5 border-b border-accent/10 text-sm"
              >
                Admin Dashboard
              </Link>

              <div className="pt-2 flex flex-col gap-3">
                <Link 
                  href="/book" 
                  onClick={closeMobileMenu}
                  className="w-full bg-accent text-white text-center rounded-full font-medium py-3 hover:bg-accent-hover transition-colors shadow-sm"
                >
                  Book Appointment
                </Link>
                <a 
                  href="https://www.instagram.com/manicuresbyaniii" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full border border-accent/30 text-accent text-center rounded-full font-medium py-2.5 flex items-center justify-center gap-2 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
