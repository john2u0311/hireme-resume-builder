import React, { useState } from 'react';
import { TextField, Grid, Typography, Box, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Experience({ formData, setFormData }) {
  const [experience, setExperience] = useState({
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExperience({
      ...experience,
      [name]: value
    });
  };

  const handleAdd = () => {
    if (experience.company && experience.position) {
      setFormData({
        ...formData,
        experience: [...formData.experience, experience]
      });
      setExperience({
        company: '',
        position: '',
        startDate: '',
        endDate: '',
        description: ''
      });
    }
  };

  const handleDelete = (index) => {
    const updatedExperience = [...formData.experience];
    updatedExperience.splice(index, 1);
    setFormData({
      ...formData,
      experience: updatedExperience
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      
      {formData.experience.length > 0 && (
        <Box mb={4}>
          <Typography variant="subtitle1" gutterBottom>
            Added Experience
          </Typography>
          <Grid container spacing={2}>
            {formData.experience.map((exp, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{exp.position}</Typography>
                      <IconButton onClick={() => handleDelete(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1">{exp.company}</Typography>
                    <Typography variant="body2">{exp.startDate} - {exp.endDate}</Typography>
                    <Typography variant="body2">{exp.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Company"
            name="company"
            value={experience.company}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Position"
            name="position"
            value={experience.position}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Start Date"
            name="startDate"
            value={experience.startDate}
            onChange={handleChange}
            placeholder="MM/YYYY"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="End Date"
            name="endDate"
            value={experience.endDate}
            onChange={handleChange}
            placeholder="MM/YYYY or Present"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={experience.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAdd}
            disabled={!experience.company || !experience.position}
          >
            Add Experience
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Experience;