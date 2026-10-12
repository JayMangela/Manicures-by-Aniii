import fs from 'fs';
import path from 'path';

export interface BookingRecord {
  id: string;
  bookingRef: string;
  fullName: string;
  email: string;
  phone: string;
  instagram?: string;
  services: string[];
  addOns?: string[];
  date: string;
  timeSlot: string;
  totalPrice: number;
  notes?: string;
  status: 'PENDING' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED';
  createdAt: string;
}

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'bookings.json');

function ensureDataFileExists() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

export function getBookings(): BookingRecord[] {
  try {
    ensureDataFileExists();
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function createBooking(data: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>): BookingRecord {
  ensureDataFileExists();
  const bookings = getBookings();
  
  const newBooking: BookingRecord = {
    ...data,
    id: 'bk_' + Math.random().toString(36).substring(2, 9),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  fs.writeFileSync(DATA_FILE, JSON.stringify(bookings, null, 2), 'utf-8');
  return newBooking;
}
