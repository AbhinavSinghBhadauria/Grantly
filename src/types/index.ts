export type EducationLevel = 
  | 'High School (10th/12th)'
  | 'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'
  | 'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'
  | 'Doctoral (Ph.D.)'
  | 'Diploma / Vocational';

export type Category = 'General' | 'OBC' | 'SC' | 'ST' | 'EWS' | 'Minority' | 'PwD';

export type ScholarshipType = 'Merit-Based' | 'Need-Based' | 'Merit-cum-Need' | 'Research / Fellowship' | 'Special Category / Diversity';

export type ApplicationStatus = 
  | 'Not Started'
  | 'Preparing'
  | 'Submitted'
  | 'Under Review'
  | 'Approved'
  | 'Rejected';

export type DocumentCategory = 
  | 'Academic Certificates'
  | 'Income Certificates'
  | 'Identity Proof'
  | 'Bank Details'
  | 'Recommendation Letters'
  | 'Other Documents';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  avatarUrl?: string;
  phone: string;
  age: number;
  gender: 'Male' | 'Female' | 'Non-Binary' | 'Prefer not to say';
  country: string;
  state: string;
  educationLevel: EducationLevel;
  institution: string;
  degreeCourse: string;
  specializationField: string;
  cgpaPercentage: number; // e.g. 8.7 or 87
  familyIncomeAnnual: number; // in INR e.g. 450000
  category: Category;
  specialAchievements: string[];
  disabilityStatus: boolean;
  firstGenerationStudent: boolean;
  profileCompleted: boolean;
}

export interface EligibilityCriteria {
  minCgpaPercentage?: number;
  maxFamilyIncomeAnnual?: number;
  eligibleEducationLevels: EducationLevel[];
  eligibleCategories?: Category[];
  eligibleGenders?: ('Male' | 'Female' | 'Non-Binary')[];
  eligibleStates?: string[]; // empty means all India/Global
  eligibleFields?: string[]; // e.g. ["Engineering", "Technology", "Science", "Medicine", "Any"]
  maxAge?: number;
}

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  providerLogo?: string;
  category: ScholarshipType;
  amount: number; // numeric in INR or USD
  amountFormatted: string; // e.g. "₹2,00,000 / year" or "$15,000"
  duration: string; // e.g. "Up to 4 years", "One-time"
  deadline: string; // ISO string e.g. "2026-12-15"
  daysLeft?: number;
  country: string;
  statesApplicable: string[]; // ["All India"] or specific
  fieldOfStudy: string[]; // ["Engineering", "Computer Science", "Arts", "All"]
  educationLevel: EducationLevel[];
  description: string;
  fullOverview: string;
  eligibility: EligibilityCriteria;
  benefits: string[];
  requiredDocuments: string[];
  applicationProcess: {
    step: number;
    title: string;
    description: string;
  }[];
  selectionCriteria: string;
  officialWebsiteUrl: string;
  featured?: boolean;
  totalRecipients?: number;
  contactEmail?: string;
}

export interface MatchAnalysis {
  scholarshipId: string;
  overallScore: number; // 0 - 100
  verdict: 'Eligible' | 'Possibly Eligible' | 'Not Eligible';
  matchedRequirements: {
    title: string;
    description: string;
    satisfied: boolean;
  }[];
  missingRequirements: string[];
  recommendationTips: string[];
}

export interface ApplicationItem {
  id: string;
  scholarshipId: string;
  scholarshipTitle: string;
  provider: string;
  amountFormatted: string;
  deadline: string;
  status: ApplicationStatus;
  appliedDate?: string;
  lastUpdated: string;
  completionPercentage: number;
  notes: string;
  timeline: {
    date: string;
    event: string;
    completed: boolean;
  }[];
}

export interface DocumentItem {
  id: string;
  name: string;
  category: DocumentCategory;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  verificationStatus: 'Verified' | 'Pending Review' | 'Self-Certified';
  fileType: string;
  url?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'deadline' | 'application' | 'document' | 'recommendation' | 'system';
  linkTo?: string;
}

export interface FilterState {
  searchQuery: string;
  educationLevel: string;
  scholarshipType: string;
  fieldOfStudy: string;
  minAmount: number;
  maxAmount: number;
  maxIncome: number;
  state: string;
  closingSoonOnly: boolean;
  eligibleOnly: boolean;
  sortBy: 'relevance' | 'matchScore' | 'amountHigh' | 'deadlineNearest';
}
