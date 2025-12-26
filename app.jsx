import React from 'react';
import "./global.css";
import AppNavigator from './src/navigations/app-navigator';
import { ThemeProvider } from './src/context/ThemeContext';
import { RelationshipProvider } from './src/context/RelationshipContext';

export default function App() {
  return (
    <ThemeProvider>
      <RelationshipProvider>
        <AppNavigator />
      </RelationshipProvider>
    </ThemeProvider>
  );
}
