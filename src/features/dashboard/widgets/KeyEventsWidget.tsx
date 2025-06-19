import React from 'react';
import { 
  List, 
  ListItem, 
  ListItemText, 
  ListItemIcon, 
  Chip, 
  Box, 
  Typography,
  Divider 
} from '@mui/material';
import { format, parseISO } from 'date-fns';

// Icons
import SportsBasketballIcon from '@mui/icons-material/SportsBasketball';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DoorBackIcon from '@mui/icons-material/DoorBack';
import MicIcon from '@mui/icons-material/Mic';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import NoMeetingRoomIcon from '@mui/icons-material/NoMeetingRoom';
import RestaurantIcon from '@mui/icons-material/Restaurant';

// Mock data for key events
const keyEvents = [
  {
    id: 1,
    title: 'Doors Open',
    description: 'Main gates open to the public',
    timestamp: '2025-06-19T00:00:00Z',
    icon: <DoorBackIcon />,
    status: 'completed',
  },
  {
    id: 2,
    title: 'Pre-game Entertainment',
    description: 'Live band performance',
    timestamp: '2025-06-19T00:30:00Z',
    icon: <MicIcon />,
    status: 'completed',
  },
  {
    id: 3,
    title: 'Player Warm-ups',
    description: 'Teams on court for warm-up',
    timestamp: '2025-06-19T01:00:00Z',
    icon: <SportsBasketballIcon />,
    status: 'completed',
  },
  {
    id: 4,
    title: 'Game Start',
    description: 'First quarter begins',
    timestamp: '2025-06-19T01:30:00Z',
    icon: <AccessTimeIcon />,
    status: 'in-progress',
  },
  {
    id: 5,
    title: 'Halftime Show',
    description: 'Special performance and activities',
    timestamp: '2025-06-19T02:45:00Z',
    icon: <LocalActivityIcon />,
    status: 'upcoming',
  },
  {
    id: 6,
    title: 'Post-game Ceremony',
    description: 'Awards and recognitions',
    timestamp: '2025-06-19T04:00:00Z',
    icon: <EmojiEventsIcon />,
    status: 'upcoming',
  },
  {
    id: 7,
    title: 'VIP Reception',
    description: 'Private event for sponsors',
    timestamp: '2025-06-19T04:30:00Z',
    icon: <RestaurantIcon />,
    status: 'upcoming',
  },
  {
    id: 8,
    title: 'Venue Closes',
    description: 'All attendees must exit',
    timestamp: '2025-06-19T05:00:00Z',
    icon: <NoMeetingRoomIcon />,
    status: 'upcoming',
  },
];

const KeyEventsWidget: React.FC = () => {
  // Format the timestamp for display
  const formatEventTime = (timestamp: string) => {
    return format(parseISO(timestamp), 'h:mm a');
  };
  
  // Get status chip color and label
  const getStatusChip = (status: string) => {
    switch(status) {
      case 'completed':
        return <Chip label="Completed" size="small" color="success" />;
      case 'in-progress':
        return <Chip label="In Progress" size="small" color="primary" />;
      case 'upcoming':
        return <Chip label="Upcoming" size="small" variant="outlined" />;
      default:
        return null;
    }
  };
  
  return (
    <List sx={{ width: '100%', p: 0 }}>
      {keyEvents.map((event, index) => (
        <React.Fragment key={event.id}>
          <ListItem 
            alignItems="flex-start"
            sx={{ 
              py: 1.5,
              backgroundColor: event.status === 'in-progress' ? 'rgba(25, 118, 210, 0.08)' : 'transparent',
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {event.icon}
            </ListItemIcon>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="subtitle1" component="span">
                    {event.title}
                  </Typography>
                  {getStatusChip(event.status)}
                </Box>
              }
              secondary={
                <React.Fragment>
                  <Typography variant="body2" color="text.primary" component="span">
                    {formatEventTime(event.timestamp)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" component="p">
                    {event.description}
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          {index < keyEvents.length - 1 && <Divider component="li" />}
        </React.Fragment>
      ))}
    </List>
  );
};

export default KeyEventsWidget;