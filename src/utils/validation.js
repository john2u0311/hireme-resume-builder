/**
 * Validates an email address
 * @param {string} email - The email to validate
 * @returns {boolean} - Whether the email is valid
 */
export const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
 * Validates a phone number
 * @param {string} phone - The phone number to validate
 * @returns {boolean} - Whether the phone number is valid
 */
export const isValidPhone = (phone) => {
  const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  return re.test(String(phone));
};

/**
 * Validates a date string in MM/YYYY format
 * @param {string} date - The date to validate
 * @returns {boolean} - Whether the date is valid
 */
export const isValidDate = (date) => {
  const re = /^(0[1-9]|1[0-2])\/[0-9]{4}$/;
  return re.test(String(date));
};

/**
 * Validates a URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Validates that a string has a minimum length
 * @param {string} str - The string to validate
 * @param {number} minLength - The minimum length required
 * @returns {boolean} - Whether the string meets the minimum length
 */
export const hasMinLength = (str, minLength) => {
  return str.length >= minLength;
};

/**
 * Validates that a string doesn't exceed a maximum length
 * @param {string} str - The string to validate
 * @param {number} maxLength - The maximum length allowed
 * @returns {boolean} - Whether the string is within the maximum length
 */
export const hasMaxLength = (str, maxLength) => {
  return str.length <= maxLength;
};

/**
 * Validates that a value is not empty
 * @param {*} value - The value to check
 * @returns {boolean} - Whether the value is not empty
 */
export const isNotEmpty = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim() !== '';
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return true;
};

/**
 * Validates a resume form data object
 * @param {Object} formData - The form data to validate
 * @returns {Object} - Object with isValid boolean and errors object
 */
export const validateResumeData = (formData) => {
  const errors = {};
  
  // Validate personal info
  if (!isNotEmpty(formData.firstName)) {
    errors.firstName = 'First name is required';
  }
  
  if (!isNotEmpty(formData.lastName)) {
    errors.lastName = 'Last name is required';
  }
  
  if (!isNotEmpty(formData.email)) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Email is invalid';
  }
  
  if (!isNotEmpty(formData.phone)) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(formData.phone)) {
    errors.phone = 'Phone number is invalid';
  }
  
  // Validate experience entries
  if (formData.experience && formData.experience.length > 0) {
    const experienceErrors = formData.experience.map(exp => {
      const expErrors = {};
      
      if (!isNotEmpty(exp.company)) {
        expErrors.company = 'Company name is required';
      }
      
      if (!isNotEmpty(exp.position)) {
        expErrors.position = 'Position is required';
      }
      
      if (!isNotEmpty(exp.startDate)) {
        expErrors.startDate = 'Start date is required';
      } else if (!isValidDate(exp.startDate)) {
        expErrors.startDate = 'Start date must be in MM/YYYY format';
      }
      
      return Object.keys(expErrors).length > 0 ? expErrors : null;
    }).filter(Boolean);
    
    if (experienceErrors.length > 0) {
      errors.experience = experienceErrors;
    }
  }
  
  // Validate education entries
  if (formData.education && formData.education.length > 0) {
    const educationErrors = formData.education.map(edu => {
      const eduErrors = {};
      
      if (!isNotEmpty(edu.school)) {
        eduErrors.school = 'School name is required';
      }
      
      if (!isNotEmpty(edu.degree)) {
        eduErrors.degree = 'Degree is required';
      }
      
      if (!isNotEmpty(edu.graduationDate)) {
        eduErrors.graduationDate = 'Graduation date is required';
      } else if (!isValidDate(edu.graduationDate)) {
        eduErrors.graduationDate = 'Graduation date must be in MM/YYYY format';
      }
      
      return Object.keys(eduErrors).length > 0 ? eduErrors : null;
    }).filter(Boolean);
    
    if (educationErrors.length > 0) {
      errors.education = educationErrors;
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};