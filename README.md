# Game Day Operations Dashboard

A comprehensive web application for managing all aspects of game day operations for sporting events. This dashboard provides real-time visibility and enables quick decision-making to ensure a safe, efficient, and enjoyable experience for everyone involved.

## 🎯 Purpose

The Game Day Operations Dashboard serves as a mission control center for sporting events, allowing event managers, staff, and other stakeholders to:

- Monitor real-time event metrics across multiple domains
- Coordinate staff and resources efficiently
- Respond quickly to incidents or issues
- Enhance the overall fan experience
- Make data-driven decisions

## ✨ Features

### Real-time Monitoring Widgets

- **Attendance Tracker**: Live attendance counts, entry flow rates, and capacity indicators
- **Security Monitor**: Incident map, alert feed, and security staff locations
- **Parking Status**: Lot capacity, traffic conditions, and shuttle tracking
- **Concessions Dashboard**: Sales metrics, inventory levels, and queue lengths
- **Medical Status**: Active medical incidents, response times, and EMT locations

### Interactive Venue Map

- Heat map visualization for crowd density
- Incident markers with severity indicators
- Staff positioning and allocation
- Customizable layers for different operational aspects

### Communication Hub

- Integrated messaging for staff coordination
- Broadcast announcements to specific teams or areas
- Incident reporting and escalation workflow
- Decision log for post-event analysis

### Timeline Manager

- Event schedule with real-time progress tracking
- Milestone alerts and notifications
- Countdown timers for critical events
- Dynamic scheduling adjustments

### Analytics Dashboard

- Historical comparisons with previous events
- Key performance indicators for each operational area
- Post-event reporting and analysis tools
- Trend identification for continuous improvement

## 🛠️ Technology Stack

- **Frontend**: React with TypeScript
- **UI Framework**: Material UI for consistent design
- **State Management**: Redux Toolkit
- **Visualization**: D3.js and Recharts
- **Maps**: Mapbox for venue visualization
- **Real-time Updates**: Firebase Realtime Database
- **Authentication**: Firebase Authentication

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Firebase account (for real-time features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/dxaginfo/game-day-ops-dashboard.git
   cd game-day-ops-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your Firebase configuration
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 🏗️ Project Structure

```
src/
├── components/       # Reusable UI components
├── features/         # Feature-specific components and logic
│   ├── attendance/   # Attendance tracking feature
│   ├── concessions/  # Concessions management
│   ├── map/          # Interactive venue map
│   ├── security/     # Security monitoring
│   └── timeline/     # Event timeline
├── hooks/            # Custom React hooks
├── services/         # API and external service integrations
├── store/            # Redux store configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 🔄 Data Flow

1. Real-time data is collected from various sources (ticketing systems, POS terminals, security reports, etc.)
2. Data is processed and normalized in the backend services
3. Frontend subscribes to data updates through Firebase Realtime Database
4. UI components update automatically as new data arrives
5. User interactions (like acknowledging incidents or broadcasting messages) flow back to the backend
6. Changes propagate to all connected dashboard instances

## 📊 Dashboard Customization

The dashboard is designed to be customizable for different sporting events and venues:

- Configurable widget layouts
- Event-specific KPIs and metrics
- Custom venue maps and zone definitions
- Role-based access control for different staff positions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📜 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact

For any questions or suggestions, please open an issue in this repository.