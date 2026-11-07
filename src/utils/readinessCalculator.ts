import { Scholarship, DocumentItem } from '../types';

export interface ReadinessReport {
  scholarshipId: string;
  readinessPercentage: number;
  status: 'Ready to Apply' | 'Almost Ready' | 'Action Needed';
  matchedDocs: {
    requirement: string;
    uploadedDocName?: string;
    isUploaded: boolean;
  }[];
  missingDocs: string[];
}

export function calculateScholarshipReadiness(scholarship: Scholarship, uploadedDocs: DocumentItem[]): ReadinessReport {
  const reqs = scholarship.requiredDocuments;
  if (!reqs || reqs.length === 0) {
    return {
      scholarshipId: scholarship.id,
      readinessPercentage: 100,
      status: 'Ready to Apply',
      matchedDocs: [],
      missingDocs: []
    };
  }

  const matchedDocs: ReadinessReport['matchedDocs'] = [];
  const missingDocs: string[] = [];

  reqs.forEach(req => {
    const reqLower = req.toLowerCase();
    
    // Check if any uploaded document loosely satisfies this requirement
    const matched = uploadedDocs.find(doc => {
      const docName = (doc.name + ' ' + doc.fileName + ' ' + doc.category).toLowerCase();
      
      if (reqLower.includes('income') && docName.includes('income')) return true;
      if ((reqLower.includes('marksheet') || reqLower.includes('transcript') || reqLower.includes('grade')) && 
          (docName.includes('marksheet') || docName.includes('transcript') || docName.includes('certificate') || docName.includes('academic'))) return true;
      if ((reqLower.includes('aadhaar') || reqLower.includes('id') || reqLower.includes('identity') || reqLower.includes('photo')) && 
          (docName.includes('aadhaar') || docName.includes('identity') || docName.includes('passport') || docName.includes('pan'))) return true;
      if ((reqLower.includes('bank') || reqLower.includes('passbook') || reqLower.includes('cheque')) && 
          (docName.includes('bank') || docName.includes('passbook') || docName.includes('cheque'))) return true;
      if ((reqLower.includes('admission') || reqLower.includes('fee') || reqLower.includes('enrollment') || reqLower.includes('bonafide')) && 
          (docName.includes('admission') || docName.includes('bonafide') || docName.includes('fee') || docName.includes('college'))) return true;
      if ((reqLower.includes('caste') || reqLower.includes('domicile') || reqLower.includes('category')) && 
          (docName.includes('caste') || docName.includes('domicile') || docName.includes('category'))) return true;
      if ((reqLower.includes('resume') || reqLower.includes('cv')) && (docName.includes('resume') || docName.includes('cv'))) return true;
      if ((reqLower.includes('recommendation') || reqLower.includes('lor') || reqLower.includes('reference')) && 
          (docName.includes('recommendation') || docName.includes('lor') || docName.includes('reference'))) return true;
      if ((reqLower.includes('essay') || reqLower.includes('sop') || reqLower.includes('statement')) && 
          (docName.includes('essay') || docName.includes('sop') || docName.includes('statement'))) return true;
      
      return false;
    });

    if (matched) {
      matchedDocs.push({
        requirement: req,
        uploadedDocName: matched.name,
        isUploaded: true
      });
    } else {
      matchedDocs.push({
        requirement: req,
        isUploaded: false
      });
      missingDocs.push(req);
    }
  });

  const readinessPercentage = Math.round(((reqs.length - missingDocs.length) / reqs.length) * 100);

  let status: ReadinessReport['status'] = 'Ready to Apply';
  if (readinessPercentage === 100) {
    status = 'Ready to Apply';
  } else if (readinessPercentage >= 60) {
    status = 'Almost Ready';
  } else {
    status = 'Action Needed';
  }

  return {
    scholarshipId: scholarship.id,
    readinessPercentage,
    status,
    matchedDocs,
    missingDocs
  };
}

export function calculateOverallDocumentReadiness(scholarships: Scholarship[], uploadedDocs: DocumentItem[]): number {
  if (scholarships.length === 0) return 100;
  let totalScore = 0;
  scholarships.forEach(s => {
    totalScore += calculateScholarshipReadiness(s, uploadedDocs).readinessPercentage;
  });
  return Math.round(totalScore / scholarships.length);
}
