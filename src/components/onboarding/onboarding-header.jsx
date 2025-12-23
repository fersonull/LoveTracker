import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function OnboardingHeader({ 
  icon: Icon, 
  title, 
  subtitle, 
  iconSize = 48 
}) {
  const { colors } = useTheme();
  
  return (
    <View className="items-center mb-12">
      {Icon && <Icon size={iconSize} color={colors.accent.rose} />}
      <Text 
        className="text-center mt-4"
        style={{
          fontSize: 28,
          fontFamily: 'InstrumentSans_SemiCondensed-Regular',
          color: colors.text.primary
        }}
      >
        {title}
      </Text>
      {subtitle && (
        <Text 
          className="text-center mt-2"
          style={{
            fontSize: 16,
            fontFamily: 'InstrumentSans-Regular',
            color: colors.text.secondary
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}