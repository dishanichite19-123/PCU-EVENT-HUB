import React, { useState } from 'react';
import { PCU_FACILITIES, PCUFacility } from '../data/initialEvents';
import { Building2, MapPin, Users, CheckCircle2, ArrowRight, ExternalLink, Sparkles } from 'lucide-react';

interface CampusFacilitiesGalleryProps {
  onFilterByVenue: (venueKeyword: string) => void;
}

export const CampusFacilitiesGallery: React.FC<CampusFacilitiesGalleryProps> = ({
  onFilterByVenue
}) => {
  const [selectedFacility, setSelectedFacility] = useState<PCUFacility>(PCU_FACILITIES[0]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-900 uppercase tracking-widest">
            <span>Life @ PCU</span>
            <span>·</span>
            <span>Official Campus Facilities Gallery</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 mt-1">
            Campus Venues & Infrastructure Tour
          </h2>
          <p className="text-xs text-slate-600 mt-1 max-w-xl">
            Explore the flagship learning spaces, sports complexes, and libraries featured in the official Pimpri Chinchwad University facilities gallery at Sate-Maval, Pune.
          </p>
        </div>

        <a
          href="https://pcu.edu.in/life-at-pcu/facilities/gallery"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-blue-900 transition-colors bg-slate-50 hover:bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-lg self-start md:self-auto shrink-0"
        >
          <span>Visit pcu.edu.in Gallery</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* 2-Column Split: Interactive Showcase Left, Thumbnail Selector Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Main Featured Facility Spotlight */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-slate-200 shadow-md group bg-slate-950">
            <img
              src={selectedFacility.image}
              alt={selectedFacility.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {selectedFacility.category}
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1 leading-snug">
                {selectedFacility.title}
              </h3>
              <div className="flex items-center gap-2 text-xs text-slate-300 mt-1 font-mono-numbers">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{selectedFacility.location}</span>
                <span>·</span>
                <span className="text-slate-200">{selectedFacility.capacityOrSpecs}</span>
              </div>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {selectedFacility.description}
          </p>

          {/* Highlights checklist */}
          <div className="grid grid-cols-2 gap-2 pt-2">
            {selectedFacility.highlights.map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          {/* CTA: Filter events by this venue */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => onFilterByVenue(selectedFacility.title.split(' ')[0])}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors shadow-xs"
            >
              <span>View Events Hosted at {selectedFacility.title.split(' ')[0]}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Facility Navigation Cards */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
            Select Campus Facility Pillar
          </span>

          <div className="space-y-3">
            {PCU_FACILITIES.map((fac) => {
              const isSelected = selectedFacility.id === fac.id;
              return (
                <div
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3.5 ${
                    isSelected
                      ? 'border-blue-900 bg-blue-50/50 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-white'
                  }`}
                >
                  <img
                    src={fac.image}
                    alt={fac.title}
                    referrerPolicy="no-referrer"
                    className="w-16 h-14 rounded-lg object-cover shrink-0 border border-slate-200"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-semibold text-blue-900 uppercase tracking-wide block">
                      {fac.category}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                      {fac.title}
                    </h4>
                    <span className="text-[11px] text-slate-500 font-mono-numbers block truncate mt-0.5">
                      {fac.capacityOrSpecs}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
