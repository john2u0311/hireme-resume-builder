import React from 'react';
import { 
  Box, Typography, Paper, Grid, Card, CardContent, 
  CardMedia, CardActionArea, Chip, Divider 
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Sample template thumbnails
const templateThumbnails = {
  modern: '/templates/modern-thumbnail.png',
  professional: '/templates/professional-thumbnail.png',
  minimalist: '/templates/minimalist-thumbnail.png',
  creative: '/templates/creative-thumbnail.png',
};

// Styled components
const TemplateCard = styled(Card)(({ theme, selected }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  border: selected ? `2px solid ${theme.palette.primary.main}` : '2px solid transparent',
  boxShadow: selected ? theme.shadows[4] : theme.shadows[1],
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[6],
  },
}));

const TemplateImage = styled(CardMedia)({
  height: 200,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  margin: '10px',
});

function TemplateSelector({ selectedTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean and contemporary design with a focus on readability',
      tags: ['Popular', 'Professional'],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Traditional layout ideal for corporate environments',
      tags: ['Formal', 'Classic'],
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      description: 'Simple and elegant design with plenty of white space',
      tags: ['Clean', 'Modern'],
    },
    {
      id: 'creative',
      name: 'Creative',
      description: 'Unique layout to showcase personality and creativity',
      tags: ['Distinctive', 'Colorful'],
    },
  ];

  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Select a template that best represents your professional style. You can customize colors and fonts after selection.
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} md={3} key={template.id}>
            <TemplateCard selected={selectedTemplate === template.id}>
              <CardActionArea onClick={() => onSelectTemplate(template.id)}>
                <TemplateImage
                  image={templateThumbnails[template.id] || '/templates/default-thumbnail.png'}
                  title={template.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {template.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {template.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {template.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: '0.7rem' }}
                      />
                    ))}
                  </Box>
                </CardContent>
              </CardActionArea>
            </TemplateCard>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default TemplateSelector;