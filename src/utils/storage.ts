import { StudentProfile } from '../types';
import { INITIAL_STUDENTS } from '../data/studentsData';

const STORAGE_KEY_STUDENTS = 'becm24_students_v2';
const STORAGE_KEY_FAVORITES = 'becm24_favorites_v2';

export function getStoredStudents(): StudentProfile[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_STUDENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      return INITIAL_STUDENTS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      // Sync phone numbers from INITIAL_STUDENTS if empty
      const phoneMap = new Map(INITIAL_STUDENTS.map(s => [s.roll, s.phone]));
      const updated = parsed.map(s => {
        if (!s.phone && phoneMap.has(s.roll)) {
          return { ...s, phone: phoneMap.get(s.roll) };
        }
        return s;
      });
      localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(updated));
      return updated;
    }
    return INITIAL_STUDENTS;
  } catch (e) {
    console.error('Failed to parse stored students', e);
    return INITIAL_STUDENTS;
  }
}

export function saveStoredStudents(students: StudentProfile[]) {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(students));
  } catch (e) {
    console.error('Failed to save students', e);
  }
}

export function resetToDefaultStudents(): StudentProfile[] {
  try {
    localStorage.setItem(STORAGE_KEY_STUDENTS, JSON.stringify(INITIAL_STUDENTS));
  } catch (e) {
    console.error(e);
  }
  return INITIAL_STUDENTS;
}

export function getStoredFavorites(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_FAVORITES);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function toggleStoredFavorite(id: string): string[] {
  try {
    const current = getStoredFavorites();
    let updated: string[];
    if (current.includes(id)) {
      updated = current.filter(item => item !== id);
    } else {
      updated = [...current, id];
    }
    localStorage.setItem(STORAGE_KEY_FAVORITES, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}
