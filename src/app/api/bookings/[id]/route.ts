import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getBookings, BookingRecord } from '@/lib/bookingsStore';
import { sendAppointmentConfirmation } from '@/lib/notifications';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'bookings.json');

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const body = await request.json();
    const { status, depositPaid } = body;

    const bookings = getBookings();
    const index = bookings.findIndex((b) => b.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const previousStatus = bookings[index].status;

    const updatedBooking: BookingRecord = {
      ...bookings[index],
      ...(status && { status }),
      ...(depositPaid !== undefined && { depositPaid }),
    };

    bookings[index] = updatedBooking;
    fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8');

    // Automatically trigger Email and WhatsApp confirmation when status is set to CONFIRMED
    let confirmationDetails = null;
    if (status === 'CONFIRMED' && previousStatus !== 'CONFIRMED') {
      confirmationDetails = await sendAppointmentConfirmation(updatedBooking).catch((err) => {
        console.error('Confirmation notification error:', err);
        return null;
      });
    }

    return NextResponse.json({ 
      success: true, 
      booking: updatedBooking,
      confirmationDetails 
    });
  } catch (error) {
    console.error('Failed to update booking:', error);
    return NextResponse.json({ error: 'Failed to update booking' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;

    const bookings = getBookings();
    const filtered = bookings.filter((b) => b.id !== id);

    if (bookings.length === filtered.length) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8');
    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to delete booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
