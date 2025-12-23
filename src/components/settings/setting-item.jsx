import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function SettingItem({ 
  title, 
  subtitle, 
  onPress, 
  rightElement, 
  danger = false 
}) {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity
      className="rounded-xl p-4 mb-3"
      style={{
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: danger ? '#FCA5A5' : colors.border,
      }}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text 
            style={{ 
              fontSize: 18, 
              fontFamily: 'InstrumentSans-Medium',
              color: danger ? '#DC2626' : colors.text.primary
            }}
          >
            {title}
          </Text>
          {subtitle && (
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
          )}
        </View>
        {rightElement}
      </View>
    </TouchableOpacity>
  );
}