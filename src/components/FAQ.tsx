'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ_ITEMS = [
  {
    id: 1,
    question: "What is Builder Gel (BIAB) and how does it differ from standard gel?",
    answer: "Builder Gel (BIAB) is a thicker, highly durable gel overlay applied over your natural nails. It creates a flexible protective layer that reinforces weak or brittle nails, preventing breakage and allowing your natural nails to grow long and healthy."
  },
  {
    id: 2,
    question: "How long do Gel-X Full Extensions typically last?",
    answer: "Gel-X extensions are full-coverage soft gel tips applied with gel resin. They generally last between 3 to 4 weeks with standard care and can be safely soaked off without damaging your natural nail bed."
  },
  {
    id: 3,
    question: "Where is the home studio located in Leicester?",
    answer: "Polished Lounge is a boutique, private home studio located in Leicester, UK. To protect studio privacy, the exact address, entrance notes, and parking instructions are sent directly to your phone/email 24 hours before your slot."
  },
  {
    id: 4,
    question: "How should I prepare my nails before arriving?",
    answer: "Please arrive with bare, clean nails free of old gel or polish, unless you have specifically added a removal service to your booking. Ensure cuticles are dry and avoid applying heavy oils or hand creams 2 hours prior."
  },
  {
    id: 5,
    question: "Can I bring a friend or child to my appointment?",
    answer: "Polished Lounge is a 1-on-1 private studio setting designed for a relaxing, focused appointment. Only one client/guest is permitted at a time, and children cannot be accommodated unless pre-approved."
  },
  {
    id: 6,
    question: "Do you remove nail work done by other salons?",
    answer: "We primarily soak off and remove our own gel and extension work to guarantee product safety and nail health. If you require removal of work from another salon, please select the removal add-on when booking."
  }
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-background border-b border-accent/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground font-medium">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl border border-accent/15 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(item.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-sans font-medium text-foreground text-base sm:text-lg cursor-pointer hover:text-accent transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.question}</span>
                  <div className={`w-8 h-8 rounded-full border border-accent/20 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-accent text-white border-accent' : 'text-foreground/70'
                  }`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-0 font-sans text-muted-foreground text-sm sm:text-base leading-relaxed border-t border-accent/10">
                        <p className="mt-4">{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
