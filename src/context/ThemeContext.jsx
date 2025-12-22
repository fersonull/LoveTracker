import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('@LoveTracker:theme');
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === 'dark');
      }
    } catch (error) {
      console.error('Error loading theme preference:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('@LoveTracker:theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Error saving theme preference:', error);
    }
  };

  const theme = {
    isDarkMode,
    colors: {
      // Background colors
      background: isDarkMode ? '#111827' : '#F9FAFB',
      surface: isDarkMode ? '#1F2937' : '#FFFFFF',
      surfaceSecondary: isDarkMode ? '#374151' : '#F3F4F6',
      
      // Text colors
      text: {
        primary: isDarkMode ? '#F9FAFB' : '#111827',
        secondary: isDarkMode ? '#D1D5DB' : '#6B7280',
        muted: isDarkMode ? '#9CA3AF' : '#9CA3AF',
      },
      
      // Accent colors (consistent across themes)
      accent: {
        rose: '#F43F5E',
        pink: '#EC4899',
        purple: '#8B5CF6',
        cyan: '#06B6D4',
      },
      
      // Border colors
      border: isDarkMode ? '#374151' : '#E5E7EB',
      borderLight: isDarkMode ? '#4B5563' : '#F3F4F6',
      
      // Shadow colors
      shadow: isDarkMode ? '#000000' : '#000000',
      
      // Card backgrounds
      cardBackground: isDarkMode ? '#1F2937' : '#FFFFFF',
      cardBackgroundRose: isDarkMode ? '#4C1D24' : '#FEF2F2',
      cardBackgroundPink: isDarkMode ? '#4A1B3A' : '#FDF2F8',
      cardBackgroundPurple: isDarkMode ? '#2E1065' : '#F3F4F6',
      cardBackgroundCyan: isDarkMode ? '#164E63' : '#F0F9FF',
    }
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};