import React from 'react';
import { useSelector } from 'react-redux';
import { 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  Card, 
  CardHeader, 
  CardContent,
  Divider,
  Chip,
  Stack,
  LinearProgress,
  Button,
  IconButton
} from '@mui/material';

import RefreshIcon from '@mui/icons-material/Refresh';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import ChatIcon from '@mui/icons-material/Chat';

import { RootState } from '../../store';
import AttendanceChart from './widgets/AttendanceChart';
import SecurityIncidentsWidget from './widgets/SecurityIncidentsWidget';
import ParkingStatusWidget from './widgets/ParkingStatusWidget';
import ConcessionsSalesWidget from './widgets/ConcessionsSalesWidget';
import KeyEventsWidget from './widgets/KeyEventsWidget';
import CommunicationPreviewWidget from './widgets/CommunicationPreviewWidget';

const Dashboard: React.FC = () => {
  // Example data from Redux store
  const attendance = useSelector((state: RootState) => state.attendance);
  
  // Mock data for other sections
  const securityAlerts = 2;
  const parkingCapacity = 75;
  const concessionsSales = '$45,280';
  const medicalIncidents = 1;
  
  return (
    <Box>
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Game Day Operations Dashboard
        </Typography>
        <Button 
          variant="contained"
          startIcon={<RefreshIcon />}
        >
          Refresh Data
        </Button>
      </Box>
      
      {/* Status Summary Row */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <PeopleIcon color="primary" fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {attendance.currentAttendance.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Current Attendance
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={(attendance.currentAttendance / attendance.totalCapacity) * 100} 
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <SecurityIcon color={securityAlerts > 0 ? "warning" : "primary"} fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {securityAlerts}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Security Alerts
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                {securityAlerts > 0 ? (
                  <Chip 
                    label="Requires Attention" 
                    color="warning" 
                    size="small" 
                    icon={<WarningIcon />} 
                  />
                ) : (
                  <Chip 
                    label="All Clear" 
                    color="success" 
                    size="small" 
                    icon={<CheckCircleIcon />} 
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <LocalParkingIcon color="primary" fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {parkingCapacity}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Parking Utilization
              </Typography>
              <LinearProgress 
                variant="determinate" 
                value={parkingCapacity} 
                sx={{ mt: 1 }}
                color={parkingCapacity > 90 ? "warning" : "primary"}
              />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <FastfoodIcon color="primary" fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {concessionsSales}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Concessions Sales
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                <Chip 
                  label="+12% vs Last Event" 
                  color="success" 
                  size="small" 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} md={4} lg={2.4}>
          <Card>
            <CardContent sx={{ textAlign: 'center', p: 2 }}>
              <MedicalServicesIcon color={medicalIncidents > 0 ? "error" : "primary"} fontSize="large" />
              <Typography variant="h5" sx={{ mt: 1 }}>
                {medicalIncidents}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Active Medical Incidents
              </Typography>
              <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
                {medicalIncidents > 0 ? (
                  <Chip 
                    label="Requires Attention" 
                    color="error" 
                    size="small" 
                    icon={<WarningIcon />} 
                  />
                ) : (
                  <Chip 
                    label="All Clear" 
                    color="success" 
                    size="small" 
                    icon={<CheckCircleIcon />} 
                  />
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Charts & Widgets */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <Card>
            <CardHeader 
              title="Attendance Trends" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <AttendanceChart />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} lg={4}>
          <Card>
            <CardHeader 
              title="Key Events Timeline" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300, overflow: 'auto' }}>
              <KeyEventsWidget />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Security Incidents" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <SecurityIncidentsWidget />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Parking Status" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <ParkingStatusWidget />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Communication Hub" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <CommunicationPreviewWidget />
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardHeader 
              title="Concessions Sales by Location" 
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
            />
            <Divider />
            <CardContent sx={{ height: 300 }}>
              <ConcessionsSalesWidget />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;