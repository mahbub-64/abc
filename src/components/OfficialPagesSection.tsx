import React from 'react';
import { ExternalLink, ShieldCheck, Building2, Sparkles } from 'lucide-react';
import { OFFICIAL_PAGES } from '../data/studentsData';
import { FacebookIcon } from './FacebookIcon';

export const OfficialPagesSection: React.FC = () => {
  return (
    <section className="mt-20 pt-10 border-t border-[#E1E6EB] text-center">
      <div className="font-mono-roll text-xs font-semibold tracking-widest uppercase text-[#2E5F76] mb-2">
        Need More?
      </div>
      <h2 className="font-display font-bold text-2xl sm:text-3xl text-[#1B2733] mb-8">
        Connect With Our Official Pages
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto text-left">
        {OFFICIAL_PAGES.map((page, idx) => (
          <a
            key={idx}
            href={page.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white border border-[#E1E6EB] hover:border-[#2E5F76] rounded-2xl p-5 sm:p-6 flex items-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-[#1F4358]/10"
          >
            {/* Media */}
            <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0 bg-[#EDF1F4] border-2 border-[#2E5F76] flex items-center justify-center relative shadow-sm">
              <img
                src={page.img}
                alt={page.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-[#2E5F76]/10 group-hover:bg-transparent transition-colors" />
              <Building2 className="w-6 h-6 text-[#2E5F76] absolute pointer-events-none opacity-40" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="font-display font-bold text-base text-[#1B2733] group-hover:text-[#2E5F76] transition-colors truncate">
                  {page.name}
                </h3>
                <ShieldCheck className="w-4 h-4 text-[#1877F2] shrink-0" />
              </div>
              <p className="text-xs text-[#5B6B7A] mt-0.5 truncate">
                {page.subtitle}
              </p>

              <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-semibold text-[#1877F2] group-hover:underline">
                <FacebookIcon className="w-3.5 h-3.5" />
                <span>Visit Facebook Page</span>
                <ExternalLink className="w-3 h-3" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};
