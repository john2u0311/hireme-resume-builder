import React from 'react';
import { Box } from '@mui/material';
import { PDFViewer } from '@react-pdf/renderer';
import TemplateCustomization from './TemplateCustomization';

function ResumePreview({ templates, formData, customization, setCustomization }) {
  const SelectedTemplate = templates.find(t => t.id === formData.template)?.component;
  
  if (!SelectedTemplate) {
    return <Box>Template not found</Box>;
  }
  
  return (
    <Box>
      <TemplateCustomization 
        customization={customization} 
        setCustomization={setCustomization} 
      />
      <Box sx={{ height: '80vh' }}>
        <PDFViewer style={{ width: '100%', height: '100%' }}>
          <SelectedTemplate data={formData} customization={customization} />
        </PDFViewer>
      </Box>
    </Box>
  );
}

export default ResumePreview;