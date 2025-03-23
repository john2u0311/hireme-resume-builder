import { createTheme } from '@mui/material/styles';

/**
 * Creates a custom theme based on primary and secondary colors
 * @param {Object} customization - The customization options
 * @returns {Object} - The created theme
 */
export const createCustomTheme = (customization) => {
  return createTheme({
    palette: {
      primary: { main: customization.primaryColor },
      secondary: { main: customization.secondaryColor }
    },
    typography: {
      fontFamily: customization.font || '"Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 500,
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px',
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          }
        }
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            }
          }
        }
      }
    }
  });
};

/**
 * Predefined themes for the application
 */
/**
 * Predefined themes for resume customization
 */
export const predefinedThemes = [
  {
    name: 'Classic Blue',
    primaryColor: '#1976d2',
    secondaryColor: '#2196f3',
    font: 'Roboto',
    spacing: 1.5,
    margin: 30
  },
  {
    name: 'Professional Gray',
    primaryColor: '#424242',
    secondaryColor: '#757575',
    font: 'Open Sans',
    spacing: 1.4,
    margin: 25
  },
  {
    name: 'Modern Teal',
    primaryColor: '#00796b',
    secondaryColor: '#26a69a',
    font: 'Montserrat',
    spacing: 1.6,
    margin: 30
  },
  {
    name: 'Bold Red',
    primaryColor: '#c62828',
    secondaryColor: '#ef5350',
    font: 'Raleway',
    spacing: 1.5,
    margin: 35
  },
  {
    name: 'Elegant Purple',
    primaryColor: '#6a1b9a',
    secondaryColor: '#9c27b0',
    font: 'Playfair Display',
    spacing: 1.7,
    margin: 30
  },
  {
    name: 'Corporate Navy',
    primaryColor: '#1a237e',
    secondaryColor: '#3949ab',
    font: 'Lato',
    spacing: 1.5,
    margin: 25
  },
  {
    name: 'Creative Orange',
    primaryColor: '#e65100',
    secondaryColor: '#ff9800',
    font: 'Montserrat',
    spacing: 1.6,
    margin: 30
  },
  {
    name: 'Minimalist Black',
    primaryColor: '#212121',
    secondaryColor: '#616161',
    font: 'Open Sans',
    spacing: 1.4,
    margin: 20
  }
];

/**
 * Gets a theme by name
 * @param {string} name - The theme name
 * @returns {Object|null} - The theme object or null if not found
 */
export const getThemeByName = (name) => {
  return predefinedThemes.find(theme => theme.name === name) || null;
};

// There's a duplicate createCustomTheme function - I'll fix that and continue with additional theme utilities

/**
 * Creates a custom theme
 * @param {Object} options - Theme options
 * @returns {Object} - The custom theme object for resume styling
 */
export const createResumeTheme = (options) => {
  return {
    name: 'Custom Theme',
    primaryColor: options.primaryColor || '#2196f3',
    secondaryColor: options.secondaryColor || '#f50057',
    font: options.font || 'Roboto',
    spacing: options.spacing || 1.5,
    margin: options.margin || 30
  };
};

/**
 * Gets font CSS for a given font name
 * @param {string} fontName - The font name
 * @returns {string} - The font CSS
 */
export const getFontCSS = (fontName) => {
  const fonts = {
    'Roboto': "'Roboto', sans-serif",
    'Open Sans': "'Open Sans', sans-serif",
    'Lato': "'Lato', sans-serif",
    'Montserrat': "'Montserrat', sans-serif",
    'Raleway': "'Raleway', sans-serif",
    'Playfair Display': "'Playfair Display', serif"
  };
  
  return fonts[fontName] || fonts['Roboto'];
};

/**
 * Gets font import link for a given font name
 * @param {string} fontName - The font name
 * @returns {string} - The font import link
 */
export const getFontImportLink = (fontName) => {
  const fontLinks = {
    'Roboto': "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
    'Open Sans': "https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap",
    'Lato': "https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap",
    'Montserrat': "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap",
    'Raleway': "https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap",
    'Playfair Display': "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap"
  };
  
  return fontLinks[fontName] || fontLinks['Roboto'];
};

/**
 * Generates CSS variables for a theme
 * @param {Object} theme - The theme object
 * @returns {string} - CSS variables as a string
 */
export const generateThemeCSS = (theme) => {
  return `
    :root {
      --primary-color: ${theme.primaryColor};
      --secondary-color: ${theme.secondaryColor};
      --font-family: ${getFontCSS(theme.font)};
      --line-spacing: ${theme.spacing};
      --margin: ${theme.margin}px;
    }
  `;
};

/**
 * Gets a contrasting text color (black or white) based on background color
 * @param {string} backgroundColor - The background color in hex format
 * @returns {string} - Either '#ffffff' or '#000000'
 */
export const getContrastColor = (backgroundColor) => {
  // Remove the hash if it exists
  const hex = backgroundColor.replace('#', '');
  
  // Convert hex to RGB
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for bright colors, white for dark colors
  return luminance > 0.5 ? '#000000' : '#ffffff';
};

/**
 * Generates a lighter or darker version of a color
 * @param {string} color - The color in hex format
 * @param {number} percent - Percentage to lighten (positive) or darken (negative)
 * @returns {string} - The adjusted color
 */
export const adjustColor = (color, percent) => {
  let hex = color.replace('#', '');
  
  // Convert to RGB
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  
  // Adjust color
  r = Math.min(255, Math.max(0, Math.round(r + (r * percent / 100))));
  g = Math.min(255, Math.max(0, Math.round(g + (g * percent / 100))));
  b = Math.min(255, Math.max(0, Math.round(b + (b * percent / 100))));
  
  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

/**
 * Generates a complementary color
 * @param {string} color - The color in hex format
 * @returns {string} - The complementary color
 */
export const getComplementaryColor = (color) => {
  let hex = color.replace('#', '');
  
  // Convert to RGB
  let r = parseInt(hex.substr(0, 2), 16);
  let g = parseInt(hex.substr(2, 2), 16);
  let b = parseInt(hex.substr(4, 2), 16);
  
  // Invert colors
  r = 255 - r;
  g = 255 - g;
  b = 255 - b;
  
  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');
  
  return `#${rHex}${gHex}${bHex}`;
};

/**
 * Generates a color palette based on a primary color
 * @param {string} primaryColor - The primary color in hex format
 * @returns {Object} - Object containing various colors for a cohesive palette
 */
export const generateColorPalette = (primaryColor) => {
  return {
    primary: primaryColor,
    primaryLight: adjustColor(primaryColor, 30),
    primaryDark: adjustColor(primaryColor, -30),
    complementary: getComplementaryColor(primaryColor),
    textOnPrimary: getContrastColor(primaryColor),
    accent: adjustColor(getComplementaryColor(primaryColor), 10)
  };
};

/**
 * Exports theme as a CSS file
 * @param {Object} theme - The theme object
 * @returns {Blob} - A Blob containing the CSS
 */
export const exportThemeAsCSS = (theme) => {
  const css = generateThemeCSS(theme);
  return new Blob([css], { type: 'text/css' });
};

/**
 * Combines two themes
 * @param {Object} theme1 - First theme
 * @param {Object} theme2 - Second theme
 * @param {number} ratio - Mixing ratio (0-1), where 0 is all theme1 and 1 is all theme2
 * @returns {Object} - Combined theme
 */
export const combineThemes = (theme1, theme2, ratio = 0.5) => {
  // Helper function to interpolate colors
  const interpolateColor = (color1, color2, ratio) => {
    const hex1 = color1.replace('#', '');
    const hex2 = color2.replace('#', '');
    
    // Convert to RGB
    const r1 = parseInt(hex1.substr(0, 2), 16);
    const g1 = parseInt(hex1.substr(2, 2), 16);
    const b1 = parseInt(hex1.substr(4, 2), 16);
    
    const r2 = parseInt(hex2.substr(0, 2), 16);
    const g2 = parseInt(hex2.substr(2, 2), 16);
    const b2 = parseInt(hex2.substr(4, 2), 16);
    
    // Interpolate
    const r = Math.round(r1 * (1 - ratio) + r2 * ratio);
    const g = Math.round(g1 * (1 - ratio) + g2 * ratio);
    const b = Math.round(b1 * (1 - ratio) + b2 * ratio);
    
    // Convert back to hex
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    
    return `#${rHex}${gHex}${bHex}`;
  };
  
  return {
    name: `Combined Theme`,
    primaryColor: interpolateColor(theme1.primaryColor, theme2.primaryColor, ratio),
    secondaryColor: interpolateColor(theme1.secondaryColor, theme2.secondaryColor, ratio),
    font: ratio < 0.5 ? theme1.font : theme2.font,
    spacing: theme1.spacing * (1 - ratio) + theme2.spacing * ratio,
    margin: Math.round(theme1.margin * (1 - ratio) + theme2.margin * ratio)
  };
};