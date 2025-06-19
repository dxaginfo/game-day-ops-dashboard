import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

// Types
export interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isPriority: boolean;
  department: string;
  avatar?: string;
}

export interface Department {
  id: string;
  name: string;
  color: string;
}

export interface CommunicationState {
  messages: Message[];
  departments: Department[];
  isLoading: boolean;
  error: string | null;
}

// Initial mock data
const initialDepartments: Department[] = [
  { id: '1', name: 'Security', color: '#f44336' },
  { id: '2', name: 'Concessions', color: '#ff9800' },
  { id: '3', name: 'Ticketing', color: '#2196f3' },
  { id: '4', name: 'Medical', color: '#4caf50' },
  { id: '5', name: 'Facilities', color: '#9c27b0' },
  { id: '6', name: 'Management', color: '#795548' },
];

const initialMessages: Message[] = [
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

const initialState: CommunicationState = {
  messages: initialMessages,
  departments: initialDepartments,
  isLoading: false,
  error: null,
};

// Input type for sending a new message
export interface SendMessagePayload {
  content: string;
  sender: string;
  isPriority: boolean;
  department: string;
}

// Create the slice
const communicationSlice = createSlice({
  name: 'communication',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<SendMessagePayload>) => {
      const { content, sender, isPriority, department } = action.payload;
      
      const newMessage: Message = {
        id: uuidv4(),
        sender,
        content,
        timestamp: new Date(),
        isPriority,
        department,
      };
      
      state.messages.unshift(newMessage);
    },
    
    fetchMessagesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    
    fetchMessagesSuccess: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload;
      state.isLoading = false;
    },
    
    fetchMessagesFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    
    addDepartment: (state, action: PayloadAction<Omit<Department, 'id'>>) => {
      const newDepartment: Department = {
        id: uuidv4(),
        ...action.payload,
      };
      
      state.departments.push(newDepartment);
    },
    
    deleteDepartment: (state, action: PayloadAction<string>) => {
      state.departments = state.departments.filter(
        (department) => department.id !== action.payload
      );
    },
  },
});

// Export actions and reducer
export const {
  sendMessage,
  fetchMessagesStart,
  fetchMessagesSuccess,
  fetchMessagesFailure,
  addDepartment,
  deleteDepartment,
} = communicationSlice.actions;

export default communicationSlice.reducer;