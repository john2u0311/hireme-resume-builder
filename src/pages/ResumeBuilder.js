import React, { useState } from 'react';
import {
  Container, Paper, Stepper, Step, StepLabel, Button, Typography, 
  Box, Grid, Card, CardContent, CardMedia, Select, MenuItem,
  FormControl, InputLabel, ThemeProvider, createTheme
} from '@mui/material';
import PersonalInfo from '../components/resume/PersonalInfo';
import Experience from '../components/resume/Experience';
import Education from '../components/resume/Education';
import Skills from '../components/resume/Skills';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import ModernTemplate from '../components/resume/templates/ModernTemplate';
import CreativeTemplate from '../components/resume/templates/CreativeTemplate';
import ProfessionalTemplate from '../components/resume/templates/ProfessionalTemplate';

// Update template images with modern designs
const templates = [
  { 
    id: 1, 
    name: 'Professional', 
    image: 'https://assets.notion.so/images/templates/professional-resume.png',
    component: ProfessionalTemplate,
    defaultColors: { primary: '#2196f3', secondary: '#f50057' }
  },
  { 
    id: 2, 
    name: 'Modern', 
    image: 'https://assets.notion.so/images/templates/modern-resume.png',
    component: ModernTemplate,
    defaultColors: { primary: '#333333', secondary: '#f50057' }
  },
  { 
    id: 3, 
    name: 'Creative', 
    image: 'https://assets.notion.so/images/templates/creative-resume.png',
    component: CreativeTemplate,
    defaultColors: { primary: '#9c27b0', secondary: '#ff4081' }
  }
];

const steps = ['Template', 'Personal Info', 'Experience', 'Education', 'Skills'];

// Add these imports at the top
import { pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';
import { ColorPicker } from '@mui/material';

// Update the templates array
const templates = [
  { 
    id: 1, 
    name: 'Professional', 
    image: '/templates/professional.png', 
    component: ProfessionalTemplate,
    defaultColors: { primary: '#2196f3', secondary: '#f50057' }
  },
  { 
    id: 2, 
    name: 'Modern', 
    image: '/templates/modern.png', 
    component: ModernTemplate,
    defaultColors: { primary: '#333333', secondary: '#f50057' }
  },
  { 
    id: 3, 
    name: 'Creative', 
    image: '/templates/creative.png', 
    component: CreativeTemplate,
    defaultColors: { primary: '#9c27b0', secondary: '#ff4081' }
  }
];

// Add customization state
const [customization, setCustomization] = useState({
  primaryColor: '#2196f3',
  secondaryColor: '#f50057',
  font: 'Helvetica'
});

// Add download handler
const handleDownloadPDF = async () => {
  const blob = await pdf(
    templates.find(t => t.id === formData.template)?.component({ 
      data: formData,
      customization 
    })
  ).toBlob();
  saveAs(blob, `${formData.firstName}_${formData.lastName}_Resume.pdf`);
};

// Update the preview section
return (
  <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Paper sx={{ p: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Create Your Resume
        </Typography>
        {activeStep === steps.length - 1 && (
          <Box>
            <Button variant="outlined" onClick={handlePreview} sx={{ mr: 2 }}>
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
            {showPreview && (
              <Button variant="contained" onClick={handleDownloadPDF}>
                Download PDF
              </Button>
            )}
          </Box>
        )}
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
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!validateStep()}
            >
              {activeStep === steps.length - 1 ? 'Preview' : 'Next'}
            </Button>
          </Box>
        </>
      )}
    </Paper>
  </Container>
);
}

export default ResumeBuilder;

function ResumeBuilder() {
  // ... existing state ...

  const theme = createTheme({
    palette: {
      primary: {
        main: '#2196f3',
      },
      secondary: {
        main: '#f50057',
      },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            transition: 'transform 0.3s, box-shadow 0.3s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            },
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper 
          sx={{ 
            p: 4, 
            borderRadius: 2,
            boxShadow: '0 0 20px rgba(0,0,0,0.05)'
          }}
        >
          {/* ... existing content ... */}
        </Paper>
      </Container>
    </ThemeProvider>
  );
}