import React, { useState } from 'react';
import { CampusEvent, Registration, RegistrationFormData } from '../types';
import { PCU_SCHOOLS_AND_MAJORS, PCU_BATCH_YEARS } from '../data/initialEvents';
import { generateConfirmationCode } from '../utils/storage';
import { DigitalTicketPass } from './DigitalTicketPass';
import { X, Calendar, MapPin, CheckCircle, AlertCircle, Sparkles, Loader2, UserCheck } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

interface RegistrationModalProps {
  event: CampusEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onRegisterSuccess: (registration: Registration) => void;
  existingRegistration?: Registration;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  event,
  isOpen,
  onClose,
  onRegisterSuccess,
  existingRegistration
}) => {
  if (!isOpen || !event) return null;

  const { user, isAuthenticated, openAuthModal } = useAuth();

  // If already registered, directly show the digital pass!
  const [completedRegistration, setCompletedRegistration] = useState<Registration | null>(
    existingRegistration || null
  );

  const [formData, setFormData] = useState<RegistrationFormData>(() => ({
    studentName: user?.name || '',
    studentEmail: user?.email || '',
    studentId: user?.studentPrn || '',
    major: PCU_SCHOOLS_AND_MAJORS[0],
    gradYear: PCU_BATCH_YEARS[0],
    passTierId: event.passes[0]?.id || 'default-pass',
    guestCount: 0,
    dietaryPreference: 'None',
    accessibilityNotes: '',
    agreeToCodeOfConduct: true
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.studentName.trim() || formData.studentName.trim().length < 2) {
      newErrors.studentName = 'Please enter your full legal student name as per PCU records.';
    }

    if (!formData.studentEmail.trim()) {
      newErrors.studentEmail = 'PCU student email is required (e.g., student@pcu.edu.in).';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.studentEmail)) {
      newErrors.studentEmail = 'Please provide a valid email format (e.g., student@pcu.edu.in).';
    }

    if (!formData.studentId.trim()) {
      newErrors.studentId = 'PCU Student PRN / Roll Number is required (e.g., PCU2024ENG0142).';
    } else if (formData.studentId.trim().length < 4) {
      newErrors.studentId = 'Student PRN must be at least 4 alphanumeric characters.';
    }

    if (!formData.agreeToCodeOfConduct) {
      newErrors.agreeToCodeOfConduct = 'You must acknowledge the PCU campus code of conduct and safety regulations.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate verified registration creation
    setTimeout(() => {
      const selectedTier = event.passes.find((p) => p.id === formData.passTierId) || event.passes[0];
      const code = generateConfirmationCode();
      const qrSeed = `${code}-${formData.studentId}-${event.id}`;

      const newReg: Registration = {
        id: `reg-${Date.now()}`,
        confirmationCode: code,
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.displayDate,
        eventTime: event.time,
        eventVenue: `${event.venue}${event.room ? ` (${event.room})` : ''}`,
        eventImage: event.image,
        categoryLabel: event.categoryLabel,
        studentName: formData.studentName.trim(),
        studentEmail: formData.studentEmail.trim().toLowerCase(),
        studentId: formData.studentId.trim().toUpperCase(),
        major: formData.major,
        gradYear: formData.gradYear,
        passTierId: selectedTier?.id || 'tier-general',
        passTierName: selectedTier?.name || 'PCU Student Admission Pass',
        guestCount: formData.guestCount,
        dietaryPreference: formData.dietaryPreference,
        accessibilityNotes: formData.accessibilityNotes.trim(),
        registeredAt: new Date().toISOString(),
        qrToken: qrSeed,
        status: 'confirmed'
      };

      setCompletedRegistration(newReg);
      onRegisterSuccess(newReg);
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div
        className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200 my-8 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
          <div>
            <span className="text-[11px] font-semibold tracking-wider text-amber-400 uppercase block">
              {completedRegistration ? 'PCU Pass Confirmed' : 'PCU Student RSVP & Gate Pass Registration'}
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight truncate max-w-md">
              {event.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto">
          {completedRegistration ? (
            /* Pass Confirmed View */
            <div className="space-y-6">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-emerald-900 text-sm">
                    Registration Verified! Official PCU digital pass generated.
                  </div>
                  <div className="text-emerald-700 mt-1">
                    Your pass has been securely logged to your student session. Present this QR code along with your PCU University ID card at the turnstiles.
                  </div>
                </div>
              </div>

              {/* Digital Pass Card */}
              <DigitalTicketPass
                registration={completedRegistration}
                event={event}
                onClose={onClose}
              />

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Done & Back to PCU Hub
                </button>
              </div>
            </div>
          ) : (
            /* Active Registration Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Event Context Strip */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span className="font-semibold text-slate-900">{event.displayDate}</span>
                  <span>·</span>
                  <span className="font-mono-numbers">{event.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span className="truncate">{event.venue}</span>
                </div>
              </div>

              {/* Google Verified Banner */}
              {isAuthenticated && user ? (
                <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl flex items-center justify-between text-xs text-emerald-900">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Authenticated with Google: <strong>{user.email}</strong>
                    </span>
                  </div>
                  <span className="text-[10px] bg-emerald-200/70 font-semibold px-2 py-0.5 rounded text-emerald-800 font-mono-numbers">
                    Verified
                  </span>
                </div>
              ) : (
                <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between text-xs text-blue-950">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                    <span>Have a Google or PCU Workspace account?</span>
                  </div>
                  <button
                    type="button"
                    onClick={openAuthModal}
                    className="px-2.5 py-1 bg-white border border-blue-300 rounded-lg text-blue-900 font-semibold hover:bg-blue-100 transition-colors shadow-2xs text-[11px]"
                  >
                    Auto-Fill via Google
                  </button>
                </div>
              )}

              {/* Personal Student Details */}
              <div className="space-y-4">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center justify-between">
                  <span>Student Enrollment Verification</span>
                  <span className="text-[11px] text-blue-900 font-medium lowercase font-mono">@pcu.edu.in</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Student Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal / University Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => {
                        setFormData({ ...formData, studentName: e.target.value });
                        if (errors.studentName) setErrors({ ...errors, studentName: '' });
                      }}
                      placeholder="e.g. Rohan Kulkarni"
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all ${
                        errors.studentName ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.studentName && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.studentName}</span>
                    )}
                  </div>

                  {/* Student Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PCU Student Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.studentEmail}
                      onChange={(e) => {
                        setFormData({ ...formData, studentEmail: e.target.value });
                        if (errors.studentEmail) setErrors({ ...errors, studentEmail: '' });
                      }}
                      placeholder="rohan.k@pcu.edu.in"
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all ${
                        errors.studentEmail ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.studentEmail && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.studentEmail}</span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Student PRN */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      PCU PRN / Roll No <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.studentId}
                      onChange={(e) => {
                        setFormData({ ...formData, studentId: e.target.value.toUpperCase() });
                        if (errors.studentId) setErrors({ ...errors, studentId: '' });
                      }}
                      placeholder="PCU2024ENG0142"
                      className={`w-full px-3 py-2 bg-white border rounded-lg text-xs font-mono-numbers text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 transition-all ${
                        errors.studentId ? 'border-red-400 bg-red-50/20' : 'border-slate-300'
                      }`}
                    />
                    {errors.studentId && (
                      <span className="text-[11px] text-red-600 mt-1 block">{errors.studentId}</span>
                    )}
                  </div>

                  {/* School / Major */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Constituent School & Discipline
                    </label>
                    <select
                      value={formData.major}
                      onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 truncate"
                    >
                      {PCU_SCHOOLS_AND_MAJORS.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Batch / Academic Year */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Academic Cohort / Batch
                  </label>
                  <select
                    value={formData.gradYear}
                    onChange={(e) => setFormData({ ...formData, gradYear: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    {PCU_BATCH_YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Pass Tier Selection */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Select Event Entry Tier
                  </span>
                  <span className="text-xs text-slate-500 font-mono-numbers">
                    Complimentary for Matriculated PCU Students
                  </span>
                </div>

                <div className="space-y-2">
                  {event.passes.map((tier) => {
                    const isSelected = formData.passTierId === tier.id;
                    const isTierFull = tier.remaining <= 0;

                    return (
                      <label
                        key={tier.id}
                        className={`block p-3 rounded-xl border transition-all cursor-pointer ${
                          isSelected
                            ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                            : isTierFull
                            ? 'border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-start gap-2.5">
                            <input
                              type="radio"
                              name="passTier"
                              value={tier.id}
                              checked={isSelected}
                              disabled={isTierFull}
                              onChange={() => setFormData({ ...formData, passTierId: tier.id })}
                              className="mt-0.5 text-slate-900 focus:ring-slate-900"
                            />
                            <div>
                              <div className="text-xs font-bold text-slate-900 flex items-center gap-2">
                                <span>{tier.name}</span>
                                {tier.price === 0 && (
                                  <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">
                                    Complimentary
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5">{tier.description}</p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="font-mono-numbers text-xs font-semibold text-slate-700">
                              {isTierFull ? 'Sold Out' : `${tier.remaining} left`}
                            </span>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Guest Passes & Dietary Preferences */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Guest Pass (+1 Entry)
                  </label>
                  <select
                    value={formData.guestCount}
                    onChange={(e) => setFormData({ ...formData, guestCount: parseInt(e.target.value, 10) })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value={0}>Single Admission (Individual PCU Student)</option>
                    <option value={1}>+1 Guest Pass (Colleague / Peer / Visitor)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Catering Preference
                  </label>
                  <select
                    value={formData.dietaryPreference}
                    onChange={(e) => setFormData({ ...formData, dietaryPreference: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  >
                    <option value="None">Standard Vegetarian / Non-Vegetarian</option>
                    <option value="Pure Vegetarian">Pure Vegetarian</option>
                    <option value="Jain Meal">Jain Meal</option>
                    <option value="Vegan">Vegan</option>
                    <option value="Halal">Halal</option>
                  </select>
                </div>
              </div>

              {/* Special Accommodations */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accessibility / Special Accommodations (Optional)
                </label>
                <input
                  type="text"
                  value={formData.accessibilityNotes}
                  onChange={(e) => setFormData({ ...formData, accessibilityNotes: e.target.value })}
                  placeholder="e.g. Ramp access, front row audio requirement, lab power extension"
                  className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                />
              </div>

              {/* Code of Conduct Agreement Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.agreeToCodeOfConduct}
                    onChange={(e) => {
                      setFormData({ ...formData, agreeToCodeOfConduct: e.target.checked });
                      if (errors.agreeToCodeOfConduct) setErrors({ ...errors, agreeToCodeOfConduct: '' });
                    }}
                    className="mt-0.5 rounded border-slate-300 text-slate-900 focus:ring-slate-900 w-4 h-4"
                  />
                  <span className="text-xs text-slate-600 leading-normal">
                    I confirm that I am a bonafide student of Pimpri Chinchwad University (PCU) and agree to uphold campus discipline and carry my university ID card.
                  </span>
                </label>
                {errors.agreeToCodeOfConduct && (
                  <span className="text-[11px] text-red-600 mt-1 block">{errors.agreeToCodeOfConduct}</span>
                )}
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-semibold text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center gap-2 shadow-sm disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Verifying PRN & Generating Pass...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                      <span>Generate PCU Student Pass</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
