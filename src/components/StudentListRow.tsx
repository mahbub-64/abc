import React, { useState } from 'react';
import { Mail, QrCode, Star, ExternalLink, Phone } from 'lucide-react';
import { StudentProfile } from '../types';
import { FacebookIcon } from './FacebookIcon';

interface StudentListRowProps {
  student: StudentProfile;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onSelect: (student: StudentProfile) => void;
  onOpenQr: (student: StudentProfile) => void;
}

export const StudentListRow: React.FC<StudentListRowProps> = ({
  student,
  isFavorite,
  onToggleFavorite,
  onSelect,
  onOpenQr,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div 
      onClick={() => onSelect(student)}
      className="group bg-white border border-[#E1E6EB] hover:border-[#2E5F76] rounded-xl p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4 transition-all duration-200 hover:shadow-md cursor-pointer"
    >
      {/* Left: Avatar + Identity */}
      <div className="flex items-center gap-3.5 min-w-0">
        <a
          href={student.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="relative shrink-0 block group/avatar"
          title={`Open ${student.name}'s Facebook profile`}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-[#EDF1F4] border-2 border-[#2E5F76] flex items-center justify-center">
            {!imgError ? (
              <img
                src={student.img}
                alt={student.name}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <span className="font-display font-bold text-xs text-[#2E5F76]">
                {student.name.charAt(0)}
              </span>
            )}
          </div>
          <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#1877F2] text-white flex items-center justify-center ring-1 ring-white">
            <FacebookIcon className="w-2.5 h-2.5" />
          </div>
        </a>

        <div className="min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono-roll text-[11px] font-bold text-[#2E5F76] bg-[#2E5F76]/10 px-2.5 py-0.5 rounded-full">
              {student.roll}
            </span>
            <a
              href={student.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="font-display font-bold text-slate-900 group-hover:text-[#2E5F76] transition-colors truncate hover:underline"
              title={`Visit ${student.name} on Facebook`}
            >
              {student.name}
            </a>
          </div>

          <div className="flex items-center gap-3 text-xs text-[#5B6B7A] truncate mt-0.5 flex-wrap">
            {student.phone && (
              <a
                href={`tel:${student.phone}`}
                onClick={(e) => e.stopPropagation()}
                className="font-mono-roll font-semibold text-[#1F4358] hover:text-[#1877F2] flex items-center gap-1"
              >
                <Phone className="w-3 h-3 text-[#2E5F76]" />
                <span>{student.phone}</span>
              </a>
            )}
            <span className="truncate">{student.email}</span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(student.id);
          }}
          className={`p-2 rounded-lg border transition-colors ${
            isFavorite 
              ? 'bg-amber-50 text-amber-500 border-amber-200' 
              : 'border-slate-200 text-slate-400 hover:text-slate-600 hover:bg-slate-50'
          }`}
          title={isFavorite ? 'Remove favorite' : 'Add favorite'}
        >
          <Star className={`w-3.5 h-3.5 ${isFavorite ? 'fill-current' : ''}`} />
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenQr(student);
          }}
          className="p-2 rounded-lg border border-slate-200 text-slate-400 hover:text-[#2E5F76] hover:bg-slate-50 transition-colors"
          title="QR Code"
        >
          <QrCode className="w-3.5 h-3.5" />
        </button>

        {student.phone && (
          <a
            href={`tel:${student.phone}`}
            onClick={(e) => e.stopPropagation()}
            className="hidden sm:inline-flex p-2 rounded-lg border border-slate-200 text-slate-600 hover:text-[#2E5F76] hover:bg-slate-50 transition-colors"
            title={`Call ${student.phone}`}
          >
            <Phone className="w-3.5 h-3.5 text-[#2E5F76]" />
          </a>
        )}

        <a
          href={`mailto:${student.email}`}
          onClick={(e) => e.stopPropagation()}
          className="hidden md:inline-flex p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors"
          title="Send email"
        >
          <Mail className="w-3.5 h-3.5" />
        </a>

        {/* Primary Facebook Profile CTA */}
        <a
          href={student.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1877F2] hover:bg-[#0c63d4] text-white text-xs font-semibold shadow-sm shadow-blue-500/20 transition-all"
        >
          <FacebookIcon className="w-3.5 h-3.5" />
          <span>Profile</span>
          <ExternalLink className="w-3 h-3 opacity-70" />
        </a>
      </div>
    </div>
  );
};
