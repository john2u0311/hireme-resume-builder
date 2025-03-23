import React, { useState } from 'react';
import { 
  Box, Typography, Button, CircularProgress, 
  Accordion, AccordionSummary, AccordionDetails,
  Card, CardContent, CardActions, Divider
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Lightbulb as LightbulbIcon,
  Add as AddIcon
} from '@mui/icons-material';

// This component would typically connect to an AI service
// For now, we'll use mock suggestions
function AISuggestions({ section, formData, onApplySuggestion }) {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [expanded, setExpanded] = useState(false);
  
  // Mock function to generate suggestions based on section and existing data
  const generateSuggestions = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let mockSuggestions = [];
      
      switch(section) {
        case 'summary':
          mockSuggestions = [
            `Dedicated ${formData.title || 'professional'} with ${Math.floor(Math.random() * 10) + 3} years of experience in the industry. Proven track record of delivering high-quality results and driving innovation.`,
            `Results-oriented ${formData.title || 'professional'} with expertise in ${(formData.skills || []).slice(0, 3).join(', ') || 'various areas'}. Committed to excellence and continuous improvement.`
          ];
          break;
          
        case 'skills':
          // Generate skill suggestions based on job title or existing skills
          const skillSets = {
            developer: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'Git', 'REST APIs'],
            designer: ['UI/UX', 'Figma', 'Adobe XD', 'Sketch', 'Wireframing', 'Prototyping'],
            manager: ['Team Leadership', 'Project Management', 'Agile', 'Scrum', 'Budgeting', 'Strategic Planning'],
            default: ['Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability']
          };
          
          let relevantSkills = skillSets.default;
          if (formData.title) {
            const title = formData.title.toLowerCase();
            if (title.includes('develop') || title.includes('engineer') || title.includes('program')) {
              relevantSkills = skillSets.developer;
            } else if (title.includes('design')) {
              relevantSkills = skillSets.designer;
            } else if (title.includes('manager') || title.includes('director') || title.includes('lead')) {
              relevantSkills = skillSets.manager;
            }
          }
          
          // Filter out skills that are already in the resume
          mockSuggestions = relevantSkills.filter(skill => 
            !(formData.skills || []).includes(skill)
          );
          break;
          
        case 'experience':
          mockSuggestions = [
            {
              position: `${formData.title || 'Professional'}`,
              company: 'Example Company',
              startDate: '01/2020',
              endDate: 'Present',
              description: 'Led cross-functional teams to deliver projects on time and within budget. Improved process efficiency by 30% through implementation of new methodologies.'
            }
          ];
          break;
          
        case 'education':
          mockSuggestions = [
            {
              degree: 'Bachelor of Science',
              school: 'University Example',
              graduationDate: '05/2018',
              description: 'Graduated with honors. Relevant coursework included advanced topics in the field.'
            }
          ];
          break;
          
        default:
          mockSuggestions = [];
      }
      
      setSuggestions(mockSuggestions);
      setLoading(false);
    }, 1500);
  };
  
  return (
    <Accordion 
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
      sx={{ mt: 2, backgroundColor: '#f8f9fa' }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <LightbulbIcon sx={{ mr: 1, color: 'warning.main' }} />
          <Typography variant="subtitle1">AI Suggestions</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {suggestions.length === 0 && !loading ? (
          <Box sx={{ textAlign: 'center', py: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Get AI-powered suggestions to enhance your {section}.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={generateSuggestions}
              startIcon={<LightbulbIcon />}
              sx={{ mt: 1 }}
            >
              Generate Suggestions
            </Button>
          </Box>
        ) : loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={30} />
          </Box>
        ) : (
          <Box>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Here are some suggestions for your {section}:
            </Typography>
            <Divider sx={{ my: 1 }} />
            
            {section === 'skills' ? (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
                {suggestions.map((skill, index) => (
                  <Button
                    key={index}
                    variant="outlined"
                    size="small"
                    onClick={() => onApplySuggestion(skill)}
                    startIcon={<AddIcon />}
                    sx={{ mb: 1 }}
                  >
                    {skill}
                  </Button>
                ))}
              </Box>
            ) : section === 'summary' ? (
              <Box>
                {suggestions.map((summary, index) => (
                  <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      <Typography variant="body2">{summary}</Typography>
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        onClick={() => onApplySuggestion(summary)}
                        startIcon={<AddIcon />}
                      >
                        Use This Summary
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            ) : (
              <Box>
                {suggestions.map((item, index) => (
                  <Card key={index} variant="outlined" sx={{ mb: 2 }}>
                    <CardContent>
                      {section === 'experience' && (
                        <>
                          <Typography variant="subtitle1">{item.position}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.company} | {item.startDate} - {item.endDate}
                          </Typography>
                          <Typography variant="body2" sx={{ mt: 1 }}>
                            {item.description}
                          </Typography>
                        </>
                      )}
                      
                      {section === 'education' && (
                        <>
                          <Typography variant="subtitle1">{item.degree}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.school} | {item.graduationDate}
                          </Typography>
                          {item.description && (
                            <Typography variant="body2" sx={{ mt: 1 }}>
                              {item.description}
                            </Typography>
                          )}
                        </>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        onClick={() => onApplySuggestion(item)}
                        startIcon={<AddIcon />}
                      >
                        Add to Resume
                      </Button>
                    </CardActions>
                  </Card>
                ))}
              </Box>
            )}
            
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button
                variant="text"
                color="primary"
                onClick={generateSuggestions}
                startIcon={<LightbulbIcon />}
              >
                Generate More
              </Button>
            </Box>
          </Box>
        )}
      </AccordionDetails>
    </Accordion>
  );
}

export default AISuggestions;