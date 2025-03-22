import React from 'react';
import { Grid, TextField, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Education({ formData, handleChange, handleAddEducation, handleRemoveEducation }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {formData.education.map((edu, index) => (
        <Box key={index} sx={{ mb: 4, p: 3, border: '1px solid #eee', borderRadius: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="School"
                name={`education.${index}.school`}
                value={edu.school}
                onChange={(e) => handleChange(e, 'education', index)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Degree"
                name={`education.${index}.degree`}
                value={edu.degree}
                onChange={(e) => handleChange(e, 'education', index)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name={`education.${index}.description`}
                value={edu.description}
                onChange={(e) => handleChange(e, 'education', index)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {formData.education.length > 1 && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton 
                onClick={() => handleRemoveEducation(index)}
                color="error"
                size="small"
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        </Box>
      ))}
      <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
        <IconButton 
          onClick={handleAddEducation}
          color="primary"
          sx={{ border: '1px dashed', borderRadius: 2, p: 1 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Education;