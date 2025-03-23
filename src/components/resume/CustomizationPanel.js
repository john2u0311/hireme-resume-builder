import React, { useState } from 'react';
import { 
  Box, Typography, Paper, Slider, Grid, 
  FormControl, InputLabel, Select, MenuItem,
  TextField, Button, Divider, Chip
} from '@mui/material';
import { SketchPicker } from 'react-color';
import { predefinedThemes } from '../../utils/themes';

function CustomizationPanel({ customization, onUpdateCustomization }) {
  const [colorPickerOpen, setColorPickerOpen] = useState(null);
  
  const handleColorChange = (color, type) => {
    onUpdateCustomization({
      ...customization,
      [type]: color.hex
    });
  };
  
  const handleFontChange = (event) => {
    onUpdateCustomization({
      ...customization,
      font: event.target.value
    });
  };
  
  const handleSpacingChange = (event, newValue) => {
    onUpdateCustomization({
      ...customization,
      spacing: newValue
    });
  };
  
  const handleMarginChange = (event, newValue) => {
    onUpdateCustomization({
      ...customization,
      margin: newValue
    });
  };
  
  const handleApplyTheme = (theme) => {
    onUpdateCustomization({
      ...customization,
      ...theme
    });
  };
  
  return (
    <Paper sx={{ p: 3, mt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Customize Your Resume
      </Typography>
      
      {/* Predefined Themes */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Themes
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {predefinedThemes.map((theme, index) => (
            <Chip
              key={index}
              label={theme.name}
              onClick={() => handleApplyTheme(theme)}
              sx={{
                bgcolor: theme.primaryColor,
                color: '#fff',
                '&:hover': {
                  bgcolor: theme.primaryColor,
                  opacity: 0.9
                }
              }}
            />
          ))}
        </Box>
      </Box>
      
      <Divider sx={{ my: 2 }} />
      
      {/* Colors */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Primary Color
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 40,
              bgcolor: customization.primaryColor || '#2196f3',
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #ddd'
            }}
            onClick={() => setColorPickerOpen('primaryColor')}
          />
          {colorPickerOpen === 'primaryColor' && (
            <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
              <Box
                sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
                onClick={() => setColorPickerOpen(null)}
              />
              <SketchPicker
                color={customization.primaryColor || '#2196f3'}
                onChange={(color) => handleColorChange(color, 'primaryColor')}
              />
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <Typography variant="subtitle1" gutterBottom>
            Secondary Color
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 40,
              bgcolor: customization.secondaryColor || '#f50057',
              borderRadius: 1,
              cursor: 'pointer',
              border: '1px solid #ddd'
            }}
            onClick={() => setColorPickerOpen('secondaryColor')}
          />
          {colorPickerOpen === 'secondaryColor' && (
            <Box sx={{ position: 'absolute', zIndex: 2, mt: 1 }}>
              <Box
                sx={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
                onClick={() => setColorPickerOpen(null)}
              />
              <SketchPicker
                color={customization.secondaryColor || '#f50057'}
                onChange={(color) => handleColorChange(color, 'secondaryColor')}
              />
            </Box>
          )}
        </Grid>
      </Grid>
      
      {/* Font */}
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="font-select-label">Font</InputLabel>
        <Select
          labelId="font-select-label"
          value={customization.font || 'Roboto'}
          label="Font"
          onChange={handleFontChange}
        >
          <MenuItem value="Roboto">Roboto</MenuItem>
          <MenuItem value="Open Sans">Open Sans</MenuItem>
          <MenuItem value="Lato">Lato</MenuItem>
          <MenuItem value="Montserrat">Montserrat</MenuItem>
          <MenuItem value="Raleway">Raleway</MenuItem>
          <MenuItem value="Playfair Display">Playfair Display</MenuItem>
        </Select>
      </FormControl>
      
      {/* Spacing */}
      <Typography variant="subtitle1" gutterBottom>
        Line Spacing
      </Typography>
      <Slider
        value={customization.spacing || 1.5}
        min={1}
        max={2.5}
        step={0.1}
        onChange={handleSpacingChange}
        valueLabelDisplay="auto"
        sx={{ mb: 3 }}
      />
      
      {/* Margins */}
      <Typography variant="subtitle1" gutterBottom>
        Margins
      </Typography>
      <Slider
        value={customization.margin || 30}
        min={10}
        max={50}
        step={5}
        onChange={handleMarginChange}
        valueLabelDisplay="auto"
        sx={{ mb: 3 }}
      />
      
      {/* Reset Button */}
      <Button 
        variant="outlined" 
        color="error"
        onClick={() => onUpdateCustomization({
          primaryColor: '#2196f3',
          secondaryColor: '#f50057',
          font: 'Roboto',
          spacing: 1.5,
          margin: 30
        })}
        sx={{ mt: 2 }}
      >
        Reset to Default
      </Button>
    </Paper>
  );
}

export default CustomizationPanel;