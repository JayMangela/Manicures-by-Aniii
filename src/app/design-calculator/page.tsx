import React from 'react';
import { NailArtCalculator } from '@/components/NailArtCalculator';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Custom Nail Art & Price Calculator | Manicures by Ani',
  description: 'Estimate your custom Gel-X, BIAB, or Nail Art set price with Polished Lounge in Leicester, UK.',
};

export default function DesignCalculatorPage() {
  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
            Interactive Price Guide
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-medium mb-4">
            Custom Set Calculator
          </h1>
          <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Customize your length, shape, finish, and 3D art level to see your instant price estimate before booking.
          </p>
        </div>

        <NailArtCalculator />

      </div>
    </div>
  );
}
