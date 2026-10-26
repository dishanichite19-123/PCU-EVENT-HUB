import React from 'react';
import { Registration, CampusEvent } from '../types';
import { downloadIcsFile, getGoogleCalendarUrl } from '../utils/storage';
import { Calendar, MapPin, User, Download, ExternalLink, CheckCircle2, QrCode } from 'lucide-react';

interface DigitalTicketPassProps {
  registration: Registration;
  event?: CampusEvent;
  onClose?: () => void;
}

export const DigitalTicketPass: React.FC<DigitalTicketPassProps> = ({ registration, event, onClose }) => {
  // Deterministic SVG QR Code Pattern generator based on qrToken
  const generateQrCells = (token: string) => {
    const size = 17; // 17x17 grid
    const cells: boolean[][] = Array(size).fill(false).map(() => Array(size).fill(false));

    // Corner positioning patterns (7x7)
    const setFinder = (startX: number, startY: number) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          if (
            y === 0 || y === 6 || x === 0 || x === 6 || // border
            (y >= 2 && y <= 4 && x >= 2 && x <= 4) // center solid 3x3
          ) {
            cells[startY + y][startX + x] = true;
          }
        }
      }
    };

    setFinder(0, 0); // top-left
    setFinder(size - 7, 0); // top-right
    setFinder(0, size - 7); // bottom-left

    // Seed content based on token char codes
    let seed = 0;
    for (let i = 0; i < token.length; i++) {
      seed = (seed * 31 + token.charCodeAt(i)) % 100000;
    }

    // Pseudorandom inner pattern
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        // Skip finder zones
        if ((x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8)) {
          continue;
        }
        seed = (seed * 1103515245 + 12345) % 2147483648;
        if (seed % 3 === 0 || (x + y) % 5 === 0) {
          cells[y][x] = true;
        }
      }
    }

    return cells;
  };

  const qrMatrix = generateQrCells(registration.qrToken || registration.confirmationCode);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xl max-w-xl mx-auto">
      {/* Header Banner */}
      <div className="bg-slate-900 text-white p-6 relative overflow-hidden">
        <div className="flex items-start justify-between relative z-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pimpri Chinchwad University (PCU Pune)</span>
            </div>
            <h3 className="text-xl font-bold mt-1 text-white tracking-tight">
              {registration.eventTitle}
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              {registration.categoryLabel} · PCU Student Gate Pass
            </p>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block">Pass Code</span>
            <span className="font-mono-numbers text-lg font-bold tracking-wider text-amber-400">
              {registration.confirmationCode}
            </span>
          </div>
        </div>
      </div>

      {/* Ticket Body with Details & QR */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Left 2 Cols: Details */}
        <div className="md:col-span-2 space-y-4 text-sm">
          <div>
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider">Attendee & School</span>
            <div className="font-semibold text-slate-900 text-base">{registration.studentName}</div>
            <div className="text-xs text-slate-600 font-mono-numbers">
              PRN: {registration.studentId} · {registration.major}
            </div>
            <div className="text-xs text-slate-600 font-mono-numbers">
              {registration.studentEmail} · {registration.gradYear}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-100">
            <div>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">Date & Time</span>
              <div className="font-medium text-slate-800 text-xs mt-0.5">{registration.eventDate}</div>
              <div className="text-xs text-slate-600 font-mono-numbers mt-0.5">{registration.eventTime}</div>
            </div>
            <div>
              <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">Pass Tier</span>
              <div className="font-medium text-slate-800 text-xs mt-0.5">{registration.passTierName}</div>
              <div className="text-xs text-emerald-600 font-medium mt-0.5">
                {registration.guestCount > 0 ? `+${registration.guestCount} Guest Pass` : 'Single Admission'}
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-medium text-slate-600 uppercase tracking-wider block">Venue Check-in</span>
            <div className="font-medium text-slate-800 text-xs mt-0.5">{registration.eventVenue}</div>
            {registration.dietaryPreference && registration.dietaryPreference !== 'None' && (
              <div className="text-xs text-slate-600 mt-1">
                Dietary request: <span className="font-medium text-slate-700">{registration.dietaryPreference}</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Verified QR Code */}
        <div className="flex flex-col items-center justify-center p-4 bg-slate-50 rounded-xl border border-slate-200">
          <div className="bg-white p-2.5 rounded-lg border border-slate-200 shadow-sm">
            <svg
              viewBox="0 0 17 17"
              className="w-28 h-28"
              shapeRendering="crispEdges"
              aria-label="Student check-in QR code"
            >
              <rect width="17" height="17" fill="#ffffff" />
              {qrMatrix.map((row, y) =>
                row.map((active, x) =>
                  active ? (
                    <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0f172a" />
                  ) : null
                )
              )}
            </svg>
          </div>
          <span className="text-[10px] font-mono-numbers tracking-widest text-slate-600 uppercase mt-2">
            Scan At Turnstile
          </span>
          <span className="text-[11px] font-mono-numbers font-semibold text-slate-700">
            {registration.confirmationCode}
          </span>
        </div>
      </div>

      {/* Perforated Barcode Strip */}
      <div className="border-t border-dashed border-slate-300 bg-slate-50 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 opacity-70">
          {/* Stylized Barcode */}
          <div className="flex items-end gap-[2px] h-8">
            {[3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5, 8, 9, 7, 9, 3, 2, 3, 8, 4, 6, 2, 6, 4, 3, 3, 8, 3, 2, 7, 9].map((height, i) => (
              <div
                key={i}
                className="bg-slate-800"
                style={{
                  width: (i % 3 === 0 ? '3px' : i % 2 === 0 ? '2px' : '1px'),
                  height: `${20 + (height % 5) * 2}px`
                }}
              />
            ))}
          </div>
          <span className="text-[10px] font-mono-numbers text-slate-600 pl-2">
            TOKEN: {registration.qrToken.slice(0, 14)}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {event && (
            <>
              <button
                type="button"
                onClick={() => downloadIcsFile(event, registration)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                title="Download .ics Calendar Invite"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save .ICS</span>
              </button>
              <a
                href={getGoogleCalendarUrl(event)}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                title="Add to Google Calendar"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Google Cal</span>
              </a>
            </>
          )}
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Pass</span>
          </button>
        </div>
      </div>
    </div>
  );
};
