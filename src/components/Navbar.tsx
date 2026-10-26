import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Ticket, CalendarDays, Compass, PlusCircle, Lock, LogOut, UserCheck, ChevronDown } from 'lucide-react';

interface NavbarProps {
  activeTab: 'catalog' | 'agenda' | 'facilities' | 'passes';
  onSelectTab: (tab: 'catalog' | 'agenda' | 'facilities' | 'passes') => void;
  registeredCount: number;
  onOpenCreateEvent: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  registeredCount,
  onOpenCreateEvent
}) => {
  const { user, isAuthenticated, openAuthModal, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Brand Zone - Single element wordmark with SSL status */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onSelectTab('catalog')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-950 text-white flex items-center justify-center font-bold text-xs tracking-tight group-hover:bg-blue-900 transition-colors shadow-xs">
              PCU
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0">
              PCU Event Hub
            </span>
          </button>

          {/* SSL Transport Security Badge */}
          <div className="hidden lg:flex items-center gap-1 px-2 py-0.5 bg-slate-100/80 rounded-md border border-slate-200 text-[10px] text-slate-600 font-mono-numbers">
            <Lock className="w-2.5 h-2.5 text-emerald-600" />
            <span>SSL / TLS 1.3</span>
          </div>
        </div>

        {/* Zone 2: 4-5 Nav Links - Single-line text links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <button
            onClick={() => onSelectTab('catalog')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-900 ${
              activeTab === 'catalog' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
            }`}
          >
            Explore Events
          </button>
          <button
            onClick={() => onSelectTab('facilities')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-900 ${
              activeTab === 'facilities' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
            }`}
          >
            Campus Facilities
          </button>
          <button
            onClick={() => onSelectTab('agenda')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-900 ${
              activeTab === 'agenda' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
            }`}
          >
            Timeline Schedule
          </button>
          <button
            onClick={() => onSelectTab('passes')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 hover:text-slate-900 flex items-center gap-1.5 ${
              activeTab === 'passes' ? 'text-slate-900 font-semibold border-b-2 border-slate-900' : ''
            }`}
          >
            <span>My Student Passes</span>
            {registeredCount > 0 && (
              <span className="font-mono-numbers text-[11px] font-bold bg-slate-900 text-white rounded-full px-1.5 py-0.2">
                {registeredCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenCreateEvent}
            className="whitespace-nowrap shrink-0 text-slate-600 hover:text-slate-900 transition-colors py-1 flex items-center gap-1"
          >
            <span>Host an Event</span>
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action (Google Auth & Passes) */}
        <div className="flex items-center gap-3 shrink-0">
          {isAuthenticated && user ? (
            /* Authenticated Google User Dropdown */
            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 transition-all text-left shadow-2xs"
              >
                <img
                  src={user.picture}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-slate-200"
                />
                <div className="hidden sm:block text-xs">
                  <div className="font-bold text-slate-900 leading-tight truncate max-w-[110px]">
                    {user.name.split(' ')[0]}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 p-3 z-50 text-xs space-y-2 animate-in fade-in duration-150">
                  <div className="pb-2 border-b border-slate-100">
                    <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                      <span>{user.name}</span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1 rounded">
                        Google
                      </span>
                    </div>
                    <div className="text-slate-500 font-mono-numbers truncate text-[11px]">
                      {user.email}
                    </div>
                    {user.studentPrn && (
                      <div className="text-[11px] text-blue-900 font-mono-numbers font-medium mt-0.5">
                        PRN: {user.studentPrn}
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      onSelectTab('passes');
                    }}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 text-slate-700 transition-colors"
                  >
                    <span className="font-medium">My Registered Passes</span>
                    <span className="font-mono-numbers font-bold bg-slate-100 px-1.5 py-0.5 rounded">
                      {registeredCount}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsUserMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 p-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-slate-100"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out of Google</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* Sign in with Google Button */
            <button
              type="button"
              onClick={openAuthModal}
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors shadow-2xs whitespace-nowrap shrink-0"
            >
              {/* Google G SVG */}
              <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span>Sign in with Google</span>
            </button>
          )}

          {/* Quick Passes CTA */}
          <button
            onClick={() => onSelectTab('passes')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0 shadow-xs"
          >
            <Ticket className="w-3.5 h-3.5 text-emerald-400" />
            <span>Passes ({registeredCount})</span>
          </button>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-3 py-2 bg-slate-50 text-xs">
        <button
          onClick={() => onSelectTab('catalog')}
          className={`flex items-center gap-1 py-1 font-medium ${
            activeTab === 'catalog' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>Events</span>
        </button>
        <button
          onClick={() => onSelectTab('facilities')}
          className={`flex items-center gap-1 py-1 font-medium ${
            activeTab === 'facilities' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Venues</span>
        </button>
        <button
          onClick={() => onSelectTab('agenda')}
          className={`flex items-center gap-1 py-1 font-medium ${
            activeTab === 'agenda' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <CalendarDays className="w-3.5 h-3.5" />
          <span>Timeline</span>
        </button>
        <button
          onClick={() => onSelectTab('passes')}
          className={`flex items-center gap-1 py-1 font-medium ${
            activeTab === 'passes' ? 'text-slate-900 font-bold' : 'text-slate-500'
          }`}
        >
          <Ticket className="w-3.5 h-3.5" />
          <span>Passes ({registeredCount})</span>
        </button>
        <button
          onClick={onOpenCreateEvent}
          className="flex items-center gap-1 py-1 text-slate-700 font-medium"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Submit</span>
        </button>
      </div>
    </header>
  );
};
