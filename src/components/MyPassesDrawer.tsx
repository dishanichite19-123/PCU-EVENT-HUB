import React, { useState } from 'react';
import { Registration, CampusEvent } from '../types';
import { DigitalTicketPass } from './DigitalTicketPass';
import { Ticket, Calendar, MapPin, X, Trash2, QrCode, Bookmark, ExternalLink } from 'lucide-react';

interface MyPassesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  registrations: Registration[];
  events: CampusEvent[];
  bookmarkedEventIds: string[];
  onCancelRegistration: (regId: string, eventId: string) => void;
  onSelectEvent: (event: CampusEvent) => void;
}

export const MyPassesDrawer: React.FC<MyPassesDrawerProps> = ({
  isOpen,
  onClose,
  registrations,
  events,
  bookmarkedEventIds,
  onCancelRegistration,
  onSelectEvent
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'passes' | 'saved'>('passes');
  const [inspectingPass, setInspectingPass] = useState<Registration | null>(null);

  if (!isOpen) return null;

  const bookmarkedEvents = events.filter((e) => bookmarkedEventIds.includes(e.id));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center font-bold text-xs">
              <Ticket className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Student Event Dashboard</h2>
              <p className="text-xs text-slate-600">Your campus tickets and bookmarked events</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Sub-tab Navigation */}
        <div className="px-6 pt-3 border-b border-slate-200 bg-slate-50 flex items-center gap-4 shrink-0 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveSubTab('passes');
              setInspectingPass(null);
            }}
            className={`pb-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeSubTab === 'passes'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>My Registered Passes</span>
            <span className="font-mono-numbers px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[11px]">
              {registrations.length}
            </span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveSubTab('saved');
              setInspectingPass(null);
            }}
            className={`pb-2.5 font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeSubTab === 'saved'
                ? 'border-slate-900 text-slate-900'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>Bookmarked Events</span>
            <span className="font-mono-numbers px-1.5 py-0.2 rounded-full bg-slate-200 text-slate-700 text-[11px]">
              {bookmarkedEvents.length}
            </span>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {inspectingPass ? (
            /* Detailed Pass View inside drawer */
            <div className="space-y-4">
              <button
                type="button"
                onClick={() => setInspectingPass(null)}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                ← Back to All Passes
              </button>
              <DigitalTicketPass
                registration={inspectingPass}
                event={events.find((e) => e.id === inspectingPass.eventId)}
              />
            </div>
          ) : activeSubTab === 'passes' ? (
            /* Passes List */
            registrations.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Ticket className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No active passes yet</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Browse the campus event catalog and register for your first verified student pass.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Browse Campus Events
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {registrations.map((reg) => {
                  const event = events.find((e) => e.id === reg.eventId);
                  return (
                    <div
                      key={reg.id}
                      className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-3"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-600">
                            <span>●</span>
                            <span>Confirmed RSVP · {reg.passTierName}</span>
                          </div>
                          <h4 className="text-sm font-bold text-slate-900 mt-1">
                            {reg.eventTitle}
                          </h4>
                          <div className="text-xs text-slate-600 font-mono-numbers mt-0.5">
                            Pass Code: <span className="font-bold text-slate-900">{reg.confirmationCode}</span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => setInspectingPass(reg)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1 shrink-0"
                        >
                          <QrCode className="w-3.5 h-3.5" />
                          <span>Show Pass</span>
                        </button>
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
                        <div className="flex items-center gap-1.5 font-mono-numbers">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{reg.eventDate}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate max-w-[200px]">{reg.eventVenue}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[11px] text-slate-600">
                          Attendee: {reg.studentName} ({reg.studentId})
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to cancel your pass for "${reg.eventTitle}"? Your seat will be returned to the open pool.`)) {
                              onCancelRegistration(reg.id, reg.eventId);
                            }
                          }}
                          className="text-[11px] text-red-600 hover:text-red-800 hover:underline flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Cancel Pass</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          ) : (
            /* Bookmarked Events List */
            bookmarkedEvents.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <Bookmark className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">No saved events</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Click the bookmark ribbon on any event card to save it to your personal watchlist.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookmarkedEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="p-4 bg-white rounded-xl border border-slate-200 hover:border-slate-300 transition-all flex items-center justify-between gap-3"
                  >
                    <div className="space-y-1">
                      <div className="text-xs text-slate-500 font-medium">
                        {evt.categoryLabel} · <span className="font-mono-numbers">{evt.date}</span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 line-clamp-1">
                        {evt.title}
                      </h4>
                      <div className="text-xs text-slate-500 font-mono-numbers">
                        {evt.venue} · {evt.time}
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onSelectEvent(evt);
                      }}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors shrink-0"
                    >
                      View
                    </button>
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
