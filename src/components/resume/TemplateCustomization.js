import React from 'react';
import { Box, Typography, Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TemplateCustomization({ customization, setCustomization }) {
  return (
    <Box sx={{ mb: 3, p: 2, border: '1px solid #eee', borderRadius: 1 }}>
      <Typography variant="h6" gutterBottom>Customize Template</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <FormControl fullWidth>
            <InputLabel>Font</InputLabel>
            <Select
              value={customization.font}
              onChange={(e) => setCustomization({...customization, font: e.target.value})}
            >
              <MenuItem value="Helvetica">Helvetica</MenuItem>
              <MenuItem value="Times-Roman">Times Roman</MenuItem>
              <MenuItem value="Courier">Courier</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Primary Color</Typography>
          <input
            type="color"
            value={customization.primaryColor}
            onChange={(e) => setCustomization({
              ...customization,
              primaryColor: e.target.value
            })}
            style={{ width: '100%', height: 40 }}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography gutterBottom>Secondary Color</Typography>
          <input
            type="color"
            value={customization.secondaryColor}
            onChange={(e) => setCustomization({
              ...customization,
              secondaryColor: e.target.value
            })}
            style={{ width: '100%', height: 40 }}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

export default TemplateCustomization;