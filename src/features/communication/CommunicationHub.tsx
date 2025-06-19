import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Divider, 
  Grid, 
  Avatar, 
  TextField, 
  Button, 
  List, 
  ListItem, 
  ListItemAvatar, 
  ListItemText, 
  IconButton, 
  Tabs, 
  Tab,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';
import FilterListIcon from '@mui/icons-material/FilterList';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import AnnouncementIcon from '@mui/icons-material/Announcement';

// Types
interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isPriority: boolean;
  department: string;
  avatar?: string;
}

interface Department {
  id: string;
  name: string;
  color: string;
}

// Mock data
const MOCK_DEPARTMENTS: Department[] = [
  { id: '1', name: 'Security', color: '#f44336' },
  { id: '2', name: 'Concessions', color: '#ff9800' },
  { id: '3', name: 'Ticketing', color: '#2196f3' },
  { id: '4', name: 'Medical', color: '#4caf50' },
  { id: '5', name: 'Facilities', color: '#9c27b0' },
  { id: '6', name: 'Management', color: '#795548' },
];

const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    sender: 'John Smith',
    content: 'Gate A is now at 90% capacity, consider redirecting to Gate C',
    timestamp: new Date(new Date().getTime() - 15 * 60000),
    isPriority: true,
    department: '1',
  },
  {
    id: '2',
    sender: 'Sarah Johnson',
    content: 'Concession stand 12 is running low on hot dogs, sending restock',
    timestamp: new Date(new Date().getTime() - 25 * 60000),
    isPriority: false,
    department: '2',
  },
  {
    id: '3',
    sender: 'Michael Chen',
    content: 'VIP entrance needs additional staff for next 30 minutes',
    timestamp: new Date(new Date().getTime() - 32 * 60000),
    isPriority: false,
    department: '3',
  },
  {
    id: '4',
    sender: 'Dr. Williams',
    content: 'Medical incident reported in Section 214, team dispatched',
    timestamp: new Date(new Date().getTime() - 45 * 60000),
    isPriority: true,
    department: '4',
  },
  {
    id: '5',
    sender: 'Robert Garcia',
    content: 'Water spill near restroom in West Concourse, cleanup needed',
    timestamp: new Date(new Date().getTime() - 58 * 60000),
    isPriority: false,
    department: '5',
  },
  {
    id: '6',
    sender: 'Lisa Adams',
    content: 'ANNOUNCEMENT: Halftime show will begin in 10 minutes',
    timestamp: new Date(new Date().getTime() - 65 * 60000),
    isPriority: false,
    department: '6',
  },
];

// Component
const CommunicationHub: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState('');
  const [isPriority, setIsPriority] = useState(false);
  const [tabValue, setTabValue] = useState(0);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message: Message = {
      id: Date.now().toString(),
      sender: 'You',
      content: newMessage,
      timestamp: new Date(),
      isPriority: isPriority,
      department: selectedDepartment || '6', // Default to Management
    };

    setMessages([message, ...messages]);
    setNewMessage('');
    setIsPriority(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleDepartmentChange = (event: SelectChangeEvent) => {
    setSelectedDepartment(event.target.value);
  };

  const getDepartmentColor = (departmentId: string): string => {
    const department = MOCK_DEPARTMENTS.find(d => d.id === departmentId);
    return department ? department.color : '#757575';
  };

  const getDepartmentName = (departmentId: string): string => {
    const department = MOCK_DEPARTMENTS.find(d => d.id === departmentId);
    return department ? department.name : 'Unknown';
  };

  const formatMessageTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const filteredMessages = messages.filter(message => {
    if (tabValue === 1 && !message.isPriority) return false;
    if (tabValue === 2 && !message.content.toUpperCase().includes('ANNOUNCEMENT')) return false;
    if (filter && !getDepartmentName(message.department).toLowerCase().includes(filter.toLowerCase())) return false;
    return true;
  });

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper elevation={0} sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6">Communication Hub</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="Filter by department"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            sx={{ mr: 1 }}
            InputProps={{
              startAdornment: <FilterListIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
          />
          <IconButton aria-label="refresh">
            <RefreshIcon />
          </IconButton>
        </Box>
      </Paper>
      
      <Tabs value={tabValue} onChange={handleTabChange} sx={{ px: 2 }}>
        <Tab label="All Messages" />
        <Tab 
          label="Priorities" 
          icon={<WarningAmberIcon color="warning" />} 
          iconPosition="start"
        />
        <Tab 
          label="Announcements" 
          icon={<AnnouncementIcon color="info" />} 
          iconPosition="start"
        />
      </Tabs>
      
      <Divider />
      
      <List sx={{ flexGrow: 1, overflow: 'auto', py: 0 }}>
        {filteredMessages.map((message) => (
          <React.Fragment key={message.id}>
            <ListItem alignItems="flex-start" sx={{ py: 1.5 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: getDepartmentColor(message.department) }}>
                  {message.avatar ? (
                    <img src={message.avatar} alt={message.sender} />
                  ) : (
                    <PersonIcon />
                  )}
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
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {message.content}
                  </Typography>
                }
              />
            </ListItem>
            <Divider component="li" />
          </React.Fragment>
        ))}
      </List>
      
      <Divider />
      
      <Grid container spacing={1} sx={{ p: 2 }}>
        <Grid item xs={3} sm={2}>
          <FormControl fullWidth size="small">
            <InputLabel id="department-select-label">Dept.</InputLabel>
            <Select
              labelId="department-select-label"
              id="department-select"
              value={selectedDepartment}
              label="Dept."
              onChange={handleDepartmentChange}
            >
              {MOCK_DEPARTMENTS.map((department) => (
                <MenuItem key={department.id} value={department.id}>
                  {department.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={7} sm={8}>
          <TextField
            fullWidth
            multiline
            maxRows={3}
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            size="small"
          />
        </Grid>
        <Grid item xs={2} sm={2} container spacing={1}>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant={isPriority ? "contained" : "outlined"}
              color="warning"
              onClick={() => setIsPriority(!isPriority)}
              sx={{ height: '100%' }}
            >
              <WarningAmberIcon />
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ''}
              sx={{ height: '100%' }}
            >
              <SendIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CommunicationHub;