'use client';

import React from 'react';
import { motion } from 'framer-motion';

const POLICY_ITEMS = [
  {
    title: "Nail Preparation",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/></svg>
    ),
    content: "Please remove any old gel, acrylic, or nail polish before your appointment unless removal has been booked."
  },
  {
    title: "Guests & Visitors",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    ),
    content: "Only one guest is permitted with you. Please do not bring additional people or children unless previously agreed."
  },
  {
    title: "Health & Illness",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
    ),
    content: "Please do not book if you are feeling unwell. If you become sick before your appointment, please reschedule."
  },
  {
    title: "Medical Disclosure",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="M9 15h6"/></svg>
    ),
    content: "Clients must disclose any allergies, sensitivities, medical conditions affecting the nails/skin, or previous reactions to nail products before treatment."
  },
  {
    title: "Nail Health & Infections",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    ),
    content: "I will not work on nails with active infections, open wounds, contagious conditions, or severe damage. Severely bitten or damaged nails may not be suitable for treatment."
  },
  {
    title: "Design Communication",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3z"/></svg>
    ),
    content: "Please communicate complicated designs, nail art, or specific requests when booking. Designs may be adjusted if not suitable for available time or nail condition."
  },
  {
    title: "Removals Policy",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
    ),
    content: "Please note that I only remove my own work. Removal of another nail technician's work may not be available or may incur an additional charge."
  },
  {
    title: "Punctuality & Respect",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
    ),
    content: "Your appointment time is reserved specifically for you, so please be respectful of my time and arrive prepared and on time."
  }
];

export function BookingPolicy() {
  return (
    <section id="policy" className="mt-16">
      <div className="text-center mb-10">
        <span className="text-xs font-sans font-semibold tracking-widest text-accent uppercase mb-2 block">
          Terms & Studio Guidelines
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-medium">
          Booking Policy
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {POLICY_ITEMS.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.05 }}
            className="bg-white rounded-3xl p-6 border border-accent/15 shadow-sm hover:border-accent/30 transition-all"
          >
            <div className="flex items-center gap-3 mb-3 text-accent">
              <div className="p-2.5 bg-accent/10 rounded-2xl">
                {item.icon}
              </div>
              <h3 className="font-serif font-medium text-foreground text-lg">
                {item.title}
              </h3>
            </div>
            <p className="font-sans text-muted-foreground text-sm leading-relaxed">
              {item.content}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Policy Closing Line Card */}
      <div className="bg-white rounded-3xl p-8 text-center border border-accent/20 shadow-sm max-w-2xl mx-auto">
        <p className="font-sans text-xs text-muted-foreground uppercase tracking-wider mb-2">
          Confirmation of Terms
        </p>
        <p className="font-sans text-sm text-foreground mb-4">
          By booking an appointment, you confirm that you have read, understood, and agreed to this booking policy.
        </p>
        <p className="font-serif italic text-accent font-medium text-lg">
          &ldquo;Thank you for respecting my policies and supporting my small business.&rdquo;
        </p>
      </div>
    </section>
  );
}
