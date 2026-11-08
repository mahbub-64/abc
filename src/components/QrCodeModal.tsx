import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { X, Smartphone, ExternalLink, Copy, Check } from 'lucide-react';
import { StudentProfile } from '../types';
import { FacebookIcon } from './FacebookIcon';

interface QrCodeModalProps {
  student: StudentProfile | null;
  onClose: () => void;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({ student, onClose }) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (student?.facebookUrl) {
      QRCode.toDataURL(student.facebookUrl, {
        width: 320,
        margin: 2,
        color: {
          dark: '#1877F2',
          light: '#FFFFFF',
        },
      })
        .then(url => setDataUrl(url))
        .catch(err => console.error('Failed to generate QR code', err));
    }
  }, [student]);

  if (!student) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(student.facebookUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-[#E1E6EB] flex flex-col items-center text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-[#1877F2]">
            <Smartphone className="w-4 h-4" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#1877F2]">
            Mobile Quick Scan
          </span>
        </div>

        <h3 className="font-display text-lg font-bold text-[#1B2733]">
          Open {student.name} on Facebook
        </h3>
        <p className="text-xs text-[#5B6B7A] mt-1 max-w-[260px]">
          Scan with your smartphone camera to open directly in the Facebook mobile app
        </p>

        {/* QR Code Container */}
        <div className="mt-4 p-3 bg-white rounded-2xl border border-blue-100 shadow-inner flex items-center justify-center">
          {dataUrl ? (
            <img 
              src={dataUrl} 
              alt={`QR Code for ${student.name}'s Facebook`} 
              className="w-52 h-52 rounded-xl"
            />
          ) : (
            <div className="w-52 h-52 flex items-center justify-center text-slate-400 text-sm">
              Generating code...
            </div>
          )}
        </div>

        {/* Roll + Student strip */}
        <div className="mt-4 flex items-center gap-3 w-full bg-[#F4F6F8] p-2.5 rounded-xl border border-[#E1E6EB]">
          <img
            src={student.img}
            alt={student.name}
            className="w-10 h-10 rounded-full object-cover border border-[#2E5F76]"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="text-left flex-1 min-w-0">
            <p className="text-sm font-semibold text-[#1B2733] truncate">{student.name}</p>
            <p className="text-xs font-mono-roll text-[#2E5F76] truncate">Roll: {student.roll}</p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 w-full mt-4">
          <button
            onClick={handleCopyLink}
            className="flex-1 py-2 px-3 text-xs font-medium text-[#1B2733] bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied Link!' : 'Copy Link'}
          </button>
          
          <a
            href={student.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-[#1877F2] hover:bg-[#0c63d4] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-blue-500/20"
          >
            <FacebookIcon className="w-3.5 h-3.5" />
            <span>Open in Tab</span>
          </a>
        </div>
      </div>
    </div>
  );
};
