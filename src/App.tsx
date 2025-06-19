import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Layout from './components/Layout';
import Dashboard from './features/dashboard/Dashboard';
import AttendanceMonitor from './features/attendance/AttendanceMonitor';
import SecurityDashboard from './features/security/SecurityDashboard';
import ConcessionsDashboard from './features/concessions/ConcessionsDashboard';
import ParkingMonitor from './features/parking/ParkingMonitor';
import MedicalMonitor from './features/medical/MedicalMonitor';
import TimelineManager from './features/timeline/TimelineManager';
import VenueMap from './features/map/VenueMap';
import CommunicationHub from './features/communication/CommunicationHub';
import Settings from './features/settings/Settings';
import NotFound from './components/NotFound';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="attendance" element={<AttendanceMonitor />} />
        <Route path="security" element={<SecurityDashboard />} />
        <Route path="concessions" element={<ConcessionsDashboard />} />
        <Route path="parking" element={<ParkingMonitor />} />
        <Route path="medical" element={<MedicalMonitor />} />
        <Route path="timeline" element={<TimelineManager />} />
        <Route path="map" element={<VenueMap />} />
        <Route path="communication" element={<CommunicationHub />} />
        <Route path="settings" element={<Settings />} />
        <Route path="404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Route>
    </Routes>
  );
};

export default App;