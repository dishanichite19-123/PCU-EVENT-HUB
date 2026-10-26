import { CampusEvent, Registration } from '../types';
import { INITIAL_EVENTS } from '../data/initialEvents';

const EVENTS_STORAGE_KEY = 'pcu_pune_events_v3';
const REGISTRATIONS_STORAGE_KEY = 'pcu_pune_registrations_v2';
const BOOKMARKS_STORAGE_KEY = 'pcu_pune_bookmarks_v2';

const sanitizeEventImages = (events: CampusEvent[]): CampusEvent[] => {
  return events.map((evt) => {
    let img = evt.image;
    if (img && img.startsWith('/src/assets/images/')) {
      img = img.replace('/src/assets/images/', '/images/');
    }
    return { ...evt, image: img };
  });
};

export function getStoredEvents(): CampusEvent[] {
  try {
    let raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) {
      // Check if previous v2 exists to migrate user data
      const legacyRaw = localStorage.getItem('pcu_pune_events_v2');
      if (legacyRaw) {
        try {
          const legacyParsed = JSON.parse(legacyRaw);
          if (Array.isArray(legacyParsed) && legacyParsed.length > 0) {
            const sanitized = sanitizeEventImages(legacyParsed);
            localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(sanitized));
            return sanitized;
          }
        } catch {
          // ignore error
        }
      }
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return sanitizeEventImages(parsed);
    }
    return INITIAL_EVENTS;
  } catch {
    return INITIAL_EVENTS;
  }
}

export function saveStoredEvents(events: CampusEvent[]): void {
  try {
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(sanitizeEventImages(events)));
  } catch (e) {
    console.error('Failed to save events to localStorage', e);
  }
}

export function getStoredRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem(REGISTRATIONS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredRegistrations(registrations: Registration[]): void {
  try {
    localStorage.setItem(REGISTRATIONS_STORAGE_KEY, JSON.stringify(registrations));
  } catch (e) {
    console.error('Failed to save registrations', e);
  }
}

export function getStoredBookmarks(): string[] {
  try {
    const raw = localStorage.getItem(BOOKMARKS_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredBookmarks(ids: string[]): void {
  try {
    localStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(ids));
  } catch (e) {
    console.error('Failed to save bookmarks', e);
  }
}

export function generateConfirmationCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let result = 'PCU-';
  for (let i = 0; i < 5; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

export function generateCalendarIcs(event: CampusEvent, reg: Registration): string {
  const cleanTitle = event.title.replace(/[,;]/g, '');
  const cleanDesc = `${event.description} | Registered: ${reg.studentName} (${reg.studentId}) | Confirmation: ${reg.confirmationCode} | Pimpri Chinchwad University (PCU) Pune`.replace(/\n/g, ' ');
  const cleanVenue = `${event.venue}, ${event.room || ''}, PCU Sate-Maval Campus Pune`.replace(/[,;]/g, '');

  const startFormatted = event.date.replace(/-/g, '') + 'T180000Z';
  const endFormatted = event.date.replace(/-/g, '') + 'T210000Z';

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PCU Pune//Campus Event Hub//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${reg.id}@pcu.edu.in`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `SUMMARY:${cleanTitle}`,
    `DESCRIPTION:${cleanDesc}`,
    `LOCATION:${cleanVenue}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

export function downloadIcsFile(event: CampusEvent, reg: Registration) {
  const icsData = generateCalendarIcs(event, reg);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `PCU_${event.id}_${reg.confirmationCode}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function getGoogleCalendarUrl(event: CampusEvent): string {
  const startDate = event.date.replace(/-/g, '') + 'T170000Z';
  const endDate = event.date.replace(/-/g, '') + 'T200000Z';
  const text = encodeURIComponent(event.title);
  const details = encodeURIComponent(`${event.description} - Pimpri Chinchwad University (PCU Pune)`);
  const location = encodeURIComponent(`${event.venue}, ${event.room || ''}, PCU Pune`);

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${startDate}/${endDate}&details=${details}&location=${location}`;
}
