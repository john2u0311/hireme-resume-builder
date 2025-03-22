import React from 'react';
import { Grid, TextField } from '@mui/material';

function PersonalInfo({ formData, handleChange }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          value={formData.firstName || ''}
          onChange={handleChange}
          error={!formData.firstName}
          helperText={!formData.firstName ? 'First name is required' : ''}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          required
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          value={formData.lastName || ''}
          onChange={handleChange}
          error={!formData.lastName}
          helperText={!formData.lastName ? 'Last name is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formData.email || ''}
          onChange={handleChange}
          error={!formData.email}
          helperText={!formData.email ? 'Email is required' : ''}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          required
          fullWidth
          id="phone"
          name="phone"
          label="Phone"
          value={formData.phone || ''}
          onChange={handleChange}
          error={!formData.phone}
          helperText={!formData.phone ? 'Phone is required' : ''}
        />
      </Grid>
    </Grid>
  );
}

export default PersonalInfo;