import React, { useState, useEffect, useMemo } from 'react';
import { 
  getStoredStudents, 
  saveStoredStudents, 
  getStoredFavorites, 
  toggleStoredFavorite, 
  resetToDefaultStudents 
} from './utils/storage';
import { StudentProfile, ViewMode } from './types';
import { DirectoryHeader } from './components/DirectoryHeader';
import { StudentCard } from './components/StudentCard';
import { StudentListRow } from './components/StudentListRow';
import { StudentDetailModal } from './components/StudentDetailModal';
import { AddStudentModal } from './components/AddStudentModal';
import { QrCodeModal } from './components/QrCodeModal';
import { OfficialPagesSection } from './components/OfficialPagesSection';
import { SearchX, RotateCcw, UserPlus, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sortBy, setSortBy] = useState<'roll_asc' | 'roll_desc' | 'name_asc'>('roll_asc');

  // Modals
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [qrStudent, setQrStudent] = useState<StudentProfile | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  useEffect(() => {
    const loadedStudents = getStoredStudents();
    const loadedFavorites = getStoredFavorites();
    setStudents(loadedStudents);
    setFavorites(loadedFavorites);
  }, []);

  const handleToggleFavorite = (id: string) => {
    const updated = toggleStoredFavorite(id);
    setFavorites(updated);
  };

  const handleSaveStudent = (newStudent: StudentProfile) => {
    const exists = students.some(s => s.id === newStudent.id || s.roll === newStudent.roll);
    let updated: StudentProfile[];
    if (exists) {
      updated = students.map(s => (s.id === newStudent.id || s.roll === newStudent.roll ? newStudent : s));
    } else {
      updated = [newStudent, ...students];
    }
    setStudents(updated);
    saveStoredStudents(updated);
  };

  const handleDeleteStudent = (id: string) => {
    const updated = students.filter(s => s.id !== id);
    setStudents(updated);
    saveStoredStudents(updated);
  };

  const handleResetData = () => {
    if (confirm('Reset student directory to original 27 students from BECM-24 RUET?')) {
      const defaults = resetToDefaultStudents();
      setStudents(defaults);
      setFavorites([]);
      setSearchQuery('');
      setShowFavoritesOnly(false);
    }
  };

  const handleRandomMeet = () => {
    if (students.length === 0) return;
    const randomIndex = Math.floor(Math.random() * students.length);
    const chosen = students[randomIndex];
    setSelectedStudent(chosen);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  };

  // Filtered & Sorted Students
  const filteredStudents = useMemo(() => {
    return students
      .filter((student) => {
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesRoll = student.roll.toLowerCase().includes(q);
          const matchesName = student.name.toLowerCase().includes(q);
          const matchesEmail = student.email.toLowerCase().includes(q);
          const matchesPhone = student.phone ? student.phone.includes(q) : false;
          if (!matchesRoll && !matchesName && !matchesEmail && !matchesPhone) {
            return false;
          }
        }

        if (showFavoritesOnly && !favorites.includes(student.id)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'roll_asc') {
          return a.roll.localeCompare(b.roll, undefined, { numeric: true });
        }
        if (sortBy === 'roll_desc') {
          return b.roll.localeCompare(a.roll, undefined, { numeric: true });
        }
        if (sortBy === 'name_asc') {
          return a.name.localeCompare(b.name);
        }
        return 0;
      });
  }, [students, searchQuery, showFavoritesOnly, sortBy, favorites]);

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-[#2E5F76] selection:text-white">
      {/* Reference site header */}
      <DirectoryHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        sortBy={sortBy}
        onSortChange={setSortBy}
        favoritesCount={favorites.length}
        showFavoritesOnly={showFavoritesOnly}
        onToggleFavoritesOnly={() => setShowFavoritesOnly(!showFavoritesOnly)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onRandomMeet={handleRandomMeet}
        totalStudents={students.length}
        filteredCount={filteredStudents.length}
      />

      {/* Main Student Directory Container */}
      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 py-10">
        {filteredStudents.length === 0 ? (
          <div className="py-20 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-[#2E5F76]/10 text-[#2E5F76] flex items-center justify-center mx-auto mb-4 border border-[#2E5F76]/20">
              <SearchX className="w-8 h-8" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#1B2733]">
              {showFavoritesOnly ? 'No saved favorites yet' : 'No students found'}
            </h3>
            <p className="text-xs text-[#5B6B7A] mt-1.5">
              {showFavoritesOnly
                ? 'Star any student profile to add them to your favorites list.'
                : 'Try searching by a different roll number (e.g. 2412005) or student name.'}
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowFavoritesOnly(false);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-[#E1E6EB] text-xs font-semibold text-[#1B2733] bg-white hover:bg-slate-50 transition-colors shadow-sm"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Filters</span>
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-[22px]">
            {filteredStudents.map((student) => (
              <StudentCard
                key={student.id}
                student={student}
                isFavorite={favorites.includes(student.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelect={(s) => setSelectedStudent(s)}
                onOpenQr={(s) => setQrStudent(s)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredStudents.map((student) => (
              <StudentListRow
                key={student.id}
                student={student}
                isFavorite={favorites.includes(student.id)}
                onToggleFavorite={handleToggleFavorite}
                onSelect={(s) => setSelectedStudent(s)}
                onOpenQr={(s) => setQrStudent(s)}
              />
            ))}
          </div>
        )}

        {/* Connect With Our Official Pages Section (from becm24 reference) */}
        <OfficialPagesSection />
      </main>

      {/* Modals */}
      <StudentDetailModal
        student={selectedStudent}
        isFavorite={selectedStudent ? favorites.includes(selectedStudent.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedStudent(null)}
        onOpenQr={(s) => setQrStudent(s)}
        onDelete={handleDeleteStudent}
      />

      <QrCodeModal
        student={qrStudent}
        onClose={() => setQrStudent(null)}
      />

      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSaveStudent={handleSaveStudent}
      />

      {/* Footer matching reference */}
      <footer className="border-t border-[#E1E6EB] py-8 text-center text-xs text-[#5B6B7A] bg-white/60">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium">
            BECM-24 &middot; Rajshahi University of Engineering &amp; Technology
          </p>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <button
              onClick={handleResetData}
              className="hover:text-[#2E5F76] flex items-center gap-1 transition-colors"
              title="Reset to original 27 students"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset Batch Data</span>
            </button>
            <span>&middot;</span>
            <span>Click any profile or button to visit Facebook</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
