import React, { useState } from 'react';
import { 
  Box, Typography, Paper, TextField, Button, Grid, 
  Divider, IconButton, Accordion, AccordionSummary, 
  AccordionDetails, Chip, FormControlLabel, Switch
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  CloudUpload as CloudUploadIcon
} from '@mui/icons-material';
import AISuggestions from './AISuggestions';

function ResumeForm({ formData, setFormData, onSave }) {
  const [expandedSection, setExpandedSection] = useState('personal');
  
  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value
      }
    });
  };
  
  const handleArrayChange = (section, index, field, value) => {
    const newArray = [...formData[section]];
    newArray[index] = {
      ...newArray[index],
      [field]: value
    };
    
    setFormData({
      ...formData,
      [section]: newArray
    });
  };
  
  const handleAddItem = (section) => {
    let newItem = {};
    
    // Initialize with appropriate fields based on section
    switch(section) {
      case 'experience':
        newItem = { position: '', company: '', startDate: '', endDate: '', description: '' };
        break;
      case 'education':
        newItem = { degree: '', school: '', graduationDate: '', description: '' };
        break;
      case 'projects':
        newItem = { title: '', description: '' };
        break;
      case 'certifications':
        newItem = { name: '', issuer: '', date: '' };
        break;
      case 'languages':
        newItem = { language: '', proficiency: '' };
        break;
      case 'references':
        newItem = { name: '', company: '', contact: '' };
        break;
      default:
        newItem = {};
    }
    
    setFormData({
      ...formData,
      [section]: [...(formData[section] || []), newItem]
    });
  };
  
  const handleRemoveItem = (section, index) => {
    const newArray = [...formData[section]];
    newArray.splice(index, 1);
    
    setFormData({
      ...formData,
      [section]: newArray
    });
  };
  
  const handleSkillAdd = (skill) => {
    if (!skill.trim()) return;
    
    const skills = formData.skills || [];
    if (!skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...skills, skill.trim()]
      });
    }
  };
  
  const handleSkillRemove = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: (formData.skills || []).filter(skill => skill !== skillToRemove)
    });
  };
  
  const handleApplySuggestion = (section, suggestion) => {
    if (typeof suggestion === 'string') {
      // For string suggestions (summary, skills)
      if (section === 'summary') {
        setFormData({
          ...formData,
          summary: suggestion
        });
      } else if (section === 'skills') {
        handleSkillAdd(suggestion);
      }
    } else {
      // For object suggestions (experience, education)
      setFormData({
        ...formData,
        [section]: [...(formData[section] || []), suggestion]
      });
    }
  };
  
  return (
    <Box>
      {/* Personal Information */}
      <Accordion 
        expanded={expandedSection === 'personal'} 
        onChange={() => setExpandedSection(expandedSection === 'personal' ? '' : 'personal')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Personal Information</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName || ''}
                onChange={(e) => handleChange('firstName', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName || ''}
                onChange={(e) => handleChange('lastName', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                variant="outlined"
                placeholder="City, State"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Website/LinkedIn"
                value={formData.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Professional Title"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                variant="outlined"
                placeholder="e.g., Senior Software Engineer"
              />
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>

      {/* Summary */}
      <Accordion 
        expanded={expandedSection === 'summary'} 
        onChange={() => setExpandedSection(expandedSection === 'summary' ? '' : 'summary')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Professional Summary</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Summary"
            value={formData.summary || ''}
            onChange={(e) => handleChange('summary', e.target.value)}
            variant="outlined"
            placeholder="Write a brief summary of your professional background and key strengths..."
          />
          <AISuggestions 
            section="summary" 
            formData={formData}
            onApplySuggestion={(suggestion) => handleApplySuggestion('summary', suggestion)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Experience */}
      <Accordion 
        expanded={expandedSection === 'experience'} 
        onChange={() => setExpandedSection(expandedSection === 'experience' ? '' : 'experience')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Work Experience</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(formData.experience || []).map((exp, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
              <IconButton 
                size="small" 
                color="error" 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveItem('experience', index)}
              >
                <DeleteIcon />
              </IconButton>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={exp.position || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'position', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={exp.company || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'company', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date (MM/YYYY)"
                    value={exp.startDate || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'startDate', e.target.value)}
                    variant="outlined"
                    placeholder="01/2020"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date (MM/YYYY or 'Present')"
                    value={exp.endDate || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'endDate', e.target.value)}
                    variant="outlined"
                    placeholder="Present"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={exp.description || ''}
                    onChange={(e) => handleArrayChange('experience', index, 'description', e.target.value)}
                    variant="outlined"
                    placeholder="Describe your responsibilities and achievements..."
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            variant="outlined" 
            onClick={() => handleAddItem('experience')}
            sx={{ mt: 1 }}
          >
            Add Experience
          </Button>
          
          <AISuggestions 
            section="experience" 
            formData={formData}
            onApplySuggestion={(suggestion) => handleApplySuggestion('experience', suggestion)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Skills */}
      <Accordion 
        expanded={expandedSection === 'skills'} 
        onChange={() => setExpandedSection(expandedSection === 'skills' ? '' : 'skills')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Skills</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Add Skill"
              placeholder="Type a skill and press Enter"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSkillAdd(e.target.value);
                  e.target.value = '';
                }
              }}
              variant="outlined"
            />
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
            {(formData.skills || []).map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                onDelete={() => handleSkillRemove(skill)}
                color="primary"
                variant="outlined"
              />
            ))}
          </Box>
          
          <AISuggestions 
            section="skills"
            formData={formData}
            onApplySuggestion={(suggestion) => handleApplySuggestion('skills', suggestion)}
          />
        </AccordionDetails>
      </Accordion>

      {/* Projects */}
      <Accordion 
        expanded={expandedSection === 'projects'} 
        onChange={() => setExpandedSection(expandedSection === 'projects' ? '' : 'projects')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(formData.projects || []).map((project, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
              <IconButton 
                size="small" 
                color="error" 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveItem('projects', index)}
              >
                <DeleteIcon />
              </IconButton>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Project Title"
                    value={project.title || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'title', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={project.description || ''}
                    onChange={(e) => handleArrayChange('projects', index, 'description', e.target.value)}
                    variant="outlined"
                    placeholder="Describe the project, technologies used, and your role..."
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            variant="outlined" 
            onClick={() => handleAddItem('projects')}
            sx={{ mt: 1 }}
          >
            Add Project
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Certifications */}
      <Accordion 
        expanded={expandedSection === 'certifications'} 
        onChange={() => setExpandedSection(expandedSection === 'certifications' ? '' : 'certifications')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Certifications</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(formData.certifications || []).map((cert, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
              <IconButton 
                size="small" 
                color="error" 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveItem('certifications', index)}
              >
                <DeleteIcon />
              </IconButton>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Certification Name"
                    value={cert.name || ''}
                    onChange={(e) => handleArrayChange('certifications', index, 'name', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Issuing Organization"
                    value={cert.issuer || ''}
                    onChange={(e) => handleArrayChange('certifications', index, 'issuer', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date (MM/YYYY)"
                    value={cert.date || ''}
                    onChange={(e) => handleArrayChange('certifications', index, 'date', e.target.value)}
                    variant="outlined"
                    placeholder="05/2020"
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            variant="outlined" 
            onClick={() => handleAddItem('certifications')}
            sx={{ mt: 1 }}
          >
            Add Certification
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Languages */}
      <Accordion 
        expanded={expandedSection === 'languages'} 
        onChange={() => setExpandedSection(expandedSection === 'languages' ? '' : 'languages')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Languages</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {(formData.languages || []).map((lang, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
              <IconButton 
                size="small" 
                color="error" 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveItem('languages', index)}
              >
                <DeleteIcon />
              </IconButton>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Language"
                    value={lang.language || ''}
                    onChange={(e) => handleArrayChange('languages', index, 'language', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Proficiency"
                    value={lang.proficiency || ''}
                    onChange={(e) => handleArrayChange('languages', index, 'proficiency', e.target.value)}
                    variant="outlined"
                    placeholder="e.g., Fluent, Native, Intermediate"
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            variant="outlined" 
            onClick={() => handleAddItem('languages')}
            sx={{ mt: 1 }}
          >
            Add Language
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* References */}
      <Accordion 
        expanded={expandedSection === 'references'} 
        onChange={() => setExpandedSection(expandedSection === 'references' ? '' : 'references')}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">References</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControlLabel
            control={
              <Switch
                checked={formData.showReferences || false}
                onChange={(e) => setFormData({
                  ...formData,
                  showReferences: e.target.checked
                })}
              />
            }
            label="Include references in resume"
            sx={{ mb: 2 }}
          />
          
          {(formData.references || []).map((ref, index) => (
            <Paper key={index} elevation={2} sx={{ p: 2, mb: 2, position: 'relative' }}>
              <IconButton 
                size="small" 
                color="error" 
                sx={{ position: 'absolute', top: 8, right: 8 }}
                onClick={() => handleRemoveItem('references', index)}
              >
                <DeleteIcon />
              </IconButton>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Name"
                    value={ref.name || ''}
                    onChange={(e) => handleArrayChange('references', index, 'name', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company/Position"
                    value={ref.company || ''}
                    onChange={(e) => handleArrayChange('references', index, 'company', e.target.value)}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contact Information"
                    value={ref.contact || ''}
                    onChange={(e) => handleArrayChange('references', index, 'contact', e.target.value)}
                    variant="outlined"
                    placeholder="Email or phone number"
                  />
                </Grid>
              </Grid>
            </Paper>
          ))}
          
          <Button 
            startIcon={<AddIcon />} 
            variant="outlined" 
            onClick={() => handleAddItem('references')}
            sx={{ mt: 1 }}
          >
            Add Reference
          </Button>
        </AccordionDetails>
      </Accordion>

      {/* Save Button */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<SaveIcon />}
          onClick={onSave}
          size="large"
        >
          Save Resume
        </Button>
        
        <Button
          variant="outlined"
          startIcon={<CloudUploadIcon />}
          onClick={() => {
            // This would be implemented to import data from LinkedIn or other sources
            alert('Import functionality would be implemented here');
          }}
        >
          Import Data
        </Button>
      </Box>
    </Box>
  );
}

export default ResumeForm;