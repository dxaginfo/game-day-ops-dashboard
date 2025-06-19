import { configureStore } from '@reduxjs/toolkit';
import attendanceReducer from './slices/attendanceSlice';
import securityReducer from './slices/securitySlice';
import concessionsReducer from './slices/concessionsSlice';
import parkingReducer from './slices/parkingSlice';
import medicalReducer from './slices/medicalSlice';
import timelineReducer from './slices/timelineSlice';
import communicationReducer from './slices/communicationSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    attendance: attendanceReducer,
    security: securityReducer,
    concessions: concessionsReducer,
    parking: parkingReducer,
    medical: medicalReducer,
    timeline: timelineReducer,
    communication: communicationReducer,
    ui: uiReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;