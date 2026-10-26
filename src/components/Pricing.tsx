'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const CATEGORIES = ["Hands", "Feet", "Bundles", "Removals"];

export const PRICING_DATA: Record<string, { id: string; name: string; price: string; description?: string }[]> = {
  "Hands": [
    { id: "dry-mani", name: "Dry Manicure", price: "£15", description: "Precision cuticle work, nail shaping, and buffing with nourishing oil finish." },
    { id: "gel-mani", name: "Gel Manicure", price: "£18", description: "Long-lasting gel polish overlay with expert cuticle prep and high shine." },
    { id: "biab", name: "Builder Gel (BIAB) / Hard Gel", price: "£20", description: "Strengthening builder gel layer to promote natural nail growth and durability." },
    { id: "poly-overlay", name: "Polygel Overlay", price: "£25", description: "Strong, lightweight protective overlay over your natural nail length." },
    { id: "poly-ext", name: "Polygel Extensions (Dual Forms)", price: "£30", description: "Full set extensions built with polygel dual forms for instant length." },
    { id: "gelx-solid", name: "Gel-X Full Set (Solid Colour)", price: "£20", description: "Full coverage soft gel extension tips with single solid gel color." },
    { id: "gelx-french", name: "Gel-X Full Set (French Tip)", price: "£28", description: "Full coverage extensions with hand-drawn classic, micro, or colored French tips." },
    { id: "gelx-minimal", name: "Gel-X Full Set (Minimal Design)", price: "£25", description: "Full coverage extensions with simple accents (dots, subtle lines, foil, 1-2 accent nails)." },
    { id: "gelx-heavy", name: "Gel-X Full Set (Medium-Heavy Designs)", price: "£30", description: "Custom 3D art, chrome, aura gradients, rhinestones, or full 10-nail art." },
    { id: "infills", name: "Any Service Infills (2-3 Weeks)", price: "£20", description: "Infill rebalance for BIAB, hard gel, or polygel within 2 to 3 weeks of previous appointment." }
  ],
  "Feet": [
    { id: "gel-pedi", name: "Gel Pedicure", price: "£15", description: "Toe nail shaping, cuticle prep, and long-lasting gel polish application." },
    { id: "gelx-feet", name: "Gel-X Extensions (Toes)", price: "£28", description: "Full coverage gel extensions designed for toe nails with solid or custom color." }
  ],
  "Bundles": [
    { id: "bundle-hands-toes-gel", name: "Gel Polish Hands & Toes Bundle", price: "£30", description: "Save £3 when booking Gel Manicure & Gel Pedicure together." },
    { id: "bundle-gelx-hands-gel-toes", name: "Gel-X Hands & Gel Toes Bundle", price: "£40", description: "Full Gel-X set for hands combined with a soothing Gel Pedicure." },
    { id: "bundle-gelx-both", name: "Gel-X Hands & Gel-X Toes Bundle", price: "£48", description: "Ultimate full extension package for both hands and feet." }
  ],
  "Removals": [
    { id: "rem-gel-single", name: "Single Area Removal - Gel Polish", price: "£2", description: "Safe gel polish removal for either hands or feet." },
    { id: "rem-gelx-single", name: "Single Area Removal - Gel-X / Extensions", price: "£5", description: "Gentle soak-off removal for extensions on hands or feet." },
    { id: "rem-gel-both", name: "Combined Area Removal - Gel Polish", price: "£5", description: "Gel polish removal for both hands and feet." },
    { id: "rem-gelx-both", name: "Combined Area Removal - Gel-X / Extensions", price: "£5", description: "Complete extension removal for both hands and feet." }
  ]
};

export function Pricing() {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0]);

  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28 bg-background border-b border-accent/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
            Menu & Tariff
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground mb-4 font-medium">
            Services & Pricing
          </h2>
          <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-xl mx-auto">
            Explore our curated menu of high-quality gel treatments, extensions, and custom nail art.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => setActiveTab(category)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-sans font-medium transition-colors cursor-pointer ${
                activeTab === category 
                  ? "text-white" 
                  : "text-foreground/80 hover:text-foreground hover:bg-accent/10"
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="absolute inset-0 bg-accent rounded-full shadow-md"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category}</span>
            </button>
          ))}
        </div>

        {/* Pricing Items Container */}
        <div className="min-h-[420px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-accent/15"
            >
              <div className="divide-y divide-accent/10">
                {PRICING_DATA[activeTab].map((item) => (
                  <div key={item.id} className="py-4 sm:py-5 first:pt-0 last:pb-0 group">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-3">
                          <h3 className="text-foreground font-sans font-medium text-base sm:text-lg group-hover:text-accent transition-colors">
                            {item.name}
                          </h3>
                        </div>
                        {item.description && (
                          <p className="text-sm font-sans text-muted-foreground mt-1 leading-normal">
                            {item.description}
                          </p>
                        )}
                      </div>
                      
                      <div className="flex items-center justify-between sm:justify-end gap-4 mt-2 sm:mt-0">
                        <span className="font-serif text-xl sm:text-2xl font-semibold text-foreground">
                          {item.price}
                        </span>
                        <Link
                          href={`/book?service=${encodeURIComponent(item.name)}`}
                          className="text-xs font-sans font-semibold text-accent hover:text-accent-hover bg-accent/10 hover:bg-accent/20 px-3.5 py-1.5 rounded-full transition-colors"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 text-center text-xs sm:text-sm font-sans text-muted-foreground">
          * Starting guide prices. Final cost may vary based on custom art complexity and removal needs.
        </div>

      </div>
    </section>
  );
}
