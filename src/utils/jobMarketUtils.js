/**
 * Job market data for different industries
 * This is mock data that would ideally come from an API
 */
const JOB_MARKET_DATA = {
  technology: {
    hotSkills: [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
      'AWS', 'Docker', 'Kubernetes', 'Machine Learning', 'Data Science'
    ],
    growingRoles: [
      'Full Stack Developer', 'DevOps Engineer', 'Data Scientist',
      'Machine Learning Engineer', 'Cloud Architect'
    ],
    averageSalary: '$105,000',
    demandLevel: 'High',
    industryGrowth: '15% annually'
  },
  healthcare: {
    hotSkills: [
      'Electronic Medical Records', 'Patient Care', 'Medical Coding',
      'Healthcare Administration', 'Clinical Research'
    ],
    growingRoles: [
      'Registered Nurse', 'Nurse Practitioner', 'Healthcare Administrator',
      'Medical Technologist', 'Physician Assistant'
    ],
    averageSalary: '$85,000',
    demandLevel: 'Very High',
    industryGrowth: '18% annually'
  },
  finance: {
    hotSkills: [
      'Financial Analysis', 'Risk Management', 'Investment Banking',
      'Blockchain', 'Financial Modeling'
    ],
    growingRoles: [
      'Financial Analyst', 'Investment Banker', 'Risk Manager',
      'Blockchain Developer', 'Quantitative Analyst'
    ],
    averageSalary: '$95,000',
    demandLevel: 'Medium-High',
    industryGrowth: '10% annually'
  },
  marketing: {
    hotSkills: [
      'Digital Marketing', 'Social Media Marketing', 'Content Creation',
      'SEO/SEM', 'Data Analytics'
    ],
    growingRoles: [
      'Digital Marketing Specialist', 'Content Strategist', 'SEO Specialist',
      'Social Media Manager', 'Marketing Data Analyst'
    ],
    averageSalary: '$75,000',
    demandLevel: 'Medium',
    industryGrowth: '8% annually'
  }
};

/**
 * Gets job market data for a specific industry
 * @param {string} industry - The industry to get data for
 * @returns {Object|null} - The job market data or null if not found
 */
export const getIndustryData = (industry) => {
  return JOB_MARKET_DATA[industry.toLowerCase()] || null;
};

/**
 * Gets all available industries
 * @returns {string[]} - Array of industry names
 */
export const getAvailableIndustries = () => {
  return Object.keys(JOB_MARKET_DATA);
};

/**
 * Analyzes a resume and provides recommendations
 * @param {Object} resumeData - The resume data to analyze
 * @returns {Object} - Resume analysis and recommendations
 */
export const analyzeResume = (resumeData) => {
  const analysis = {
    skillsCount: resumeData.skills?.length || 0,
    experienceCount: resumeData.experience?.length || 0,
    educationCount: resumeData.education?.length || 0,
    hasSummary: Boolean(resumeData.summary),
    missingFields: [],
    recommendations: [],
    strengths: [],
    matchedIndustries: []
  };
  
  // Check for missing fields
  if (!resumeData.summary || resumeData.summary.trim() === '') {
    analysis.missingFields.push('Professional Summary');
    analysis.recommendations.push('Add a professional summary to highlight your key qualifications');
  }
  
  if (!resumeData.skills || resumeData.skills.length === 0) {
    analysis.missingFields.push('Skills');
    analysis.recommendations.push('Add relevant skills to make your resume more searchable');
  } else if (resumeData.skills.length < 5) {
    analysis.recommendations.push('Consider adding more skills (aim for at least 5-10 relevant skills)');
  } else {
    analysis.strengths.push('Good number of skills listed');
  }
  
  if (!resumeData.experience || resumeData.experience.length === 0) {
    analysis.missingFields.push('Work Experience');
    analysis.recommendations.push('Add work experience to demonstrate your professional background');
  } else {
    // Check experience descriptions
    const shortDescriptions = resumeData.experience.filter(exp => 
      !exp.description || exp.description.split(' ').length < 15
    );
    
    if (shortDescriptions.length > 0) {
      analysis.recommendations.push('Expand your work experience descriptions with more details and achievements');
    } else {
      analysis.strengths.push('Detailed work experience descriptions');
    }
  }
  
  if (!resumeData.education || resumeData.education.length === 0) {
    analysis.missingFields.push('Education');
    analysis.recommendations.push('Add your educational background');
  }
  
  // Match skills to industries
  if (resumeData.skills && resumeData.skills.length > 0) {
    const normalizedSkills = resumeData.skills.map(skill => skill.toLowerCase());
    
    Object.entries(JOB_MARKET_DATA).forEach(([industry, data]) => {
      const industrySkills = data.hotSkills.map(skill => skill.toLowerCase());
      const matchedSkills = normalizedSkills.filter(skill => 
        industrySkills.some(industrySkill => industrySkill.includes(skill) || skill.includes(industrySkill))
      );
      
      if (matchedSkills.length > 0) {
        const matchPercentage = Math.round((matchedSkills.length / industrySkills.length) * 100);
        
        if (matchPercentage >= 30) {
          analysis.matchedIndustries.push({
            industry,
            matchPercentage,
            matchedSkills
          });
        }
      }
    });
    
    // Sort matched industries by match percentage
    analysis.matchedIndustries.sort((a, b) => b.matchPercentage - a.matchPercentage);
  }
  
  // Add industry-specific recommendations
  if (analysis.matchedIndustries.length > 0) {
    const topIndustry = analysis.matchedIndustries[0];
    const industryData = JOB_MARKET_DATA[topIndustry.industry];
    
    analysis.strengths.push(`Your skills align well with the ${topIndustry.industry} industry`);
    
    // Recommend adding hot skills that are missing
    const missingHotSkills = industryData.hotSkills.filter(skill => 
      !resumeData.skills.some(userSkill => 
        userSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill.toLowerCase())
      )
    ).slice(0, 3);
    
    if (missingHotSkills.length > 0) {
      analysis.recommendations.push(
        `Consider adding these in-demand skills for the ${topIndustry.industry} industry: ${missingHotSkills.join(', ')}`
      );
    }
    
    // Suggest job titles that match their skills
    analysis.recommendations.push(
      `Based on your skills, consider these roles: ${industryData.growingRoles.slice(0, 3).join(', ')}`
    );
  } else {
    analysis.recommendations.push(
      'Your skills don\'t strongly align with our industry data. Consider adding more industry-specific keywords.'
    );
  }
  
  // Add general recommendations
  if (!analysis.recommendations.includes('Add a professional summary')) {
    if (!resumeData.summary || resumeData.summary.split(' ').length < 30) {
      analysis.recommendations.push(
        'Expand your professional summary to at least 2-3 sentences highlighting your experience and key achievements'
      );
    }
  }
  
  // Check for contact information
  if (!resumeData.email) {
    analysis.missingFields.push('Email');
    analysis.recommendations.push('Add your email address for contact information');
  }
  
  if (!resumeData.phone) {
    analysis.missingFields.push('Phone Number');
    analysis.recommendations.push('Add your phone number for contact information');
  }
  
  // Calculate completeness score
  const maxScore = 100;
  let completenessScore = 0;
  
  // Basic fields - 40%
  if (resumeData.firstName && resumeData.lastName) completenessScore += 10;
  if (resumeData.email) completenessScore += 10;
  if (resumeData.phone) completenessScore += 10;
  if (resumeData.summary && resumeData.summary.length > 50) completenessScore += 10;
  
  // Experience - 25%
  if (resumeData.experience && resumeData.experience.length > 0) {
    const expScore = Math.min(resumeData.experience.length * 5, 15);
    completenessScore += expScore;
    
    // Quality of experience descriptions
    const goodDescriptions = resumeData.experience.filter(exp => 
      exp.description && exp.description.split(' ').length >= 20
    ).length;
    
    if (goodDescriptions / resumeData.experience.length >= 0.7) {
      completenessScore += 10;
    }
  }
  
  // Education - 15%
  if (resumeData.education && resumeData.education.length > 0) {
    completenessScore += 15;
  }
  
  // Skills - 20%
  if (resumeData.skills && resumeData.skills.length > 0) {
    const skillScore = Math.min(resumeData.skills.length * 2, 20);
    completenessScore += skillScore;
  }
  
  analysis.completenessScore = completenessScore;
  
  return analysis;
};

/**
 * Generates a job market report for a specific industry
 * @param {string} industry - The industry to generate a report for
 * @returns {Object} - The job market report
 */
export const generateIndustryReport = (industry) => {
  const industryData = getIndustryData(industry);
  if (!industryData) return null;
  
  return {
    industry,
    overview: `The ${industry} industry is currently experiencing ${industryData.industryGrowth} growth with a ${industryData.demandLevel} demand for qualified professionals. The average salary in this field is around ${industryData.averageSalary}.`,
    hotSkills: industryData.hotSkills,
    growingRoles: industryData.growingRoles,
    salary: industryData.averageSalary,
    demandLevel: industryData.demandLevel,
    growth: industryData.industryGrowth
  };
};

/**
 * Suggests improvements for a resume based on job market data
 * @param {Object} resumeData - The resume data
 * @param {string} targetIndustry - The target industry
 * @returns {Object} - Suggested improvements
 */
export const suggestImprovements = (resumeData, targetIndustry) => {
  const industryData = getIndustryData(targetIndustry);
  if (!industryData) return null;
  
  const suggestions = {
    skillsToAdd: [],
    rolesToConsider: [],
    summaryImprovements: []
  };
  
  // Suggest skills to add
  if (resumeData.skills && resumeData.skills.length > 0) {
    const userSkills = resumeData.skills.map(skill => skill.toLowerCase());
    
    suggestions.skillsToAdd = industryData.hotSkills.filter(skill => 
      !userSkills.some(userSkill => 
        userSkill.includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(userSkill)
      )
    );
  } else {
    suggestions.skillsToAdd = industryData.hotSkills;
  }
  
  // Suggest roles to consider
  if (resumeData.experience && resumeData.experience.length > 0) {
    const userRoles = resumeData.experience.map(exp => exp.position.toLowerCase());
    
    suggestions.rolesToConsider = industryData.growingRoles.filter(role => 
      !userRoles.some(userRole => 
        userRole.includes(role.toLowerCase()) || 
        role.toLowerCase().includes(userRole)
      )
    );
  } else {
    suggestions.rolesToConsider = industryData.growingRoles;
  }
  
  // Suggest summary improvements
  if (!resumeData.summary || resumeData.summary.trim() === '') {
    suggestions.summaryImprovements.push(
      'Add a professional summary that highlights your experience and skills relevant to the ' + 
      targetIndustry + ' industry'
    );
  } else {
    const summary = resumeData.summary.toLowerCase();
    const keyTerms = [...industryData.hotSkills, ...industryData.growingRoles].map(term => term.toLowerCase());
    
    const missingTerms = keyTerms.filter(term => !summary.includes(term));
    if (missingTerms.length > 0) {
      suggestions.summaryImprovements.push(
        'Consider incorporating these key terms in your summary: ' + 
        missingTerms.slice(0, 5).join(', ')
      );
    }
  }
  
  return suggestions;
};