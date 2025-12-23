import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  disabled = false,
  style,
  textStyle,
  activeOpacity = 0.8
}) {
  const { colors } = useTheme();
  
  const getButtonStyle = () => {
    const baseStyle = {
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 16,
      ...style
    };
    
    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? colors.text.muted : colors.accent.rose,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };
  
  const getTextStyle = () => {
    const baseTextStyle = {
      fontSize: 16,
      fontFamily: 'InstrumentSans-Medium',
      textAlign: 'center',
      ...textStyle
    };
    
    switch (variant) {
      case 'primary':
        return {
          ...baseTextStyle,
          color: 'white',
        };
      case 'secondary':
        return {
          ...baseTextStyle,
          color: colors.text.primary,
        };
      case 'ghost':
        return {
          ...baseTextStyle,
          color: colors.accent.rose,
        };
      default:
        return baseTextStyle;
    }
  };
  
  return (
    <TouchableOpacity
      style={getButtonStyle()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={activeOpacity}
    >
      <Text style={getTextStyle()}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}