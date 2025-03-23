import React, { useState } from 'react';
import { TextField, Grid, Typography, Box, Button, Chip, Stack } from '@mui/material';

function Skills({ formData, setFormData }) {
  const [skill, setSkill] = useState('');

  const handleChange = (e) => {
    setSkill(e.target.value);
  };

  const handleAdd = () => {
    if (skill.trim() && !formData.skills.includes(skill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill.trim()]
      });
      setSkill('');
    }
  };

  const handleDelete = (skillToDelete) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((s) => s !== skillToDelete)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Add a Skill"
            value={skill}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            placeholder="e.g. JavaScript, Project Management, Customer Service"
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleAdd}
            disabled={!skill.trim()}
          >
            Add Skill
          </Button>
        </Grid>
        
        {formData.skills.length > 0 && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Your Skills
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
              {formData.skills.map((s, index) => (
                <Chip 
                  key={index}
                  label={s}
                  onDelete={() => handleDelete(s)}
                  color="primary"
                  sx={{ margin: '4px' }}
                />
              ))}
            </Stack>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Skills;