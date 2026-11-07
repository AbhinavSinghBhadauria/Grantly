import { Scholarship } from '../types';

export const mockScholarships: Scholarship[] = [
  {
    id: 'rel-ug-2026',
    title: 'Reliance Foundation Undergraduate Scholarships',
    provider: 'Reliance Foundation',
    providerLogo: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-cum-Need',
    amount: 200000,
    amountFormatted: '₹2,00,000 Total',
    duration: 'Over degree duration',
    deadline: '2026-11-25',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Engineering', 'Computer Science', 'Commerce', 'Science', 'Arts', 'All'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
    description: 'Empowering India’s top 5,000 undergraduate students across all streams through direct financial grant and an active alumni leadership network.',
    fullOverview: 'The Reliance Foundation Undergraduate Scholarships aim to support meritorious students from all socio-economic backgrounds across India to pursue higher education. Selected scholars receive up to ₹2 Lakhs over the course of their degree, alongside mentorship and leadership development workshops.',
    eligibility: {
      minCgpaPercentage: 60,
      maxFamilyIncomeAnnual: 1500000,
      eligibleEducationLevels: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
      eligibleFields: ['Any'],
    },
    benefits: [
      'Grant of up to ₹2,00,000 for entire degree duration',
      'Invitation to the annual Reliance Scholar Conclave in Mumbai',
      'Exclusive access to leadership talks and skill accelerators',
      'Dedicated mentorship from industry professionals'
    ],
    requiredDocuments: [
      'Class 12th Marksheet',
      'Current College Admission Letter / ID Card',
      'Family Income Certificate (Tehsildar / ITR)',
      'Government Photo ID (Aadhaar / Voter ID)',
      'Bank Account Passbook (Student Name)'
    ],
    applicationProcess: [
      { step: 1, title: 'Online Registration', description: 'Complete profile on Reliance Foundation portal and verify Aadhaar.' },
      { step: 2, title: 'Aptitude Assessment', description: 'Take the online 60-minute cognitive and problem-solving test.' },
      { step: 3, title: 'Document Verification', description: 'Upload authentic scanned academic and family income documents.' },
      { step: 4, title: 'Final Merit List', description: 'Announcement of top 5,000 scholars based on combined aptitude & academic score.' }
    ],
    selectionCriteria: 'Calculated using a blended formula of Aptitude Test score (50%), Class 12 score (30%), and socio-economic need indexing (20%).',
    officialWebsiteUrl: 'https://scholarships.reliancefoundation.org',
    featured: true,
    totalRecipients: 5000,
    contactEmail: 'ugscholarships@reliancefoundation.org'
  },
  {
    id: 'google-gen-apac',
    title: 'Generation Google Scholarship (APAC) - Women in Tech',
    provider: 'Google LLC',
    providerLogo: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=100&auto=format&fit=crop&q=80',
    category: 'Special Category / Diversity',
    amount: 207000, // ~2,500 USD in INR
    amountFormatted: '₹2,07,000 ($2,500)',
    duration: 'One-time award',
    deadline: '2026-12-05',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Computer Science', 'Computer Engineering', 'Information Technology'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)', 'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'],
    description: 'Designed to help students pursuing computer science degrees excel in technology and become active leaders in the field.',
    fullOverview: 'The Generation Google Scholarship for Asia Pacific was established to aid aspiring computer scientists excelling in technology. Selected students receive a financial grant to offset tuition, plus an invitation to a virtual retreat with Google engineers and community leaders.',
    eligibility: {
      minCgpaPercentage: 70,
      eligibleEducationLevels: [
        'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'
      ],
      eligibleGenders: ['Female', 'Non-Binary'],
      eligibleFields: ['Computer Science', 'Computer Engineering', 'Information Technology'],
    },
    benefits: [
      'Direct scholarship grant of $2,500 USD transferred to tuition account',
      'Google Virtual Scholars Retreat and technical breakout sessions',
      'Exclusive Google Mentorship program with Staff Engineers',
      'Direct interview prep and fast-track consideration for Google internships'
    ],
    requiredDocuments: [
      'Resume / Curriculum Vitae highlighting tech projects',
      'Current Academic Transcript / Grade Sheet',
      'Two 400-word Short Answer Essays on Diversity & Impact',
      'Proof of Enrollment in Computer Science/related program'
    ],
    applicationProcess: [
      { step: 1, title: 'Online Form & Essays', description: 'Submit resume, transcripts, and responses to the two impact prompts.' },
      { step: 2, title: 'Technical Review', description: 'Review committee evaluates diversity leadership and academic standing.' },
      { step: 3, title: 'Final Interview', description: 'Optional 20-minute discussion with an engineering DEI lead.' }
    ],
    selectionCriteria: 'Commitment to diversity, equity, and inclusion, academic performance, and demonstrated passion for computer science.',
    officialWebsiteUrl: 'https://buildyourfuture.withgoogle.com/scholarships',
    featured: true,
    totalRecipients: 75,
    contactEmail: 'generationgoogle-apac@google.com'
  },
  {
    id: 'tata-trusts-tech',
    title: 'Tata Trusts Means-cum-Merit Scholarship for Engineering & Medicine',
    provider: 'Tata Trusts',
    providerLogo: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-cum-Need',
    amount: 150000,
    amountFormatted: '₹1,50,000 / year',
    duration: 'Renewable annually',
    deadline: '2026-11-20',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Engineering', 'Medicine', 'Bio-Technology'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
    description: 'Financial aid grant covering 30% to 80% of annual tuition fees for meritorious students pursuing professional degrees with financial constraints.',
    fullOverview: 'The Tata Trusts Scholarship program continues Sir Ratan Tata’s vision to ensure financial hardship never restricts promising youth from pursuing professional qualifications in Engineering, Technology, and Medicine.',
    eligibility: {
      minCgpaPercentage: 75,
      maxFamilyIncomeAnnual: 600000,
      eligibleEducationLevels: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
      eligibleFields: ['Engineering', 'Medicine', 'Technology'],
    },
    benefits: [
      'Substantial reimbursement of annual college tuition fee',
      'Subsidized book and learning equipment allowance',
      'Annual renewal option until completion of program upon maintaining 7.5 CGPA'
    ],
    requiredDocuments: [
      'College Fee Receipt for Academic Year',
      'All Semester Grade Cards / Transcripts',
      'Income Certificate (Form 16 or Government Tahsildar Certificate)',
      'Cancelled Cheque / Bank Details'
    ],
    applicationProcess: [
      { step: 1, title: 'Portal Application', description: 'Submit institutional fee receipts and marks cards.' },
      { step: 2, title: 'Trustee Committee Scrutiny', description: 'Verification of family income ceiling and institution accreditation.' },
      { step: 3, title: 'Disbursement', description: 'Direct Electronic Clearing Service (ECS) credit to student bank account.' }
    ],
    selectionCriteria: 'Priority given to students with family income under ₹3.5 Lakhs who have scored above 80% in preceding semester examinations.',
    officialWebsiteUrl: 'https://www.tatatrusts.org/our-work/individual-grants-programme/education-grants',
    featured: true,
    totalRecipients: 2500,
    contactEmail: 'igpedu@tatatrusts.org'
  },
  {
    id: 'pmsss-jk-2026',
    title: 'Prime Minister’s Special Scholarship Scheme (PMSSS)',
    provider: 'AICTE / Ministry of Education, Govt. of India',
    providerLogo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=100&auto=format&fit=crop&q=80',
    category: 'Need-Based',
    amount: 400000,
    amountFormatted: '₹4,00,000 / year',
    duration: 'Up to 4 years',
    deadline: '2026-12-10',
    country: 'India',
    statesApplicable: ['Jammu & Kashmir', 'Ladakh', 'All India'],
    fieldOfStudy: ['Engineering', 'General Degree', 'Nursing', 'Pharmacy', 'Hotel Management'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
    description: 'Fully sponsored central government scheme providing complete tuition fee waivers plus ₹1 Lakh annual maintenance allowance for living expenses.',
    fullOverview: 'Implemented by AICTE, PMSSS builds capacities of the youth of Jammu, Kashmir, and Ladakh through education in premier institutions across India. It pays full college fees directly to the institute and maintenance allowance directly to the student.',
    eligibility: {
      minCgpaPercentage: 60,
      maxFamilyIncomeAnnual: 800000,
      eligibleEducationLevels: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
      eligibleStates: ['Jammu & Kashmir', 'Ladakh'],
      eligibleFields: ['Any'],
    },
    benefits: [
      'Full academic fee waiver up to ₹1,25,000 for general and ₹3,00,000 for engineering',
      '₹1,00,000 annual hostel & mess maintenance allowance paid directly via DBT',
      'Reserved seats in leading central and private universities across India'
    ],
    requiredDocuments: [
      'Domicile Certificate of J&K / Ladakh',
      'Class 12th Passing Certificate',
      'Income Certificate issued by competent Revenue Authority',
      'Aadhaar Card linked with Bank Account (DBT active)'
    ],
    applicationProcess: [
      { step: 1, title: 'AICTE Registration', description: 'Register on AICTE PMSSS portal with Class 12 Roll Number.' },
      { step: 2, title: 'Facilitation Center Verification', description: 'Physically verify documents at designated Government colleges.' },
      { step: 3, title: 'Online Choice Filling', description: 'Select preferred colleges and streams across India.' },
      { step: 4, title: 'Merit Seat Allotment', description: 'Download allotment letter and report to university.' }
    ],
    selectionCriteria: 'Rank list based on Class 12 Board examination percentage and reservation guidelines.',
    officialWebsiteUrl: 'https://aicte-jk-scholarship-gov.in',
    featured: false,
    totalRecipients: 5000,
    contactEmail: 'pmsss.support@aicte-india.org'
  },
  {
    id: 'hdfc-ecss-2026',
    title: 'HDFC Bank Parivartan’s ECSS Scholarship',
    provider: 'HDFC Bank Parivartan',
    providerLogo: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=100&auto=format&fit=crop&q=80',
    category: 'Need-Based',
    amount: 75000,
    amountFormatted: '₹75,000 / year',
    duration: 'One year (renewable)',
    deadline: '2026-11-18',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['All'],
    educationLevel: [
      'High School (10th/12th)',
      'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
      'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
      'Diploma / Vocational'
    ],
    description: 'Providing crisis relief scholarship support to students facing personal or economic crises to prevent school and college dropouts.',
    fullOverview: 'HDFC Bank Parivartan’s Educational Crisis Support Scholarship (ECSS) assists students from disadvantaged backgrounds who have encountered critical life circumstances such as loss of earning parent or critical medical emergencies.',
    eligibility: {
      minCgpaPercentage: 55,
      maxFamilyIncomeAnnual: 250000,
      eligibleEducationLevels: [
        'High School (10th/12th)',
        'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
        'Diploma / Vocational'
      ],
      eligibleFields: ['Any'],
    },
    benefits: [
      'One-time annual grant of up to ₹75,000 to cover fees, books, and exam dues',
      'Counseling support for continuing higher studies'
    ],
    requiredDocuments: [
      'Previous Year Marksheet with minimum 55% marks',
      'Income Certificate (Salary slip / BPL Card / Gram Panchayat letter)',
      'Proof of crisis (Medical bills / Death certificate of earner, if applicable)',
      'Current Year Admission Receipt'
    ],
    applicationProcess: [
      { step: 1, title: 'Application Submission', description: 'Submit student details and crisis justification letter online.' },
      { step: 2, title: 'Telephonic Screening', description: 'Verification by scholarship executive team.' },
      { step: 3, title: 'Direct Bank Transfer', description: 'Immediate electronic disbursement upon committee signoff.' }
    ],
    selectionCriteria: 'Students with household annual income below ₹2.5 Lakhs who demonstrate urgent need.',
    officialWebsiteUrl: 'https://www.hdfcbank.com/personal/about-us/corporate-social-responsibility',
    featured: false,
    totalRecipients: 10000,
    contactEmail: 'parivartan.ecss@hdfcbank.com'
  },
  {
    id: 'kc-mahindra-pg',
    title: 'K.C. Mahindra Scholarship for Post-Graduate Studies Abroad',
    provider: 'K.C. Mahindra Education Trust',
    providerLogo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-Based',
    amount: 1000000,
    amountFormatted: '₹10,00,000 Grant',
    duration: 'One-time study grant',
    deadline: '2026-12-30',
    country: 'International / India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Engineering', 'Business Management', 'Pure Sciences', 'Economics', 'Law'],
    educationLevel: ['Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)', 'Doctoral (Ph.D.)'],
    description: 'Interest-free scholarship loan of up to ₹10 Lakhs for top Indian graduates securing admissions to reputed overseas universities.',
    fullOverview: 'Established in 1953, the K. C. Mahindra Education Trust grants top-tier study grants to promising Indian graduates admitted to leading world institutions including MIT, Stanford, Oxford, Cambridge, and Harvard.',
    eligibility: {
      minCgpaPercentage: 80,
      eligibleEducationLevels: [
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
        'Doctoral (Ph.D.)'
      ],
      eligibleFields: ['Engineering', 'Technology', 'Science', 'Management', 'Economics'],
    },
    benefits: [
      'Top 3 scholars awarded ₹10,00,000 each; remaining selected scholars receive ₹5,00,000',
      'Access to prestigious alumni network of global business and science leaders'
    ],
    requiredDocuments: [
      'Offer Letter from Accredited Overseas University',
      'Complete Bachelor Degree Transcripts',
      'Two Letters of Recommendation (Academic & Professional)',
      'Statement of Purpose (1000 words)',
      'GRE / GMAT / IELTS score reports'
    ],
    applicationProcess: [
      { step: 1, title: 'Form Submission', description: 'Upload university admit letters and statement of purpose.' },
      { step: 2, title: 'Shortlisting', description: 'Panel of eminent professors and captains of industry shortlist top 100.' },
      { step: 3, title: 'In-person / Virtual Board Interview', description: 'Comprehensive interview by Mahindra Trust Board in Mumbai.' }
    ],
    selectionCriteria: 'Exceptional academic excellence, leadership caliber, and potential to contribute to society.',
    officialWebsiteUrl: 'https://www.kcmet.org/what-we-do-scholarships.aspx',
    featured: true,
    totalRecipients: 60,
    contactEmail: 'kcmet@mahindra.com'
  },
  {
    id: 'santoor-women-stem',
    title: 'Santoor Women’s Scholarship Programme',
    provider: 'Wipro Cares & Santoor',
    providerLogo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    category: 'Special Category / Diversity',
    amount: 24000,
    amountFormatted: '₹24,000 / year',
    duration: 'Until graduation (up to 3-4 years)',
    deadline: '2026-11-30',
    country: 'India',
    statesApplicable: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'Chhattisgarh'],
    fieldOfStudy: ['Humanities', 'Liberal Arts', 'Sciences', 'Commerce'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
    description: 'Empowering young women from underprivileged backgrounds in southern and central India to complete higher education.',
    fullOverview: 'Wipro Consumer Care and Wipro Cares support young women who have completed their class 12 from government schools and are pursuing higher education in recognized degree colleges.',
    eligibility: {
      minCgpaPercentage: 60,
      maxFamilyIncomeAnnual: 400000,
      eligibleEducationLevels: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
      eligibleGenders: ['Female'],
      eligibleStates: ['Karnataka', 'Andhra Pradesh', 'Telangana', 'Chhattisgarh'],
      eligibleFields: ['Any'],
    },
    benefits: [
      '₹24,000 per annum paid towards tuition, books, and learning expenses',
      'Career readiness webinar series conducted by Wipro HR professionals'
    ],
    requiredDocuments: [
      'Class 10th and 12th passing certificates (Government School Proof)',
      'Admission fee receipt of current Undergraduate College',
      'Aadhaar Card',
      'Bank Account passbook in student’s own name'
    ],
    applicationProcess: [
      { step: 1, title: 'Submit Application', description: 'Fill form through Santoor scholarship web portal.' },
      { step: 2, title: 'District Scrutiny', description: 'Verification of state domicile and government school history.' },
      { step: 3, title: 'Annual Disbursement', description: 'Direct RTGS transfer into scholar’s bank account.' }
    ],
    selectionCriteria: 'Reserved exclusively for girl students from government schools in specified states with household financial need.',
    officialWebsiteUrl: 'https://www.santoorscholarships.com',
    featured: false,
    totalRecipients: 900,
    contactEmail: 'santoor.scholarship@wipro.com'
  },
  {
    id: 'adobe-wit-2026',
    title: 'Adobe Research Women-in-Technology Scholarship',
    provider: 'Adobe Systems',
    providerLogo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&auto=format&fit=crop&q=80',
    category: 'Special Category / Diversity',
    amount: 825000, // $10,000 USD
    amountFormatted: '₹8,25,000 ($10,000)',
    duration: 'One-time award + Internship',
    deadline: '2026-12-18',
    country: 'International / India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Computer Science', 'Data Science', 'Artificial Intelligence', 'Software Engineering'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)', 'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'],
    description: 'Recognizing outstanding female students across the globe who are pushing the boundaries of computing and AI research.',
    fullOverview: 'The Adobe Research Women-in-Technology Scholarship recognizes exceptional female undergraduate and master’s students studying Computer Science worldwide, pairing financial funding with an opportunity to intern at Adobe Research.',
    eligibility: {
      minCgpaPercentage: 80,
      eligibleEducationLevels: [
        'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'
      ],
      eligibleGenders: ['Female'],
      eligibleFields: ['Computer Science', 'Artificial Intelligence', 'Data Science'],
    },
    benefits: [
      '$10,000 USD financial award paid directly towards education',
      'A one-year Creative Cloud subscription',
      'Opportunity to interview for a summer research internship at Adobe Research',
      'Mentorship from senior female scientists at Adobe'
    ],
    requiredDocuments: [
      'Resume highlighting papers, open-source repos, and technical awards',
      'Official University Transcripts',
      'Three Letters of Recommendation from research advisors/professors',
      'Answers to four essay questions on research vision'
    ],
    applicationProcess: [
      { step: 1, title: 'Research Portfolio', description: 'Submit code repositories, published papers, and essays.' },
      { step: 2, title: 'Peer Review', description: 'Adobe Scientists evaluate research depth and algorithmic creativity.' },
      { step: 3, title: 'Finalist Interview', description: '30-minute technical discussion with a Principal Research Scientist.' }
    ],
    selectionCriteria: 'Academic record, leadership, passion for technology, and demonstrated research achievement.',
    officialWebsiteUrl: 'https://research.adobe.com/scholarship',
    featured: true,
    totalRecipients: 30,
    contactEmail: 'researchscholarship@adobe.com'
  },
  {
    id: 'nsp-postmatric-sc-st',
    title: 'National Scholarship Portal (NSP) Central Sector Scheme',
    provider: 'Ministry of Social Justice, Govt. of India',
    providerLogo: 'https://images.unsplash.com/photo-1590402494587-44b71d7772f6?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-cum-Need',
    amount: 120000,
    amountFormatted: '₹1,20,000 / year',
    duration: 'Renewable every academic year',
    deadline: '2026-11-22',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Engineering', 'Medicine', 'Law', 'Commerce', 'Sciences', 'All'],
    educationLevel: [
      'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
      'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'
    ],
    description: 'Central sector top-class education scheme for meritorious SC, ST, and OBC students pursuing studies in notified top institutions.',
    fullOverview: 'The Central Sector Scholarship Scheme aims to recognize and promote quality education amongst students belonging to reserved categories by providing full tuition fees along with living and book expenses.',
    eligibility: {
      minCgpaPercentage: 60,
      maxFamilyIncomeAnnual: 800000,
      eligibleEducationLevels: [
        'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)'
      ],
      eligibleCategories: ['SC', 'ST', 'OBC', 'EWS'],
      eligibleFields: ['Any'],
    },
    benefits: [
      'Full tuition fee and non-refundable charges up to ₹2.00 Lakh per annum',
      'Living expenses of ₹3,000 per month (₹36,000/year)',
      'Books and stationery allowance of ₹5,000 per annum',
      'One-time computer/laptop allowance of ₹45,000'
    ],
    requiredDocuments: [
      'Caste Certificate issued by Revenue Authority',
      'Income Certificate (Current Financial Year)',
      'College Admission & Fee Verification Letter',
      'Bank Account seeded with Aadhaar number',
      'Previous Class Marksheet'
    ],
    applicationProcess: [
      { step: 1, title: 'NSP Registration (OTR)', description: 'Generate One-Time Registration using Aadhaar Face Authentication.' },
      { step: 2, title: 'Institute L1 Verification', description: 'Nodal officer of college verifies enrollment and marks.' },
      { step: 3, title: 'District L2 Verification', description: 'District Welfare Officer approves sanction list.' },
      { step: 4, title: 'PFMS DBT Transfer', description: 'Central treasury directly credits scholar account.' }
    ],
    selectionCriteria: 'Merit ranking among students admitted to notified premier institutions within allotted quota.',
    officialWebsiteUrl: 'https://scholarships.gov.in',
    featured: false,
    totalRecipients: 21500,
    contactEmail: 'helpdesk@scholarships.gov.in'
  },
  {
    id: 'loreal-girls-science',
    title: 'L’Oréal India For Young Women in Science Scholarship',
    provider: 'L’Oréal India',
    providerLogo: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=100&auto=format&fit=crop&q=80',
    category: 'Special Category / Diversity',
    amount: 250000,
    amountFormatted: '₹2,50,000 Total',
    duration: 'Over 3-4 years of graduation',
    deadline: '2026-11-28',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Pure Science', 'Life Sciences', 'Biotechnology', 'Engineering', 'Medicine'],
    educationLevel: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
    description: 'Encouraging promising young women from financially strained backgrounds to pursue careers in scientific and research domains.',
    fullOverview: 'The L’Oréal India For Young Women in Science Programme grants ₹2,50,000 to young women who have passed Class 12 with minimum 85% in PCB/PCM and wish to pursue higher education in scientific fields in India.',
    eligibility: {
      minCgpaPercentage: 85,
      maxFamilyIncomeAnnual: 600000,
      eligibleEducationLevels: ['Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)'],
      eligibleGenders: ['Female'],
      eligibleFields: ['Science', 'Engineering', 'Medicine', 'Bio-Technology'],
    },
    benefits: [
      'Financial aid of ₹2,50,000 disbursed over the course of graduation',
      'One-on-one mentorship from senior L’Oréal scientists and researchers',
      'Participation in Science Connect summits'
    ],
    requiredDocuments: [
      'Class 10th & Class 12th Marksheets (85%+ in Science)',
      'Proof of Admission in Science-related undergraduate course',
      'Family Income Certificate / Salary slips / Form 16',
      'Two essays describing scientific career ambitions'
    ],
    applicationProcess: [
      { step: 1, title: 'Online Form', description: 'Fill academic history and submit statement of purpose.' },
      { step: 2, title: 'Telephonic Screening', description: 'Initial interview to understand aspirations and financial need.' },
      { step: 3, title: 'Panel Interview', description: 'Virtual interview with a distinguished panel of Indian women scientists.' }
    ],
    selectionCriteria: 'Academic brilliance in science stream combined with proven financial constraint.',
    officialWebsiteUrl: 'https://www.loreal.com/en/india',
    featured: false,
    totalRecipients: 85,
    contactEmail: 'fywis.india@loreal.com'
  },
  {
    id: 'narotam-sekhsaria-pg',
    title: 'Narotam Sekhsaria Post Graduate Scholarship',
    provider: 'Narotam Sekhsaria Foundation',
    providerLogo: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-Based',
    amount: 2000000,
    amountFormatted: '₹20,00,000 Interest-Free Loan',
    duration: 'Postgraduate program',
    deadline: '2026-12-28',
    country: 'International / India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Engineering', 'Applied Sciences', 'Management', 'Law', 'Social Sciences'],
    educationLevel: ['Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)', 'Doctoral (Ph.D.)'],
    description: 'Prestigious interest-free loan scholarships of up to ₹20 Lakhs awarded to Indian students of high intellectual distinction.',
    fullOverview: 'The Foundation awards interest-free loan scholarships to Indian students with consistently high academic records seeking to pursue postgraduate degrees in India or abroad at top-ranked universities.',
    eligibility: {
      minCgpaPercentage: 80,
      eligibleEducationLevels: [
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
        'Doctoral (Ph.D.)'
      ],
      eligibleFields: ['Any'],
      maxAge: 30,
    },
    benefits: [
      'Up to ₹20,00,000 interest-free loan with a comfortable repayment holiday',
      'Induction into the prestigious NS Foundation Scholar Mentorship Network',
      'Life-long networking with global alumni leaders'
    ],
    requiredDocuments: [
      'Official Degree Transcripts & University Rank Proof',
      'Offer Letter from Indian or International University',
      'Statement of Purpose highlighting long-term nation-building intent',
      'Detailed financial plan & guarantor declarations'
    ],
    applicationProcess: [
      { step: 1, title: 'Online Registration', description: 'Submit academic profile and university admission offers.' },
      { step: 2, title: 'Written Review', description: 'In-depth assessment of SOP and letters of recommendation.' },
      { step: 3, title: 'Face-to-Face Interview', description: 'Rigorous interview by eminent experts in Mumbai.' }
    ],
    selectionCriteria: 'Intellectual depth, leadership potential, character, and clarity of purpose.',
    officialWebsiteUrl: 'https://pg.nsfoundation.co.in',
    featured: true,
    totalRecipients: 40,
    contactEmail: 'pgscholarship@nsfoundation.co.in'
  },
  {
    id: 'sitaram-jindal-foundation',
    title: 'Sitaram Jindal Foundation Annual Scholarship',
    provider: 'Sitaram Jindal Foundation',
    providerLogo: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=100&auto=format&fit=crop&q=80',
    category: 'Need-Based',
    amount: 38400,
    amountFormatted: '₹38,400 / year',
    duration: 'Degree duration',
    deadline: '2026-11-15',
    country: 'India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Engineering', 'Medicine', 'Diploma', 'Arts', 'Commerce', 'Science'],
    educationLevel: [
      'High School (10th/12th)',
      'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
      'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
      'Diploma / Vocational'
    ],
    description: 'Providing vital monthly financial aid stipends to economically disadvantaged students across India pursuing polytechnic, graduation, and PG.',
    fullOverview: 'The Sitaram Jindal Foundation scholarship assists students across India whose family incomes fall below ₹4 Lakhs (employed) or ₹2.5 Lakhs (others), helping cover recurring study and boarding expenses.',
    eligibility: {
      minCgpaPercentage: 65,
      maxFamilyIncomeAnnual: 400000,
      eligibleEducationLevels: [
        'High School (10th/12th)',
        'Undergraduate (B.Tech, B.Sc, B.Com, BA, etc.)',
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
        'Diploma / Vocational'
      ],
      eligibleFields: ['Any'],
    },
    benefits: [
      'Monthly scholarship stipend of ₹1,200 to ₹3,200 credited bi-annually',
      'Additional hostel allowance for students residing in recognized hostels'
    ],
    requiredDocuments: [
      'Class 10th / 12th / Previous Semester Marksheet',
      'Income Certificate (Issued by competent state revenue authority)',
      'Hostel Warden Certificate (if claiming hostel allowance)',
      'Physical Handicap Certificate (if applicable)'
    ],
    applicationProcess: [
      { step: 1, title: 'Download Application', description: 'Fill prescribed form and get Principal / Dean endorsement.' },
      { step: 2, title: 'Postal / Online Dispatch', description: 'Mail to Bengaluru or Delhi trust headquarters.' },
      { step: 3, title: 'Scrutiny & Verification', description: 'Desk assessment and telephonic cross-check.' }
    ],
    selectionCriteria: 'Percentage cutoff based on gender (65% for boys, 60% for girls) and verified family income.',
    officialWebsiteUrl: 'https://www.sitaramjindalfoundation.org/scholarships.php',
    featured: false,
    totalRecipients: 15000,
    contactEmail: 'scholarship@sitaramjindalfoundation.org'
  },
  {
    id: 'rhodes-scholarship-india',
    title: 'Rhodes Scholarship for India (Oxford University)',
    provider: 'The Rhodes Trust (University of Oxford)',
    providerLogo: 'https://images.unsplash.com/photo-1541829070764-84a7d30dd3f3?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-Based',
    amount: 5500000,
    amountFormatted: '₹55,00,000+ (Full Oxford Funding)',
    duration: '2 to 3 years at Oxford',
    deadline: '2026-12-15',
    country: 'International / India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['All'],
    educationLevel: ['Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)', 'Doctoral (Ph.D.)'],
    description: 'The world’s oldest and most prestigious international scholarship programme, covering full Oxford tuition fees and living stipend.',
    fullOverview: 'The Rhodes Scholarship brings outstanding young people from around the world to study at the University of Oxford. Five Rhodes Scholarships are awarded in India each year to students demonstrating academic excellence, moral force of character, and instincts to lead.',
    eligibility: {
      minCgpaPercentage: 85,
      eligibleEducationLevels: [
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
        'Doctoral (Ph.D.)'
      ],
      eligibleFields: ['Any'],
      maxAge: 25,
    },
    benefits: [
      'Full University and College fees paid directly to Oxford',
      'Annual living stipend exceeding £19,000 per year',
      'Economy class return airfare to the UK at start and completion of study',
      'Rhodes House leadership programmes and retreats'
    ],
    requiredDocuments: [
      'Official Degree Transcripts (First Class Honors or Equivalent)',
      'Comprehensive Curriculum Vitae (max 2 pages)',
      'Personal Statement of Purpose (max 1000 words)',
      'Four to Six Reference Letters (minimum 3 academic)',
      'Valid Indian Passport'
    ],
    applicationProcess: [
      { step: 1, title: 'Online Submission', description: 'Complete portfolio, references, and Oxford study proposal.' },
      { step: 2, title: 'Preliminary Interview', description: 'Screening interview by Rhodes India Alumni Selection Committee.' },
      { step: 3, title: 'Social Gathering & Final Interview', description: 'Two-day in-person engagement with the National Selection Committee in New Delhi.' }
    ],
    selectionCriteria: 'Literary and scholastic attainments, energy to use one’s talents to the full, truth, courage, devotion to duty, and fellowship.',
    officialWebsiteUrl: 'https://www.rhodeshouse.ox.ac.uk/scholarships/the-rhodes-scholarship/',
    featured: true,
    totalRecipients: 5,
    contactEmail: 'india.secretary@rhodestrust.com'
  },
  {
    id: 'inlaks-shivdasani-grant',
    title: 'Inlaks Shivdasani Foundation Scholarships',
    provider: 'Inlaks Shivdasani Foundation',
    providerLogo: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=100&auto=format&fit=crop&q=80',
    category: 'Merit-Based',
    amount: 8500000,
    amountFormatted: '₹85,00,000 ($100,000 Max)',
    duration: 'Degree duration abroad',
    deadline: '2026-12-22',
    country: 'International / India',
    statesApplicable: ['All India'],
    fieldOfStudy: ['Humanities', 'Fine Arts', 'Social Sciences', 'Architecture', 'Law', 'Sciences'],
    educationLevel: ['Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)', 'Doctoral (Ph.D.)'],
    description: 'Providing extraordinary Indian students full funding to pursue master’s and doctoral degrees at top institutions in the US, UK, and Europe.',
    fullOverview: 'Inlaks Scholarships are granted to young Indians with exceptional talent in any subject or discipline. The scholarship covers tuition fees, one-way travel, and living expenses up to a maximum ceiling of $100,000 USD.',
    eligibility: {
      minCgpaPercentage: 80,
      eligibleEducationLevels: [
        'Postgraduate (M.Tech, M.Sc, MBA, MA, etc.)',
        'Doctoral (Ph.D.)'
      ],
      eligibleFields: ['Any'],
      maxAge: 30,
    },
    benefits: [
      'Up to $100,000 USD covering full tuition, health insurance, and living expenses',
      'One-way air travel to host university'
    ],
    requiredDocuments: [
      'Unconditional admission letter to top institution in US/Europe/UK',
      'Evidence of outstanding portfolio / artistic / academic work',
      'Undergraduate transcripts and degree certificates',
      'Two academic/professional reference letters'
    ],
    applicationProcess: [
      { step: 1, title: 'Portal Submission', description: 'Upload university admission offer and portfolio.' },
      { step: 2, title: 'First Stage Interview', description: 'Interview by subject matter domain specialists.' },
      { step: 3, title: 'Final Selection Board', description: 'Interview by trustees and independent experts.' }
    ],
    selectionCriteria: 'Exceptional originality, artistic or intellectual distinctiveness, and promise.',
    officialWebsiteUrl: 'https://www.inlaksfoundation.org/scholarships/',
    featured: false,
    totalRecipients: 20,
    contactEmail: 'info@inlaksfoundation.org'
  }
];
