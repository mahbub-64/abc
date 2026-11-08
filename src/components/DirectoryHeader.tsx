import React from 'react';
import { 
  Search, 
  LayoutGrid, 
  List, 
  ArrowUpDown, 
  X, 
  UserPlus, 
  Star, 
  Shuffle,
  GraduationCap
} from 'lucide-react';
import { ViewMode } from '../types';
import { FacebookIcon } from './FacebookIcon';

interface DirectoryHeaderProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (m: ViewMode) => void;
  sortBy: 'roll_asc' | 'roll_desc' | 'name_asc';
  onSortChange: (sort: 'roll_asc' | 'roll_desc' | 'name_asc') => void;
  favoritesCount: number;
  showFavoritesOnly: boolean;
  onToggleFavoritesOnly: () => void;
  onOpenAddModal: () => void;
  onRandomMeet: () => void;
  totalStudents: number;
  filteredCount: number;
}

export const DirectoryHeader: React.FC<DirectoryHeaderProps> = ({
  searchQuery,
  onSearchChange,
  viewMode,
  onViewModeChange,
  sortBy,
  onSortChange,
  favoritesCount,
  showFavoritesOnly,
  onToggleFavoritesOnly,
  onOpenAddModal,
  onRandomMeet,
  totalStudents,
  filteredCount,
}) => {
  return (
    <header className="pt-12 sm:pt-16 pb-8 text-center border-b border-[#E1E6EB] bg-gradient-to-b from-white/80 to-transparent">
      <div className="max-w-4xl mx-auto px-4">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono-roll text-xs font-semibold tracking-[0.2em] uppercase text-[#2E5F76] bg-[#2E5F76]/8 px-3.5 py-1.5 rounded-full mb-4">
          <GraduationCap className="w-4 h-4 text-[#2E5F76]" />
          <span>DEPARTMENT OF BECM, RUET</span>
        </div>

        {/* Main Title */}
        <h1 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#1B2733] tracking-tight">
          BECM-24 Student Directory
        </h1>

        {/* Subtitle */}
        <p className="font-sans text-sm sm:text-base text-[#5B6B7A] mt-2.5 max-w-2xl mx-auto leading-relaxed">
          Rajshahi University of Engineering &amp; Technology &middot; Department of Building Engineering and Construction Management
        </p>

        {/* Fast Action / Search Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-2xl mx-auto">
          <div className="relative w-full flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by Roll (e.g. 2412005), name, phone (01890...), or email..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-white border border-[#E1E6EB] text-sm text-[#1B2733] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2E5F76] focus:border-transparent shadow-sm transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-700 rounded-full"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
            {/* Sort */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => onSortChange(e.target.value as any)}
                className="appearance-none bg-white border border-[#E1E6EB] text-xs font-semibold text-[#1B2733] pl-3 pr-8 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E5F76] shadow-sm cursor-pointer"
              >
                <option value="roll_asc">Roll (001 → 030)</option>
                <option value="roll_desc">Roll (030 → 001)</option>
                <option value="name_asc">Name (A → Z)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Switcher */}
            <div className="flex items-center bg-white border border-[#E1E6EB] p-1 rounded-xl shadow-sm">
              <button
                onClick={() => onViewModeChange('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid'
                    ? 'bg-[#2E5F76] text-white shadow-sm'
                    : 'text-slate-500 hover:text-[#1B2733]'
                }`}
                title="Grid Cards"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => onViewModeChange('table')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'table'
                    ? 'bg-[#2E5F76] text-white shadow-sm'
                    : 'text-slate-500 hover:text-[#1B2733]'
                }`}
                title="Table/List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters and Utilities Row */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
          {/* Favorites Filter */}
          <button
            onClick={onToggleFavoritesOnly}
            className={`px-3 py-1.5 rounded-lg border transition-all flex items-center gap-1.5 font-medium ${
              showFavoritesOnly
                ? 'bg-amber-100 text-amber-900 border-amber-300'
                : 'bg-white text-slate-600 hover:text-slate-900 border-[#E1E6EB]'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${showFavoritesOnly ? 'fill-amber-500 text-amber-500' : 'text-slate-400'}`} />
            <span>Favorites</span>
            {favoritesCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Random Meet Button */}
          <button
            onClick={onRandomMeet}
            className="px-3 py-1.5 rounded-lg bg-white border border-[#E1E6EB] text-slate-600 hover:text-[#2E5F76] hover:border-[#2E5F76] transition-colors flex items-center gap-1.5 font-medium"
            title="Randomly view one classmate"
          >
            <Shuffle className="w-3.5 h-3.5 text-[#2E5F76]" />
            <span>Random Student</span>
          </button>

          {/* Add Student */}
          <button
            onClick={onOpenAddModal}
            className="px-3.5 py-1.5 rounded-lg bg-[#2E5F76] hover:bg-[#1F4358] text-white font-semibold transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>

          <span className="text-[#5B6B7A] font-mono-roll pl-2">
            Showing {filteredCount} of {totalStudents} students
          </span>
        </div>
      </div>
    </header>
  );
};
