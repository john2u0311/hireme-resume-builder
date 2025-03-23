import React from 'react';
import { 
  Box, Typography, Paper, Slider, TextField, 
  Grid, FormControl, InputLabel, Select, MenuItem,
  Divider
} from '@mui/material';
import { HexColorPicker } from 'react-colorful';

function ResumeCustomizer({ customization, setCustomization }) {
  const fonts = [
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Raleway',
    'Playfair Display'
  ];
  
  const handleColorChange = (color, type) => {
    setCustomization({
      ...customization,
      [type]: color
    });
  };
  
  const handleFontChange = (event) => {
    setCustomization({
      ...customization,
      font: event.target.value
    });
  };
  
  const handleSpacingChange = (event, newValue) => {
    setCustomization({
      ...customization,
      spacing: newValue
    });
  };
  
  const handleMarginChange = (event, newValue) => {
    setCustomization({
      ...customization,
      margin: newValue
    });
  };
  
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customize Your Resume
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <Grid container spacing={4}>
        {/* Primary Color */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Primary Color
          </Typography>
          <Box sx={{ mb: 2 }}>
            <HexColorPicker 
              color={customization.primaryColor || '#2196f3'} 
              onChange={(color) => handleColorChange(color, 'primaryColor')}
              style={{ width: '100%', height: 170 }}
            />
          </Box>
          <TextField
            fullWidth
            size="small"
            value={customization.primaryColor || '#2196f3'}
            onChange={(e) => handleColorChange(e.target.value, 'primaryColor')}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: customization.primaryColor || '#2196f3',
                },
              },
            }}
          />
        </Grid>
        
        {/* Secondary Color */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Secondary Color
          </Typography>
          <Box sx={{ mb: 2 }}>
            <HexColorPicker 
              color={customization.secondaryColor || '#f50057'} 
              onChange={(color) => handleColorChange(color, 'secondaryColor')}
              style={{ width: '100%', height: 170 }}
            />
          </Box>
          <TextField
            fullWidth
            size="small"
            value={customization.secondaryColor || '#f50057'}
            onChange={(e) => handleColorChange(e.target.value, 'secondaryColor')}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: customization.secondaryColor || '#f50057',
                },
              },
            }}
          />
        </Grid>
        
        {/* Font and Spacing */}
        <Grid item xs={12} sm={6} md={4}>
          <Typography variant="subtitle1" gutterBottom>
            Typography & Layout
          </Typography>
          
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="font-select-label">Font</InputLabel>
            <Select
              labelId="font-select-label"
              value={customization.font || 'Roboto'}
              label="Font"
              onChange={handleFontChange}
            >
              {fonts.map((font) => (
                <MenuItem key={font} value={font} style={{ fontFamily: font }}>
                  {font}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          
          <Typography gutterBottom>Line Spacing</Typography>
          <Slider
            value={customization.spacing || 1.5}
            min={1}
            max={2.5}
            step={0.1}
            onChange={handleSpacingChange}
            valueLabelDisplay="auto"
            aria-labelledby="line-spacing-slider"
            sx={{ mb: 3 }}
          />
          
          <Typography gutterBottom>Margins (mm)</Typography>
          <Slider
            value={customization.margin || 30}
            min={10}
            max={50}
            step={5}
            onChange={handleMarginChange}
            valueLabelDisplay="auto"
            aria-labelledby="margin-slider"
          />
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="body2" color="text.secondary">
          Tip: Choose colors that complement each other. For a professional look, use a darker color for headings and a lighter accent color for details.
        </Typography>
      </Box>
    </Paper>
  );
}

export default ResumeCustomizer;