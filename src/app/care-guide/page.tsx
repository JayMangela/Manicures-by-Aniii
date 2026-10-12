import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Nail Care & Prep Guide | Manicures by Ani',
  description: 'Learn how to prepare for your appointment and maintain long-lasting BIAB and Gel-X nails with Polished Lounge in Leicester.',
};

const PREP_TIPS = [
  {
    step: "01",
    title: "Arrive Bare & Clean",
    desc: "Remove any remaining polish or gel unless you have added a removal service to your booking slot."
  },
  {
    step: "02",
    title: "Avoid Oils & Heavy Lotions",
    desc: "Refrain from applying rich cuticles oils, hand creams, or sunscreens 2 hours prior to your slot to ensure optimal gel adhesion."
  },
  {
    step: "03",
    title: "Communicate Design Ideas",
    desc: "Send inspo pictures on Instagram (@manicuresbyaniii) before your slot if you want custom 3D art or complex chrome details."
  }
];

const AFTERCARE_TIPS = [
  {
    title: "Apply Cuticle Oil Daily",
    desc: "Nourish cuticles daily with jojoba-based cuticle oil to keep natural nails flexible and prevent gel lifting."
  },
  {
    title: "Wear Gloves for Household Cleaning",
    desc: "Protect your nails from harsh household chemicals, bleach, and dishwashing liquids by wearing protective gloves."
  },
  {
    title: "Never Use Nails as Tools",
    desc: "Avoid using your nails to open cans, scrape stickers, or peel objects to preserve structural integrity."
  },
  {
    title: "Professional Removal Only",
    desc: "Never peel, pick, or bite off your gel extensions. Schedule a professional soak-off to protect your natural nail bed."
  }
];

export default function CareGuidePage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
            Polished Lounge &bull; Leicester
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-medium mb-4">
            Nail Care & Prep Guide
          </h1>
          <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Essential steps to prepare for your appointment and maximize the longevity of your Gel-X, BIAB, and custom sets.
          </p>
        </div>

        {/* Section 1: Pre-Appointment Prep */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-8 text-center sm:text-left">
            Pre-Appointment Checklist
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PREP_TIPS.map((tip) => (
              <div
                key={tip.step}
                className="bg-white rounded-3xl p-6 border border-accent/15 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="font-serif text-3xl font-semibold text-accent/40 block mb-2">
                    {tip.step}
                  </span>
                  <h3 className="font-sans font-medium text-foreground text-lg mb-2">
                    {tip.title}
                  </h3>
                  <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                    {tip.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Aftercare Rules */}
        <div className="mb-16">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mb-8 text-center sm:text-left">
            Aftercare & Maintenance Rules
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {AFTERCARE_TIPS.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-accent/15 shadow-sm"
              >
                <h3 className="font-sans font-medium text-foreground text-lg mb-2">
                  {tip.title}
                </h3>
                <p className="font-sans text-muted-foreground text-sm leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-accent/20 text-center shadow-sm max-w-2xl mx-auto">
          <h3 className="font-serif text-2xl sm:text-3xl font-medium text-foreground mb-3">
            Ready for Your Next Set?
          </h3>
          <p className="text-muted-foreground font-sans text-sm sm:text-base mb-6">
            Book your appointment or calculate your custom set price in seconds.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/book"
              className="w-full sm:w-auto bg-accent text-white px-8 py-3.5 rounded-full font-sans font-medium text-sm hover:bg-accent-hover transition-colors shadow-sm"
            >
              Book Appointment
            </Link>
            <Link
              href="/design-calculator"
              className="w-full sm:w-auto border border-accent/30 text-accent hover:bg-accent/10 px-8 py-3.5 rounded-full font-sans font-medium text-sm transition-colors"
            >
              Design Calculator
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
