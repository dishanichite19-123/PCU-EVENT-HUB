import React, { useState, useEffect, useMemo } from 'react';
import { CampusEvent, EventCategory, EventFormat, Registration } from './types';
import {
  getStoredEvents,
  saveStoredEvents,
  getStoredRegistrations,
  saveStoredRegistrations,
  getStoredBookmarks,
  saveStoredBookmarks
} from './utils/storage';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventFilterBar } from './components/EventFilterBar';
import { EventCard } from './components/EventCard';
import { EventAgendaView } from './components/EventAgendaView';
import { EventDetailsModal } from './components/EventDetailsModal';
import { RegistrationModal } from './components/RegistrationModal';
import { MyPassesDrawer } from './components/MyPassesDrawer';
import { CreateEventModal } from './components/CreateEventModal';
import { CampusFacilitiesGallery } from './components/CampusFacilitiesGallery';
import { GoogleAuthModal } from './components/GoogleAuthModal';
import { Ticket, Calendar, Search, MapPin, Sparkles, Plus, CheckCircle2 } from 'lucide-react';

export default function App() {
  // State Initialization from LocalStorage
  const [events, setEvents] = useState<CampusEvent[]>(() => getStoredEvents());
  const [registrations, setRegistrations] = useState<Registration[]>(() => getStoredRegistrations());
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(() => getStoredBookmarks());

  // Filter & Navigation State
  const [activeTab, setActiveTab] = useState<'catalog' | 'agenda' | 'facilities' | 'passes'>('catalog');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('all');
  const [selectedFormat, setSelectedFormat] = useState<EventFormat>('All');
  const [dateFilter, setDateFilter] = useState<'all' | 'this-week' | 'this-weekend' | 'november'>('all');
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'agenda'>('grid');

  // Modals & Drawers
  const [detailsEvent, setDetailsEvent] = useState<CampusEvent | null>(null);
  const [registerEvent, setRegisterEvent] = useState<CampusEvent | null>(null);
  const [isPassesDrawerOpen, setIsPassesDrawerOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Sync to Storage
  useEffect(() => {
    saveStoredEvents(events);
  }, [events]);

  useEffect(() => {
    saveStoredRegistrations(registrations);
  }, [registrations]);

  useEffect(() => {
    saveStoredBookmarks(bookmarkedIds);
  }, [bookmarkedIds]);

  // Set of registered event IDs for quick lookup
  const registeredEventIdSet = useMemo(() => {
    return new Set(registrations.map((r) => r.eventId));
  }, [registrations]);

  // Handle new registration
  const handleRegisterSuccess = (newReg: Registration) => {
    setRegistrations((prev) => [newReg, ...prev]);

    // Update event registered count & pass tier remaining
    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === newReg.eventId) {
          const updatedPasses = evt.passes.map((p) => {
            if (p.id === newReg.passTierId) {
              return { ...p, remaining: Math.max(0, p.remaining - (1 + newReg.guestCount)) };
            }
            return p;
          });

          return {
            ...evt,
            registeredCount: evt.registeredCount + 1 + newReg.guestCount,
            passes: updatedPasses
          };
        }
        return evt;
      })
    );
  };

  // Handle cancellation
  const handleCancelRegistration = (regId: string, eventId: string) => {
    const targetReg = registrations.find((r) => r.id === regId);
    const seatsToReturn = targetReg ? 1 + targetReg.guestCount : 1;

    setRegistrations((prev) => prev.filter((r) => r.id !== regId));

    setEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === eventId) {
          const updatedPasses = evt.passes.map((p) => {
            if (targetReg && p.id === targetReg.passTierId) {
              return { ...p, remaining: Math.min(p.total, p.remaining + seatsToReturn) };
            }
            return p;
          });

          return {
            ...evt,
            registeredCount: Math.max(0, evt.registeredCount - seatsToReturn),
            passes: updatedPasses
          };
        }
        return evt;
      })
    );
  };

  // Handle Bookmarks
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Handle adding user event
  const handleAddEvent = (newEvent: CampusEvent) => {
    setEvents((prev) => [newEvent, ...prev]);
    setSelectedCategory('all');
    setActiveTab('catalog');
  };

  // Filtering Logic
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      // Category filter
      if (selectedCategory !== 'all' && evt.category !== selectedCategory) {
        return false;
      }

      // Format filter
      if (selectedFormat !== 'All' && evt.format !== selectedFormat) {
        return false;
      }

      // Available seats filter
      if (onlyAvailable && evt.registeredCount >= evt.capacity) {
        return false;
      }

      // Date preset filter (Current reference date is late October 2026)
      if (dateFilter === 'this-week') {
        // e.g. Oct 26 - Nov 1, 2026
        if (evt.date > '2026-11-01') return false;
      } else if (dateFilter === 'this-weekend') {
        // Oct 30 - Nov 1
        if (evt.date < '2026-10-30' || evt.date > '2026-11-01') return false;
      } else if (dateFilter === 'november') {
        if (!evt.date.startsWith('2026-11')) return false;
      }

      // Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesTitle = evt.title.toLowerCase().includes(query);
        const matchesDesc = evt.description.toLowerCase().includes(query);
        const matchesVenue = evt.venue.toLowerCase().includes(query);
        const matchesOrg =
          evt.organizer.name.toLowerCase().includes(query) ||
          evt.organizer.clubOrDept.toLowerCase().includes(query);
        const matchesTags = evt.tags.some((t) => t.toLowerCase().includes(query));
        const matchesSpeaker = evt.speakers?.some((s) => s.name.toLowerCase().includes(query));

        if (!matchesTitle && !matchesDesc && !matchesVenue && !matchesOrg && !matchesTags && !matchesSpeaker) {
          return false;
        }
      }

      return true;
    });
  }, [events, selectedCategory, selectedFormat, onlyAvailable, dateFilter, searchQuery]);

  const hasActiveFilters =
    selectedCategory !== 'all' ||
    selectedFormat !== 'All' ||
    dateFilter !== 'all' ||
    onlyAvailable ||
    Boolean(searchQuery.trim());

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedFormat('All');
    setDateFilter('all');
    setOnlyAvailable(false);
    setSearchQuery('');
  };

  // Featured Event for Hero
  const featuredEvent = events.find((e) => e.featured) || events[0];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Strict Top Bar Contract Header */}
      <Navbar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          if (tab === 'passes') {
            setIsPassesDrawerOpen(true);
          } else {
            setActiveTab(tab);
            if (tab === 'agenda') {
              setViewMode('agenda');
            } else if (tab === 'catalog') {
              setViewMode('grid');
            }
          }
        }}
        registeredCount={registrations.length}
        onOpenCreateEvent={() => setIsCreateModalOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onQuickCategory={(cat) => {
            setSelectedCategory(cat as EventCategory);
            setActiveTab('catalog');
          }}
          featuredEventTitle={featuredEvent?.title}
          onSelectFeatured={() => {
            if (featuredEvent) setDetailsEvent(featuredEvent);
          }}
        />

        {/* Dedicated Facilities Gallery View Tab */}
        {activeTab === 'facilities' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <CampusFacilitiesGallery
              onFilterByVenue={(venueKey) => {
                setSearchQuery(venueKey);
                setActiveTab('catalog');
              }}
            />
          </div>
        ) : null}

        {/* Main Event Explorer Container */}
        <section id="events-explorer" className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
          {/* Section Heading */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <span className="text-xs font-semibold text-blue-900 uppercase tracking-widest">
                PCU Pune Event Catalog
              </span>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-0.5">
                Upcoming Collegiate Gatherings
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setActiveTab('facilities')}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900"
            >
              <MapPin className="w-3.5 h-3.5 text-blue-900" />
              <span>Campus Facilities Gallery</span>
            </button>
          </div>

          {/* Filter Bar with Segmented Controls */}
          <EventFilterBar
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            selectedFormat={selectedFormat}
            onSelectFormat={setSelectedFormat}
            dateFilter={dateFilter}
            onSelectDateFilter={setDateFilter}
            onlyAvailable={onlyAvailable}
            onToggleOnlyAvailable={() => setOnlyAvailable(!onlyAvailable)}
            viewMode={viewMode}
            onChangeViewMode={(mode) => {
              setViewMode(mode);
              setActiveTab(mode === 'agenda' ? 'agenda' : 'catalog');
            }}
            totalFilteredCount={filteredEvents.length}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Active View Rendering */}
          {viewMode === 'grid' ? (
            filteredEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((evt) => (
                  <EventCard
                    key={evt.id}
                    event={evt}
                    isBookmarked={bookmarkedIds.includes(evt.id)}
                    isRegistered={registeredEventIdSet.has(evt.id)}
                    onToggleBookmark={handleToggleBookmark}
                    onOpenDetails={(e) => setDetailsEvent(e)}
                    onRegister={(e) => setRegisterEvent(e)}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
                <Search className="w-10 h-10 text-slate-400 mx-auto" />
                <h3 className="text-base font-bold text-slate-900">
                  No campus events match your filter criteria
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No upcoming activities found matching "{searchQuery || 'selected filters'}". Try resetting your filters to browse all campus happenings.
                </p>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )
          ) : (
            <EventAgendaView
              events={filteredEvents}
              registeredEventIds={registeredEventIdSet}
              onOpenDetails={(e) => setDetailsEvent(e)}
              onRegister={(e) => setRegisterEvent(e)}
            />
          )}
        </section>

        {/* Embedded Facilities Tour on Catalog View */}
        {activeTab === 'catalog' && (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
            <CampusFacilitiesGallery
              onFilterByVenue={(venueKey) => {
                setSearchQuery(venueKey);
                const el = document.getElementById('events-explorer');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </div>
        )}

        {/* Informational Callout Section (Claim-to-Proof & Student Support) */}
        <section className="bg-white border-t border-slate-200 mt-12 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  1. Digital Check-in
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Instant Mobile Gate Passes
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every registration generates a verified student pass equipped with a barcode and quick scanner QR code recognized at all campus auditorium and lab turnstiles.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  2. Calendar Synchronization
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Export to Google & Apple Calendar
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Download standard `.ics` invites directly to your device calendar or add directly to Google Calendar so you never miss a lecture or symposium start time.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800">
                  3. Student Club Hosting
                </div>
                <h4 className="text-base font-bold text-slate-900">
                  Publish Your Club's Next Event
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Are you an officer in an accredited student society or engineering group? Use the Host form to broadcast your workshops and manage attendee RSVPs.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200 bg-slate-100 py-8 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="font-bold text-slate-900 tracking-tight">PCU Event Hub</span>
            <span>·</span>
            <span>Pimpri Chinchwad University, Pune</span>
            <span>·</span>
            <span className="text-slate-600">Pimpri Chinchwad Education Trust (PCET)</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              Submit Club Event
            </button>
            <button
              onClick={() => setIsPassesDrawerOpen(true)}
              className="hover:text-slate-900 transition-colors"
            >
              My Registered Passes ({registrations.length})
            </button>
            <span className="font-mono-numbers text-slate-600">Pune, Maharashtra</span>
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      {/* 1. Event Details Modal */}
      <EventDetailsModal
        event={detailsEvent}
        isOpen={Boolean(detailsEvent)}
        onClose={() => setDetailsEvent(null)}
        isRegistered={detailsEvent ? registeredEventIdSet.has(detailsEvent.id) : false}
        onOpenRegister={(evt) => setRegisterEvent(evt)}
      />

      {/* 2. Interactive Working Registration Form Modal */}
      <RegistrationModal
        event={registerEvent}
        isOpen={Boolean(registerEvent)}
        onClose={() => setRegisterEvent(null)}
        onRegisterSuccess={handleRegisterSuccess}
        existingRegistration={
          registerEvent ? registrations.find((r) => r.eventId === registerEvent.id) : undefined
        }
      />

      {/* 3. My Registered Passes & Bookmarks Drawer */}
      <MyPassesDrawer
        isOpen={isPassesDrawerOpen}
        onClose={() => setIsPassesDrawerOpen(false)}
        registrations={registrations}
        events={events}
        bookmarkedEventIds={bookmarkedIds}
        onCancelRegistration={handleCancelRegistration}
        onSelectEvent={(evt) => {
          setIsPassesDrawerOpen(false);
          setDetailsEvent(evt);
        }}
      />

      {/* 4. Host/Submit New Campus Event Modal */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onAddEvent={handleAddEvent}
      />

      {/* 5. Google Authentication Modal */}
      <GoogleAuthModal />
    </div>
  );
}
