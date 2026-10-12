'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PRICING_DATA } from '@/components/Pricing';
import Link from 'next/link';

// Flatten services for lookup
const ALL_SERVICES = Object.entries(PRICING_DATA).flatMap(([category, items]) => 
  items.map(item => ({ ...item, category }))
);

const ADD_ONS = [
  { id: "art-minimal", name: "Minimal Nail Art (Foil, Dots, 1-2 Accent Nails)", price: 5, duration: 15 },
  { id: "art-heavy", name: "Medium-Heavy Art (Chrome, Aura, 3D, All Nails)", price: 10, duration: 30 },
  { id: "french-accent", name: "Classic / Micro French Tip Accent", price: 5, duration: 15 },
  { id: "charm-rhinestone", name: "Charms & Rhinestone Application", price: 5, duration: 15 },
  { id: "repair", name: "Nail Fix / Repair (per nail)", price: 3, duration: 10 },
  { id: "removal-addon", name: "Gentle Gel Removal Before Service", price: 5, duration: 20 },
];

const TIME_SLOTS = [
  "10:00 AM",
  "12:30 PM",
  "03:00 PM",
  "05:30 PM"
];

interface BookingFormProps {
  initialService?: string;
  initialStep?: number;
  initialPrice?: number;
}

export function BookingForm({ initialService, initialStep, initialPrice }: BookingFormProps) {
  const [step, setStep] = useState(initialStep || (initialService ? 3 : 1));
  const [selectedCategory, setSelectedCategory] = useState("Hands");

  // Form selections
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");

  // Store custom service name from calculator for display (not from PRICING_DATA)
  const [customServiceName, setCustomServiceName] = useState<string>("");

  // Contact details
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    instagram: "",
    notes: initialService ? `Configured Set: ${initialService}` : "",
    policyAgreed: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingRef, setBookingRef] = useState("");
  const [waAdminLink, setWaAdminLink] = useState("");
  const [waClientLink, setWaClientLink] = useState("");

  // Pre-select service from URL query param if present & jump directly to Date & Time (Step 3)
  useEffect(() => {
    if (initialService) {
      const match = ALL_SERVICES.find(s =>
        s.name.toLowerCase() === initialService.toLowerCase() ||
        initialService.toLowerCase().includes(s.name.toLowerCase())
      );
      if (match) {
        setSelectedServices([match.id]);
        setSelectedCategory(match.category);
        setCustomServiceName(""); // Use PRICING_DATA service name
      } else {
        const biab = ALL_SERVICES.find(s => s.id === 'biab') || ALL_SERVICES[0];
        setSelectedServices([biab.id]);
        // Store the custom service name from calculator for display
        setCustomServiceName(initialService);
      }
      setStep(initialStep || 3);
      setFormData(prev => ({ ...prev, notes: `Configured Custom Set: ${initialService}` }));
    }
  }, [initialService, initialStep]);

  // Calculations
  const chosenServiceObjs = ALL_SERVICES.filter(s => selectedServices.includes(s.id));
  const chosenAddOnObjs = ADD_ONS.filter(a => selectedAddOns.includes(a.id));

  // Get display name for services - use custom name if from calculator, otherwise from PRICING_DATA
  const displayServiceName = customServiceName || chosenServiceObjs.map(s => s.name).join(", ");

  // Use calculator price if provided (from design calculator), otherwise calculate from selected services
  const servicesTotalPrice = initialPrice !== undefined
    ? initialPrice
    : chosenServiceObjs.reduce((sum, s) => {
        const num = parseInt(s.price.replace('£', ''), 10) || 0;
        return sum + num;
      }, 0);

  const addOnsTotalPrice = chosenAddOnObjs.reduce((sum, a) => sum + a.price, 0);
  const totalPrice = servicesTotalPrice + addOnsTotalPrice;

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.policyAgreed || isSubmitting) return;

    setIsSubmitting(true);

    const generatedRef = 'ANI-' + Math.floor(100000 + Math.random() * 900000);
    const servicesText = displayServiceName;

    // Direct WhatsApp link generation for immediate action
    const adminMsg = `🔔 *NEW BOOKING ALERT*\nRef: ${generatedRef}\nClient: ${formData.fullName}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nDate: ${selectedDate} @ ${selectedTime}\nServices: ${servicesText}\nTotal: £${totalPrice}`;
    const clientMsg = `✨ *Appointment Request Received*\nHi ${formData.fullName}! Your request with Anishka for ${selectedDate} at ${selectedTime} (${servicesText}) has been received. Ref: ${generatedRef}`;

    // Format phone numbers for WhatsApp (UK numbers: 07xxx -> 447xxx)
    const cleanAdminPhone = '919619395529'; // +91 9619395529 (India admin number)
    const cleanClientPhone = formData.phone.startsWith('0')
      ? `44${formData.phone.slice(1).replace(/[^0-9]/g, '')}`
      : formData.phone.replace(/[^0-9]/g, '');

    const adminWa = `https://wa.me/${cleanAdminPhone}?text=${encodeURIComponent(adminMsg)}`;
    const clientWa = `https://wa.me/${cleanClientPhone}?text=${encodeURIComponent(clientMsg)}`;
    
    setWaAdminLink(adminWa);
    setWaClientLink(clientWa);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          instagram: formData.instagram,
          services: [displayServiceName],
          addOns: chosenAddOnObjs.map(a => a.name),
          date: selectedDate,
          timeSlot: selectedTime,
          totalPrice,
          notes: formData.notes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.booking) {
        setBookingRef(data.booking.bookingRef);
        if (data.notifications?.adminWaLink) setWaAdminLink(data.notifications.adminWaLink);
        if (data.notifications?.clientWaLink) setWaClientLink(data.notifications.clientWaLink);
      } else {
        setBookingRef(generatedRef);
      }
    } catch {
      setBookingRef(generatedRef);
    } finally {
      setIsSubmitting(false);
      setBookingConfirmed(true);
    }
  };

  // Generate date options for the next 14 days
  const today = new Date();
  const dateOptions = Array.from({ length: 14 }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i + 1);
    const iso = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
    return { iso, label };
  });

  if (bookingConfirmed) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-accent/20 text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 bg-accent/15 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </div>

        <span className="text-xs font-sans font-semibold tracking-widest text-accent uppercase block mb-2">
          Appointment Request Submitted!
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-foreground font-medium mb-4">
          Thank you, {formData.fullName}!
        </h2>

        <p className="text-muted-foreground font-sans text-base mb-6 leading-relaxed">
          Your booking request has been recorded. Anishka and Admin (<strong>mangelajay2@gmail.com</strong>) have been notified of your requested slot.
        </p>

        {/* Receipt Box */}
        <div className="bg-background rounded-2xl p-6 text-left mb-8 border border-accent/10 space-y-3 font-sans text-sm">
          <div className="flex justify-between border-b border-accent/10 pb-2">
            <span className="text-muted-foreground">Booking Reference:</span>
            <span className="font-semibold text-foreground">{bookingRef}</span>
          </div>
          <div className="flex justify-between border-b border-accent/10 pb-2">
            <span className="text-muted-foreground">Date & Time:</span>
            <span className="font-medium text-foreground">{selectedDate} at {selectedTime}</span>
          </div>
          <div className="flex justify-between border-b border-accent/10 pb-2">
            <span className="text-muted-foreground">Services:</span>
            <span className="font-medium text-foreground text-right">
              {displayServiceName}
            </span>
          </div>
          {chosenAddOnObjs.length > 0 && (
            <div className="flex justify-between border-b border-accent/10 pb-2">
              <span className="text-muted-foreground">Add-ons:</span>
              <span className="font-medium text-foreground text-right">
                {chosenAddOnObjs.map(a => a.name).join(", ")}
              </span>
            </div>
          )}
          <div className="flex justify-between pt-1 text-base">
            <span className="font-semibold text-foreground">Estimated Total:</span>
            <span className="font-serif font-semibold text-accent text-lg">£{totalPrice}</span>
          </div>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col gap-3 mb-8">
          <a
            href={waAdminLink || `https://wa.me/919619395529`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-[#25D366] text-white py-3.5 px-6 rounded-full font-sans font-medium hover:bg-[#20bd5a] transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157z"/></svg>
            <span>Notify Admin via WhatsApp (+91 9619395529)</span>
          </a>

          <a
            href={waClientLink}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full border border-[#25D366] text-[#25D366] py-3 px-6 rounded-full font-sans font-medium hover:bg-[#25D366]/10 transition-all flex items-center justify-center gap-2"
          >
            <span>Send Confirmation to Client WhatsApp</span>
          </a>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-accent/10 pt-6">
          <Link
            href="/"
            className="w-full sm:w-auto bg-foreground text-background px-6 py-3 rounded-full font-sans font-medium hover:bg-accent hover:text-white transition-colors text-sm"
          >
            Return to Homepage
          </Link>
          <a
            href="https://www.instagram.com/manicuresbyaniii"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto border border-accent/30 text-accent hover:bg-accent/10 px-6 py-3 rounded-full font-sans font-medium transition-colors text-sm"
          >
            Message on Instagram
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-accent/15 overflow-hidden">
      
      {/* Progress Bar Header */}
      <div className="bg-background border-b border-accent/10 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl sm:text-3xl text-foreground font-medium">
            {step === 1 && "1. Choose Treatments"}
            {step === 2 && "2. Choose Add-Ons"}
            {step === 3 && "3. Date & Time"}
            {step === 4 && "4. Your Details & Confirmation"}
          </h2>
          <span className="text-xs font-sans font-semibold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
            Step {step} of 4
          </span>
        </div>

        {/* Step indicators */}
        <div className="grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              className={`h-2 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-accent' : 'bg-accent/20'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-10">
        
        {/* STEP 1: SELECT SERVICES */}
        {step === 1 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-muted-foreground font-sans text-sm sm:text-base mb-6">
              Select one or more services for your appointment.
            </p>

            {/* Category Tabs */}
            <div className="flex flex-wrap gap-2 mb-8">
              {Object.keys(PRICING_DATA).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-sans font-medium transition-colors cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-accent text-white"
                      : "bg-background text-foreground/80 hover:bg-accent/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Service Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {PRICING_DATA[selectedCategory].map((service) => {
                const isSelected = selectedServices.includes(service.id);
                return (
                  <div
                    key={service.id}
                    onClick={() => toggleService(service.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                        : "border-accent/15 hover:border-accent/40 bg-white"
                    }`}
                  >
                    <div className="flex justify-between items-start gap-2 mb-2">
                      <h3 className="font-sans font-medium text-foreground text-base">
                        {service.name}
                      </h3>
                      <span className="font-serif font-semibold text-accent text-lg">
                        {service.price}
                      </span>
                    </div>
                    {service.description && (
                      <p className="text-xs text-muted-foreground font-sans leading-relaxed mb-4">
                        {service.description}
                      </p>
                    )}
                    <div className="flex items-center gap-2 text-xs font-sans font-semibold">
                      <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                        isSelected ? "bg-accent border-accent text-white" : "border-foreground/30"
                      }`}>
                        {isSelected && <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                      <span className={isSelected ? "text-accent" : "text-muted-foreground"}>
                        {isSelected ? "Selected" : "Select Service"}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-accent/10">
              <span className="font-sans text-sm text-foreground">
                Selected ({selectedServices.length}): <strong className="font-serif text-accent">£{servicesTotalPrice}</strong>
              </span>
              <button
                type="button"
                disabled={selectedServices.length === 0}
                onClick={() => setStep(2)}
                className="bg-accent text-white px-8 py-3 rounded-full font-sans font-medium text-sm hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
              >
                Continue to Add-Ons &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 2: ADD-ONS & NAIL ART */}
        {step === 2 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-muted-foreground font-sans text-sm sm:text-base mb-6">
              Enhance your set with custom nail art, chrome finishes, or removal services. (Optional)
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {ADD_ONS.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddOn(addon.id)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-accent bg-accent/5 ring-1 ring-accent"
                        : "border-accent/15 hover:border-accent/40 bg-white"
                    }`}
                  >
                    <div className="pr-3">
                      <h4 className="font-sans font-medium text-foreground text-sm">
                        {addon.name}
                      </h4>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-serif font-semibold text-accent text-base">
                        +£{addon.price}
                      </span>
                      <div className={`w-5 h-5 rounded border flex items-center justify-center ${
                        isSelected ? "bg-accent border-accent text-white" : "border-foreground/30"
                      }`}>
                        {isSelected && <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-accent/10">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-foreground/70 hover:text-foreground font-sans font-medium text-sm cursor-pointer"
              >
                &larr; Back
              </button>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="bg-accent text-white px-8 py-3 rounded-full font-sans font-medium text-sm hover:bg-accent-hover transition-all shadow-sm cursor-pointer"
              >
                Continue to Date & Time &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: DATE & TIME */}
        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-muted-foreground font-sans text-sm sm:text-base mb-6">
              Choose your preferred date and time slot for your appointment in Leicester, UK.
            </p>

            {/* Date Selector */}
            <div className="mb-8">
              <label className="block text-sm font-sans font-semibold text-foreground mb-3">
                Select Date:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                {dateOptions.map((opt) => (
                  <button
                    key={opt.iso}
                    type="button"
                    onClick={() => setSelectedDate(opt.label)}
                    className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                      selectedDate === opt.label
                        ? "border-accent bg-accent text-white font-semibold shadow-sm"
                        : "border-accent/15 bg-background text-foreground/80 hover:border-accent/40"
                    }`}
                  >
                    <span className="text-xs block font-sans uppercase">{opt.label.split(',')[0]}</span>
                    <span className="text-sm font-serif block mt-1">{opt.label.split(',')[1]}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Selector */}
            <div className="mb-8">
              <label className="block text-sm font-sans font-semibold text-foreground mb-3">
                Select Time Slot:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {TIME_SLOTS.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setSelectedTime(slot)}
                    className={`py-3.5 px-4 rounded-2xl border font-sans text-center transition-all cursor-pointer text-sm ${
                      selectedTime === slot
                        ? "border-accent bg-accent text-white font-medium shadow-sm"
                        : "border-accent/15 bg-background text-foreground/80 hover:border-accent/40"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t border-accent/10">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="text-foreground/70 hover:text-foreground font-sans font-medium text-sm cursor-pointer"
              >
                &larr; Back to Add-Ons
              </button>
              <button
                type="button"
                disabled={!selectedDate || !selectedTime}
                onClick={() => setStep(4)}
                className="bg-accent text-white px-8 py-3 rounded-full font-sans font-medium text-sm hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-sm cursor-pointer"
              >
                Review & Confirm &rarr;
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 4: CONTACT & ACKNOWLEDGEMENT */}
        {step === 4 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <form onSubmit={handleSubmitBooking}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="07123 456789"
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-2">
                    Instagram Handle (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.instagram}
                    onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                    placeholder="@yourhandle"
                    className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white transition-all outline-none"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-xs font-sans font-semibold text-foreground uppercase tracking-wider mb-2">
                  Special Requests / Design Ideas
                </label>
                <textarea
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Describe your design preference, color choices, or nail health notes..."
                  className="w-full px-4 py-3 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white transition-all outline-none"
                />
              </div>

              {/* Order Summary Card */}
              <div className="bg-background rounded-2xl p-6 border border-accent/15 mb-6 space-y-2 font-sans text-sm">
                <h4 className="font-serif text-lg font-medium text-foreground mb-3">Booking Summary</h4>
                <div className="flex justify-between text-muted-foreground">
                  <span>Selected Date & Time:</span>
                  <span className="font-medium text-foreground">{selectedDate} @ {selectedTime}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Treatments:</span>
                  <span className="font-medium text-foreground">{displayServiceName}</span>
                </div>
                {chosenAddOnObjs.length > 0 && (
                  <div className="flex justify-between text-muted-foreground">
                    <span>Add-ons:</span>
                    <span className="font-medium text-foreground">{chosenAddOnObjs.map(a => a.name).join(", ")}</span>
                  </div>
                )}
                <div className="border-t border-accent/10 pt-2 flex justify-between text-base font-semibold text-foreground mt-2">
                  <span>Total Estimated Price:</span>
                  <span className="font-serif text-accent text-xl">£{totalPrice}</span>
                </div>
              </div>

              {/* Policy Checkbox */}
              <div className="mb-8 flex items-start gap-3">
                <input
                  type="checkbox"
                  id="policyAgreed"
                  name="policyAgreed"
                  required
                  checked={formData.policyAgreed}
                  onChange={(e) => setFormData({ ...formData, policyAgreed: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-accent cursor-pointer"
                />
                <label htmlFor="policyAgreed" className="text-xs sm:text-sm font-sans text-muted-foreground leading-relaxed cursor-pointer">
                  I agree to the <a href="#policy" className="text-accent underline font-semibold">Booking Policy</a> regarding cancellations, punctuality, and studio guidelines.
                </label>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-accent/10">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="text-foreground/70 hover:text-foreground font-sans font-medium text-sm cursor-pointer"
                >
                  &larr; Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !formData.policyAgreed || !formData.fullName || !formData.email || !formData.phone}
                  className="bg-accent text-white px-8 py-3.5 rounded-full font-sans font-medium text-sm hover:bg-accent-hover disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? "Submitting..." : "Confirm Appointment Request"}
                </button>
              </div>
            </form>
          </motion.div>
        )}

      </div>
    </div>
  );
}
