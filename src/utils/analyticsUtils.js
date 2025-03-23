/**
 * Tracks a resume creation event
 * @param {Object} resumeData - The resume data
 */
export const trackResumeCreation = (resumeData) => {
  try {
    // Get existing analytics data
    const analyticsData = getAnalyticsData();
    
    // Update resume count
    analyticsData.totalResumes = (analyticsData.totalResumes || 0) + 1;
    
    // Track template usage
    const template = resumeData.template;
    analyticsData.templateUsage = analyticsData.templateUsage || {};
    analyticsData.templateUsage[template] = (analyticsData.templateUsage[template] || 0) + 1;
    
    // Track skills usage
    if (resumeData.skills && resumeData.skills.length) {
      analyticsData.skillsUsage = analyticsData.skillsUsage || {};
      resumeData.skills.forEach(skill => {
        const normalizedSkill = skill.toLowerCase();
        analyticsData.skillsUsage[normalizedSkill] = (analyticsData.skillsUsage[normalizedSkill] || 0) + 1;
      });
    }
    
    // Save analytics data
    saveAnalyticsData(analyticsData);
  } catch (error) {
    console.error('Failed to track resume creation:', error);
  }
};

/**
 * Tracks a resume download event
 * @param {string} template - The template used
 */
export const trackResumeDownload = (template) => {
  try {
    // Get existing analytics data
    const analyticsData = getAnalyticsData();
    
    // Update download count
    analyticsData.totalDownloads = (analyticsData.totalDownloads || 0) + 1;
    
    // Track template downloads
    analyticsData.templateDownloads = analyticsData.templateDownloads || {};
    analyticsData.templateDownloads[template] = (analyticsData.templateDownloads[template] || 0) + 1;
    
    // Save analytics data
    saveAnalyticsData(analyticsData);
  } catch (error) {
    console.error('Failed to track resume download:', error);
  }
};

/**
 * Gets analytics data from localStorage
 * @returns {Object} - The analytics data
 */
const getAnalyticsData = () => {
  const data = localStorage.getItem('resumeAnalytics');
  return data ? JSON.parse(data) : {
    firstUse: new Date().toISOString(),
    totalResumes: 0,
    totalDownloads: 0,
    templateUsage: {},
    templateDownloads: {},
    skillsUsage: {}
  };
};

/**
 * Saves analytics data to localStorage
 * @param {Object} data - The analytics data to save
 */
const saveAnalyticsData = (data) => {
  localStorage.setItem('resumeAnalytics', JSON.stringify(data));
};

/**
 * Gets usage statistics
 * @returns {Object} - Usage statistics
 */
export const getUsageStats = () => {
  const analyticsData = getAnalyticsData();
  
  // Calculate most popular template
  let mostPopularTemplate = null;
  let maxTemplateUsage = 0;
  
  if (analyticsData.templateUsage) {
    Object.entries(analyticsData.templateUsage).forEach(([template, count]) => {
      if (count > maxTemplateUsage) {
        mostPopularTemplate = template;
        maxTemplateUsage = count;
      }
    });
  }
  
  // Calculate most popular skills
  const topSkills = analyticsData.skillsUsage 
    ? Object.entries(analyticsData.skillsUsage)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([skill]) => skill)
    : [];
  
  // Calculate usage duration
  const firstUse = analyticsData.firstUse 
    ? new Date(analyticsData.firstUse) 
    : new Date();
  const usageDays = Math.ceil((new Date() - firstUse) / (1000 * 60 * 60 * 24));
  
  return {
    totalResumes: analyticsData.totalResumes || 0,
    totalDownloads: analyticsData.totalDownloads || 0,
    mostPopularTemplate,
    topSkills,
    usageDays,
    conversionRate: analyticsData.totalResumes 
      ? Math.round((analyticsData.totalDownloads / analyticsData.totalResumes) * 100) 
      : 0
  };
};

/**
 * Resets analytics data
 */
export const resetAnalytics = () => {
  localStorage.removeItem('resumeAnalytics');
};