# Love Tracker

A minimalist relationship tracking mobile application built with React Native for couples to celebrate their journey together.

## Overview

Love Tracker is a personal mobile application designed to help couples track their relationship duration and celebrate important milestones. The app focuses on intimacy, privacy, and meaningful moments without social features or distractions.

## Features

### Core Functionality

**Relationship Duration Tracking**
- Real-time countdown displaying days, hours, minutes, and seconds together
- Accurate calculation of relationship milestones
- Multiple time format displays (days, months, years)

**Milestone Reminders**
- Monthly anniversary notifications (monthsaries)
- Yearly anniversary reminders
- Local notifications using @notifee/react-native
- Customizable reminder preferences

**Data Management**
- Local data storage using AsyncStorage
- Offline-first functionality
- Data persistence across app sessions
- Edit relationship details (names, start date)

### User Interface

**Design Philosophy**
- Clean, minimal interface with generous spacing
- Romantic color palette (soft pinks, roses, warm neutrals)
- Modern typography using Instrument Sans font family
- Theme support (light and dark modes)

**Navigation Structure**
- Bottom tab navigation (Home, Memories, Settings)
- Modal-based editing interfaces
- Smooth animations and transitions
- Responsive layout design

**Screens**
- Dashboard: Main countdown display and relationship statistics
- Calendar: Timeline view of relationship milestones
- Settings: App preferences and data management

### Technical Features

**Architecture**
- React Native CLI-based project
- Context-based state management
- Component-driven architecture
- TypeScript support

**Libraries and Tools**
- React Navigation for routing
- NativeWind (Tailwind CSS) for styling
- Lucide React Native for iconography
- React Native DateTimePicker for date selection
- AsyncStorage for local data persistence

**Development Features**
- Hot reload support
- ESLint and Prettier configuration
- Jest testing framework setup
- Metro bundler optimization

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Install iOS dependencies (iOS only):
   ```bash
   cd ios && pod install
   ```

### Running the Application

**Start Metro Bundler:**
```bash
npm start
```

**Launch on Android:**
```bash
npm run android
```

**Launch on iOS:**
```bash
npm run ios
```

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   ├── calendar/       # Calendar-specific components
│   ├── dashboard/      # Dashboard components
│   ├── onboarding/     # Onboarding flow components
│   └── settings/       # Settings components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── navigations/        # Navigation configuration
├── screens/            # Screen components
├── services/           # External service integrations
├── utils/              # Utility functions
└── styles/             # Styling utilities
```

## Key Components

**State Management**
- ThemeContext: Manages light/dark mode preferences
- RelationshipContext: Handles relationship data and updates

**Core Screens**
- DashboardScreen: Main app interface with countdown and statistics
- CalendarScreen: Relationship timeline and milestone calendar
- SettingsScreen: App preferences and data management

**Utility Services**
- StorageService: Local data persistence operations
- NotificationService: Milestone reminder scheduling
- DateUtils: Date calculation and formatting functions

## Configuration

The app supports customization through:
- Theme preferences (light/dark mode)
- Notification settings (monthly/yearly reminders)
- Relationship data (names, start date)
- Font and styling customization

## Privacy and Data

- All data stored locally on device
- No external servers or cloud storage
- No user tracking or analytics
- Privacy-focused design

## License

This project is a personal application developed for educational and personal use.