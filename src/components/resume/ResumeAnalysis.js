import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Divider, List, ListItem, 
  ListItemIcon, ListItemText, Chip, LinearProgress,
  Grid, Card, CardContent, Button, Tooltip, Alert
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Error as ErrorIcon,
  Lightbulb as TipIcon,
  TrendingUp as TrendingIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { analyzeResume, getAvailableIndustries, suggestImprovements } from '../../utils/jobMarketUtils';

function ResumeAnalysis({ formData, onUpdateFormData }) {
  const [analysis, setAnalysis] = useState(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [improvements, setImprovements] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    if (formData) {
      const resumeAnalysis = analyzeResume(formData);
      setAnalysis(resumeAnalysis);
      
      // Set default industry if we have matches
      if (resumeAnalysis.matchedIndustries && resumeAnalysis.matchedIndustries.length > 0) {
        const topIndustry = resumeAnalysis.matchedIndustries[0].industry;
        setSelectedIndustry(topIndustry);
        setImprovements(suggestImprovements(formData, topIndustry));
      }
    }
  }, [formData]);
  
  const handleIndustryChange = (industry) => {
    setSelectedIndustry(industry);
    setImprovements(suggestImprovements(formData, industry));
  };
  
  const handleAddSkill = (skill) => {
    // Check if skill already exists
    const currentSkills = formData.skills || [];
    if (currentSkills.some(s => s.toLowerCase() === skill.toLowerCase())) {
      return;
    }
    
    // Add the skill to the form data
    const updatedSkills = [...currentSkills, skill];
    onUpdateFormData({
      ...formData,
      skills: updatedSkills
    });
    
    // Show success message
    setSuccessMessage(`Added "${skill}" to your skills`);
    setTimeout(() => setSuccessMessage(''), 3000);
  };
  
  const handleApplySummaryImprovements = () => {
    if (!improvements || !improvements.summaryImprovements.length) return;
    
    // Generate an improved summary based on the first improvement suggestion
    const suggestion = improvements.summaryImprovements[0];
    const currentSummary = formData.summary || '';
    
    // If the suggestion is to add a summary and there isn't one
    if (suggestion.startsWith('Add a professional summary') && !currentSummary) {
      const generatedSummary = `Experienced professional with skills in ${
        formData.skills ? formData.skills.slice(0, 3).join(', ') : 'various areas'
      }. Seeking opportunities in the ${selectedIndustry} industry to leverage my expertise in ${
        improvements.skillsToAdd.slice(0, 2).join(' and ')
      }.`;
      
      onUpdateFormData({
        ...formData,
        summary: generatedSummary
      });
      
      setSuccessMessage('Generated a professional summary based on your skills');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
    // If the suggestion is to incorporate key terms
    else if (suggestion.startsWith('Consider incorporating these key terms')) {
      const keyTerms = suggestion.split(': ')[1].split(', ');
      let updatedSummary = currentSummary;
      
      // Try to incorporate the first two key terms if they're not already there
      keyTerms.slice(0, 2).forEach(term => {
        if (!updatedSummary.toLowerCase().includes(term.toLowerCase())) {
          updatedSummary += ` Proficient in ${term}.`;
        }
      });
      
      onUpdateFormData({
        ...formData,
        summary: updatedSummary
      });
      
      setSuccessMessage('Updated your summary with key industry terms');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };
  
  if (!analysis) {
    return <Typography>Loading analysis...</Typography>;
  }
  
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h5" gutterBottom>
        Resume Analysis
      </Typography>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}
      
      {/* Completeness Score */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Resume Completeness: {analysis.completenessScore}%
        </Typography>
        <LinearProgress 
          variant="determinate" 
          value={analysis.completenessScore} 
          color={analysis.completenessScore < 70 ? "warning" : "success"}
          sx={{ height: 10, borderRadius: 5, mb: 2 }}
        />
        
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Missing Sections:
            </Typography>
            {analysis.missingFields.length > 0 ? (
              <List dense>
                {analysis.missingFields.map((field, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <ErrorIcon color="error" />
                    </ListItemIcon>
                    <ListItemText primary={field} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="success.main">
                No missing sections. Great job!
              </Typography>
            )}
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" gutterBottom>
              Resume Strengths:
            </Typography>
            {analysis.strengths.length > 0 ? (
              <List dense>
                {analysis.strengths.map((strength, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <CheckIcon color="success" />
                    </ListItemIcon>
                    <ListItemText primary={strength} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                Add more content to identify strengths.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Paper>
      
      {/* Industry Match */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Industry Match
        </Typography>
        
        {analysis.matchedIndustries.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {getAvailableIndustries().map((industry) => (
                <Chip 
                  key={industry}
                  label={industry}
                  onClick={() => handleIndustryChange(industry)}
                  color={selectedIndustry === industry ? "primary" : "default"}
                  variant={selectedIndustry === industry ? "filled" : "outlined"}
                />
              ))}
            </Box>
            
            <Divider sx={{ my: 2 }} />
            
            {improvements && (
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Recommended Skills for {selectedIndustry}:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {improvements.skillsToAdd.slice(0, 8).map((skill, index) => (
                      <Tooltip key={index} title="Click to add this skill to your resume">
                        <Chip 
                          label={skill}
                          color="info"
                          size="small"
                          icon={<AddIcon />}
                          onClick={() => handleAddSkill(skill)}
                          sx={{ cursor: 'pointer' }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    Growing Roles to Consider:
                  </Typography>
                  <List dense>
                    {improvements.rolesToConsider.slice(0, 3).map((role, index) => (
                      <ListItem key={index}>
                        <ListItemIcon>
                          <TrendingIcon color="info" />
                        </ListItemIcon>
                        <ListItemText primary={role} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
                
                {improvements.summaryImprovements.length > 0 && (
                  <Grid item xs={12}>
                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1">
                        Summary Improvements:
                      </Typography>
                      <Button 
                        variant="outlined" 
                        size="small"
                        onClick={handleApplySummaryImprovements}
                      >
                        Apply Improvements
                      </Button>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {improvements.summaryImprovements[0]}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            )}
          </>
        ) : (
          <Typography variant="body2" color="text.secondary">
            Add more skills to see industry matches.
          </Typography>
        )}
      </Paper>
      
      {/* Recommendations */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recommendations
        </Typography>
        
        <List>
          {analysis.recommendations.map((recommendation, index) => (
            <ListItem key={index} divider={index < analysis.recommendations.length - 1}>
              <ListItemIcon>
                <TipIcon color="warning" />
              </ListItemIcon>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
}

export default ResumeAnalysis;