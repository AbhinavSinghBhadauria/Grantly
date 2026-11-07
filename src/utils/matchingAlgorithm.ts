import { Scholarship, UserProfile, MatchAnalysis } from '../types';

export function calculateMatchAnalysis(scholarship: Scholarship, profile: UserProfile): MatchAnalysis {
  let score = 0;
  const matchedRequirements: MatchAnalysis['matchedRequirements'] = [];
  const missingRequirements: string[] = [];
  const recommendationTips: string[] = [];

  // 1. Education Level Check (Weight: 25)
  const isEducationLevelMatched = scholarship.eligibility.eligibleEducationLevels.includes(profile.educationLevel);
  if (isEducationLevelMatched) {
    score += 25;
    matchedRequirements.push({
      title: 'Education Level Eligible',
      description: `Your level (${profile.educationLevel}) matches scholarship criteria.`,
      satisfied: true
    });
  } else {
    matchedRequirements.push({
      title: 'Education Level Mismatch',
      description: `Requires ${scholarship.eligibility.eligibleEducationLevels.join(' or ')}. Your current level is ${profile.educationLevel}.`,
      satisfied: false
    });
    missingRequirements.push(`Requires enrollment in: ${scholarship.eligibility.eligibleEducationLevels.join(', ')}`);
    recommendationTips.push('Look for scholarships catering specifically to your current academic level.');
  }

  // 2. Academic Performance / CGPA Check (Weight: 25)
  const minCgpa = scholarship.eligibility.minCgpaPercentage || 50;
  // profile.cgpaPercentage is e.g. 8.7 (on 10 scale) or 87 (percentage)
  const normalizedUserScore = profile.cgpaPercentage <= 10 ? profile.cgpaPercentage * 9.5 : profile.cgpaPercentage;
  
  if (normalizedUserScore >= minCgpa) {
    score += 25;
    matchedRequirements.push({
      title: 'Academic Score Requirement Met',
      description: `Requires minimum ${minCgpa}%. Your academic score is ${profile.cgpaPercentage} (${normalizedUserScore.toFixed(1)}% equiv).`,
      satisfied: true
    });
  } else {
    const diff = (minCgpa - normalizedUserScore).toFixed(1);
    matchedRequirements.push({
      title: 'Academic Score Below Cutoff',
      description: `Requires minimum ${minCgpa}%. Current score is ${normalizedUserScore.toFixed(1)}% (${diff}% short).`,
      satisfied: false
    });
    missingRequirements.push(`Minimum academic score of ${minCgpa}% required (You have ${normalizedUserScore.toFixed(1)}%)`);
    recommendationTips.push('Upload recent semester grade improvements or re-evaluation transcripts if available.');
  }

  // 3. Family Income Ceiling Check (Weight: 20)
  if (scholarship.eligibility.maxFamilyIncomeAnnual) {
    const maxIncome = scholarship.eligibility.maxFamilyIncomeAnnual;
    if (profile.familyIncomeAnnual <= maxIncome) {
      score += 20;
      matchedRequirements.push({
        title: 'Family Income Within Ceiling',
        description: `Annual ceiling ₹${maxIncome.toLocaleString('en-IN')}. Your family income: ₹${profile.familyIncomeAnnual.toLocaleString('en-IN')}.`,
        satisfied: true
      });
    } else {
      matchedRequirements.push({
        title: 'Exceeds Family Income Limit',
        description: `Max permissible income ₹${maxIncome.toLocaleString('en-IN')}. Your reported income ₹${profile.familyIncomeAnnual.toLocaleString('en-IN')}.`,
        satisfied: false
      });
      missingRequirements.push(`Annual family income must be under ₹${maxIncome.toLocaleString('en-IN')}`);
      recommendationTips.push('Consider merit-based open category scholarships that do not have strict income caps.');
    }
  } else {
    // No income restriction (e.g. pure merit or international fellowship)
    score += 20;
    matchedRequirements.push({
      title: 'No Income Cap Restriction',
      description: 'Open to all family income brackets based purely on merit/achievement.',
      satisfied: true
    });
  }

  // 4. Field of Study / Stream Check (Weight: 15)
  const eligibleFields = scholarship.eligibility.eligibleFields || ['Any'];
  const isFieldMatched = 
    eligibleFields.includes('Any') || 
    eligibleFields.some(f => 
      f.toLowerCase().includes(profile.specializationField.toLowerCase()) || 
      profile.specializationField.toLowerCase().includes(f.toLowerCase()) ||
      profile.degreeCourse.toLowerCase().includes(f.toLowerCase())
    );

  if (isFieldMatched) {
    score += 15;
    matchedRequirements.push({
      title: 'Stream / Field of Study Matched',
      description: `Your field "${profile.specializationField}" aligns with eligible streams (${eligibleFields.join(', ')}).`,
      satisfied: true
    });
  } else {
    matchedRequirements.push({
      title: 'Stream Specific Requirement',
      description: `Program prefers candidates in ${eligibleFields.join(', ')}.`,
      satisfied: false
    });
    missingRequirements.push(`Preferred fields of study: ${eligibleFields.join(', ')}`);
  }

  // 5. Gender Eligibility Check (Weight: 10)
  if (scholarship.eligibility.eligibleGenders && scholarship.eligibility.eligibleGenders.length > 0) {
    if (scholarship.eligibility.eligibleGenders.includes(profile.gender as any)) {
      score += 10;
      matchedRequirements.push({
        title: 'Gender / Diversity Eligibility Confirmed',
        description: `Eligible for this diversity initiative (${scholarship.eligibility.eligibleGenders.join(', ')}).`,
        satisfied: true
      });
    } else {
      matchedRequirements.push({
        title: 'Special Demographic Initiative',
        description: `Exclusive to ${scholarship.eligibility.eligibleGenders.join(', ')} applicants.`,
        satisfied: false
      });
      missingRequirements.push(`Demographic preference: ${scholarship.eligibility.eligibleGenders.join(', ')}`);
    }
  } else {
    score += 10;
    matchedRequirements.push({
      title: 'Open to All Genders',
      description: 'No gender restrictions apply to this scholarship.',
      satisfied: true
    });
  }

  // 6. Category / State bonus check (Weight: 5)
  let categoryMatched = true;
  if (scholarship.eligibility.eligibleCategories && scholarship.eligibility.eligibleCategories.length > 0) {
    if (scholarship.eligibility.eligibleCategories.includes(profile.category)) {
      matchedRequirements.push({
        title: 'Social Category Verified',
        description: `Your category (${profile.category}) qualifies for this reservation/quota.`,
        satisfied: true
      });
      score += 5;
    } else {
      categoryMatched = false;
      matchedRequirements.push({
        title: 'Category Reservation Criteria',
        description: `Requires ${scholarship.eligibility.eligibleCategories.join(', ')}. Your category: ${profile.category}.`,
        satisfied: false
      });
      missingRequirements.push(`Applicable categories: ${scholarship.eligibility.eligibleCategories.join(', ')}`);
    }
  } else {
    score += 5;
  }

  // State check
  if (scholarship.eligibility.eligibleStates && scholarship.eligibility.eligibleStates.length > 0) {
    const isStateMatched = scholarship.eligibility.eligibleStates.includes(profile.state) || scholarship.eligibility.eligibleStates.includes('All India');
    if (!isStateMatched) {
      score = Math.max(0, score - 20);
      missingRequirements.push(`Domicile restricted to: ${scholarship.eligibility.eligibleStates.join(', ')}`);
      matchedRequirements.push({
        title: 'State Domicile Requirement',
        description: `Restricted to students from ${scholarship.eligibility.eligibleStates.join(', ')}. Your state: ${profile.state}.`,
        satisfied: false
      });
    }
  }

  // Final score clamping
  score = Math.min(100, Math.max(10, Math.round(score)));

  let verdict: MatchAnalysis['verdict'] = 'Eligible';
  if (score >= 80 && missingRequirements.length === 0) {
    verdict = 'Eligible';
    recommendationTips.push('High likelihood of qualifying! Ensure all documents are uploaded and apply early.');
  } else if (score >= 60 || missingRequirements.length <= 1) {
    verdict = 'Possibly Eligible';
    recommendationTips.push('You fulfill major requirements. Check if minor exemptions or supporting affidavits apply.');
  } else {
    verdict = 'Not Eligible';
    recommendationTips.push('You do not meet one or more primary criteria. Review other scholarships in your category.');
  }

  return {
    scholarshipId: scholarship.id,
    overallScore: score,
    verdict,
    matchedRequirements,
    missingRequirements,
    recommendationTips
  };
}

export function getDeadlineUrgency(deadlineStr: string): {
  daysLeft: number;
  label: string;
  isUrgent: boolean;
  statusColor: string;
} {
  const deadlineDate = new Date(deadlineStr);
  const today = new Date();
  const diffTime = deadlineDate.getTime() - today.getTime();
  const daysLeft = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (daysLeft < 0) {
    return { daysLeft, label: 'Closed', isUrgent: false, statusColor: 'bg-rose-500/10 text-rose-400 border-rose-500/20' };
  }
  if (daysLeft <= 3) {
    return { daysLeft, label: `${daysLeft} days left - Closing Soon!`, isUrgent: true, statusColor: 'bg-red-500/15 text-red-400 border-red-500/30' };
  }
  if (daysLeft <= 14) {
    return { daysLeft, label: `${daysLeft} days left`, isUrgent: true, statusColor: 'bg-amber-500/15 text-amber-400 border-amber-500/30' };
  }
  if (daysLeft <= 30) {
    return { daysLeft, label: `${daysLeft} days left`, isUrgent: false, statusColor: 'bg-blue-500/15 text-blue-400 border-blue-500/30' };
  }
  return { daysLeft, label: `${daysLeft} days left`, isUrgent: false, statusColor: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30' };
}
