import React from 'react';
import { 
  Box, Typography, Chip, TextField, IconButton,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function Skills({ formData, handleAddSkill, handleRemoveSkill }) {
  const [newSkill, setNewSkill] = React.useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSkill.trim()) {
      handleAddSkill(newSkill.trim());
      setNewSkill('');
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            placeholder="Add a skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
          />
          <IconButton 
            type="submit"
            color="primary"
            sx={{ border: '1px dashed', borderRadius: 1 }}
          >
            <AddIcon />
          </IconButton>
        </Box>
      </Box>

      <Paper 
        variant="outlined" 
        sx={{ 
          p: 2,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 1,
          minHeight: 100
        }}
      >
        {formData.skills.map((skill, index) => (
          <Chip
            key={index}
            label={skill}
            onDelete={() => handleRemoveSkill(index)}
            color="primary"
            variant="outlined"
          />
        ))}
      </Paper>
    </Box>
  );
}

export default Skills;