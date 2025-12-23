import React from 'react';
import { View } from 'react-native';
import { Check } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ToggleSwitch({ value, size = 'medium' }) {
  const { colors } = useTheme();
  
  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return { width: 20, height: 20 };
      case 'large':
        return { width: 28, height: 28 };
      default: // medium
        return { width: 24, height: 24 };
    }
  };
  
  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'large':
        return 18;
      default: // medium
        return 16;
    }
  };
  
  return (
    <View 
      className="rounded-full border-2 items-center justify-center"
      style={{
        ...getSizeStyles(),
        backgroundColor: value ? colors.accent.rose : 'transparent',
        borderColor: value ? colors.accent.rose : colors.text.muted,
      }}
    >
      {value && <Check size={getIconSize()} color="white" />}
    </View>
  );
}