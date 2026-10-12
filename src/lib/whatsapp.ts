import { BookingRecord } from './bookingsStore';

interface WhatsAppConfig {
  artistNumber: string;
  accountSid?: string;
  authToken?: string;
  fromNumber?: string;
}

const config: WhatsAppConfig = {
  artistNumber: process.env.ARTIST_WHATSAPP_NUMBER || '447123456789',
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  fromNumber: process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886',
};

/**
 * Sends or formats WhatsApp notifications for both the client and Anishka.
 */
export async function sendWhatsAppNotifications(booking: BookingRecord) {
  const servicesText = Array.isArray(booking.services) ? booking.services.join(', ') : booking.services;
  
  // 1. Client Message Template
  const clientMessage = `Hi ${booking.fullName}! ✨ Your appointment request with Polished Lounge has been received.\n\n📅 Date: ${booking.date}\n⏰ Time: ${booking.timeSlot}\n💅 Services: ${servicesText}\n🔖 Ref: ${booking.bookingRef}\n\nAnishka will confirm your slot shortly. Thank you for booking!`;

  // 2. Artist Message Template (for Anishka)
  const artistMessage = `🔔 New Booking Alert!\n\nClient: ${booking.fullName}\nPhone: ${booking.phone}\nEmail: ${booking.email}\n${booking.instagram ? `IG: ${booking.instagram}\n` : ''}Date: ${booking.date} @ ${booking.timeSlot}\nServices: ${servicesText}\nTotal: £${booking.totalPrice}\nRef: ${booking.bookingRef}`;

  // Direct click-to-chat links as a fallback
  const clientWaLink = `https://wa.me/${booking.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(clientMessage)}`;
  const artistWaLink = `https://wa.me/${config.artistNumber.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(artistMessage)}`;

  // If Twilio credentials are standard env variables, attempt API dispatch
  if (config.accountSid && config.authToken) {
    try {
      const auth = Buffer.from(`${config.accountSid}:${config.authToken}`).toString('base64');
      
      // Notify Artist
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: config.fromNumber!,
          To: `whatsapp:+${config.artistNumber.replace(/[^0-9]/g, '')}`,
          Body: artistMessage,
        }),
      });

      // Notify Client
      const formattedClientPhone = booking.phone.startsWith('0') 
        ? `44${booking.phone.slice(1)}` 
        : booking.phone.replace(/[^0-9]/g, '');

      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: config.fromNumber!,
          To: `whatsapp:+${formattedClientPhone}`,
          Body: clientMessage,
        }),
      });
    } catch (err) {
      console.error('WhatsApp API dispatch skipped or failed (fallback links available):', err);
    }
  }

  return {
    clientMessage,
    artistMessage,
    clientWaLink,
    artistWaLink,
  };
}
