import React from 'react';
import { BookingForm } from '@/components/BookingForm';
import { BookingPolicy } from '@/components/BookingPolicy';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book an Appointment | Manicures by Ani',
  description: 'Book your luxury gel manicure, BIAB, or Gel-X extension appointment with Anishka at Polished Lounge in Leicester, UK.',
};

interface PageProps {
  searchParams: Promise<{ service?: string; step?: string; price?: string }>;
}

export default async function BookPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const initialService = resolvedParams?.service;
  const initialStep = resolvedParams?.step ? parseInt(resolvedParams.step, 10) : undefined;
  const initialPrice = resolvedParams?.price ? parseInt(resolvedParams.price, 10) : undefined;

  return (
    <div className="min-h-screen bg-background py-12 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <span className="text-xs sm:text-sm font-sans font-semibold tracking-widest text-accent uppercase mb-3 block">
            Polished Lounge &bull; Leicester, UK
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground font-medium mb-4">
            Book Your Appointment
          </h1>
          <p className="text-muted-foreground font-sans text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Select your preferred treatments and time slot below to request your custom 1-on-1 appointment with Anishka.
          </p>
        </div>

        {/* Multi-step Booking Form */}
        <BookingForm initialService={initialService} initialStep={initialStep} initialPrice={initialPrice} />

        {/* Booking Policy Section */}
        <BookingPolicy />

      </div>
    </div>
  );
}
