import React, { useState } from 'react';
import { Search, Calendar, MapPin, Users, Sparkles, ArrowRight, Building2 } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onQuickCategory: (cat: string) => void;
  featuredEventTitle?: string;
  onSelectFeatured: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  searchQuery,
  onSearchChange,
  onQuickCategory,
  featuredEventTitle,
  onSelectFeatured
}) => {
  const [heroImgError, setHeroImgError] = useState(false);
  return (
    <div className="relative border-b border-slate-200 bg-white">
      {/* Hero Banner Grid Split */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-semibold text-slate-700 uppercase tracking-widest flex items-center gap-2">
              <span className="font-bold text-blue-900">PCET Legacy</span>
              <span>·</span>
              <span>Pimpri Chinchwad University (PCU) Pune · Sate-Maval Campus</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 leading-[1.15] text-balance">
              Experience the pulse of PCU Pune campus life.
            </h1>

            <p className="text-base text-slate-600 leading-relaxed max-w-2xl">
              From the flagship <span className="text-slate-900 font-semibold">ANANTAM</span> cultural fest and 36-hour <span className="text-slate-900 font-semibold">SoET Ideathons</span> to <span className="text-slate-900 font-semibold">NAVYOM</span> leadership conclaves and <span className="text-slate-900 font-semibold">KRIDARAMBHA</span> sports. Reserve your verified student entry pass with your PCU PRN.
            </p>

            {/* Integrated Search Input */}
            <div className="relative max-w-xl">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search ANANTAM, Ideathon, NAVYOM, CREST Club, SoET, or Sports Arena..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:bg-white transition-all shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-xs text-slate-600 hover:text-slate-800"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Quick Filter Jump Links */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-slate-600">
              <span className="font-medium text-slate-600">Quick Filters:</span>
              <button
                type="button"
                onClick={() => onQuickCategory('arts')}
                className="hover:text-slate-900 hover:underline font-medium text-blue-900"
              >
                ANANTAM Cultural Fest
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onQuickCategory('tech')}
                className="hover:text-slate-900 hover:underline font-medium"
              >
                PCU Ideathon & Tech
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onQuickCategory('career')}
                className="hover:text-slate-900 hover:underline font-medium"
              >
                NAVYOM Management
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => onQuickCategory('athletics')}
                className="hover:text-slate-900 hover:underline font-medium"
              >
                KRIDARAMBHA Sports
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Asset */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 shadow-md group bg-slate-900">
              {!heroImgError ? (
                <img
                  src="/images/pcu_campus_entrance_1793001612096.jpg"
                  alt="Pimpri Chinchwad University PCU Main Academic Building Pune"
                  referrerPolicy="no-referrer"
                  onError={() => setHeroImgError(true)}
                  className="w-full h-72 sm:h-80 lg:h-96 object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                />
              ) : (
                <div className="w-full h-72 sm:h-80 lg:h-96 flex flex-col justify-center items-center bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 p-6 text-white text-center">
                  <Building2 className="w-12 h-12 text-blue-400 mb-2 opacity-80" />
                  <span className="text-xs uppercase tracking-wider text-blue-300 font-semibold">Pimpri Chinchwad University</span>
                  <span className="text-base font-bold text-white mt-1">Sate-Maval Campus Pune</span>
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                  Featured University Fest
                </div>
                <div className="font-bold text-lg text-white mt-1 leading-snug">
                  {featuredEventTitle || 'ANANTAM 2026 – PCU Flagship Cultural Extravaganza'}
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200 mt-2 font-mono-numbers">
                  <span>PCU Central Amphitheatre</span>
                  <span>·</span>
                  <span>Nov 12–14, 2026</span>
                </div>
                <button
                  type="button"
                  onClick={onSelectFeatured}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-white/20 backdrop-blur hover:bg-white hover:text-slate-900 px-3.5 py-1.5 rounded-lg transition-colors w-fit"
                >
                  <span>Explore Fest Highlights</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Claim-to-Proof Adjacency Row: 4 Metric Columns for PCU */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 mt-8 border-t border-slate-100 text-slate-700">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900 block">8 Schools</span>
            <span className="text-xs text-slate-500 mt-0.5 block">Engineering, Management, Design & Law</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900 block">3,500+</span>
            <span className="text-xs text-slate-500 mt-0.5 block">Matriculated PCU Student RSVPs</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xl font-bold font-mono-numbers text-slate-900 block">₹2,50,000+</span>
            <span className="text-xs text-slate-500 mt-0.5 block">Ideathon & Fest Prize Pools</span>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-2xl font-bold font-mono-numbers text-blue-900 block">30+ Years</span>
            <span className="text-xs text-slate-500 mt-0.5 block">PCET Educational Trust Legacy</span>
          </div>
        </div>
      </div>
    </div>
  );
};
