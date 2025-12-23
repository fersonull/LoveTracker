import React from 'react';
import { View, Text } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function SelectedDateInfo({ selectedDate, selectedDateInfo }) {
  const { colors } = useTheme();
  
  if (!selectedDate) return null;
  
  return (
    <View 
      className="rounded-2xl p-5 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border
      }}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'InstrumentSans-Medium',
              color: colors.text.primary
            }}
          >
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </Text>
          {selectedDateInfo && (
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'InstrumentSans-Regular',
                color: selectedDateInfo.color,
                marginTop: 4
              }}
            >
              {selectedDateInfo.label}
            </Text>
          )}
        </View>
        
        <View 
          className="rounded-full p-2"
          style={{ 
            backgroundColor: selectedDateInfo ? selectedDateInfo.color : colors.accent.rose 
          }}
        >
          <Heart size={16} color="white" fill="white" />
        </View>
      </View>
    </View>
  );
}