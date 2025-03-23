import { pdf } from '@react-pdf/renderer';
import { getFontImportLink } from './themes';

/**
 * Utility functions for PDF generation and formatting
 */

/**
 * Format a date string for display in the resume
 * @param {string} dateString - Date in MM/YYYY format
 * @returns {string} Formatted date
 */
export const formatDate = (dateString) => {
  if (!dateString) return '';
  
  // Handle "Present" as a special case
  if (dateString.toLowerCase() === 'present') {
    return 'Present';
  }
  
  // Try to parse the date
  try {
    // Check if it's already in MM/YYYY format
    if (/^\d{1,2}\/\d{4}$/.test(dateString)) {
      const [month, year] = dateString.split('/');
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      
      // Convert month number to name (subtract 1 as array is 0-indexed)
      return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
    }
    
    // Try to parse as a full date
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long'
      });
    }
    
    // If all else fails, return the original string
    return dateString;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Truncate text to a specific length with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

/**
 * Calculate appropriate font size based on text length
 * @param {string} text - Text to analyze
 * @param {number} defaultSize - Default font size
 * @param {number} minSize - Minimum font size
 * @returns {number} Calculated font size
 */
export const calculateFontSize = (text, defaultSize = 12, minSize = 8) => {
  if (!text) return defaultSize;
  
  const length = text.length;
  
  if (length > 100) {
    return Math.max(defaultSize - 4, minSize);
  } else if (length > 50) {
    return Math.max(defaultSize - 2, minSize);
  }
  
  return defaultSize;
};

/**
 * Generates a PDF preview as a data URL
 * @param {Component} TemplateComponent - The React PDF template component
 * @param {Object} formData - The resume data
 * @param {Object} customization - The customization options
 * @returns {Promise<string>} - Promise resolving to a data URL
 */
export const generatePDFPreview = async (TemplateComponent, formData, customization) => {
  try {
    // Create the PDF document
    const document = <TemplateComponent data={formData} customization={customization} />;
    
    // Generate PDF blob
    const blob = await pdf(document).toBlob();
    
    // Convert blob to data URL
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error generating PDF preview:', error);
    throw error;
  }
};

/**
 * Generates a downloadable PDF
 * @param {Component} TemplateComponent - The React PDF template component
 * @param {Object} formData - The resume data
 * @param {Object} customization - The customization options
 * @returns {Promise<Blob>} - Promise resolving to a Blob
 */
export const generatePDF = async (TemplateComponent, formData, customization) => {
  try {
    // Create the PDF document
    const document = <TemplateComponent data={formData} customization={customization} />;
    
    // Generate and return PDF blob
    return await pdf(document).toBlob();
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw error;
  }
};

/**
 * Creates a filename for the resume
 * @param {Object} formData - The resume data
 * @returns {string} - The filename
 */
export const createResumeFilename = (formData) => {
  const name = `${formData.firstName || ''}_${formData.lastName || ''}`.trim();
  const date = new Date().toISOString().split('T')[0];
  
  return name ? `${name}_Resume_${date}.pdf` : `Resume_${date}.pdf`;
};

/**
 * Injects custom CSS into PDF
 * @param {Object} customization - The customization options
 * @returns {Object} - Styles object for PDF
 */
export const createPDFStyles = (customization) => {
  const fontFamily = customization.font || 'Roboto';
  const primaryColor = customization.primaryColor || '#2196f3';
  const secondaryColor = customization.secondaryColor || '#f50057';
  const spacing = customization.spacing || 1.5;
  const margin = customization.margin || 30;
  
  return {
    page: {
      padding: margin,
      fontFamily,
      lineHeight: spacing,
    },
    header: {
      color: primaryColor,
    },
    section: {
      marginBottom: 10,
    },
    sectionTitle: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 5,
      color: primaryColor,
      padding: 5,
      backgroundColor: `${primaryColor}20`, // 20% opacity
    },
    skill: {
      backgroundColor: secondaryColor,
      color: '#ffffff',
      padding: '3 8',
      borderRadius: 4,
      margin: 3,
      fontSize: 10,
    }
  };
};

/**
 * Adds metadata to PDF
 * @param {Object} formData - The resume data
 * @returns {Object} - PDF metadata
 */
export const createPDFMetadata = (formData) => {
  return {
    title: `${formData.firstName || ''} ${formData.lastName || ''} Resume`,
    author: `${formData.firstName || ''} ${formData.lastName || ''}`,
    subject: 'Resume',
    keywords: formData.skills?.join(', ') || '',
    creator: 'Resume Builder',
    producer: 'Resume Builder',
    creationDate: new Date(),
  };
};

/**
 * Truncates text to fit in PDF
 * @param {string} text - The text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} - Truncated text
 */
export const truncateForPDF = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength - 3) + '...';
};

/**
 * Validates resume data before PDF generation
 * @param {Object} formData - The resume data
 * @returns {Object} - Validation result with isValid and errors
 */
export const validateResumeData = (formData) => {
  const errors = [];
  
  // Check required fields
  if (!formData.firstName) errors.push('First name is required');
  if (!formData.lastName) errors.push('Last name is required');
  
  // Check for at least one contact method
  if (!formData.email && !formData.phone) {
    errors.push('At least one contact method (email or phone) is required');
  }
  
  // Validate email format if provided
  if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.push('Email format is invalid');
  }
  
  // Check for content sections
  if (!formData.experience || formData.experience.length === 0) {
    errors.push('At least one experience entry is recommended');
  }
  
  if (!formData.education || formData.education.length === 0) {
    errors.push('At least one education entry is recommended');
  }
  
  if (!formData.skills || formData.skills.length === 0) {
    errors.push('At least one skill is recommended');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Optimizes images for PDF
 * @param {string} imageDataUrl - The image data URL
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} quality - JPEG quality (0-1)
 * @returns {Promise<string>} - Promise resolving to optimized image data URL
 */
export const optimizeImageForPDF = (imageDataUrl, maxWidth = 300, quality = 0.7) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      let width = img.width;
      let height = img.height;
      
      // Scale down if wider than maxWidth
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      
      // Convert to JPEG with specified quality
      resolve(canvas.toDataURL('image/jpeg', quality));
    };
    
    img.onerror = reject;
    img.src = imageDataUrl;
  });
};

/**
 * Splits text into pages for PDF
 * @param {string} text - The text to split
 * @param {number} charsPerPage - Characters per page
 * @returns {Array<string>} - Array of text chunks for each page
 */
export const splitTextIntoPages = (text, charsPerPage = 3000) => {
  if (!text) return [];
  
  const pages = [];
  let remainingText = text;
  
  while (remainingText.length > 0) {
    if (remainingText.length <= charsPerPage) {
      pages.push(remainingText);
      break;
    }
    
    // Find a good break point (end of paragraph or sentence)
    let breakPoint = remainingText.lastIndexOf('\n\n', charsPerPage);
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.5) {
      breakPoint = remainingText.lastIndexOf('. ', charsPerPage);
    }
    if (breakPoint === -1 || breakPoint < charsPerPage * 0.5) {
      breakPoint = remainingText.lastIndexOf(' ', charsPerPage);
    }
    if (breakPoint === -1) {
      breakPoint = charsPerPage;
    }
    
    pages.push(remainingText.substring(0, breakPoint + 1));
    remainingText = remainingText.substring(breakPoint + 1);
  }
  
  return pages;
};

/**
 * Estimates PDF size in pages
 * @param {Object} formData - The resume data
 * @returns {number} - Estimated number of pages
 */
export const estimatePDFPages = (formData) => {
  // Basic estimation based on content length
  let contentLength = 0;
  
  // Count characters in each section
  if (formData.summary) contentLength += formData.summary.length;
  
  if (formData.experience) {
    formData.experience.forEach(exp => {
      contentLength += (exp.position?.length || 0) + 
                      (exp.company?.length || 0) + 
                      (exp.description?.length || 0) + 50; // Extra for formatting
    });
  }
  
  if (formData.education) {
    formData.education.forEach(edu => {
      contentLength += (edu.degree?.length || 0) + 
                      (edu.school?.length || 0) + 
                      (edu.description?.length || 0) + 50; // Extra for formatting
    });
  }
  
  if (formData.skills) {
    contentLength += formData.skills.join(', ').length;
  }
  
  // Estimate pages (rough calculation)
  const charsPerPage = 3000; // Approximate characters per page
  const estimatedPages = Math.max(1, Math.ceil(contentLength / charsPerPage));
  
  return estimatedPages;
};

/**
 * Applies watermark to PDF
 * @param {Blob} pdfBlob - The PDF blob
 * @param {string} watermarkText - Watermark text
 * @returns {Promise<Blob>} - Promise resolving to watermarked PDF blob
 */
export const applyWatermark = async (pdfBlob, watermarkText) => {
  // This is a placeholder - in a real implementation, you would use
  // a PDF manipulation library like pdf-lib to add a watermark
  console.log('Watermark would be applied with text:', watermarkText);
  return pdfBlob;
};

/**
 * Converts resume data to ATS-friendly plain text
 * @param {Object} formData - The resume data
 * @returns {string} - Plain text version of the resume
 */
export const convertToPlainText = (formData) => {
  let plainText = '';
  
  // Name and contact info
  plainText += `${formData.firstName || ''} ${formData.lastName || ''}\n`;
  if (formData.email) plainText += `Email: ${formData.email}\n`;
  if (formData.phone) plainText += `Phone: ${formData.phone}\n`;
  if (formData.location) plainText += `Location: ${formData.location}\n`;
  if (formData.website) plainText += `Website: ${formData.website}\n`;
  plainText += '\n';
  
  // Summary
  if (formData.summary) {
    plainText += 'SUMMARY\n';
    plainText += '=======\n';
    plainText += `${formData.summary}\n\n`;
  }
  
  // Experience
  if (formData.experience && formData.experience.length > 0) {
    plainText += 'EXPERIENCE\n';
    plainText += '==========\n';
    formData.experience.forEach(exp => {
      plainText += `${exp.position || 'Position'}`;
      if (exp.company) plainText += `, ${exp.company}`;
      plainText += '\n';
      
      if (exp.startDate || exp.endDate) {
        plainText += `${formatDate(exp.startDate) || ''} - ${exp.endDate ? formatDate(exp.endDate) : 'Present'}\n`;
      }
      
      if (exp.description) plainText += `${exp.description}\n`;
      plainText += '\n';
    });
  }
  
  // Education
  if (formData.education && formData.education.length > 0) {
    plainText += 'EDUCATION\n';
    plainText += '=========\n';
    formData.education.forEach(edu => {
      plainText += `${edu.degree || 'Degree'}`;
      if (edu.school) plainText += `, ${edu.school}`;
      plainText += '\n';
      
      if (edu.graduationDate) {
        plainText += `${formatDate(edu.graduationDate)}\n`;
      }
      
      if (edu.description) plainText += `${edu.description}\n`;
      plainText += '\n';
    });
  }
  
  // Skills
  if (formData.skills && formData.skills.length > 0) {
    plainText += 'SKILLS\n';
    plainText += '======\n';
    plainText += formData.skills.join(', ') + '\n';
  }
  
  return plainText;
};