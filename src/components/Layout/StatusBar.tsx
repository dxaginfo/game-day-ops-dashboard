import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  Box,
  Typography,
  Badge,
  IconButton,
  Chip,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import { format } from 'date-fns';

// Icons
import NotificationsIcon from '@mui/icons-material/Notifications';
import WarningIcon from '@mui/icons-material/Warning';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

import { RootState } from '../../store';

const StatusBar: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  // Mocked notification count, will come from Redux in real implementation
  const notificationCount = 3;
  
  // Mocked event status, will come from Redux in real implementation
  const eventStatus = 'In Progress';
  
  // Get attendance data from Redux store
  const attendanceData = useSelector((state: RootState) => state.attendance);
  
  // Update the time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const handleNotificationsClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleNotificationsClose = () => {
    setAnchorEl(null);
  };
  
  const formattedTime = format(currentTime, 'PPp');
  const occupancyPercentage = Math.round((attendanceData.currentAttendance / attendanceData.totalCapacity) * 100);
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
      <Chip 
        icon={<AccessTimeIcon />} 
        label={formattedTime}
        variant="outlined"
        color="primary"
        size="small"
      />
      
      <Chip 
        label={`Event: ${eventStatus}`}
        color="success"
        size="small"
      />
      
      <Chip 
        label={`Occupancy: ${occupancyPercentage}%`}
        color={occupancyPercentage > 90 ? 'warning' : 'default'}
        size="small"
      />
      
      <IconButton 
        color="inherit" 
        onClick={handleNotificationsClick}
      >
        <Badge badgeContent={notificationCount} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>
      
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleNotificationsClose}
        sx={{ mt: 2 }}
      >
        <MenuItem onClick={handleNotificationsClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="warning" fontSize="small" />
            <Typography variant="body2">Gate B experiencing slowdown</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNotificationsClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="error" fontSize="small" />
            <Typography variant="body2">Medical incident reported at Section 103</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleNotificationsClose}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <WarningIcon color="info" fontSize="small" />
            <Typography variant="body2">Concessions inventory low for location C4</Typography>
          </Box>
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default StatusBar;