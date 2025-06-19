import { Message, Department } from '../store/slices/communicationSlice';

// This is a mock service that simulates API calls to a backend
// In a real application, these would make actual API requests

/**
 * Fetch messages from the server
 * @param limit Number of messages to fetch
 * @returns Promise with an array of messages
 */
export const fetchMessages = async (limit: number = 50): Promise<Message[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // This would be replaced with an actual API call
  // For now, we'll return the mock data from Redux store
  return [];
};

/**
 * Send a message to the server
 * @param message Message content
 * @param sender Sender name
 * @param isPriority Whether the message is priority
 * @param department Department ID
 * @returns Promise with the created message
 */
export const sendMessage = async (
  message: string,
  sender: string,
  isPriority: boolean,
  department: string
): Promise<Message> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // In a real app, we would post to an API endpoint and return the result
  const newMessage: Message = {
    id: Date.now().toString(),
    content: message,
    sender,
    isPriority,
    department,
    timestamp: new Date(),
  };
  
  return newMessage;
};

/**
 * Fetch departments from the server
 * @returns Promise with an array of departments
 */
export const fetchDepartments = async (): Promise<Department[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // This would be replaced with an actual API call
  return [];
};

/**
 * Create a new department
 * @param name Department name
 * @param color Color hex code
 * @returns Promise with the created department
 */
export const createDepartment = async (
  name: string,
  color: string
): Promise<Department> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const newDepartment: Department = {
    id: Date.now().toString(),
    name,
    color,
  };
  
  return newDepartment;
};

/**
 * Delete a department
 * @param id Department ID
 * @returns Promise that resolves when deletion is complete
 */
export const deleteDepartment = async (id: string): Promise<void> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  // This would send a delete request to the API
  return;
};

// Firebase integration for real-time updates (to be implemented)
export const subscribeToCommunicationUpdates = (
  callback: (messages: Message[]) => void
) => {
  // In a real app, this would set up a Firebase listener
  // For now, we'll just create a simple interval to simulate updates
  
  const interval = setInterval(() => {
    // Simulate receiving a new message occasionally
    if (Math.random() > 0.7) {
      const departments = ['1', '2', '3', '4', '5', '6'];
      const senders = ['John', 'Sarah', 'Michael', 'Emma', 'David'];
      const messageTypes = [
        'Update on section',
        'Status report from',
        'Assistance needed at',
        'Incident resolved at',
        'Staff request from',
      ];
      const locations = [
        'Gate A',
        'North Concourse',
        'Section 122',
        'VIP Lounge',
        'Parking Lot B',
        'Concession 5',
      ];
      
      const randomMessage: Message = {
        id: Date.now().toString(),
        sender: senders[Math.floor(Math.random() * senders.length)],
        content: `${messageTypes[Math.floor(Math.random() * messageTypes.length)]} ${
          locations[Math.floor(Math.random() * locations.length)]
        }`,
        timestamp: new Date(),
        isPriority: Math.random() > 0.8,
        department: departments[Math.floor(Math.random() * departments.length)],
      };
      
      callback([randomMessage]);
    }
  }, 15000); // Check every 15 seconds
  
  // Return a function to unsubscribe
  return () => clearInterval(interval);
};