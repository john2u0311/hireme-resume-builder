import React, { useState, useEffect } from 'react';
import {
  Container, Paper, Stepper, Step, StepLabel, Button, Typography, 
  Box, Grid, Card, CardContent, CardMedia, Select, MenuItem,
  FormControl, InputLabel, ThemeProvider, createTheme, Snackbar, Alert,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField, Divider
} from '@mui/material';
import PersonalInfo from '../components/resume/PersonalInfo';
import Experience from '../components/resume/Experience';
import Education from '../components/resume/Education';
import Skills from '../components/resume/Skills';
import TemplateSelection from '../components/resume/TemplateSelection';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ModernTemplate from '../components/resume/templates/ModernTemplate';
import CreativeTemplate from '../components/resume/templates/CreativeTemplate';
import ProfessionalTemplate from '../components/resume/templates/ProfessionalTemplate';
import { templateImages } from '../components/resume/templates/templateImages';
import SaveIcon from '@mui/icons-material/Save';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewIcon from '@mui/icons-material/Preview';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const templates = [
  { 
    id: 1, 
    name: 'Professional', 
    image: templateImages.professional, 
    component: ProfessionalTemplate,
    defaultColors: { primary: '#2196f3', secondary: '#f50057' }
  },
  { 
    id: 2, 
    name: 'Modern', 
    image: templateImages.modern, 
    component: ModernTemplate,
    defaultColors: { primary: '#333333', secondary: '#f50057' }
  },
  { 
    id: 3, 
    name: 'Creative', 
    image: templateImages.creative, 
    component: CreativeTemplate,
    defaultColors: { primary: '#9c27b0', secondary: '#ff4081' }
  }
];

const steps = ['Template', 'Personal Info', 'Experience', 'Education', 'Skills'];

// Add these imports for improved UI
// Fix the import order - move these imports to the top with other imports
import Tooltip from '@mui/material/Tooltip';
import Zoom from '@mui/material/Zoom';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import Fab from '@mui/material/Fab';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import WarningIcon from '@mui/icons-material/Warning';

function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);
  const [formData, setFormData] = useState({
    template: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    summary: '',
    experience: [],
    education: [],
    skills: []
  });
  const [customization, setCustomization] = useState({
    primaryColor: '#2196f3',
    secondaryColor: '#f50057',
    font: 'Helvetica'
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [saveDialog, setSaveDialog] = useState(false);
  const [resumeName, setResumeName] = useState('');
  const [savedResumes, setSavedResumes] = useState([]);
  const [loadDialog, setLoadDialog] = useState(false);
  const [helpDialog, setHelpDialog] = useState(false);

  // Load saved resumes from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('savedResumes');
    if (savedData) {
      setSavedResumes(JSON.parse(savedData));
    }
  }, []);

  const theme = createTheme({
    palette: {
      primary: { main: customization.primaryColor },
      secondary: { main: customization.secondaryColor }
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
            textTransform: 'none',
            fontWeight: 600
          }
        }
      }
    }
  });

  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const Template = templates.find(t => t.id === formData.template)?.component;
      if (!Template) {
        throw new Error('Template not found');
      }
      
      const blob = await pdf(
        <Template data={formData} customization={customization} />
      ).toBlob();
      
      const fileName = resumeName || `${formData.firstName || 'My'}_${formData.lastName || 'Resume'}.pdf`;
      saveAs(blob, fileName);
      
      setSnackbar({
        open: true,
        message: 'Resume downloaded successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to generate PDF. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  // Fix the syntax error in handleNext
  const handleNext = () => {
    try {
      if (!validateStep()) {
        setSnackbar({
          open: true,
          message: 'Please complete all required fields',
          severity: 'error'
        });
        throw new Error('Please complete all required fields');
      }
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return formData.template > 0;
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.experience.length > 0;
      case 3:
        return formData.education.length > 0;
      case 4:
        return formData.skills.length > 0;
      default:
        return false;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <TemplateSelection formData={formData} setFormData={setFormData} templates={templates} />;
      case 1:
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Experience formData={formData} setFormData={setFormData} />;
      case 3:
        return <Education formData={formData} setFormData={setFormData} />;
      case 4:
        return <Skills formData={formData} setFormData={setFormData} />;
      default:
        return 'Unknown step';
    }
  };

  // Add these new functions for saving and loading resumes
  const handleSaveResume = () => {
    setSaveDialog(true);
  };

  const saveResume = () => {
    if (!resumeName) {
      setSnackbar({
        open: true,
        message: 'Please enter a name for your resume',
        severity: 'error'
      });
      return;
    }

    const newSavedResumes = [
      ...savedResumes.filter(r => r.name !== resumeName),
      {
        name: resumeName,
        data: formData,
        customization,
        date: new Date().toISOString()
      }
    ];

    setSavedResumes(newSavedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(newSavedResumes));
    
    setSaveDialog(false);
    setSnackbar({
      open: true,
      message: 'Resume saved successfully!',
      severity: 'success'
    });
  };

  const handleLoadResume = () => {
    setLoadDialog(true);
  };

  const loadResume = (resume) => {
    setFormData(resume.data);
    setCustomization(resume.customization);
    setLoadDialog(false);
    setSnackbar({
      open: true,
      message: 'Resume loaded successfully!',
      severity: 'success'
    });
  };

  const deleteResume = (name) => {
    const newSavedResumes = savedResumes.filter(r => r.name !== name);
    setSavedResumes(newSavedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(newSavedResumes));
    
    setSnackbar({
      open: true,
      message: 'Resume deleted successfully!',
      severity: 'success'
    });
  };

  const showHelp = () => {
    setHelpDialog(true);
  };

  // Add these new state variables for additional features
  const [loading, setLoading] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [autoSave, setAutoSave] = useState(false);
  const [lastAutoSave, setLastAutoSave] = useState(null);
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportDialog, setExportDialog] = useState(false);
  
  // Add scroll to top functionality
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Add auto-save functionality
  useEffect(() => {
    if (!autoSave) return;
    
    const autoSaveTimer = setTimeout(() => {
      if (resumeName) {
        const newSavedResumes = [
          ...savedResumes.filter(r => r.name !== resumeName),
          {
            name: resumeName,
            data: formData,
            customization,
            date: new Date().toISOString()
          }
        ];
        
        setSavedResumes(newSavedResumes);
        localStorage.setItem('savedResumes', JSON.stringify(newSavedResumes));
        setLastAutoSave(new Date());
        
        setSnackbar({
          open: true,
          message: 'Auto-saved successfully!',
          severity: 'info'
        });
      }
    }, 60000); // Auto-save every minute
    
    return () => clearTimeout(autoSaveTimer);
  }, [autoSave, formData, customization, resumeName, savedResumes]);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  // Improve the handleDownloadPDF function with loading state and export options
  const handleDownloadPDF = async () => {
    try {
      setLoading(true);
      const Template = templates.find(t => t.id === formData.template)?.component;
      if (!Template) {
        throw new Error('Template not found');
      }
      
      const blob = await pdf(
        <Template data={formData} customization={customization} />
      ).toBlob();
      
      const fileName = resumeName || `${formData.firstName || 'My'}_${formData.lastName || 'Resume'}.pdf`;
      saveAs(blob, fileName);
      
      setSnackbar({
        open: true,
        message: 'Resume downloaded successfully!',
        severity: 'success'
      });
    } catch (error) {
      console.error('PDF generation failed:', error);
      setSnackbar({
        open: true,
        message: 'Failed to generate PDF. Please try again.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Add export options dialog
  const handleExport = () => {
    setExportDialog(true);
  };
  
  const exportResume = () => {
    setExportDialog(false);
    if (exportFormat === 'pdf') {
      handleDownloadPDF();
    } else if (exportFormat === 'json') {
      // Export as JSON
      const dataStr = JSON.stringify({
        formData,
        customization
      });
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const fileName = resumeName || `${formData.firstName || 'My'}_${formData.lastName || 'Resume'}.json`;
      saveAs(dataBlob, fileName);
      
      setSnackbar({
        open: true,
        message: 'Resume exported as JSON successfully!',
        severity: 'success'
      });
    }
  };
  
  // Add function to import JSON resume
  const handleImportJSON = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        if (importedData.formData && importedData.customization) {
          setFormData(importedData.formData);
          setCustomization(importedData.customization);
          
          setSnackbar({
            open: true,
            message: 'Resume imported successfully!',
            severity: 'success'
          });
        } else {
          throw new Error('Invalid resume format');
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: 'Failed to import resume. Invalid format.',
          severity: 'error'
        });
      }
    };
    reader.readAsText(file);
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  // Fix the syntax error in handleNext
  const handleNext = () => {
    try {
      if (!validateStep()) {
        setSnackbar({
          open: true,
          message: 'Please complete all required fields',
          severity: 'error'
        });
        throw new Error('Please complete all required fields');
      }
      setActiveStep((prevStep) => prevStep + 1);
    } catch (error) {
      console.error(error);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        return formData.template > 0;
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.experience.length > 0;
      case 3:
        return formData.education.length > 0;
      case 4:
        return formData.skills.length > 0;
      default:
        return false;
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <TemplateSelection formData={formData} setFormData={setFormData} templates={templates} />;
      case 1:
        return <PersonalInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Experience formData={formData} setFormData={setFormData} />;
      case 3:
        return <Education formData={formData} setFormData={setFormData} />;
      case 4:
        return <Skills formData={formData} setFormData={setFormData} />;
      default:
        return 'Unknown step';
    }
  };

  // Add these new functions for saving and loading resumes
  const handleSaveResume = () => {
    setSaveDialog(true);
  };

  const saveResume = () => {
    if (!resumeName) {
      setSnackbar({
        open: true,
        message: 'Please enter a name for your resume',
        severity: 'error'
      });
      return;
    }

    const newSavedResumes = [
      ...savedResumes.filter(r => r.name !== resumeName),
      {
        name: resumeName,
        data: formData,
        customization,
        date: new Date().toISOString()
      }
    ];

    setSavedResumes(newSavedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(newSavedResumes));
    
    setSaveDialog(false);
    setSnackbar({
      open: true,
      message: 'Resume saved successfully!',
      severity: 'success'
    });
  };

  const handleLoadResume = () => {
    setLoadDialog(true);
  };

  const loadResume = (resume) => {
    setFormData(resume.data);
    setCustomization(resume.customization);
    setLoadDialog(false);
    setSnackbar({
      open: true,
      message: 'Resume loaded successfully!',
      severity: 'success'
    });
  };

  const deleteResume = (name) => {
    const newSavedResumes = savedResumes.filter(r => r.name !== name);
    setSavedResumes(newSavedResumes);
    localStorage.setItem('savedResumes', JSON.stringify(newSavedResumes));
    
    setSnackbar({
      open: true,
      message: 'Resume deleted successfully!',
      severity: 'success'
    });
  };

  const showHelp = () => {
    setHelpDialog(true);
  };

  // Update the return statement to include new features
  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 4, borderRadius: 2, boxShadow: '0 0 20px rgba(0,0,0,0.05)' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">
              Create Your Resume
              {lastAutoSave && autoSave && (
                <Tooltip title={`Last auto-saved: ${lastAutoSave.toLocaleTimeString()}`}>
                  <CheckCircleIcon color="success" sx={{ ml: 1, fontSize: 20, verticalAlign: 'middle' }} />
                </Tooltip>
              )}
            </Typography>
            <Box>
              <Tooltip title="Toggle auto-save">
                <Button 
                  variant={autoSave ? "contained" : "outlined"}
                  color={autoSave ? "success" : "primary"}
                  onClick={() => setAutoSave(!autoSave)}
                  sx={{ mr: 1 }}
                >
                  Auto-Save: {autoSave ? 'ON' : 'OFF'}
                </Button>
              </Tooltip>
              <Button 
                variant="outlined" 
                startIcon={<HelpOutlineIcon />} 
                onClick={showHelp}
                sx={{ mr: 1 }}
              >
                Help
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<CloudUploadIcon />} 
                onClick={handleLoadResume}
                sx={{ mr: 1 }}
              >
                Load
              </Button>
              <Button 
                variant="outlined" 
                startIcon={<SaveIcon />} 
                onClick={handleSaveResume}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              {activeStep === steps.length - 1 && (
                <>
                  <Button 
                    variant="outlined" 
                    startIcon={<PreviewIcon />}
                    onClick={handlePreview} 
                    sx={{ mr: 1 }}
                  >
                    {showPreview ? 'Edit' : 'Preview'}
                  </Button>
                  {showPreview && (
                    <Button 
                      variant="contained" 
                      startIcon={<DownloadIcon />}
                      onClick={handleExport}
                    >
                      Export
                    </Button>
                  )}
                </>
              )}
            </Box>
          </Box>

          {showPreview ? (
            <Box>
              <Box sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
                <Typography variant="h6" gutterBottom>Customize Template</Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <FormControl fullWidth>
                      <InputLabel>Font</InputLabel>
                      <Select
                        value={customization.font}
                        onChange={(e) => setCustomization({...customization, font: e.target.value})}
                      >
                        <MenuItem value="Helvetica">Helvetica</MenuItem>
                        <MenuItem value="Times-Roman">Times Roman</MenuItem>
                        <MenuItem value="Courier">Courier</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography gutterBottom>Primary Color</Typography>
                    <input
                      type="color"
                      value={customization.primaryColor}
                      onChange={(e) => setCustomization({
                        ...customization,
                        primaryColor: e.target.value
                      })}
                      style={{ width: '100%', height: 40 }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography gutterBottom>Secondary Color</Typography>
                    <input
                      type="color"
                      value={customization.secondaryColor}
                      onChange={(e) => setCustomization({
                        ...customization,
                        secondaryColor: e.target.value
                      })}
                      style={{ width: '100%', height: 40 }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <Box sx={{ height: '80vh' }}>
                <PDFViewer style={{ width: '100%', height: '100%' }}>
                  {templates.find(t => t.id === formData.template)?.component({ 
                    data: formData,
                    customization 
                  })}
                </PDFViewer>
              </Box>
            </Box>
          ) : (
            <>
              <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              <Box sx={{ mt: 2 }}>
                {getStepContent(activeStep)}
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  startIcon={<ArrowBackIcon />}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  endIcon={activeStep === steps.length - 1 ? <PreviewIcon /> : <ArrowForwardIcon />}
                  disabled={!validateStep()}
                >
                  {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
                </Button>
              </Box>
            </>
          )}
        </Paper>

        {/* Dialogs and Snackbar */}
        <Dialog open={saveDialog} onClose={() => setSaveDialog(false)}>
          <DialogTitle>Save Resume</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Resume Name"
              fullWidth
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setSaveDialog(false)}>Cancel</Button>
            <Button onClick={saveResume} variant="contained">Save</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={loadDialog} onClose={() => setLoadDialog(false)} maxWidth="md" fullWidth>
          <DialogTitle>Load Resume</DialogTitle>
          <DialogContent>
            {savedResumes.length === 0 ? (
              <Typography>No saved resumes found.</Typography>
            ) : (
              <Grid container spacing={2} sx={{ mt: 1 }}>
                {savedResumes.map((resume, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">{resume.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {new Date(resume.date).toLocaleDateString()}
                        </Typography>
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                          <Button size="small" onClick={() => loadResume(resume)}>Load</Button>
                          <Button size="small" color="error" onClick={() => deleteResume(resume.name)}>Delete</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setLoadDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={helpDialog} onClose={() => setHelpDialog(false)}>
          <DialogTitle>Resume Builder Help</DialogTitle>
          <DialogContent>
            <Typography variant="h6" gutterBottom>How to use this app:</Typography>
            <Typography paragraph>
              1. <strong>Choose a template</strong> - Select a template that best fits your professional style.
            </Typography>
            <Typography paragraph>
              2. <strong>Fill in your details</strong> - Complete all sections with your personal information, work experience, education, and skills.
            </Typography>
            <Typography paragraph>
              3. <strong>Preview and customize</strong> - Preview your resume and customize colors and fonts.
            </Typography>
            <Typography paragraph>
              4. <strong>Download as PDF</strong> - When you're satisfied, download your resume as a PDF file.
            </Typography>
            <Typography paragraph>
              5. <strong>Save for later</strong> - You can save your resume to continue working on it later.
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>Tips for a great resume:</Typography>
            <Typography paragraph>
              • Keep it concise and relevant to the job you're applying for
            </Typography>
            <Typography paragraph>
              • Use action verbs to describe your achievements
            </Typography>
            <Typography paragraph>
              • Quantify your accomplishments when possible
            </Typography>
            <Typography paragraph>
              • Proofread carefully for errors
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setHelpDialog(false)}>Close</Button>
          </DialogActions>
        </Dialog>

        <Snackbar 
          open={snackbar.open} 
          autoHideDuration={6000} 
          onClose={() => setSnackbar({...snackbar, open: false})}
        >
          <Alert 
            onClose={() => setSnackbar({...snackbar, open: false})} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default ResumeBuilder;