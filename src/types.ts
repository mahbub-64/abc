export interface StudentProfile {
  id: string;
  roll: string;
  name: string;
  facebookUrl: string;
  email: string;
  phone?: string;
  img: string;
  department: string;
  batch: string;
  institution: string;
  bloodGroup?: string;
  hall?: string;
  district?: string;
  bio?: string;
  isCustom?: boolean;
}

export type ViewMode = 'grid' | 'table';

export interface OfficialPage {
  name: string;
  subtitle: string;
  facebookUrl: string;
  img: string;
}
