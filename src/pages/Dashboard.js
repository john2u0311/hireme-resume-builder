import React, { useState, useEffect } from 'react';
import { 
  Container, Typography, Paper, Grid, Card, CardContent, 
  Box, Divider, List, ListItem, ListItemText, Button,
  CircularProgress, Tooltip, IconButton
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, 
  ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts';
import { 
  CloudDownload as DownloadIcon,
  Refresh as RefreshIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { getUsageStats, resetAnalytics } from '../utils/analyticsUtils';
import { getSavedResumes, exportAllResumes } from '../utils/storageUtils';
import { saveAs } from 'file-saver';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Get analytics data
        const usageStats = getUsageStats();
        setStats(usageStats);
        
        // Get saved resumes
        const resumes = getSavedResumes();
        setSavedResumes(resumes);
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [refreshKey]);

  const handleRefresh = () => {
    setRefreshKey(prevKey => prevKey + 1);
  };

  const handleExportAllResumes = () => {
    try {
      const blob = exportAllResumes();
      saveAs(blob, `resume_backup_${new Date().toISOString().split('T')[0]}.json`);
    } catch (error) {
      console.error('Failed to export resumes:', error);
    }
  };

  const handleResetAnalytics = () => {
    if (window.confirm('Are you sure you want to reset all analytics data? This cannot be undone.')) {
      resetAnalytics();
      handleRefresh();
    }
  };

  // Prepare chart data
  const prepareTemplateData = () => {
    if (!stats || !stats.templateUsage) return [];
    
    return Object.entries(stats.templateUsage).map(([template, count]) => ({
      name: template,
      value: count
    }));
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, textAlign: 'center' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ mt: 2 }}>Loading dashboard data...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Dashboard
        </Typography>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<DownloadIcon />} 
            onClick={handleExportAllResumes}
            sx={{ mr: 2 }}
          >
            Export All Resumes
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<RefreshIcon />} 
            onClick={handleRefresh}
          >
            Refresh
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Resumes
              </Typography>
              <Typography variant="h3">
                {stats?.totalResumes || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Downloads
              </Typography>
              <Typography variant="h3">
                {stats?.totalDownloads || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Conversion Rate
              </Typography>
              <Typography variant="h3">
                {stats?.conversionRate || 0}%
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Days Using App
              </Typography>
              <Typography variant="h3">
                {stats?.usageDays || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Template Usage Chart */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Template Usage
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={prepareTemplateData()}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {prepareTemplateData().map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Top Skills */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Top Skills
            </Typography>
            {stats?.topSkills && stats.topSkills.length > 0 ? (
              <List>
                {stats.topSkills.map((skill, index) => (
                  <ListItem key={index} divider={index < stats.topSkills.length - 1}>
                    <ListItemText 
                      primary={skill} 
                      secondary={`Rank #${index + 1}`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                No skills data available yet.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Recent Resumes */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Recent Resumes
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Total: {savedResumes.length}
              </Typography>
            </Box>
            <Divider />
            {savedResumes.length > 0 ? (
              <List>
                {savedResumes.slice(0, 5).map((resume, index) => (
                  <ListItem key={index} divider={index < Math.min(savedResumes.length, 5) - 1}>
                    <ListItemText 
                      primary={resume.name} 
                      secondary={`Last modified: ${new Date(resume.date).toLocaleString()}`} 
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
                No saved resumes found.
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Admin Actions */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Advanced Options
            </Typography>
            <Button 
              variant="outlined" 
              color="error" 
              onClick={handleResetAnalytics}
              sx={{ mr: 2 }}
            >
              Reset Analytics Data
            </Button>
            <Tooltip title="This will permanently delete all analytics data but will not affect your saved resumes.">
              <IconButton>
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Dashboard;