import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import ToggleSwitch from '../settings/toggle-switch';

export default function ToggleOption({ title, subtitle, value, onToggle }) {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      className="rounded-2xl p-4 mb-4 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border
      }}
      onPress={onToggle}
      activeOpacity={0.9}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text 
            style={{
              fontSize: 16,
              fontFamily: 'InstrumentSans-Medium',
              color: colors.text.primary
            }}
          >
            {title}
          </Text>
          <Text 
            style={{
              fontSize: 14,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary,
              marginTop: 4
            }}
          >
            {subtitle}
          </Text>
        </View>
        <ToggleSwitch value={value} />
      </View>
    </TouchableOpacity>
  );
}