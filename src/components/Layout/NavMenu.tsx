import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText,
  Divider,
} from '@mui/material';

// Icons
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import TimelineIcon from '@mui/icons-material/Timeline';
import MapIcon from '@mui/icons-material/Map';
import ForumIcon from '@mui/icons-material/Forum';
import SettingsIcon from '@mui/icons-material/Settings';

interface NavItem {
  text: string;
  path: string;
  icon: React.ReactNode;
}

const primaryNavItems: NavItem[] = [
  { text: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { text: 'Attendance', path: '/attendance', icon: <PeopleIcon /> },
  { text: 'Security', path: '/security', icon: <SecurityIcon /> },
  { text: 'Concessions', path: '/concessions', icon: <FastfoodIcon /> },
  { text: 'Parking', path: '/parking', icon: <LocalParkingIcon /> },
  { text: 'Medical', path: '/medical', icon: <MedicalServicesIcon /> },
];

const secondaryNavItems: NavItem[] = [
  { text: 'Timeline', path: '/timeline', icon: <TimelineIcon /> },
  { text: 'Venue Map', path: '/map', icon: <MapIcon /> },
  { text: 'Communication', path: '/communication', icon: <ForumIcon /> },
  { text: 'Settings', path: '/settings', icon: <SettingsIcon /> },
];

const NavMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div>
      <List>
        {primaryNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {secondaryNavItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              onClick={() => handleNavigation(item.path)}
              selected={isActive(item.path)}
            >
              <ListItemIcon>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default NavMenu;