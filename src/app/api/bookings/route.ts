import { NextResponse } from 'next/server';
import { getBookings, createBooking } from '@/lib/bookingsStore';
import { sendBookingNotifications } from '@/lib/notifications';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, phone, instagram, services, addOns, date, timeSlot, totalPrice, notes } = body;

    if (!fullName || !email || !phone || !date || !timeSlot) {
      return NextResponse.json(
        { error: 'Missing required booking fields.' },
        { status: 400 }
      );
    }

    const bookingRef = 'ANI-' + Math.floor(100000 + Math.random() * 900000);

    const newBooking = createBooking({
      bookingRef,
      fullName,
      email,
      phone,
      instagram: instagram || undefined,
      services: services || [],
      addOns: addOns || [],
      date,
      timeSlot,
      totalPrice: Number(totalPrice) || 0,
      notes: notes || undefined,
    });

    // Send notifications to mangelajay2@gmail.com and WhatsApp
    const notifications = await sendBookingNotifications(newBooking).catch((err) => {
      console.error('Notification error:', err);
      return null;
    });

    return NextResponse.json({ 
      success: true, 
      booking: newBooking,
      notifications
    }, { status: 201 });
  } catch (error) {
    console.error('Failed to create booking:', error);
    return NextResponse.json(
      { error: 'Failed to process booking request.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const bookings = getBookings();
    return NextResponse.json({ bookings }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve bookings.' },
      { status: 500 }
    );
  }
}
