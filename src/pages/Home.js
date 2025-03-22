import React from 'react';
import { Container, Typography, Button, Box, Grid, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4]
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
  padding: `${theme.spacing(1.5)} ${theme.spacing(4)}`,
  borderRadius: theme.shape.borderRadius * 2,
  fontSize: '1.2rem'
}));

function Home() {
  const features = [
    {
      title: 'Professional Templates',
      description: 'Choose from our collection of ATS-friendly templates',
      icon: '📄'
    },
    {
      title: 'Easy Customization',
      description: 'Personalize colors, fonts, and layout to match your style',
      icon: '🎨'
    },
    {
      title: 'PDF Export',
      description: 'Download your resume in high-quality PDF format',
      icon: '⬇️'
    }
  ];

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            gutterBottom
            sx={{ 
              fontWeight: 700,
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Create Your Professional Resume
          </Typography>
          <Typography 
            variant="h5" 
            component="h2" 
            gutterBottom 
            color="textSecondary"
            sx={{ mb: 4 }}
          >
            Build a stunning resume in minutes with our easy-to-use builder
          </Typography>
          <StyledButton
            component={Link}
            to="/builder"
            variant="contained"
            size="large"
          >
            Get Started
          </StyledButton>
        </motion.div>

        <Grid container spacing={4} sx={{ mt: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <StyledPaper elevation={2}>
                  <Typography variant="h1" sx={{ fontSize: '3rem', mb: 2 }}>
                    {feature.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography color="textSecondary">
                    {feature.description}
                  </Typography>
                </StyledPaper>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;