import React from 'react';
import { CampusEvent } from '../types';
import { X, Calendar, Clock, MapPin, Users, Check, Sparkles, Building, Mail, ShieldAlert, ArrowRight } from 'lucide-react';

interface EventDetailsModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  isRegistered: boolean;
  onOpenRegister: (event: CampusEvent) => void;
}

export const EventDetailsModal: React.FC<EventDetailsModalProps> = ({
  event,
  isOpen,
  onClose,
  isRegistered,
  onOpenRegister
}) => {
  if (!isOpen || !event) return null;

  const remaining = Math.max(0, event.capacity - event.registeredCount);
  const isFull = remaining <= 0;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with Image */}
        <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden bg-slate-900 shrink-0">
          <img
            src={event.image}
            alt={event.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center transition-colors backdrop-blur"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Category & Date Overlay */}
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-300">
              <span>{event.categoryLabel}</span>
              <span>·</span>
              <span>{event.format}</span>
              <span>·</span>
              <span>{event.campusZone}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mt-1 text-white leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-slate-700 divide-y divide-slate-100">
          {/* Quick Date, Time, Venue Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4">
            <div className="flex items-start gap-2.5">
              <Calendar className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-slate-500 block">Date</span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm">{event.displayDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-slate-500 block">Time</span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm font-mono-numbers">{event.time}</span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
              <div>
                <span className="text-xs text-slate-500 block">Location</span>
                <span className="font-semibold text-slate-900 text-xs sm:text-sm">{event.venue}</span>
                {event.room && <span className="text-xs text-slate-500 block">{event.room}</span>}
              </div>
            </div>
          </div>

          {/* Detailed Overview */}
          <div className="pt-4 space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">About This Event</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              {event.longDescription}
            </p>
          </div>

          {/* Schedule Highlights */}
          {event.scheduleHighlights && event.scheduleHighlights.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Schedule Highlights</h3>
              <div className="space-y-2.5">
                {event.scheduleHighlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-mono-numbers text-xs font-bold text-slate-900 bg-white px-2 py-1 rounded border border-slate-200 shrink-0">
                      {item.time}
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{item.title}</div>
                      <div className="text-xs text-slate-600 mt-0.5">{item.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Speakers / Hosts */}
          {event.speakers && event.speakers.length > 0 && (
            <div className="pt-4 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Featured Speakers & Hosts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.speakers.map((spk, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                      {spk.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 text-xs">{spk.name}</div>
                      <div className="text-xs text-slate-600">{spk.role}</div>
                      <div className="text-[11px] text-slate-600">{spk.organization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Perks & Prerequisites */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {event.perks && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">Attendee Perks</span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {event.perks.map((perk, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {event.prerequisites && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider block">What to Bring & Rules</span>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  {event.prerequisites.map((req, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-mono">·</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Organizer Info */}
          <div className="pt-4 flex items-center justify-between text-xs text-slate-500">
            <div>
              <span className="font-semibold text-slate-700">Hosted by:</span> {event.organizer.name} ({event.organizer.clubOrDept})
            </div>
            <a
              href={`mailto:${event.organizer.contactEmail}`}
              className="text-slate-700 hover:text-slate-900 hover:underline flex items-center gap-1"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Contact Host</span>
            </a>
          </div>
        </div>

        {/* Modal Footer Bar */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono-numbers">
            <span className="text-slate-500">Capacity: </span>
            <span className="font-semibold text-slate-900">{event.registeredCount}/{event.capacity} Registered</span>
            <span className="text-slate-400 ml-2">({remaining} spots left)</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              type="button"
              disabled={isFull && !isRegistered}
              onClick={() => {
                onClose();
                onOpenRegister(event);
              }}
              className={`px-5 py-2 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                isRegistered
                  ? 'bg-slate-900 text-white hover:bg-slate-800'
                  : isFull
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-sm'
              }`}
            >
              {isRegistered ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>View My Pass</span>
                </>
              ) : isFull ? (
                'Event Full'
              ) : (
                <>
                  <span>Register Free Pass</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
