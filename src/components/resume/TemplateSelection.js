import React from 'react';
import { Grid, Card, CardContent, CardMedia, Typography, Box } from '@mui/material';

function TemplateSelection({ formData, setFormData, templates }) {
  return (
    <Grid container spacing={3}>
      {templates.map((template) => (
        <Grid item xs={12} sm={4} key={template.id}>
          <Card 
            onClick={() => setFormData({ ...formData, template: template.id })}
            sx={{ 
              cursor: 'pointer',
              border: formData.template === template.id ? '2px solid #2196f3' : 'none'
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={template.image}
              alt={template.name}
            />
            <CardContent>
              <Typography variant="h6" align="center">{template.name}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default TemplateSelection;