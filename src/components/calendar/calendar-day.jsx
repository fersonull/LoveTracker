import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function CalendarDay({ date, selectedDate, onDateSelect, specialInfo }) {
  const { colors } = useTheme();
  
  if (!date) {
    return <View className="flex-1 h-12" />;
  }
  
  const isToday = date.toDateString() === new Date().toDateString();
  const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
  
  return (
    <TouchableOpacity
      className="flex-1 h-12 items-center justify-center m-1 rounded-lg"
      style={{
        backgroundColor: isSelected 
          ? colors.accent.rose 
          : specialInfo 
          ? specialInfo.color + '20' 
          : 'transparent'
      }}
      onPress={() => onDateSelect(date)}
      activeOpacity={0.8}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: 'InstrumentSans-Medium',
          color: isSelected 
            ? 'white' 
            : isToday 
            ? colors.accent.rose 
            : colors.text.primary
        }}
      >
        {date.getDate()}
      </Text>
      {specialInfo && (
        <View
          className="w-1 h-1 rounded-full mt-1"
          style={{ backgroundColor: specialInfo.color }}
        />
      )}
    </TouchableOpacity>
  );
}