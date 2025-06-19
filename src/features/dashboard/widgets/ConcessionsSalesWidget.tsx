import React from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Paper, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  LinearProgress,
} from '@mui/material';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell,
} from 'recharts';

// Mock data for concessions sales
const concessionLocations = [
  { id: 1, name: 'Main Concourse', section: 'A', totalSales: 12650, lastHourSales: 2430, inventoryLevel: 65 },
  { id: 2, name: 'Upper Level East', section: 'B', totalSales: 8720, lastHourSales: 1840, inventoryLevel: 52 },
  { id: 3, name: 'Lower Level West', section: 'C', totalSales: 10340, lastHourSales: 1950, inventoryLevel: 48 },
  { id: 4, name: 'Premium Club', section: 'VIP', totalSales: 7890, lastHourSales: 1240, inventoryLevel: 72 },
  { id: 5, name: 'Food Court', section: 'D', totalSales: 5680, lastHourSales: 980, inventoryLevel: 31 },
];

// Data for bar chart
const salesByCategoryData = [
  { name: 'Beverages', sales: 17500 },
  { name: 'Hot Food', sales: 12300 },
  { name: 'Snacks', sales: 8900 },
  { name: 'Desserts', sales: 5600 },
  { name: 'Alcohol', sales: 11200 },
  { name: 'Merchandise', sales: 7800 },
];

const barColors = ['#1a237e', '#303f9f', '#3f51b5', '#5c6bc0', '#7986cb', '#9fa8da'];

const ConcessionsSalesWidget: React.FC = () => {
  // Format currency
  const formatCurrency = (value: number) => {
    return `$${value.toLocaleString()}`;
  };
  
  // Get inventory level color
  const getInventoryLevelColor = (level: number) => {
    if (level <= 30) return 'error';
    if (level <= 50) return 'warning';
    return 'success';
  };
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Sales by Location
        </Typography>
        <TableContainer component={Paper} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Section</TableCell>
                <TableCell align="right">Total Sales</TableCell>
                <TableCell align="right">Last Hour</TableCell>
                <TableCell align="right">Inventory</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {concessionLocations.map((location) => (
                <TableRow key={location.id}>
                  <TableCell>{location.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={location.section} 
                      size="small" 
                      color={location.section === 'VIP' ? 'secondary' : 'default'} 
                      variant={location.section === 'VIP' ? 'filled' : 'outlined'}
                    />
                  </TableCell>
                  <TableCell align="right">{formatCurrency(location.totalSales)}</TableCell>
                  <TableCell align="right">{formatCurrency(location.lastHourSales)}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={location.inventoryLevel} 
                        color={getInventoryLevelColor(location.inventoryLevel)}
                        sx={{ flexGrow: 1, height: 8, borderRadius: 4 }}
                      />
                      <Typography variant="caption" color={`${getInventoryLevelColor(location.inventoryLevel)}.main`}>
                        {location.inventoryLevel}%
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" gutterBottom>
          Sales by Category
        </Typography>
        <Paper variant="outlined" sx={{ p: 2, height: 'calc(100% - 40px)' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={salesByCategoryData}
              margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                tickMargin={10}
              />
              <YAxis 
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip 
                formatter={(value) => [`$${Number(value).toLocaleString()}`, 'Sales']}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Legend />
              <Bar dataKey="sales" name="Sales Amount" radius={[4, 4, 0, 0]}>
                {salesByCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ConcessionsSalesWidget;