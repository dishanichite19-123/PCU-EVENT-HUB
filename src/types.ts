export type EventCategory = 
  | 'all'
  | 'academic'
  | 'tech'
  | 'arts'
  | 'career'
  | 'athletics'
  | 'social';

export type EventFormat = 'All' | 'In-Person' | 'Hybrid' | 'Virtual';

export interface PassTier {
  id: string;
  name: string;
  price: number; // 0 for free student RSVP
  description: string;
  remaining: number;
  total: number;
}

export interface Speaker {
  name: string;
  role: string;
  organization: string;
  avatar?: string;
}

export interface CampusEvent {
  id: string;
  title: string;
  category: EventCategory;
  categoryLabel: string;
  description: string;
  longDescription: string;
  organizer: {
    name: string;
    clubOrDept: string;
    contactEmail: string;
  };
  date: string; // ISO date YYYY-MM-DD
  displayDate: string;
  time: string;
  venue: string;
  room?: string;
  campusZone: string;
  format: 'In-Person' | 'Hybrid' | 'Virtual';
  capacity: number;
  registeredCount: number;
  image: string;
  tags: string[];
  featured?: boolean;
  passes: PassTier[];
  speakers?: Speaker[];
  perks?: string[];
  scheduleHighlights?: { time: string; title: string; description: string }[];
  prerequisites?: string[];
}

export interface Registration {
  id: string;
  confirmationCode: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  eventVenue: string;
  eventImage: string;
  categoryLabel: string;
  studentName: string;
  studentEmail: string;
  studentId: string;
  major: string;
  gradYear: string;
  passTierId: string;
  passTierName: string;
  guestCount: number;
  dietaryPreference: string;
  accessibilityNotes?: string;
  registeredAt: string;
  qrToken: string;
  status: 'confirmed' | 'cancelled';
}

export interface RegistrationFormData {
  studentName: string;
  studentEmail: string;
  studentId: string;
  major: string;
  gradYear: string;
  passTierId: string;
  guestCount: number;
  dietaryPreference: string;
  accessibilityNotes: string;
  agreeToCodeOfConduct: boolean;
}
