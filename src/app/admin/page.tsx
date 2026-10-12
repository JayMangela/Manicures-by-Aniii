'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BookingRecord } from '@/lib/bookingsStore';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const router = useRouter();

  // Auth Guard
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const authed = localStorage.getItem('polished_admin_authed');
      if (!authed) {
        router.push('/admin/login');
      }
    }
  }, [router]);

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/bookings');
      const data = await res.json();
      if (res.ok && data.bookings) {
        setBookings(data.bookings);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        fetchBookings();
        if (newStatus === 'CONFIRMED') {
          const clientName = data.booking?.fullName || 'Client';
          setToastMessage(`✅ Appointment CONFIRMED! Automated Email and WhatsApp notifications automatically sent to ${clientName}.`);
          setTimeout(() => setToastMessage(null), 6000);
        }
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this booking record?')) return;
    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchBookings();
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('polished_admin_authed');
    }
    router.push('/admin/login');
  };

  // Filtered List
  const filteredBookings = bookings.filter((b) => {
    const matchesStatus = filterStatus === 'ALL' || b.status === filterStatus;
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.phone.includes(searchQuery) ||
      b.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Analytics Metrics
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter((b) => b.status === 'PENDING').length;
  const confirmedCount = bookings.filter((b) => b.status === 'CONFIRMED').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalPrice || 0), 0);

  return (
    <div className="min-h-screen bg-background py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 bg-white p-6 rounded-3xl border border-accent/15 shadow-sm">
          <div>
            <span className="text-xs font-sans font-semibold text-accent uppercase tracking-widest block mb-1">
              Polished Lounge Leicester
            </span>
            <h1 className="font-serif text-3xl font-medium text-foreground">
              Appointments Dashboard
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-sans font-semibold text-foreground/70 hover:text-accent border border-accent/20 px-4 py-2 rounded-full transition-colors"
            >
              View Main Site
            </Link>
            <button
              onClick={handleLogout}
              className="text-xs font-sans font-semibold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-full transition-colors cursor-pointer"
            >
              Log Out
            </button>
          </div>
        </div>

        {/* Toast Feedback Notification Banner */}
        {toastMessage && (
          <div className="mb-6 bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-2xl font-sans text-sm font-medium flex items-center justify-between shadow-sm animate-fade-in">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)} className="text-emerald-600 hover:text-emerald-900 font-bold ml-4">✕</button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-2xl border border-accent/15 shadow-sm text-center">
            <span className="text-xs font-sans text-muted-foreground uppercase tracking-wider block mb-1">Total Bookings</span>
            <span className="font-serif text-3xl font-semibold text-foreground">{totalBookings}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-accent/15 shadow-sm text-center">
            <span className="text-xs font-sans text-amber-600 uppercase tracking-wider block mb-1">Pending Requests</span>
            <span className="font-serif text-3xl font-semibold text-amber-600">{pendingCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-accent/15 shadow-sm text-center">
            <span className="text-xs font-sans text-emerald-600 uppercase tracking-wider block mb-1">Confirmed</span>
            <span className="font-serif text-3xl font-semibold text-emerald-600">{confirmedCount}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-accent/15 shadow-sm text-center">
            <span className="text-xs font-sans text-accent uppercase tracking-wider block mb-1">Est. Revenue</span>
            <span className="font-serif text-3xl font-semibold text-accent">£{totalRevenue}</span>
          </div>
        </div>

        {/* Search & Filter Controls */}
        <div className="bg-white p-6 rounded-3xl border border-accent/15 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Filter Buttons */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {['ALL', 'PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setFilterStatus(st)}
                  className={`px-4 py-2 rounded-full text-xs font-sans font-medium transition-colors cursor-pointer ${
                    filterStatus === st
                      ? 'bg-accent text-white'
                      : 'bg-background text-foreground/70 hover:bg-accent/10'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="w-full md:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search name, ref, or phone..."
                className="w-full px-4 py-2.5 rounded-xl border border-accent/20 bg-background text-foreground text-sm focus:border-accent focus:bg-white outline-none transition-all"
              />
            </div>

          </div>
        </div>

        {/* Bookings List */}
        {loading ? (
          <div className="bg-white rounded-3xl p-12 text-center text-muted-foreground font-sans">
            Loading appointment records...
          </div>
        ) : filteredBookings.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-muted-foreground font-sans border border-accent/15">
            No bookings found matching your search.
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((b) => {
              const servicesText = Array.isArray(b.services) ? b.services.join(', ') : b.services;
              const clientWaMessage = `🎉 *APPOINTMENT CONFIRMED — Polished Lounge*\n\nHi ${b.fullName}! Your appointment with Anishka is CONFIRMED for ${b.date} at ${b.timeSlot} (${servicesText}). Ref: ${b.bookingRef}`;
              const cleanPhone = b.phone.startsWith('0') ? `44${b.phone.slice(1)}` : b.phone.replace(/[^0-9]/g, '');
              const clientWaLink = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(clientWaMessage)}`;

              return (
                <div
                  key={b.id}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-accent/15 shadow-sm flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6"
                >
                  {/* Left Side Info */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-xs font-semibold bg-accent/10 text-accent px-3 py-1 rounded-full">
                        {b.bookingRef}
                      </span>
                      <span className={`text-xs font-sans font-semibold px-3 py-1 rounded-full uppercase ${
                        b.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                        b.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' :
                        b.status === 'COMPLETED' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {b.status}
                      </span>
                      <span className="text-xs font-sans text-muted-foreground">
                        Created: {new Date(b.createdAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-medium text-foreground">
                      {b.fullName}
                    </h3>

                    <div className="flex flex-wrap gap-x-6 gap-y-1 font-sans text-sm text-muted-foreground">
                      <span><strong>Phone:</strong> {b.phone}</span>
                      <span><strong>Email:</strong> {b.email}</span>
                      {b.instagram && <span><strong>IG:</strong> {b.instagram}</span>}
                    </div>

                    <div className="pt-2 font-sans text-sm">
                      <p className="text-foreground">
                        <strong>Appointment:</strong> <span className="text-accent font-medium">{b.date} at {b.timeSlot}</span>
                      </p>
                      <p className="text-foreground mt-1">
                        <strong>Services:</strong> {servicesText}
                      </p>
                      {b.addOns && b.addOns.length > 0 && (
                        <p className="text-muted-foreground text-xs mt-0.5">
                          <strong>Add-ons:</strong> {Array.isArray(b.addOns) ? b.addOns.join(', ') : b.addOns}
                        </p>
                      )}
                      {b.notes && (
                        <p className="bg-background p-3 rounded-xl text-xs text-muted-foreground mt-2 border border-accent/10">
                          <strong>Note:</strong> &ldquo;{b.notes}&rdquo;
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Side Actions & Price */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end justify-between gap-4 w-full lg:w-auto border-t lg:border-t-0 pt-4 lg:pt-0 border-accent/10">
                    <div className="text-left lg:text-right">
                      <span className="text-xs font-sans text-muted-foreground uppercase block">Total Price</span>
                      <span className="font-serif text-3xl font-semibold text-accent">£{b.totalPrice}</span>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      {b.status !== 'CONFIRMED' ? (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'CONFIRMED')}
                          className="text-xs font-sans font-semibold bg-emerald-600 text-white px-5 py-2.5 rounded-full hover:bg-emerald-700 transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                          <span>Confirm Booking</span>
                        </button>
                      ) : (
                        <a
                          href={clientWaLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-sans font-medium bg-[#25D366] text-white px-4 py-2 rounded-full hover:bg-[#20bd5a] transition-colors flex items-center gap-1.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-1.157 4.228 4.228-1.157z"/></svg>
                          <span>Open WhatsApp Chat</span>
                        </a>
                      )}

                      {b.status !== 'COMPLETED' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'COMPLETED')}
                          className="text-xs font-sans font-medium bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors cursor-pointer"
                        >
                          Complete
                        </button>
                      )}
                      {b.status !== 'CANCELLED' && (
                        <button
                          onClick={() => handleUpdateStatus(b.id, 'CANCELLED')}
                          className="text-xs font-sans font-medium border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-xs font-sans font-medium text-red-600 hover:text-red-800 p-2 transition-colors cursor-pointer"
                        title="Delete record"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
