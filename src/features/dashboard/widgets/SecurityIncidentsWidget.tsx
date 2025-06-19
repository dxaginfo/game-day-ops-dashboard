import React from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemIcon, Chip, Divider } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock data for security incidents
const securityIncidents = [
  {
    id: 1,
    type: 'Unauthorized Access',
    location: 'Gate B',
    status: 'resolved',
    assignedTo: 'Team Alpha',
    timestamp: '12:45 PM',
    description: 'Individual attempted to enter with invalid ticket. Issue resolved.',
  },
  {
    id: 2,
    type: 'Disruptive Behavior',
    location: 'Section 224',
    status: 'in-progress',
    assignedTo: 'Team Bravo',
    timestamp: '1:22 PM',
    description: 'Verbal altercation between fans. Security team dispatched.',
  },
  {
    id: 3,
    type: 'Medical Assistance',
    location: 'Concourse Level 2',
    status: 'in-progress',
    assignedTo: 'Medical Team',
    timestamp: '1:30 PM',
    description: 'Fan experiencing dizziness. Medical staff providing assistance.',
  },
];

const SecurityIncidentsWidget: React.FC = () => {
  return (
    <Box sx={{ height: '100%' }}>
      <List sx={{ width: '100%', p: 0 }}>
        {securityIncidents.map((incident, index) => (
          <React.Fragment key={incident.id}>
            <ListItem 
              alignItems="flex-start" 
              sx={{ 
                py: 1.5,
                backgroundColor: incident.status === 'in-progress' ? 'rgba(255, 152, 0, 0.08)' : 'transparent',
              }}
            >
              <ListItemIcon>
                <WarningIcon color={incident.status === 'in-progress' ? 'warning' : 'success'} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="subtitle1">
                      {incident.type}
                    </Typography>
                    <Chip 
                      label={incident.status === 'in-progress' ? 'Active' : 'Resolved'} 
                      color={incident.status === 'in-progress' ? 'warning' : 'success'} 
                      size="small" 
                      icon={incident.status === 'in-progress' ? <WarningIcon /> : <CheckCircleIcon />}
                    />
                  </Box>
                }
                secondary={
                  <React.Fragment>
                    <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LocationOnIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {incident.location}
                      </Typography>
                    </Box>
                    <Box sx={{ mt: 0.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PersonIcon fontSize="small" color="action" />
                      <Typography variant="body2" color="text.secondary">
                        {incident.assignedTo}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {incident.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                      Reported at {incident.timestamp}
                    </Typography>
                  </React.Fragment>
                }
              />
            </ListItem>
            {index < securityIncidents.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );
};

export default SecurityIncidentsWidget;