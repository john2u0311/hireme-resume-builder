import React from 'react';
import { Grid, TextField, IconButton, Box, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

function Experience({ formData, handleChange, handleAddExperience, handleRemoveExperience }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      {formData.experience.map((exp, index) => (
        <Box key={index} sx={{ mb: 4, p: 3, border: '1px solid #eee', borderRadius: 1 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Company"
                name={`experience.${index}.company`}
                value={exp.company}
                onChange={(e) => handleChange(e, 'experience', index)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Position"
                name={`experience.${index}.position`}
                value={exp.position}
                onChange={(e) => handleChange(e, 'experience', index)}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                name={`experience.${index}.description`}
                value={exp.description}
                onChange={(e) => handleChange(e, 'experience', index)}
                variant="outlined"
              />
            </Grid>
          </Grid>
          {formData.experience.length > 1 && (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <IconButton 
                onClick={() => handleRemoveExperience(index)}
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
          onClick={handleAddExperience}
          color="primary"
          sx={{ border: '1px dashed', borderRadius: 2, p: 1 }}
        >
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

export default Experience;