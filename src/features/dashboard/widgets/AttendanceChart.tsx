import React from 'react';
import { useSelector } from 'react-redux';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { format, parseISO } from 'date-fns';
import { Box, Typography } from '@mui/material';

import { RootState } from '../../../store';

// Mock data for the chart
const mockHistoricalData = [
  { timestamp: '2025-06-19T00:15:00Z', attendance: 1500 },
  { timestamp: '2025-06-19T00:30:00Z', attendance: 3200 },
  { timestamp: '2025-06-19T00:45:00Z', attendance: 5800 },
  { timestamp: '2025-06-19T01:00:00Z', attendance: 8400 },
  { timestamp: '2025-06-19T01:15:00Z', attendance: 10200 },
  { timestamp: '2025-06-19T01:30:00Z', attendance: 12600 },
  { timestamp: '2025-06-19T01:45:00Z', attendance: 14200 },
  { timestamp: '2025-06-19T02:00:00Z', attendance: 15800 },
  { timestamp: '2025-06-19T02:15:00Z', attendance: 16200 },
  { timestamp: '2025-06-19T02:30:00Z', attendance: 16500 },
  { timestamp: '2025-06-19T02:45:00Z', attendance: 16800 },
  { timestamp: '2025-06-19T03:00:00Z', attendance: 16900 },
];

const AttendanceChart: React.FC = () => {
  // Get attendance data from Redux store
  const attendanceData = useSelector((state: RootState) => state.attendance);
  
  // Combine real data with mock data (in a real app, this would all come from the store)
  const combinedData = [...mockHistoricalData, {
    timestamp: attendanceData.lastUpdated,
    attendance: attendanceData.currentAttendance
  }];
  
  // Format the timestamp for display in the tooltip
  const formatTime = (timestamp: string) => {
    return format(parseISO(timestamp), 'h:mm a');
  };
  
  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: 'background.paper',
            p: 2,
            border: '1px solid #ccc',
            borderRadius: 1,
            boxShadow: 1,
          }}
        >
          <Typography variant="body2" color="text.primary">
            {formatTime(label)}
          </Typography>
          <Typography variant="body2" color="primary" fontWeight="bold">
            Attendance: {payload[0].value.toLocaleString()}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {Math.round((payload[0].value / attendanceData.totalCapacity) * 100)}% of capacity
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={combinedData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorAttendance" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#1a237e" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#1a237e" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="timestamp"
            tickFormatter={formatTime}
            minTickGap={30}
          />
          <YAxis
            domain={[0, attendanceData.totalCapacity]}
            tickFormatter={(value) => value.toLocaleString()}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="attendance"
            name="Attendance"
            stroke="#1a237e"
            fillOpacity={1}
            fill="url(#colorAttendance)"
          />
          {/* Show capacity threshold line */}
          <CartesianGrid y={attendanceData.totalCapacity} stroke="#ff6f00" strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AttendanceChart;