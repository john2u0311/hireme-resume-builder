/**
 * Saves a resume to localStorage
 * @param {string} name - The name of the resume
 * @param {Object} formData - The resume form data
 * @param {Object} customization - The customization options
 * @returns {Object} - The saved resume object
 */
export const saveResume = (name, formData, customization) => {
  if (!name) {
    throw new Error('Resume name is required');
  }
  
  // Get existing saved resumes
  const savedResumes = getSavedResumes();
  
  // Create new resume object
  const newResume = {
    name,
    data: formData,
    customization,
    date: new Date().toISOString()
  };
  
  // Add or update resume
  const updatedResumes = [
    ...savedResumes.filter(r => r.name !== name),
    newResume
  ];
  
  // Save to localStorage
  localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
  
  return newResume;
};

/**
 * Gets all saved resumes from localStorage
 * @returns {Array} - Array of saved resume objects
 */
export const getSavedResumes = () => {
  const savedData = localStorage.getItem('savedResumes');
  return savedData ? JSON.parse(savedData) : [];
};

/**
 * Loads a resume by name
 * @param {string} name - The name of the resume to load
 * @returns {Object|null} - The resume object or null if not found
 */
export const loadResume = (name) => {
  const savedResumes = getSavedResumes();
  return savedResumes.find(r => r.name === name) || null;
};

/**
 * Deletes a resume by name
 * @param {string} name - The name of the resume to delete
 * @returns {boolean} - Whether the deletion was successful
 */
export const deleteResume = (name) => {
  const savedResumes = getSavedResumes();
  const updatedResumes = savedResumes.filter(r => r.name !== name);
  
  if (updatedResumes.length === savedResumes.length) {
    return false; // Resume not found
  }
  
  localStorage.setItem('savedResumes', JSON.stringify(updatedResumes));
  return true;
};

/**
 * Exports all saved resumes as a JSON file
 * @returns {Blob} - A Blob containing the JSON data
 */
export const exportAllResumes = () => {
  const savedResumes = getSavedResumes();
  const dataStr = JSON.stringify(savedResumes, null, 2);
  return new Blob([dataStr], { type: 'application/json' });
};

/**
 * Imports resumes from a JSON file
 * @param {File} file - The JSON file to import
 * @returns {Promise<Array>} - A promise that resolves to the imported resumes
 */
export const importResumes = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (!Array.isArray(importedData)) {
          throw new Error('Invalid resume data format');
        }
        
        // Validate each resume
        importedData.forEach(resume => {
          if (!resume.name || !resume.data || !resume.customization) {
            throw new Error('Invalid resume data structure');
          }
        });
        
        // Get existing resumes
        const existingResumes = getSavedResumes();
        
        // Merge resumes, overwriting existing ones with the same name
        const mergedResumes = [
          ...existingResumes.filter(existing => 
            !importedData.some(imported => imported.name === existing.name)
          ),
          ...importedData
        ];
        
        // Save to localStorage
        localStorage.setItem('savedResumes', JSON.stringify(mergedResumes));
        
        resolve(importedData);
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
};

/**
 * Gets the total storage usage for saved resumes
 * @returns {number} - The total storage usage in bytes
 */
export const getStorageUsage = () => {
  const savedResumes = localStorage.getItem('savedResumes');
  return savedResumes ? new Blob([savedResumes]).size : 0;
};

/**
 * Gets the maximum storage capacity for localStorage
 * @returns {number} - The maximum storage capacity in bytes
 */
export const getStorageCapacity = () => {
  // Typical localStorage limit is 5MB
  return 5 * 1024 * 1024;
};

/**
 * Checks if there's enough storage space for a new resume
 * @param {Object} resumeData - The resume data to check
 * @returns {boolean} - Whether there's enough space
 */
export const hasEnoughStorage = (resumeData) => {
  const currentUsage = getStorageUsage();
  const capacity = getStorageCapacity();
  const newDataSize = new Blob([JSON.stringify(resumeData)]).size;
  
  return currentUsage + newDataSize <= capacity;
};

/**
 * Creates a backup of all saved resumes
 * @returns {string} - A data URL containing the backup
 */
export const createBackup = () => {
  const savedResumes = getSavedResumes();
  const dataStr = JSON.stringify(savedResumes);
  const base64 = btoa(dataStr);
  return `data:application/json;base64,${base64}`;
};

/**
 * Restores resumes from a backup data URL
 * @param {string} backupUrl - The backup data URL
 * @returns {Promise<Array>} - A promise that resolves to the restored resumes
 */
export const restoreFromBackup = (backupUrl) => {
  return new Promise((resolve, reject) => {
    try {
      // Extract base64 data from URL
      const base64Data = backupUrl.split(',')[1];
      if (!base64Data) {
        throw new Error('Invalid backup URL format');
      }
      
      // Decode base64 to string
      const jsonStr = atob(base64Data);
      
      // Parse JSON
      const resumes = JSON.parse(jsonStr);
      
      // Validate resumes
      if (!Array.isArray(resumes)) {
        throw new Error('Invalid backup data format');
      }
      
      // Save to localStorage
      localStorage.setItem('savedResumes', JSON.stringify(resumes));
      
      resolve(resumes);
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Duplicates a resume with a new name
 * @param {string} originalName - The name of the resume to duplicate
 * @param {string} newName - The name for the duplicate
 * @returns {Object|null} - The duplicated resume or null if original not found
 */
export const duplicateResume = (originalName, newName) => {
  const original = loadResume(originalName);
  if (!original) return null;
  
  return saveResume(newName, original.data, original.customization);
};

/**
 * Searches saved resumes by keyword
 * @param {string} keyword - The keyword to search for
 * @returns {Array} - Array of matching resume objects
 */
export const searchResumes = (keyword) => {
  if (!keyword) return getSavedResumes();
  
  const savedResumes = getSavedResumes();
  const lowerKeyword = keyword.toLowerCase();
  
  return savedResumes.filter(resume => {
    // Search in resume name
    if (resume.name.toLowerCase().includes(lowerKeyword)) return true;
    
    // Search in personal info
    const personalInfo = resume.data;
    if (personalInfo.firstName?.toLowerCase().includes(lowerKeyword)) return true;
    if (personalInfo.lastName?.toLowerCase().includes(lowerKeyword)) return true;
    if (personalInfo.email?.toLowerCase().includes(lowerKeyword)) return true;
    if (personalInfo.summary?.toLowerCase().includes(lowerKeyword)) return true;
    
    // Search in experience
    if (personalInfo.experience?.some(exp => 
      exp.company?.toLowerCase().includes(lowerKeyword) ||
      exp.position?.toLowerCase().includes(lowerKeyword) ||
      exp.description?.toLowerCase().includes(lowerKeyword)
    )) return true;
    
    // Search in education
    if (personalInfo.education?.some(edu => 
      edu.school?.toLowerCase().includes(lowerKeyword) ||
      edu.degree?.toLowerCase().includes(lowerKeyword) ||
      edu.description?.toLowerCase().includes(lowerKeyword)
    )) return true;
    
    // Search in skills
    if (personalInfo.skills?.some(skill => 
      skill.toLowerCase().includes(lowerKeyword)
    )) return true;
    
    return false;
  });