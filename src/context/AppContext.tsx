import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  UserProfile, 
  Scholarship, 
  ApplicationItem, 
  DocumentItem, 
  NotificationItem, 
  FilterState, 
  ApplicationStatus 
} from '../types';
import { mockScholarships } from '../data/mockScholarships';

export interface AppContextType {
  user: UserProfile | null;
  scholarships: Scholarship[];
  savedScholarshipIds: string[];
  applications: ApplicationItem[];
  documents: DocumentItem[];
  notifications: NotificationItem[];
  unreadNotificationCount: number;
  filters: FilterState;
  toastMessage: { text: string; type: 'success' | 'info' | 'warning' | 'error' } | null;
  // Auth
  loginDemoUser: () => void;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  // Bookmarks
  toggleSaveScholarship: (id: string) => void;
  isScholarshipSaved: (id: string) => boolean;
  // Applications
  addApplication: (scholarshipId: string, notes?: string) => void;
  updateApplicationStatus: (appId: string, status: ApplicationStatus) => void;
  updateApplicationNotes: (appId: string, notes: string) => void;
  deleteApplication: (appId: string) => void;
  // Documents
  uploadDocument: (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => void;
  deleteDocument: (docId: string) => void;
  // Notifications
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotification: (id: string) => void;
  // Filters
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  // Toast
  showToast: (text: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const defaultFilters: FilterState = {
  searchQuery: '',
  educationLevel: 'All',
  scholarshipType: 'All',
  fieldOfStudy: 'All',
  minAmount: 0,
  maxAmount: 10000000,
  maxIncome: 2500000,
  state: 'All India',
  closingSoonOnly: false,
  eligibleOnly: false,
  sortBy: 'relevance',
};

const initialDemoProfile: UserProfile = {
  id: 'usr_rahul_9921',
  fullName: 'Rahul Sharma',
  email: 'rahul.sharma@iitd.ac.in',
  phone: '+91 98765 43210',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  age: 20,
  gender: 'Male',
  country: 'India',
  state: 'Delhi',
  educationLevel: 'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
  institution: 'Delhi Technological University (DTU)',
  degreeCourse: 'B.Tech in Computer Science & Engineering',
  specializationField: 'Computer Science',
  cgpaPercentage: 8.7,
  familyIncomeAnnual: 420000,
  category: 'OBC',
  specialAchievements: [
    'Smart India Hackathon Finalist 2025',
    'State Science Olympiad Rank 4',
    'Open Source Contributor on GitHub'
  ],
  disabilityStatus: false,
  firstGenerationStudent: true,
  profileCompleted: true,
};

const initialDocuments: DocumentItem[] = [
  {
    id: 'doc_1',
    name: 'Class 12th Board Marksheet',
    category: 'Academic Certificates',
    fileName: 'CBSE_Class12_Marksheet_Rahul.pdf',
    fileSize: '1.4 MB',
    uploadedAt: '2026-10-12',
    verificationStatus: 'Verified',
    fileType: 'application/pdf',
  },
  {
    id: 'doc_2',
    name: 'Income Certificate (FY 2025-26)',
    category: 'Income Certificates',
    fileName: 'Tehsildar_Income_Cert_2026.pdf',
    fileSize: '820 KB',
    uploadedAt: '2026-10-15',
    verificationStatus: 'Verified',
    fileType: 'application/pdf',
  },
  {
    id: 'doc_3',
    name: 'Aadhaar Identity Card',
    category: 'Identity Proof',
    fileName: 'Aadhaar_Front_Back_Masked.pdf',
    fileSize: '650 KB',
    uploadedAt: '2026-10-10',
    verificationStatus: 'Verified',
    fileType: 'application/pdf',
  },
  {
    id: 'doc_4',
    name: 'College ID & Bonafide Letter',
    category: 'Academic Certificates',
    fileName: 'DTU_Bonafide_Enrolment_2026.pdf',
    fileSize: '1.1 MB',
    uploadedAt: '2026-10-20',
    verificationStatus: 'Verified',
    fileType: 'application/pdf',
  },
  {
    id: 'doc_5',
    name: 'Bank Passbook & Cancelled Cheque',
    category: 'Bank Details',
    fileName: 'SBI_Savings_Passbook_Rahul.pdf',
    fileSize: '950 KB',
    uploadedAt: '2026-10-22',
    verificationStatus: 'Self-Certified',
    fileType: 'application/pdf',
  }
];

const initialApplications: ApplicationItem[] = [
  {
    id: 'app_1',
    scholarshipId: 'rel-ug-2026',
    scholarshipTitle: 'Reliance Foundation Undergraduate Scholarships',
    provider: 'Reliance Foundation',
    amountFormatted: '₹2,00,000 Total',
    deadline: '2026-11-25',
    status: 'Under Review',
    appliedDate: '2026-10-24',
    lastUpdated: '2026-11-02',
    completionPercentage: 85,
    notes: 'Submitted aptitude assessment test on Oct 28. Awaiting shortlist announcement.',
    timeline: [
      { date: '2026-10-24', event: 'Application initiated and submitted', completed: true },
      { date: '2026-10-28', event: 'Aptitude Test Completed (Score: 92/100)', completed: true },
      { date: '2026-11-02', event: 'Document verification cleared by Trust', completed: true },
      { date: '2026-11-20', event: 'Final Merit Shortlist', completed: false }
    ]
  },
  {
    id: 'app_2',
    scholarshipId: 'tata-trusts-tech',
    scholarshipTitle: 'Tata Trusts Means-cum-Merit Scholarship for Engineering & Medicine',
    provider: 'Tata Trusts',
    amountFormatted: '₹1,50,000 / year',
    deadline: '2026-11-20',
    status: 'Preparing',
    appliedDate: '2026-11-01',
    lastUpdated: '2026-11-05',
    completionPercentage: 60,
    notes: 'Uploaded fee receipts; waiting for college Dean recommendation signature.',
    timeline: [
      { date: '2026-11-01', event: 'Application draft created', completed: true },
      { date: '2026-11-04', event: 'Semester 4 gradesheet uploaded', completed: true },
      { date: '2026-11-12', event: 'Upload endorsed Dean letter', completed: false }
    ]
  },
  {
    id: 'app_3',
    scholarshipId: 'nsp-postmatric-sc-st',
    scholarshipTitle: 'National Scholarship Portal (NSP) Central Sector Scheme',
    provider: 'Ministry of Social Justice, Govt. of India',
    amountFormatted: '₹1,20,000 / year',
    deadline: '2026-11-22',
    status: 'Submitted',
    appliedDate: '2026-10-18',
    lastUpdated: '2026-10-30',
    completionPercentage: 100,
    notes: 'One-Time Registration (OTR) completed with Aadhaar face authentication.',
    timeline: [
      { date: '2026-10-18', event: 'OTR verified with Aadhaar', completed: true },
      { date: '2026-10-25', event: 'Submitted to College Nodal Officer (L1)', completed: true },
      { date: '2026-10-30', event: 'L1 Institute verification approved', completed: true },
      { date: '2026-11-15', event: 'District Welfare Officer (L2) signoff pending', completed: false }
    ]
  }
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif_1',
    title: 'Approaching Deadline: Reliance Foundation',
    message: 'Reliance Foundation Undergraduate Scholarship application closes in 18 days. Review your draft!',
    timestamp: '2 hours ago',
    read: false,
    type: 'deadline',
    linkTo: '/scholarships/rel-ug-2026'
  },
  {
    id: 'notif_2',
    title: 'Tata Trusts Application Needs Attention',
    message: 'Your application is at 60% completion. Submit before Nov 20, 2026 to ensure funding consideration.',
    timestamp: '1 day ago',
    read: false,
    type: 'application',
    linkTo: '/applications'
  },
  {
    id: 'notif_3',
    title: 'Income Certificate Verified',
    message: 'Your uploaded FY 2025-26 Tehsildar Income Certificate has been verified for all means-based scholarships.',
    timestamp: '2 days ago',
    read: true,
    type: 'document',
    linkTo: '/documents'
  },
  {
    id: 'notif_4',
    title: 'New 95% Match Scholarship Found!',
    message: 'Based on your B.Tech Computer Science profile, you are strongly eligible for Google Generation Scholarship APAC.',
    timestamp: '3 days ago',
    read: true,
    type: 'recommendation',
    linkTo: '/scholarships/google-gen-apac'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('grantly_user');
    return saved ? JSON.parse(saved) : initialDemoProfile;
  });

  const [scholarships] = useState<Scholarship[]>(mockScholarships);

  const [savedScholarshipIds, setSavedScholarshipIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('grantly_saved_scholarships');
    return saved ? JSON.parse(saved) : ['rel-ug-2026', 'google-gen-apac', 'tata-trusts-tech', 'kc-mahindra-pg'];
  });

  const [applications, setApplications] = useState<ApplicationItem[]>(() => {
    const saved = localStorage.getItem('grantly_applications');
    return saved ? JSON.parse(saved) : initialApplications;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem('grantly_documents');
    return saved ? JSON.parse(saved) : initialDocuments;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('grantly_notifications');
    return saved ? JSON.parse(saved) : initialNotifications;
  });

  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' | 'warning' | 'error' } | null>(null);

  // Persistence effects
  useEffect(() => {
    if (user) {
      localStorage.setItem('grantly_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('grantly_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('grantly_saved_scholarships', JSON.stringify(savedScholarshipIds));
  }, [savedScholarshipIds]);

  useEffect(() => {
    localStorage.setItem('grantly_applications', JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem('grantly_documents', JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem('grantly_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const showToast = (text: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  const loginDemoUser = () => {
    setUser(initialDemoProfile);
    showToast('Signed in as Rahul Sharma (Demo Student Profile)');
  };

  const login = (email: string, name?: string) => {
    const newUser: UserProfile = {
      ...initialDemoProfile,
      id: 'usr_' + Date.now().toString(36),
      fullName: name || email.split('@')[0],
      email: email,
    };
    setUser(newUser);
    showToast(`Welcome back, ${newUser.fullName}!`);
  };

  const logout = () => {
    setUser(null);
    showToast('Signed out successfully.', 'info');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    setUser(prev => prev ? { ...prev, ...updated, profileCompleted: true } : null);
    showToast('Profile updated successfully! Match scores refreshed.');
  };

  const toggleSaveScholarship = (id: string) => {
    setSavedScholarshipIds(prev => {
      const exists = prev.includes(id);
      if (exists) {
        showToast('Scholarship removed from saved list.', 'info');
        return prev.filter(item => item !== id);
      } else {
        showToast('Scholarship saved to your shortlist!');
        return [...prev, id];
      }
    });
  };

  const isScholarshipSaved = (id: string) => {
    return savedScholarshipIds.includes(id);
  };

  const addApplication = (scholarshipId: string, notes?: string) => {
    const sch = scholarships.find(s => s.id === scholarshipId);
    if (!sch) return;

    const existing = applications.find(a => a.scholarshipId === scholarshipId);
    if (existing) {
      showToast('This scholarship is already in your application tracker.', 'warning');
      return;
    }

    const newApp: ApplicationItem = {
      id: 'app_' + Date.now().toString(36),
      scholarshipId,
      scholarshipTitle: sch.title,
      provider: sch.provider,
      amountFormatted: sch.amountFormatted,
      deadline: sch.deadline,
      status: 'Preparing',
      appliedDate: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      completionPercentage: 25,
      notes: notes || 'Started preparation. Gather required documents.',
      timeline: [
        {
          date: new Date().toISOString().split('T')[0],
          event: 'Application started in GRANTLY',
          completed: true,
        },
        {
          date: sch.deadline,
          event: 'Official Submission Deadline',
          completed: false,
        }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    showToast(`Added "${sch.title}" to Application Tracker!`);

    // Add a notification
    const newNotif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: 'Application Created',
      message: `You started tracking "${sch.title}". Ensure your documents are ready!`,
      timestamp: 'Just now',
      read: false,
      type: 'application',
      linkTo: '/applications'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const updateApplicationStatus = (appId: string, status: ApplicationStatus) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        let completion = app.completionPercentage;
        if (status === 'Submitted') completion = 100;
        if (status === 'Under Review') completion = 100;
        if (status === 'Approved') completion = 100;
        if (status === 'Preparing') completion = Math.max(30, completion);
        return {
          ...app,
          status,
          completionPercentage: completion,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
      return app;
    }));
    showToast(`Application status updated to "${status}"`);
  };

  const updateApplicationNotes = (appId: string, notes: string) => {
    setApplications(prev => prev.map(app => app.id === appId ? { ...app, notes, lastUpdated: new Date().toISOString().split('T')[0] } : app));
    showToast('Application notes saved.');
  };

  const deleteApplication = (appId: string) => {
    setApplications(prev => prev.filter(a => a.id !== appId));
    showToast('Application removed from tracker.', 'info');
  };

  const uploadDocument = (doc: Omit<DocumentItem, 'id' | 'uploadedAt'>) => {
    const newDoc: DocumentItem = {
      ...doc,
      id: 'doc_' + Date.now().toString(36),
      uploadedAt: new Date().toISOString().split('T')[0],
      verificationStatus: 'Verified'
    };
    setDocuments(prev => [newDoc, ...prev]);
    showToast(`"${doc.name}" uploaded successfully!`);

    const notif: NotificationItem = {
      id: 'notif_' + Date.now(),
      title: 'Document Uploaded',
      message: `"${doc.name}" is now stored in your Document Vault. Readiness scores updated.`,
      timestamp: 'Just now',
      read: false,
      type: 'document',
      linkTo: '/documents'
    };
    setNotifications(prev => [notif, ...prev]);
  };

  const deleteDocument = (docId: string) => {
    setDocuments(prev => prev.filter(d => d.id !== docId));
    showToast('Document deleted.', 'info');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    showToast('All notifications marked as read.');
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    showToast('Filters reset to default.');
  };

  const unreadNotificationCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider value={{
      user,
      scholarships,
      savedScholarshipIds,
      applications,
      documents,
      notifications,
      unreadNotificationCount,
      filters,
      toastMessage,
      loginDemoUser,
      login,
      logout,
      updateProfile,
      toggleSaveScholarship,
      isScholarshipSaved,
      addApplication,
      updateApplicationStatus,
      updateApplicationNotes,
      deleteApplication,
      uploadDocument,
      deleteDocument,
      markNotificationAsRead,
      markAllNotificationsAsRead,
      clearNotification,
      setFilters,
      resetFilters,
      showToast,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
