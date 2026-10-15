import fs from 'fs';
import path from 'path';
import os from 'os';

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

// In Vercel serverless environments, only /tmp is writable
const LOCAL_DATA_FILE = path.join(process.cwd(), 'src', 'data', 'bookings.json');
const TMP_DATA_FILE = path.join(os.tmpdir(), 'manicures_bookings.json');

function getDataFilePath(): string {
  if (process.env.VERCEL) {
    return TMP_DATA_FILE;
  }
  return LOCAL_DATA_FILE;
}

function ensureDataFileExists(): string {
  const filePath = getDataFilePath();
  const dir = path.dirname(filePath);

  if (!fs.existsSync(dir)) {
    try {
      fs.mkdirSync(dir, { recursive: true });
    } catch {
      // Fallback to tmpdir if local path is not writable
      return TMP_DATA_FILE;
    }
  }

  if (!fs.existsSync(filePath)) {
    // If running in tmp, try to seed from bundled local data if available
    let seedData = '[]';
    if (filePath !== LOCAL_DATA_FILE && fs.existsSync(LOCAL_DATA_FILE)) {
      try {
        seedData = fs.readFileSync(LOCAL_DATA_FILE, 'utf-8');
      } catch {
        seedData = '[]';
      }
    }

    try {
      fs.writeFileSync(filePath, seedData, 'utf-8');
    } catch {
      // If writing to local fails, write to tmp
      if (filePath !== TMP_DATA_FILE) {
        fs.writeFileSync(TMP_DATA_FILE, seedData, 'utf-8');
        return TMP_DATA_FILE;
      }
    }
  }

  return filePath;
}

export function getBookings(): BookingRecord[] {
  try {
    const filePath = ensureDataFileExists();
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch {
    // Fallback attempt from tmp or local
    try {
      if (fs.existsSync(LOCAL_DATA_FILE)) {
        return JSON.parse(fs.readFileSync(LOCAL_DATA_FILE, 'utf-8'));
      }
    } catch {
      // ignore
    }
    return [];
  }
}

function saveBookings(bookings: BookingRecord[]): void {
  let filePath = ensureDataFileExists();
  const json = JSON.stringify(bookings, null, 2);
  try {
    fs.writeFileSync(filePath, json, 'utf-8');
  } catch (err) {
    // If local write fails (e.g. read-only file system on Vercel), save to tmp
    if (filePath !== TMP_DATA_FILE) {
      fs.writeFileSync(TMP_DATA_FILE, json, 'utf-8');
    } else {
      throw err;
    }
  }
}

export function createBooking(data: Omit<BookingRecord, 'id' | 'createdAt' | 'status'>): BookingRecord {
  const bookings = getBookings();
  
  const newBooking: BookingRecord = {
    ...data,
    id: 'bk_' + Math.random().toString(36).substring(2, 9),
    status: 'PENDING',
    createdAt: new Date().toISOString(),
  };

  bookings.unshift(newBooking);
  saveBookings(bookings);
  return newBooking;
}

export function updateBooking(id: string, updates: Partial<BookingRecord>): BookingRecord | null {
  const bookings = getBookings();
  const index = bookings.findIndex((b) => b.id === id);

  if (index === -1) {
    return null;
  }

  const updatedBooking: BookingRecord = {
    ...bookings[index],
    ...updates,
  };

  bookings[index] = updatedBooking;
  saveBookings(bookings);
  return updatedBooking;
}

export function deleteBooking(id: string): boolean {
  const bookings = getBookings();
  const filtered = bookings.filter((b) => b.id !== id);

  if (filtered.length === bookings.length) {
    return false;
  }

  saveBookings(filtered);
  return true;
}
