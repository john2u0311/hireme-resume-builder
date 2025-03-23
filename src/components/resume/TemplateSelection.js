import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TemplateSelection({ formData, setFormData, templates }) {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      <Typography variant="body2" color="textSecondary" paragraph>
        Select a professional template that best showcases your skills and experience.
      </Typography>
      
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={4} key={template.id}>
            <Card 
              onClick={() => {
                setFormData({ 
                  ...formData, 
                  template: template.id,
                });
                // Also update customization colors based on template defaults
                if (setFormData.customization) {
                  setFormData.customization({
                    primaryColor: template.defaultColors.primary,
                    secondaryColor: template.defaultColors.secondary,
                    font: 'Helvetica'
                  });
                }
              }}
              sx={{ 
                cursor: 'pointer',
                border: formData.template === template.id ? '2px solid #2196f3' : '1px solid #eee',
                transition: 'transform 0.3s, box-shadow 0.3s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                },
                position: 'relative',
                height: '100%'
              }}
            >
              {formData.template === template.id && (
                <Chip 
                  icon={<CheckCircleIcon />} 
                  label="Selected" 
                  color="primary"
                  sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    zIndex: 1
                  }}
                />
              )}
              <CardMedia
                component="img"
                height="200"
                image={template.image}
                alt={template.name}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent>
                <Typography variant="h6" align="center">{template.name}</Typography>
                <Typography variant="body2" color="textSecondary" align="center">
                  {template.id === 1 && "Perfect for traditional industries"}
                  {template.id === 2 && "Clean design for tech professionals"}
                  {template.id === 3 && "Stand out with a creative layout"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default TemplateSelection;