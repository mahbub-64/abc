import React, { useState } from 'react';
import { Mail, QrCode, Star, Copy, Check, Phone, ExternalLink } from 'lucide-react';
import { StudentProfile } from '../types';
import { FacebookIcon } from './FacebookIcon';

interface StudentCardProps {
  student: StudentProfile;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (student: StudentProfile) => void;
  onOpenQr: (student: StudentProfile) => void;
}

export const StudentCard: React.FC<StudentCardProps> = ({
  student,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onOpenQr,
}) => {
  const [imgError, setImgError] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!student.phone) return;
    navigator.clipboard.writeText(student.phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite(student.id);
  };

  const handleQrClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenQr(student);
  };

  const initials = student.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(p => p[0])
    .join('')
    .toUpperCase();

  return (
    <article
      onClick={() => onSelect(student)}
      className="group relative bg-white border border-[#E1E6EB] hover:border-[#2E5F76] rounded-xl p-5 sm:p-6 flex flex-col items-center text-center transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1F4358]/10 cursor-pointer"
    >
      {/* Top right quick icons */}
      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleFavoriteClick}
          className={`p-1.5 rounded-lg transition-colors ${
            isFavorite
              ? 'bg-amber-50 text-amber-500'
              : 'text-slate-300 hover:text-amber-500 hover:bg-slate-50'
          }`}
          title={isFavorite ? 'Remove favorite' : 'Add to favorites'}
        >
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={handleQrClick}
          className="p-1.5 rounded-lg text-slate-300 hover:text-[#2E5F76] hover:bg-slate-50 transition-colors"
          title="Scan mobile QR code"
        >
          <QrCode className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Circular Profile Picture */}
      <a
        href={student.facebookUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => e.stopPropagation()}
        className="relative block my-1 group/avatar"
        title={`Open ${student.name}'s Facebook profile`}
      >
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden bg-[#EDF1F4] border-[3px] border-[#2E5F76] shadow-sm flex items-center justify-center transition-transform duration-200 group-hover/avatar:scale-105">
          {!imgError ? (
            <img
              src={student.img}
              alt={student.name}
              onError={() => setImgError(true)}
              loading="lazy"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-tr from-[#2E5F76] to-[#1F4358] text-white">
              <span className="font-display font-bold text-2xl">{initials}</span>
              <span className="text-[10px] font-mono-roll mt-0.5 opacity-80">{student.roll}</span>
            </div>
          )}
        </div>

        {/* Facebook badge on photo */}
        <div 
          className="absolute bottom-1 right-1 w-7 h-7 rounded-full bg-[#1877F2] text-white flex items-center justify-center ring-2 ring-white shadow-sm"
          title="Direct Facebook Profile Link"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
        </div>
      </a>

      {/* Body info */}
      <div className="w-full mt-3 flex-1 flex flex-col items-center justify-between">
        <div className="w-full">
          {/* Roll tag */}
          <span className="inline-block font-mono-roll text-[11px] font-bold tracking-wider uppercase text-[#2E5F76] bg-[#2E5F76]/8 px-3 py-1 rounded-full mb-2">
            Roll: {student.roll}
          </span>

          {/* Student Name */}
          <h2 className="font-display font-bold text-lg text-[#1B2733] leading-snug group-hover:text-[#2E5F76] transition-colors">
            <a
              href={student.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="hover:underline flex items-center justify-center gap-1.5"
              title={`Visit ${student.name} on Facebook`}
            >
              <span>{student.name}</span>
            </a>
          </h2>

          {/* Phone Number Display */}
          {student.phone ? (
            <div className="mt-2 flex items-center justify-center gap-1.5">
              <a
                href={`tel:${student.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 text-xs font-mono-roll font-semibold text-[#1F4358] hover:text-[#1877F2] bg-[#F4F6F8] hover:bg-blue-50 px-2.5 py-1 rounded-lg border border-[#E1E6EB] transition-colors"
                title={`Call ${student.phone}`}
              >
                <Phone className="w-3 h-3 text-[#2E5F76]" />
                <span>{student.phone}</span>
              </a>

              <button
                onClick={handleCopyPhone}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                title={copiedPhone ? 'Copied phone!' : 'Copy phone number'}
              >
                {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>
          ) : (
            <div className="mt-2 text-[11px] text-slate-400 font-mono-roll">
              No phone listed
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="w-full grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-[#E1E6EB]/70">
          {/* Facebook Profile Button */}
          <a
            href={student.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-[#1877F2] hover:bg-[#0c63d4] active:scale-95 text-white text-xs font-semibold transition-all shadow-sm shadow-blue-500/20"
            title={`Open ${student.name}'s Facebook profile`}
          >
            <FacebookIcon className="w-3.5 h-3.5 shrink-0" />
            <span>Profile</span>
          </a>

          {/* Email Button */}
          <a
            href={`mailto:${student.email}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg bg-slate-100 hover:bg-[#2E5F76] hover:text-white text-[#1B2733] text-xs font-semibold transition-all"
            title={`Send email to ${student.email}`}
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span>Email</span>
          </a>
        </div>
      </div>
    </article>
  );
};
