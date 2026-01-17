
import { VerificationResult, Booking, UserProfile, UserRole, LegalDocument, LegalProfessional } from '../types';

const KEYS = {
  VERIFICATIONS: 'statutesync_verifications',
  BOOKINGS: 'statutesync_bookings',
  USER: 'statutesync_user',
  AUTH_TOKEN: 'statutesync_auth_token',
  DOCUMENTS: 'statutesync_documents',
  PROS: 'statutesync_pros'
};

const DEFAULT_DOCS: LegalDocument[] = [
  { id: '1', title: 'Standard NDA', category: 'Corporate', description: 'Mutual non-disclosure agreement for business partnerships.', format: 'PDF', downloadUrl: '#' },
  { id: '2', title: 'Employment Contract', category: 'HR', description: 'Full-time employment agreement with standard benefits clauses.', format: 'DOCX', downloadUrl: '#' },
  { id: '3', title: 'Service Agreement', category: 'Commercial', description: 'Terms of service for freelance or consulting work.', format: 'PDF', downloadUrl: '#' },
];

const DEFAULT_PROS: LegalProfessional[] = [
  { id: 'p1', name: 'Sarah Jenkins', specialty: 'Criminal Law & Forensics', rating: 4.9, experience: '12 yrs', avatar: 'https://picsum.photos/seed/p1/200', online: true, bio: 'Expert in forensic analysis and digital crime detection.', education: ['Harvard Law', 'MSc Cybersecurity'], languages: ['English', 'French'] },
  { id: 'p2', name: 'Dr. Marcus Thorne', specialty: 'Digital Fraud Specialist', rating: 4.8, experience: '15 yrs', avatar: 'https://picsum.photos/seed/p2/200', online: false, bio: 'Pioneering researcher in AI fraud prevention.', education: ['Oxford University'], languages: ['English', 'German'] },
];

export const storageService = {
  // Auth
  login: (email: string, role: UserRole): UserProfile => {
    const user: UserProfile = {
      name: email.split('@')[0],
      email,
      role,
      avatar: `https://i.pravatar.cc/150?u=${email}`
    };
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
    localStorage.setItem(KEYS.AUTH_TOKEN, 'mock-token-' + Date.now());
    return user;
  },
  logout: () => {
    localStorage.removeItem(KEYS.USER);
    localStorage.removeItem(KEYS.AUTH_TOKEN);
  },
  isAuthenticated: () => !!localStorage.getItem(KEYS.AUTH_TOKEN),

  // Documents
  getDocuments: (): LegalDocument[] => {
    const data = localStorage.getItem(KEYS.DOCUMENTS);
    if (!data) {
      localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(DEFAULT_DOCS));
      return DEFAULT_DOCS;
    }
    return JSON.parse(data);
  },
  addDocument: (doc: Omit<LegalDocument, 'id'>) => {
    const docs = storageService.getDocuments();
    const newDoc = { ...doc, id: Math.random().toString(36).substr(2, 9) };
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify([newDoc, ...docs]));
    return newDoc;
  },
  removeDocument: (id: string) => {
    const docs = storageService.getDocuments();
    localStorage.setItem(KEYS.DOCUMENTS, JSON.stringify(docs.filter(d => d.id !== id)));
  },

  // Professionals
  getPros: (): LegalProfessional[] => {
    const data = localStorage.getItem(KEYS.PROS);
    if (!data) {
      localStorage.setItem(KEYS.PROS, JSON.stringify(DEFAULT_PROS));
      return DEFAULT_PROS;
    }
    return JSON.parse(data);
  },
  addPro: (pro: Omit<LegalProfessional, 'id' | 'rating' | 'online'>) => {
    const pros = storageService.getPros();
    const newPro: LegalProfessional = { 
      ...pro, 
      id: Math.random().toString(36).substr(2, 9),
      rating: 5.0,
      online: true 
    };
    localStorage.setItem(KEYS.PROS, JSON.stringify([newPro, ...pros]));
    return newPro;
  },
  removePro: (id: string) => {
    const pros = storageService.getPros();
    localStorage.setItem(KEYS.PROS, JSON.stringify(pros.filter(p => p.id !== id)));
  },

  // Verifications
  saveVerification: (result: Omit<VerificationResult, 'id' | 'timestamp'>): VerificationResult => {
    const history = storageService.getVerifications();
    const newEntry: VerificationResult = {
      ...result,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now()
    };
    localStorage.setItem(KEYS.VERIFICATIONS, JSON.stringify([newEntry, ...history]));
    return newEntry;
  },
  getVerifications: (): VerificationResult[] => {
    const data = localStorage.getItem(KEYS.VERIFICATIONS);
    return data ? JSON.parse(data) : [];
  },

  // Bookings
  createBooking: (proId: string, proName: string): Booking => {
    const bookings = storageService.getBookings();
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      proId,
      proName,
      date: Date.now(),
      status: 'PENDING'
    };
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify([newBooking, ...bookings]));
    return newBooking;
  },
  getBookings: (): Booking[] => {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  // User
  getUser: (): UserProfile | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  saveUser: (user: UserProfile) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  }
};
