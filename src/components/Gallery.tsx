'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

const GALLERY_ITEMS = [
  { type: 'image', src: '/assets/set-05-maroon-aura-chrome.jpg', alt: 'Maroon aura chrome nail set' },
  { type: 'video', src: '/assets/clip-01.mp4', alt: 'Finished nail set video' },
  { type: 'image', src: '/assets/set-01-halloween-venom.jpg', alt: 'Halloween venom nail set' },
  { type: 'image', src: '/assets/set-04-dark-textured-snakeskin.jpg', alt: 'Dark textured snakeskin nail set' },
  { type: 'video', src: '/assets/clip-02.mp4', alt: 'Finished nail set video' },
  { type: 'image', src: '/assets/set-03-white-lace-bridal-alt.jpg', alt: 'White lace bridal nail set' },
  { type: 'image', src: '/assets/set-07-pink-chrome-french.jpg', alt: 'Pink chrome french tip nail set' },
  { type: 'image', src: '/assets/set-06-gold-dot-leopard.jpg', alt: 'Gold dot leopard nail set' },
  { type: 'video', src: '/assets/clip-03.mp4', alt: 'Finished nail set video' },
  { type: 'image', src: '/assets/set-08-glossy-nude-french.jpg', alt: 'Glossy nude french tip nail set' },
  { type: 'image', src: '/assets/set-09-white-valentine-hearts.jpg', alt: 'White valentine hearts nail set' }
];

function GalleryItem({ item, index }: { item: typeof GALLERY_ITEMS[0], index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (item.type === 'video' && videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
      className="mb-4 sm:mb-6 break-inside-avoid"
    >
      <Link
        href="/book"
        className="block rounded-2xl overflow-hidden group relative cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {item.type === 'image' ? (
          <div className="relative w-full" style={{ paddingBottom: '125%' }}>
            <Image
              src={item.src}
              alt={item.alt}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        ) : (
          <div className="relative w-full bg-foreground/5" style={{ paddingBottom: '150%' }}>
            <video
              ref={videoRef}
              src={item.src}
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Play Icon Indicator Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1"><polygon points="6 3 20 12 6 21 6 3"/></svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Hover overlay — "Try this now" CTA */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
          <span className="text-white font-medium text-base tracking-wide bg-white/15 backdrop-blur-sm px-6 py-2.5 rounded-full border border-white/25 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 drop-shadow-lg">
            Try this now
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

export function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-24 py-24 md:py-32 bg-background border-b border-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-4">The Portfolio</h2>
        <h3 className="font-serif text-4xl md:text-5xl text-foreground mb-16">
          Recent Work
        </h3>
        
        {/* CSS Columns Masonry */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 text-left">
          {GALLERY_ITEMS.map((item, idx) => (
            <GalleryItem key={idx} item={item} index={idx % 3} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <a 
            href="https://www.instagram.com/manicuresbyaniii" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-foreground hover:text-accent font-medium transition-colors"
          >
            <span>View more on Instagram</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    </section>
  );
}
