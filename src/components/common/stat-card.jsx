import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function StatCard({ title, value, subtitle, icon: Icon, color }) {
  const { colors } = useTheme();
  
  return (
    <View 
      className="rounded-3xl p-5 shadow-sm flex-1 mx-1"
      style={{ 
        backgroundColor: colors.surface,
        borderWidth: 1,
        borderColor: colors.border
      }}
    >
      <View className="items-center">
        <View 
          className="rounded-full p-3 mb-3"
          style={{ backgroundColor: color }}
        >
          <Icon size={20} color="white" />
        </View>
        <Text 
          className="mb-2"
          style={{ 
            fontSize: 24, 
            fontFamily: 'InstrumentSans_SemiCondensed-Bold',
            color: colors.text.primary
          }}
        >
          {value}
        </Text>
        <Text 
          className="text-center mb-1"
          style={{ 
            fontSize: 14, 
            fontFamily: 'InstrumentSans-Medium',
            color: colors.text.primary
          }}
        >
          {title}
        </Text>
        <Text 
          className="text-center"
          style={{ 
            fontSize: 11, 
            fontFamily: 'InstrumentSans-Regular',
            color: colors.text.secondary
          }}
        >
          {subtitle}
        </Text>
      </View>
    </View>
  );
}