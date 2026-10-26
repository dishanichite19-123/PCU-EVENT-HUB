import React, { useState } from 'react';
import { CampusEvent, EventCategory } from '../types';
import { CATEGORY_FILTERS } from '../data/initialEvents';
import { X, PlusCircle, CheckCircle, Calendar, Sparkles } from 'lucide-react';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (newEvent: CampusEvent) => void;
}

export const CreateEventModal: React.FC<CreateEventModalProps> = ({
  isOpen,
  onClose,
  onAddEvent
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<EventCategory>('tech');
  const [date, setDate] = useState('2026-11-15');
  const [time, setTime] = useState('5:30 PM – 8:00 PM');
  const [venue, setVenue] = useState('PCU Innovation & Incubation Center');
  const [room, setRoom] = useState('Atrium Hall 201');
  const [campusZone, setCampusZone] = useState('PCU Sate-Maval Campus Pune');
  const [format, setFormat] = useState<'In-Person' | 'Hybrid' | 'Virtual'>('In-Person');
  const [capacity, setCapacity] = useState(200);
  const [organizerName, setOrganizerName] = useState('');
  const [organizerClub, setOrganizerClub] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('PCU Club, Workshop, Hackathon, Pune');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!title.trim()) newErrors.title = 'Event title is required.';
    if (!description.trim()) newErrors.description = 'Please provide an event summary.';
    if (!organizerName.trim()) newErrors.organizerName = 'Organizer contact name is required.';
    if (!organizerClub.trim()) newErrors.organizerClub = 'Club or Department is required.';
    if (!contactEmail.trim() || !contactEmail.includes('@')) newErrors.contactEmail = 'Valid contact email is required.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const catObj = CATEGORY_FILTERS.find((c) => c.id === category);
    const dateObj = new Date(date + 'T00:00:00');
    const displayDateStr = dateObj.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    // Default to one of the rich generated campus images
    const sampleImages = [
      '/images/hero_campus_quad_1793000612998.jpg',
      '/images/event_hackathon_1793000613790.jpg',
      '/images/event_arts_music_1793000613362.jpg',
      '/images/event_career_fair_1793000614416.jpg',
      '/images/event_quad_festival_1793000614111.jpg'
    ];
    const pickedImage = sampleImages[Math.floor(Math.random() * sampleImages.length)];

    const createdEvent: CampusEvent = {
      id: `evt-user-${Date.now()}`,
      title: title.trim(),
      category: category,
      categoryLabel: catObj ? catObj.label : 'Campus Life',
      description: description.trim(),
      longDescription: `${description.trim()} Organised and hosted by ${organizerClub.trim()}. For questions or special accommodations, please contact ${contactEmail.trim()}.`,
      organizer: {
        name: organizerName.trim(),
        clubOrDept: organizerClub.trim(),
        contactEmail: contactEmail.trim()
      },
      date: date,
      displayDate: displayDateStr,
      time: time,
      venue: venue,
      room: room,
      campusZone: campusZone,
      format: format,
      capacity: Number(capacity) || 100,
      registeredCount: 0,
      image: pickedImage,
      tags: tags.length > 0 ? tags : ['Campus Event', 'Student Life'],
      passes: [
        {
          id: `pass-${Date.now()}-1`,
          name: 'General Student Admission',
          price: 0,
          description: 'Official student entry pass with guaranteed seating.',
          remaining: Number(capacity) || 100,
          total: Number(capacity) || 100
        }
      ]
    };

    onAddEvent(createdEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-base font-bold text-white tracking-tight">
              Host a Campus Event
            </h2>
            <p className="text-xs text-slate-300">
              Submit your club or department event to the public campus hub
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs text-slate-700">
          {/* Title */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Autonomous Drone Racing Exhibition & Workshop"
              className={`w-full px-3 py-2 bg-white border rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 ${
                errors.title ? 'border-red-400' : 'border-slate-300'
              }`}
            />
            {errors.title && <span className="text-red-600 text-[11px] mt-0.5 block">{errors.title}</span>}
          </div>

          {/* Category & Format */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as EventCategory)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                {CATEGORY_FILTERS.filter((c) => c.id !== 'all').map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-800 mb-1">Event Format</label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value as any)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              >
                <option value="In-Person">In-Person on Campus</option>
                <option value="Hybrid">Hybrid (In-Person + Live Stream)</option>
                <option value="Virtual">Virtual / Remote Webinar</option>
              </select>
            </div>
          </div>

          {/* Date, Time, Capacity */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Event Date</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Time Range</label>
              <input
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="5:00 PM – 7:30 PM"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Capacity (Max Seats)</label>
              <input
                type="number"
                min="10"
                max="5000"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 font-mono-numbers"
              />
            </div>
          </div>

          {/* Venue & Room */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-800 mb-1">Venue / Building</label>
              <input
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Science Quad Lecture Hall"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Room / Floor</label>
              <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room 101"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
            </div>
          </div>

          {/* Organizer Info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Host Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={organizerName}
                onChange={(e) => setOrganizerName(e.target.value)}
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              {errors.organizerName && <span className="text-red-600 text-[11px] block">{errors.organizerName}</span>}
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Club / Dept <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={organizerClub}
                onChange={(e) => setOrganizerClub(e.target.value)}
                placeholder="e.g. Robotics Club"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              {errors.organizerClub && <span className="text-red-600 text-[11px] block">{errors.organizerClub}</span>}
            </div>
            <div>
              <label className="block font-semibold text-slate-800 mb-1">Contact Email <span className="text-red-500">*</span></label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="club@campus.edu"
                className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              {errors.contactEmail && <span className="text-red-600 text-[11px] block">{errors.contactEmail}</span>}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">
              Event Description & Agenda <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Outline the event schedule, target audience, and what students will experience..."
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
            {errors.description && <span className="text-red-600 text-[11px] block">{errors.description}</span>}
          </div>

          {/* Tags */}
          <div>
            <label className="block font-semibold text-slate-800 mb-1">Tags (comma-separated)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="e.g. Engineering, Hardware, Free Food"
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Publish Event</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
