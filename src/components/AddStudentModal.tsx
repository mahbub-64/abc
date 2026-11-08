import React, { useState } from 'react';
import { X, UserPlus, AlertCircle, Check, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { StudentProfile } from '../types';
import { FacebookIcon } from './FacebookIcon';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveStudent: (student: StudentProfile) => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onSaveStudent,
}) => {
  const [roll, setRoll] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [facebookUrl, setFacebookUrl] = useState('');
  const [email, setEmail] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roll.trim()) {
      setError('Please provide a roll number (e.g. 2412031).');
      return;
    }
    if (!name.trim()) {
      setError('Please provide the student\'s name.');
      return;
    }
    if (!facebookUrl.trim()) {
      setError('Please provide a Facebook profile URL.');
      return;
    }

    let formattedFb = facebookUrl.trim();
    if (!/^https?:\/\//i.test(formattedFb)) {
      if (formattedFb.startsWith('facebook.com/')) {
        formattedFb = `https://${formattedFb}`;
      } else {
        formattedFb = `https://facebook.com/${formattedFb.replace(/^@/, '')}`;
      }
    }

    const newStudent: StudentProfile = {
      id: roll.trim(),
      roll: roll.trim(),
      name: name.trim(),
      phone: phone.trim() || undefined,
      facebookUrl: formattedFb,
      email: email.trim() || `${roll.trim().toLowerCase()}@student.ruet.ac.bd`,
      img: imgUrl.trim() || `https://becm24.github.io/Home/${roll.trim()}.jpg`,
      department: 'Building Engineering and Construction Management',
      batch: "BECM '24",
      institution: 'Rajshahi University of Engineering & Technology',
      isCustom: true,
    };

    onSaveStudent(newStudent);

    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-[#E1E6EB] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-[#E1E6EB] bg-[#F4F6F8] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#2E5F76] text-white flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-[#1B2733]">
                Add Student to Directory
              </h3>
              <p className="text-xs text-[#5B6B7A]">
                Include batchmate details with direct Facebook link
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Roll Number *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2412031"
                value={roll}
                onChange={(e) => {
                  setRoll(e.target.value);
                  setError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5F76] text-sm font-mono-roll"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Shakib Al Hasan"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError(null);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5F76] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
              <FacebookIcon className="w-3.5 h-3.5 text-[#1877F2]" />
              <span>Facebook Profile Link or Username *</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. https://www.facebook.com/username or username"
              value={facebookUrl}
              onChange={(e) => {
                setFacebookUrl(e.target.value);
                setError(null);
              }}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#1877F2] text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="e.g. 01890232326"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5F76] text-sm font-mono-roll"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="e.g. student@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5F76] text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Photo URL (Optional)
            </label>
            <input
              type="url"
              placeholder="Leave blank to use default ./roll.jpg"
              value={imgUrl}
              onChange={(e) => setImgUrl(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#2E5F76] text-sm"
            />
          </div>

          <div className="pt-4 border-t border-[#E1E6EB] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E5F76] hover:bg-[#1F4358] text-white text-xs font-semibold transition-all shadow-md active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Save Student</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
