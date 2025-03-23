import React, { useState } from 'react';
import { TextField, Grid, Typography, Box, Button, Card, CardContent, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function Education({ formData, setFormData }) {
  const [education, setEducation] = useState({
    school: '',
    degree: '',
    graduationDate: '',
    description: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducation({
      ...education,
      [name]: value
    });
  };

  const handleAdd = () => {
    if (education.school && education.degree) {
      setFormData({
        ...formData,
        education: [...formData.education, education]
      });
      setEducation({
        school: '',
        degree: '',
        graduationDate: '',
        description: ''
      });
    }
  };

  const handleDelete = (index) => {
    const updatedEducation = [...formData.education];
    updatedEducation.splice(index, 1);
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      
      {formData.education.length > 0 && (
        <Box mb={4}>
          <Typography variant="subtitle1" gutterBottom>
            Added Education
          </Typography>
          <Grid container spacing={2}>
            {formData.education.map((edu, index) => (
              <Grid item xs={12} key={index}>
                <Card>
                  <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Typography variant="h6">{edu.degree}</Typography>
                      <IconButton onClick={() => handleDelete(index)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                    <Typography variant="subtitle1">{edu.school}</Typography>
                    <Typography variant="body2">{edu.graduationDate}</Typography>
                    <Typography variant="body2">{edu.description}</Typography>
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
            label="School"
            name="school"
            value={education.school}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            fullWidth
            label="Degree"
            name="degree"
            value={education.degree}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label="Graduation Date"
            name="graduationDate"
            value={education.graduationDate}
            onChange={handleChange}
            placeholder="MM/YYYY"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={education.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAdd}
            disabled={!education.school || !education.degree}
          >
            Add Education
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Education;