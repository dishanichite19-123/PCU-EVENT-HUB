import React from 'react';
import { EventCategory, EventFormat } from '../types';
import { CATEGORY_FILTERS } from '../data/initialEvents';
import { LayoutGrid, ListFilter, Calendar, RotateCcw } from 'lucide-react';

interface EventFilterBarProps {
  selectedCategory: EventCategory;
  onSelectCategory: (cat: EventCategory) => void;
  selectedFormat: EventFormat;
  onSelectFormat: (format: EventFormat) => void;
  dateFilter: 'all' | 'this-week' | 'this-weekend' | 'november';
  onSelectDateFilter: (filter: 'all' | 'this-week' | 'this-weekend' | 'november') => void;
  onlyAvailable: boolean;
  onToggleOnlyAvailable: () => void;
  viewMode: 'grid' | 'agenda';
  onChangeViewMode: (mode: 'grid' | 'agenda') => void;
  totalFilteredCount: number;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

export const EventFilterBar: React.FC<EventFilterBarProps> = ({
  selectedCategory,
  onSelectCategory,
  selectedFormat,
  onSelectFormat,
  dateFilter,
  onSelectDateFilter,
  onlyAvailable,
  onToggleOnlyAvailable,
  viewMode,
  onChangeViewMode,
  totalFilteredCount,
  onResetFilters,
  hasActiveFilters
}) => {
  return (
    <div className="space-y-4 pt-6 pb-4">
      {/* Top Controls Row: Category Tabs & View Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        {/* Category Segmented Control (Interactive functional buttons) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar p-1 bg-slate-100 rounded-xl border border-slate-200">
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.id as EventCategory)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle: Grid vs Timeline Agenda */}
        <div className="flex items-center gap-2 self-start lg:self-center">
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200">
            <button
              type="button"
              onClick={() => onChangeViewMode('grid')}
              aria-label="Grid View"
              className={`p-1.5 text-xs font-medium rounded-md flex items-center gap-1 transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Card Grid</span>
            </button>
            <button
              type="button"
              onClick={() => onChangeViewMode('agenda')}
              aria-label="Agenda View"
              className={`p-1.5 text-xs font-medium rounded-md flex items-center gap-1 transition-all ${
                viewMode === 'agenda'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <ListFilter className="w-4 h-4" />
              <span className="hidden sm:inline">Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Controls Row: Date Presets, Format, Availability Checkbox */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
        <div className="flex flex-wrap items-center gap-2">
          {/* Date Segmented Buttons */}
          <span className="text-slate-600 font-medium">When:</span>
          <button
            type="button"
            onClick={() => onSelectDateFilter('all')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              dateFilter === 'all'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            All Upcoming
          </button>
          <button
            type="button"
            onClick={() => onSelectDateFilter('this-week')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              dateFilter === 'this-week'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            This Week
          </button>
          <button
            type="button"
            onClick={() => onSelectDateFilter('this-weekend')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              dateFilter === 'this-weekend'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            This Weekend
          </button>
          <button
            type="button"
            onClick={() => onSelectDateFilter('november')}
            className={`px-2.5 py-1 rounded-md transition-colors ${
              dateFilter === 'november'
                ? 'bg-slate-900 text-white font-medium'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            November 2026
          </button>

          {/* Format Selector */}
          <span className="text-slate-600 font-medium ml-2">Format:</span>
          {(['All', 'In-Person', 'Hybrid', 'Virtual'] as EventFormat[]).map((fmt) => (
            <button
              key={fmt}
              type="button"
              onClick={() => onSelectFormat(fmt)}
              className={`px-2.5 py-1 rounded-md transition-colors ${
                selectedFormat === fmt
                  ? 'bg-slate-900 text-white font-medium'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {fmt}
            </button>
          ))}

          {/* Availability Checkbox */}
          <label className="flex items-center gap-1.5 cursor-pointer ml-2 text-slate-700 select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={onToggleOnlyAvailable}
              className="rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-3.5 h-3.5"
            />
            <span>Open seats only</span>
          </label>
        </div>

        {/* Results Count & Reset Filter */}
        <div className="flex items-center gap-3 text-slate-600 font-mono-numbers">
          <span>{totalFilteredCount} {totalFilteredCount === 1 ? 'event found' : 'events found'}</span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="flex items-center gap-1 text-slate-700 hover:text-slate-900 underline font-sans text-xs"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
