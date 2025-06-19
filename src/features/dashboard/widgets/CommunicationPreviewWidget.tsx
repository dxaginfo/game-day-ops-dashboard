import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Chip, 
  Divider, 
  Button 
} from '@mui/material';
import { Link } from 'react-router-dom';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import ChatIcon from '@mui/icons-material/Chat';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

const CommunicationPreviewWidget: React.FC = () => {
  // In a real app, this would come from Redux
  const messages = useSelector((state: RootState) => 
    state.communication?.messages?.slice(0, 3) || []
  );
  
  const departments = useSelector((state: RootState) => 
    state.communication?.departments || []
  );

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getDepartmentName = (departmentId: string): string => {
    const department = departments.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown';
  };

  const getDepartmentColor = (departmentId: string): string => {
    const department = departments.find(d => d.id === departmentId);
    return department ? department.color : '#757575';
  };

  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        <ChatIcon color="primary" sx={{ mr: 1 }} />
        <Typography variant="h6" component="h2">
          Recent Communications
        </Typography>
      </Box>
      
      <List sx={{ mb: 1 }}>
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <React.Fragment key={message.id}>
              <ListItem alignItems="flex-start" sx={{ py: 1, px: 0 }}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: getDepartmentColor(message.department) }}>
                    {message.sender.charAt(0)}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Typography component="span" variant="subtitle2" sx={{ fontWeight: 'bold', mr: 1 }}>
                        {message.sender}
                      </Typography>
                      <Chip 
                        size="small" 
                        label={getDepartmentName(message.department)} 
                        sx={{ 
                          height: 20, 
                          fontSize: '0.7rem',
                          bgcolor: `${getDepartmentColor(message.department)}20`,
                          color: getDepartmentColor(message.department),
                          mr: 1
                        }} 
                      />
                      {message.isPriority && (
                        <Chip 
                          size="small" 
                          label="Priority" 
                          color="error"
                          icon={<WarningAmberIcon style={{ fontSize: 12 }} />}
                          sx={{ height: 20, fontSize: '0.7rem' }} 
                        />
                      )}
                      <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                        {formatMessageTime(message.timestamp)}
                      </Typography>
                    </Box>
                  }
                  secondary={
                    <Typography
                      sx={{ display: 'inline', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '100%' }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {message.content}
                    </Typography>
                  }
                />
              </ListItem>
              {index < messages.length - 1 && <Divider component="li" />}
            </React.Fragment>
          ))
        ) : (
          <ListItem>
            <ListItemText 
              primary={<Typography color="text.secondary">No recent messages</Typography>} 
            />
          </ListItem>
        )}
      </List>
      
      <Button 
        component={Link} 
        to="/communication" 
        variant="outlined" 
        fullWidth
        startIcon={<ChatIcon />}
      >
        Open Communication Hub
      </Button>
    </Box>
  );
};

export default CommunicationPreviewWidget;