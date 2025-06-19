import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AttendanceData {
  totalCapacity: number;
  currentAttendance: number;
  entryRates: Record<string, number>; // entries per minute by gate
  gateStatus: Record<string, 'open' | 'closed' | 'limited'>;
  historicalData: {
    timestamp: string;
    attendance: number;
  }[];
  lastUpdated: string;
}

const initialState: AttendanceData = {
  totalCapacity: 20000,
  currentAttendance: 0,
  entryRates: {
    'Gate A': 0,
    'Gate B': 0,
    'Gate C': 0,
    'Gate D': 0,
  },
  gateStatus: {
    'Gate A': 'open',
    'Gate B': 'open',
    'Gate C': 'open',
    'Gate D': 'open',
  },
  historicalData: [],
  lastUpdated: new Date().toISOString(),
};

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    updateAttendance: (state, action: PayloadAction<number>) => {
      state.currentAttendance = action.payload;
      state.lastUpdated = new Date().toISOString();
      state.historicalData.push({
        timestamp: state.lastUpdated,
        attendance: state.currentAttendance
      });
    },
    updateEntryRate: (state, action: PayloadAction<{ gate: string; rate: number }>) => {
      const { gate, rate } = action.payload;
      state.entryRates[gate] = rate;
      state.lastUpdated = new Date().toISOString();
    },
    updateGateStatus: (state, action: PayloadAction<{ gate: string; status: 'open' | 'closed' | 'limited' }>) => {
      const { gate, status } = action.payload;
      state.gateStatus[gate] = status;
      state.lastUpdated = new Date().toISOString();
    },
    resetAttendance: (state) => {
      state.currentAttendance = 0;
      state.historicalData = [];
      state.lastUpdated = new Date().toISOString();
      Object.keys(state.entryRates).forEach(gate => {
        state.entryRates[gate] = 0;
      });
    },
  },
});

export const { 
  updateAttendance, 
  updateEntryRate, 
  updateGateStatus, 
  resetAttendance 
} = attendanceSlice.actions;

export default attendanceSlice.reducer;