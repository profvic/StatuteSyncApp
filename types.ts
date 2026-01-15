
export enum AppView {
  AUTH = 'AUTH',
  DASHBOARD = 'DASHBOARD',
  LIBRARY = 'LIBRARY',
  MARKETPLACE = 'MARKETPLACE',
  VERIFY = 'VERIFY',
  CHAT = 'CHAT',
  HISTORY = 'HISTORY',
  PROFILE = 'PROFILE',
  ADMIN = 'ADMIN',
  PRO_DETAIL = 'PRO_DETAIL'
}

export type UserRole = 'USER' | 'ADMIN' | 'LEGAL_PRO';

export interface LegalDocument {
  id: string;
  title: string;
  category: string;
  description: string;
  downloadUrl: string;
  format: 'PDF' | 'DOCX';
}

export interface LegalProfessional {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: string;
  avatar: string;
  online: boolean;
  bio?: string;
  education?: string[];
  casesSolved?: number;
  languages?: string[];
}

export interface VerificationResult {
  id: string;
  timestamp: number;
  fileName: string;
  isAuthentic: boolean;
  confidence: number;
  analysis: string;
  flags: string[];
}

export interface Booking {
  id: string;
  proId: string;
  proName: string;
  date: number;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED';
}

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}
