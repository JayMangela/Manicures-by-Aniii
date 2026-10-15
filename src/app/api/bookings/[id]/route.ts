import { NextResponse } from 'next/server';
import { getBookings, updateBooking, deleteBooking } from '@/lib/bookingsStore';
import { sendAppointmentConfirmation } from '@/lib/notifications';

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
    const existing = bookings.find((b) => b.id === id);

    if (!existing) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    const previousStatus = existing.status;

    const updatedBooking = updateBooking(id, {
      ...(status && { status }),
      ...(depositPaid !== undefined && { depositPaid }),
    });

    if (!updatedBooking) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

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

    const success = deleteBooking(id);

    if (!success) {
      return NextResponse.json({ error: 'Booking not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Failed to delete booking:', error);
    return NextResponse.json({ error: 'Failed to delete booking' }, { status: 500 });
  }
}
