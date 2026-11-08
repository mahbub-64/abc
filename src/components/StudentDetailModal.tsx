import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  ExternalLink, 
  QrCode, 
  Copy, 
  Check, 
  Star, 
  GraduationCap, 
  Building2, 
  Phone, 
  MessageSquare,
  Trash2
} from 'lucide-react';
import { StudentProfile } from '../types';
import { FacebookIcon } from './FacebookIcon';

interface StudentDetailModalProps {
  student: StudentProfile | null;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
  onOpenQr: (student: StudentProfile) => void;
  onDelete?: (id: string) => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  student,
  isFavorite,
  onToggleFavorite,
  onClose,
  onOpenQr,
  onDelete,
}) => {
  const [copiedFb, setCopiedFb] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [imgError, setImgError] = useState(false);

  if (!student) return null;

  const handleCopyFb = () => {
    navigator.clipboard.writeText(student.facebookUrl);
    setCopiedFb(true);
    setTimeout(() => setCopiedFb(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(student.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyPhone = () => {
    if (!student.phone) return;
    navigator.clipboard.writeText(student.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const initials = student.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();

  // Clean phone for whatsapp (Bangladesh +880...)
  const rawDigits = student.phone ? student.phone.replace(/\D/g, '') : '';
  const waNumber = rawDigits.startsWith('0') ? `88${rawDigits}` : rawDigits.startsWith('88') ? rawDigits : `880${rawDigits}`;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E1E6EB] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Strip */}
        <div className="bg-gradient-to-r from-[#2E5F76] via-[#1F4358] to-[#152e3d] text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono-roll text-xs font-bold tracking-wider uppercase bg-white/15 px-3 py-1 rounded-full">
              Roll: {student.roll}
            </span>
            <span className="text-xs text-blue-200">
              BECM '24 Batch
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleFavorite(student.id)}
              className={`p-2 rounded-full transition-colors ${
                isFavorite 
                  ? 'bg-amber-400 text-slate-900 shadow-sm' 
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
            >
              <Star className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 text-center">
          {/* Avatar */}
          <div className="relative inline-block mx-auto -mt-14 mb-4">
            <div className="w-28 h-28 rounded-full overflow-hidden bg-white p-1 ring-4 ring-white shadow-xl">
              {!imgError ? (
                <img
                  src={student.img}
                  alt={student.name}
                  onError={() => setImgError(true)}
                  className="w-full h-full rounded-full object-cover border-2 border-[#2E5F76]"
                />
              ) : (
                <div className="w-full h-full rounded-full bg-[#2E5F76] text-white flex items-center justify-center font-display font-bold text-2xl">
                  {initials}
                </div>
              )}
            </div>
            <div className="absolute bottom-1 right-1 w-7 h-7 bg-[#1877F2] rounded-full ring-2 ring-white flex items-center justify-center text-white shadow-sm">
              <FacebookIcon className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Name & Academic Info */}
          <h2 className="font-display font-bold text-2xl text-[#1B2733]">
            {student.name}
          </h2>

          <div className="mt-3 space-y-1.5 text-xs text-[#5B6B7A] max-w-sm mx-auto">
            <div className="flex items-center justify-center gap-1.5 font-medium text-slate-800">
              <GraduationCap className="w-4 h-4 text-[#2E5F76]" />
              <span>Department of Building Engineering & Construction Management</span>
            </div>
            <div className="flex items-center justify-center gap-1.5 text-slate-600">
              <Building2 className="w-3.5 h-3.5 text-[#2E5F76]" />
              <span>Rajshahi University of Engineering & Technology (RUET)</span>
            </div>
          </div>

          {/* Primary Action: Direct Facebook Profile */}
          <div className="mt-5 p-4 rounded-2xl bg-[#F4F6F8] border border-[#E1E6EB] text-left">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E5F76] flex items-center gap-1.5">
                <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
                <span>Facebook Profile</span>
              </span>
              <button
                onClick={handleCopyFb}
                className="text-[11px] text-[#2E5F76] hover:underline flex items-center gap-1"
              >
                {copiedFb ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedFb ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>

            <a
              href={student.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-[#1877F2] hover:bg-[#0c63d4] text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-98 transition-all"
            >
              <FacebookIcon className="w-4 h-4" />
              <span>Open Facebook Profile in New Tab</span>
              <ExternalLink className="w-3.5 h-3.5 opacity-80" />
            </a>
          </div>

          {/* Phone Number Callout */}
          {student.phone && (
            <div className="mt-3 p-4 rounded-2xl bg-[#F4F6F8] border border-[#E1E6EB] text-left">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#2E5F76] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#2E5F76]" />
                  <span>Phone Number</span>
                </span>
                <button
                  onClick={handleCopyPhone}
                  className="text-[11px] text-[#2E5F76] hover:underline flex items-center gap-1"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedPhone ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`tel:${student.phone}`}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-white border border-[#E1E6EB] hover:bg-slate-50 text-[#1B2733] font-mono-roll font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{student.phone}</span>
                </a>

                {waNumber && (
                  <a
                    href={`https://wa.me/${waNumber}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    title="Chat on WhatsApp"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Email Strip */}
          <div className="mt-3 p-4 rounded-2xl bg-[#F4F6F8] border border-[#E1E6EB] text-left">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#2E5F76] flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2E5F76]" />
                <span>Email Address</span>
              </span>
              <button
                onClick={handleCopyEmail}
                className="text-[11px] text-[#2E5F76] hover:underline flex items-center gap-1"
              >
                {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedEmail ? 'Copied' : 'Copy Email'}</span>
              </button>
            </div>

            <a
              href={`mailto:${student.email}`}
              className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E1E6EB] hover:bg-slate-50 text-[#1B2733] font-medium text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-[#2E5F76]" />
              <span className="truncate">{student.email}</span>
            </a>
          </div>

          {/* Quick QR launcher */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => onOpenQr(student)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-[#E1E6EB] text-xs font-semibold text-[#2E5F76] hover:bg-slate-50 transition-colors"
            >
              <QrCode className="w-4 h-4" />
              <span>Mobile QR Code</span>
            </button>

            {student.isCustom && onDelete && (
              <button
                onClick={() => {
                  if (confirm(`Remove ${student.name} from directory?`)) {
                    onDelete(student.id);
                    onClose();
                  }
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
