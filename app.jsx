import React from 'react';
import "./global.css";
import AppNavigator from './src/navigations/app-navigator';
import { ThemeProvider } from './src/context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
