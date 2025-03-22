import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper sx={{ p: 4, borderRadius: 2 }}>
          <Typography variant="h3" gutterBottom>
            About Us
          </Typography>
          <Typography paragraph>
            We help job seekers create professional resumes that stand out. Our easy-to-use builder 
            combines beautiful templates with AI-powered suggestions to help you make the perfect resume.
          </Typography>
          <Typography paragraph>
            Our templates are designed to be ATS-friendly while maintaining a modern, professional look 
            that hiring managers love.
          </Typography>
        </Paper>
      </Container>
    </motion.div>
  );
}

export default About;