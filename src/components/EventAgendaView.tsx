import React from 'react';
import { CampusEvent } from '../types';
import { Calendar, Clock, MapPin, Users, Check, ArrowRight } from 'lucide-react';

interface EventAgendaViewProps {
  events: CampusEvent[];
  registeredEventIds: Set<string>;
  onOpenDetails: (event: CampusEvent) => void;
  onRegister: (event: CampusEvent) => void;
}

export const EventAgendaView: React.FC<EventAgendaViewProps> = ({
  events,
  registeredEventIds,
  onOpenDetails,
  onRegister
}) => {
  // Group events by date
  const groupedEvents = events.reduce<Record<string, CampusEvent[]>>((acc, event) => {
    if (!acc[event.date]) {
      acc[event.date] = [];
    }
    acc[event.date].push(event);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedEvents).sort();

  if (events.length === 0) {
    return (
      <div className="py-16 text-center bg-white rounded-2xl border border-slate-200 p-8">
        <Calendar className="w-10 h-10 text-slate-400 mx-auto mb-3" />
        <h3 className="text-base font-semibold text-slate-900">No events match your criteria</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          Try expanding your date filter or clearing selected categories to see more campus events.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {sortedDates.map((dateKey) => {
        const dayEvents = groupedEvents[dateKey];
        const dateObj = new Date(dateKey + 'T00:00:00');
        const formattedDateTitle = dateObj.toLocaleDateString('en-US', {
          weekday: 'long',
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        });

        return (
          <div key={dateKey} className="space-y-3">
            {/* Date Section Header */}
            <div className="flex items-center gap-3 sticky top-14 bg-slate-50/95 backdrop-blur py-2 z-10">
              <span className="text-sm font-bold text-slate-900 font-mono-numbers">
                {formattedDateTitle}
              </span>
              <div className="h-px bg-slate-200 flex-1" />
              <span className="text-xs text-slate-500 font-mono-numbers">
                {dayEvents.length} {dayEvents.length === 1 ? 'event' : 'events'}
              </span>
            </div>

            {/* List of events for this day */}
            <div className="space-y-3">
              {dayEvents.map((evt) => {
                const isRegistered = registeredEventIds.has(evt.id);
                const remaining = Math.max(0, evt.capacity - evt.registeredCount);
                const isFull = remaining <= 0;

                return (
                  <div
                    key={evt.id}
                    className="bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:border-slate-300 transition-all shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4"
                  >
                    {/* Left: Time and Basic Info */}
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
                        <span className="text-slate-800 font-semibold">{evt.categoryLabel}</span>
                        <span>·</span>
                        <span className="font-mono-numbers text-slate-700">{evt.time}</span>
                        <span>·</span>
                        <span>{evt.format}</span>
                        <span>·</span>
                        <span>{evt.campusZone}</span>
                      </div>

                      <h3
                        onClick={() => onOpenDetails(evt)}
                        className="text-base font-bold text-slate-900 hover:text-blue-700 cursor-pointer transition-colors"
                      >
                        {evt.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-1 max-w-3xl">
                        {evt.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-slate-500 pt-1 font-mono-numbers">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span>{evt.venue} {evt.room ? `(${evt.room})` : ''}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-3.5 h-3.5 text-slate-400" />
                          <span>
                            {evt.registeredCount}/{evt.capacity} spots ({remaining} left)
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <button
                        type="button"
                        onClick={() => onOpenDetails(evt)}
                        className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        Details
                      </button>
                      <button
                        type="button"
                        disabled={isFull && !isRegistered}
                        onClick={() => onRegister(evt)}
                        className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                          isRegistered
                            ? 'bg-slate-100 text-slate-900 border border-slate-300 hover:bg-slate-200'
                            : isFull
                            ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            : 'bg-slate-900 text-white hover:bg-slate-800'
                        }`}
                      >
                        {isRegistered ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>View Pass</span>
                          </>
                        ) : isFull ? (
                          'At Capacity'
                        ) : (
                          <>
                            <span>Register</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};
