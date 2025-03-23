import React, { useState, useEffect } from 'react';
import { 
  Container, Box, Paper, Stepper, Step, StepLabel, 
  Button, Typography, Divider, Tabs, Tab, Alert
} from '@mui/material';
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { 
  Save as SaveIcon, 
  GetApp as DownloadIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon
} from '@mui/icons-material';

// Import components
import ResumeForm from './ResumeForm';
import TemplateSelector from './TemplateSelector';
import ResumeCustomizer from './ResumeCustomizer';

// Import templates
import ProfessionalTemplate from './templates/ProfessionalTemplate';
import MinimalistTemplate from './templates/MinimalistTemplate';
import CreativeTemplate from './templates/CreativeTemplate';

// Sample initial data
const initialFormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  location: '',
  website: '',
  title: '',
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  languages: [],
  references: [],
  showReferences: false
};

function ResumeBuilder() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [selectedTemplate, setSelectedTemplate] = useState('professional');
  const [customization, setCustomization] = useState({
    primaryColor: '#2196f3',
    secondaryColor: '#f50057',
    font: 'Roboto',
    spacing: 1.5,
    margin: 30
  });
  const [tabValue, setTabValue] = useState(0);
  const [savedResumes, setSavedResumes] = useState([]);
  const [saveSuccess, setSaveSuccess] = useState(false);
  
  // Load saved data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeFormData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
    
    const savedCustomization = localStorage.getItem('resumeCustomization');
    if (savedCustomization) {
      setCustomization(JSON.parse(savedCustomization));
    }
    
    const savedTemplate = localStorage.getItem('selectedTemplate');
    if (savedTemplate) {
      setSelectedTemplate(savedTemplate);
    }
    
    const savedResumesData = localStorage.getItem('savedResumes');
    if (savedResumesData) {
      setSavedResumes(JSON.parse(savedResumesData));
    }
  }, []);
  
  // Steps for the resume creation process
  const steps = ['Enter Information', 'Choose Template', 'Customize Design', 'Preview & Download'];
  
  // Handle next step
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Save resume data
  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('resumeFormData', JSON.stringify(formData));
    localStorage.setItem('resumeCustomization', JSON.stringify(customization));
    localStorage.setItem('selectedTemplate', selectedTemplate);
    
    // Add to saved resumes if it has a name
    if (formData.firstName || formData.lastName) {
      const resumeName = `${formData.firstName} ${formData.lastName} Resume`;
      const newResume = {
        id: Date.now(),
        name: resumeName,
        date: new Date().toLocaleDateString(),
        data: formData,
        template: selectedTemplate,
        customization: customization
      };
      
      const updatedRes