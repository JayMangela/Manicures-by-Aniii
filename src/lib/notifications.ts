import nodemailer from 'nodemailer';
import { BookingRecord } from './bookingsStore';

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || 'mangelajay2@gmail.com';
const ADMIN_PHONE = process.env.ADMIN_PHONE || '919619395529'; // +91 9619395529

/**
 * Configure Nodemailer Transporter
 * Works with Gmail, Resend, SendGrid, or custom SMTP when env vars are set.
 */
function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 465;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });
  }

  return null;
}

export async function sendBookingNotifications(booking: BookingRecord) {
  const servicesText = Array.isArray(booking.services) ? booking.services.join(', ') : booking.services;
  const addOnsText = booking.addOns && booking.addOns.length > 0
    ? (Array.isArray(booking.addOns) ? booking.addOns.join(', ') : booking.addOns)
    : 'None';

  // 1. WhatsApp Messages & Click-to-Chat Links
  const adminWaText = `🔔 *NEW BOOKING ALERT — Polished Lounge*\n\nRef: *${booking.bookingRef}*\nClient: *${booking.fullName}*\nPhone: *${booking.phone}*\nEmail: *${booking.email}*\n${booking.instagram ? `Instagram: *${booking.instagram}*\n` : ''}Date: *${booking.date}*\nTime Slot: *${booking.timeSlot}*\nServices: *${servicesText}*\nAdd-ons: *${addOnsText}*\nEst. Total: *£${booking.totalPrice}*\n${booking.notes ? `Notes: "${booking.notes}"` : ''}`;

  const clientWaText = `✨ *Appointment Request Received — Polished Lounge*\n\nHi ${booking.fullName}! Your request with Anishka has been recorded.\n\n📅 Date: *${booking.date}*\n⏰ Time: *${booking.timeSlot}*\n💅 Services: *${servicesText}*\n🔖 Booking Ref: *${booking.bookingRef}*\nEst. Price: *£${booking.totalPrice}*\n\nAnishka will confirm your appointment shortly. Thank you!`;

  const cleanAdminPhone = ADMIN_PHONE.replace(/[^0-9]/g, '');
  const cleanClientPhone = booking.phone.startsWith('0')
    ? `44${booking.phone.slice(1)}`
    : booking.phone.replace(/[^0-9]/g, '');

  const adminWaLink = `https://wa.me/${cleanAdminPhone}?text=${encodeURIComponent(adminWaText)}`;
  const clientWaLink = `https://wa.me/${cleanClientPhone}?text=${encodeURIComponent(clientWaText)}`;

  // 2. Email Notifications (Admin + Client)
  const transporter = getTransporter();

  if (transporter) {
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EC4899; border-radius: 16px;">
        <h2 style="color: #EC4899;">🔔 New Booking Request</h2>
        <p>A new appointment request has been placed for Polished Lounge Leicester.</p>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Booking Ref:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.bookingRef}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Client Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.fullName}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Phone:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.phone}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.email}</td></tr>
          ${booking.instagram ? `<tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Instagram:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.instagram}</td></tr>` : ''}
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Date & Time:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${booking.date} at ${booking.timeSlot}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Services:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${servicesText}</td></tr>
          <tr><td style="padding: 8px; font-weight: bold; border-bottom: 1px solid #eee;">Total Price:</td><td style="padding: 8px; border-bottom: 1px solid #eee; font-size: 18px; color: #EC4899; font-weight: bold;">£${booking.totalPrice}</td></tr>
        </table>

        <div style="margin-top: 25px; text-align: center;">
          <a href="${adminWaLink}" style="background-color: #25D366; color: white; padding: 12px 24px; text-decoration: none; border-radius: 24px; font-weight: bold; display: inline-block;">Open Client WhatsApp Chat</a>
        </div>
      </div>
    `;

    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #EC4899; border-radius: 16px;">
        <h2 style="color: #EC4899;">✨ Appointment Request Received!</h2>
        <p>Hi <strong>${booking.fullName}</strong>,</p>
        <p>Thank you for requesting an appointment with Anishka at Polished Lounge Leicester. We have received your booking details:</p>
        
        <div style="background-color: #FAF7F5; padding: 15px; border-radius: 12px; margin: 15px 0;">
          <p style="margin: 5px 0;"><strong>Booking Ref:</strong> ${booking.bookingRef}</p>
          <p style="margin: 5px 0;"><strong>Date & Time:</strong> ${booking.date} at ${booking.timeSlot}</p>
          <p style="margin: 5px 0;"><strong>Treatments:</strong> ${servicesText}</p>
          <p style="margin: 5px 0;"><strong>Estimated Total:</strong> £${booking.totalPrice}</p>
        </div>

        <p>Anishka will review your requested slot and confirm via SMS or Email shortly.</p>
        <p style="color: #78716C; font-size: 12px;">Polished Lounge &bull; Leicester, UK</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"Polished Lounge Booking System" <${process.env.SMTP_USER || 'noreply@polishedlounge.com'}>`,
        to: ADMIN_EMAIL,
        subject: `New Booking Request: ${booking.fullName} (${booking.date})`,
        html: adminEmailHtml,
      });

      await transporter.sendMail({
        from: `"Manicures by Ani" <${process.env.SMTP_USER || 'noreply@polishedlounge.com'}>`,
        to: booking.email,
        subject: `Appointment Request Received — ${booking.bookingRef}`,
        html: clientEmailHtml,
      });
    } catch (err) {
      console.error('Email dispatch failed (check SMTP settings):', err);
    }
  }

  return {
    adminWaLink,
    clientWaLink,
    adminEmail: ADMIN_EMAIL,
    adminPhone: ADMIN_PHONE,
    adminWaText,
    clientWaText,
  };
}

/**
 * Automatically dispatches Email and WhatsApp confirmation to the client when the Admin confirms a booking.
 */
export async function sendAppointmentConfirmation(booking: BookingRecord) {
  const servicesText = Array.isArray(booking.services) ? booking.services.join(', ') : booking.services;
  
  const clientWaMessage = `🎉 *APPOINTMENT CONFIRMED — Polished Lounge*\n\nHi ${booking.fullName}! Good news — your appointment with Anishka has been officially CONFIRMED!\n\n📅 Date: *${booking.date}*\n⏰ Time: *${booking.timeSlot}*\n💅 Treatments: *${servicesText}*\n💰 Total: *£${booking.totalPrice}*\n🔖 Ref: *${booking.bookingRef}*\n📍 Location: Leicester, UK (Home Studio)\n\nPlease arrive on time with bare nails. See you soon!`;

  const cleanClientPhone = booking.phone.startsWith('0')
    ? `44${booking.phone.slice(1)}`
    : booking.phone.replace(/[^0-9]/g, '');

  const clientWaLink = `https://wa.me/${cleanClientPhone}?text=${encodeURIComponent(clientWaMessage)}`;

  // Automated WhatsApp Cloud API / Twilio Dispatch if configured
  const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
  const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioFrom = process.env.TWILIO_WHATSAPP_FROM || 'whatsapp:+14155238886';

  if (twilioAccountSid && twilioAuthToken) {
    try {
      const auth = Buffer.from(`${twilioAccountSid}:${twilioAuthToken}`).toString('base64');
      await fetch(`https://api.twilio.com/2010-04-01/Accounts/${twilioAccountSid}/Messages.json`, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          From: twilioFrom,
          To: `whatsapp:+${cleanClientPhone}`,
          Body: clientWaMessage,
        }),
      });
      console.log(`Automated WhatsApp confirmation dispatched to +${cleanClientPhone}`);
    } catch (err) {
      console.error('Automated WhatsApp dispatch failed:', err);
    }
  }

  // Automated Email Dispatch to Client
  const transporter = getTransporter();
  if (transporter) {
    const confirmationEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 25px; border: 2px solid #25D366; border-radius: 20px; background-color: #ffffff;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #25D366; margin: 0;">🎉 Appointment Confirmed!</h1>
          <p style="color: #57534E; font-size: 14px;">Polished Lounge &bull; Leicester, UK</p>
        </div>

        <p style="font-size: 16px; color: #1C1917;">Hi <strong>${booking.fullName}</strong>,</p>
        <p style="font-size: 15px; color: #57534E; line-height: 1.6;">
          Your appointment request with <strong>Anishka</strong> at Polished Lounge has been officially <strong>CONFIRMED</strong>!
        </p>

        <div style="background-color: #FAF7F5; padding: 20px; border-radius: 16px; margin: 20px 0; border: 1px solid #EC4899;">
          <h3 style="margin-top: 0; color: #EC4899;">Appointment Details</h3>
          <p style="margin: 8px 0;"><strong>Booking Reference:</strong> <span style="color: #EC4899; font-weight: bold;">${booking.bookingRef}</span></p>
          <p style="margin: 8px 0;"><strong>Date:</strong> ${booking.date}</p>
          <p style="margin: 8px 0;"><strong>Time Slot:</strong> ${booking.timeSlot}</p>
          <p style="margin: 8px 0;"><strong>Confirmed Treatments:</strong> ${servicesText}</p>
          <p style="margin: 8px 0; font-size: 18px;"><strong>Total Amount:</strong> <strong style="color: #EC4899;">£${booking.totalPrice}</strong></p>
        </div>

        <div style="background-color: #FAF7F5; padding: 15px; border-radius: 12px; margin-bottom: 20px; font-size: 13px; color: #57534E;">
          <p style="margin: 0;"><strong>Location Note:</strong> Polished Lounge is a home studio in Leicester, UK. Exact street entrance details will be sent via SMS 24 hours prior to your slot.</p>
        </div>

        <div style="text-align: center; margin-top: 25px;">
          <a href="${clientWaLink}" style="background-color: #25D366; color: white; padding: 14px 28px; text-decoration: none; border-radius: 30px; font-weight: bold; font-size: 15px; display: inline-block;">Open WhatsApp Chat with Anishka</a>
        </div>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: `"Manicures by Ani" <${process.env.SMTP_USER || 'noreply@polishedlounge.com'}>`,
        to: booking.email,
        subject: `🎉 Appointment Confirmed! — ${booking.bookingRef} (${booking.date})`,
        html: confirmationEmailHtml,
      });
      console.log(`Automated Confirmation Email sent to ${booking.email}`);
    } catch (err) {
      console.error('Failed to send confirmation email:', err);
    }
  }

  return {
    clientWaMessage,
    clientWaLink,
    emailSent: !!transporter,
  };
}
