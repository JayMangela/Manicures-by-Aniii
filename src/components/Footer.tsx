import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-background border-t border-accent/10 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Image 
              src="/assets/logo.jpg" 
              alt="Manicures by Ani Logo" 
              width={60} 
              height={60} 
              className="rounded-full object-cover mb-3"
            />
            <h3 className="font-serif text-2xl font-medium text-foreground">Polished Lounge</h3>
            <p className="text-muted-foreground font-sans text-sm mt-1 text-center md:text-left">Leicester, UK — Home Studio Artistry</p>
          </div>
          
          <div className="flex flex-wrap justify-center md:justify-end gap-6 font-sans text-sm font-medium">
            <Link href="/" className="text-foreground/80 hover:text-accent transition-colors">Home</Link>
            <Link href="/#about" className="text-foreground/80 hover:text-accent transition-colors">About</Link>
            <Link href="/#services" className="text-foreground/80 hover:text-accent transition-colors">Services</Link>
            <Link href="/design-calculator" className="text-accent hover:text-accent-hover transition-colors">Design Calculator</Link>
            <Link href="/book" className="text-foreground/80 hover:text-accent transition-colors">Book Appointment</Link>
          </div>

          <div className="flex flex-col items-center md:items-end gap-3">
            <Link 
              href="/book" 
              className="bg-foreground text-background px-6 py-2.5 rounded-full font-sans font-medium text-sm hover:bg-accent hover:text-white transition-all shadow-sm"
            >
              Book an Appointment
            </Link>
            <a 
              href="https://www.instagram.com/manicuresbyaniii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-foreground/80 hover:text-accent transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@manicuresbyaniii</span>
            </a>
          </div>
        </div>
        
        <div className="border-t border-accent/10 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs font-sans text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} Manicures by Ani (Polished Lounge). All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <Link href="/book#policy" className="hover:text-accent transition-colors">Booking Policy</Link>
            <Link href="/admin/login" className="hover:text-accent transition-colors text-muted-foreground/60">Owner Portal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
