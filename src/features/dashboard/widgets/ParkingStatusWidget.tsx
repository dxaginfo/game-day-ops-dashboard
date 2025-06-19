import React from 'react';
import { Box, Grid, Typography, LinearProgress, Paper } from '@mui/material';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import TimeToLeaveIcon from '@mui/icons-material/TimeToLeave';

// Mock data for parking status
const parkingLots = [
  {
    id: 1,
    name: 'North Lot',
    capacity: 500,
    occupied: 487,
    type: 'general',
    shuttleStatus: 'Normal',
    trafficLevel: 'High',
  },
  {
    id: 2,
    name: 'South Lot',
    capacity: 400,
    occupied: 342,
    type: 'general',
    shuttleStatus: 'Delayed',
    trafficLevel: 'Medium',
  },
  {
    id: 3,
    name: 'East Garage',
    capacity: 300,
    occupied: 289,
    type: 'vip',
    shuttleStatus: 'Normal',
    trafficLevel: 'Medium',
  },
  {
    id: 4,
    name: 'West Lot',
    capacity: 250,
    occupied: 118,
    type: 'general',
    shuttleStatus: 'Normal',
    trafficLevel: 'Low',
  },
];

const ParkingStatusWidget: React.FC = () => {
  // Calculate utilization percentage
  const getUtilizationPercentage = (occupied: number, capacity: number) => {
    return Math.round((occupied / capacity) * 100);
  };
  
  // Determine color based on utilization
  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 90) return 'error';
    if (percentage >= 75) return 'warning';
    return 'success';
  };
  
  // Get traffic level icon and color
  const getTrafficLevelIcon = (level: string) => {
    switch (level) {
      case 'High':
        return <TimeToLeaveIcon color="error" />;
      case 'Medium':
        return <TimeToLeaveIcon color="warning" />;
      case 'Low':
        return <TimeToLeaveIcon color="success" />;
      default:
        return <TimeToLeaveIcon />;
    }
  };
  
  // Get shuttle status icon and color
  const getShuttleStatusIcon = (status: string) => {
    switch (status) {
      case 'Delayed':
        return <DirectionsBusIcon color="warning" />;
      case 'Normal':
        return <DirectionsBusIcon color="success" />;
      default:
        return <DirectionsBusIcon />;
    }
  };
  
  return (
    <Grid container spacing={2}>
      {parkingLots.map((lot) => {
        const utilizationPercentage = getUtilizationPercentage(lot.occupied, lot.capacity);
        const utilizationColor = getUtilizationColor(utilizationPercentage);
        
        return (
          <Grid item xs={12} sm={6} key={lot.id}>
            <Paper 
              elevation={0} 
              variant="outlined" 
              sx={{ 
                p: 2,
                borderColor: lot.type === 'vip' ? 'secondary.main' : 'divider',
                borderWidth: lot.type === 'vip' ? 2 : 1,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Typography variant="subtitle1">
                  {lot.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <LocalParkingIcon 
                    fontSize="small" 
                    color={lot.type === 'vip' ? 'secondary' : 'primary'} 
                  />
                  <Typography variant="caption" color="text.secondary">
                    {lot.type === 'vip' ? 'VIP' : 'General'}
                  </Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Capacity: {lot.occupied} / {lot.capacity}
                  </Typography>
                  <Typography variant="body2" fontWeight="bold" color={`${utilizationColor}.main`}>
                    {utilizationPercentage}%
                  </Typography>
                </Box>
                <LinearProgress 
                  variant="determinate" 
                  value={utilizationPercentage} 
                  color={utilizationColor}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getTrafficLevelIcon(lot.trafficLevel)}
                  <Typography variant="caption" color="text.secondary">
                    Traffic: {lot.trafficLevel}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  {getShuttleStatusIcon(lot.shuttleStatus)}
                  <Typography variant="caption" color="text.secondary">
                    Shuttle: {lot.shuttleStatus}
                  </Typography>
                </Box>
              </Box>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default ParkingStatusWidget;