import React, { useState } from 'react';
import { CampusEvent } from '../types';
import { Calendar, Clock, MapPin, Bookmark, Users, Check, ArrowUpRight } from 'lucide-react';

interface EventCardProps {
  event: CampusEvent;
  isBookmarked: boolean;
  isRegistered: boolean;
  onToggleBookmark: (id: string) => void;
  onOpenDetails: (event: CampusEvent) => void;
  onRegister: (event: CampusEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({
  event,
  isBookmarked,
  isRegistered,
  onToggleBookmark,
  onOpenDetails,
  onRegister,
}) => {
  const [imageError, setImageError] = useState(false);
  const remainingSeats = Math.max(0, event.capacity - event.registeredCount);
  const isFull = remainingSeats <= 0;
  const isAlmostFull = remainingSeats > 0 && remainingSeats <= 30;

  return (
    <article className="bg-white rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all hover:shadow-md group">
      {/* Media Slot with Zero-Broken-Image Fallback */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        {!imageError ? (
          <img
            src={event.image}
            alt={event.title}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-slate-800 to-slate-900 text-white text-center">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
              {event.categoryLabel}
            </span>
            <span className="text-sm font-bold mt-1 text-slate-100 line-clamp-2">
              {event.title}
            </span>
          </div>
        )}

        {/* Clean Top Overlay: Bookmark Action & Registration Indicator */}
        <div className="absolute top-3 right-3 flex items-center gap-2">
          {isRegistered && (
            <div className="flex items-center gap-1 bg-slate-900/90 backdrop-blur text-emerald-400 px-2.5 py-1 rounded-md text-[11px] font-semibold">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Pass Confirmed</span>
            </div>
          )}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleBookmark(event.id);
            }}
            aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark event'}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur hover:bg-white text-slate-700 hover:text-slate-900 flex items-center justify-center transition-colors shadow-xs"
          >
            <Bookmark
              className={`w-4 h-4 ${isBookmarked ? 'fill-amber-500 text-amber-500' : 'text-slate-600'}`}
            />
          </button>
        </div>

        {/* Format Badge - Clean unboxed text overlay */}
        <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-200">
          {event.format} · {event.campusZone}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Unboxed Metadata Line (Zero-Pill Rule) */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
            <span className="text-slate-800 font-semibold">{event.categoryLabel}</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono-numbers">{event.date}</span>
          </div>

          {/* Event Title */}
          <h2
            onClick={() => onOpenDetails(event)}
            className="text-lg font-bold text-slate-900 hover:text-blue-700 transition-colors cursor-pointer leading-snug line-clamp-2"
          >
            {event.title}
          </h2>

          {/* Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {event.description}
          </p>

          {/* Time & Venue Information */}
          <div className="pt-2 border-t border-slate-100 space-y-1 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="font-mono-numbers">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{event.venue} {event.room ? `(${event.room})` : ''}</span>
            </div>
          </div>
        </div>

        {/* Bottom Capacity & Action Zone */}
        <div className="pt-3 border-t border-slate-100 space-y-3">
          {/* Capacity Bar & Status */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-mono-numbers text-slate-600">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>
                {event.registeredCount}/{event.capacity} RSVPs
              </span>
            </div>
            <span
              className={`font-mono-numbers font-medium ${
                isFull
                  ? 'text-red-600'
                  : isAlmostFull
                  ? 'text-amber-600'
                  : 'text-emerald-700'
              }`}
            >
              {isFull ? 'At Capacity' : `${remainingSeats} spots open`}
            </span>
          </div>

          {/* Interactive CTAs */}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => onOpenDetails(event)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors whitespace-nowrap text-center"
            >
              Details
            </button>
            <button
              type="button"
              disabled={isFull && !isRegistered}
              onClick={() => onRegister(event)}
              className={`px-3 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap text-center ${
                isRegistered
                  ? 'bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200'
                  : isFull
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs'
              }`}
            >
              {isRegistered ? 'View Pass' : isFull ? 'Waitlist Only' : 'Register Pass'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
