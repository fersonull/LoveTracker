import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import CalendarDay from './calendar-day';

export default function CalendarGrid({ 
  currentMonth, 
  onMonthNavigate, 
  selectedDate, 
  onDateSelect,
  getSpecialDateInfo 
}) {
  const { colors } = useTheme();
  
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };
  
  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };
  
  const days = getDaysInMonth(currentMonth);
  
  return (
    <View 
      className="rounded-3xl p-6 border"
      style={{
        backgroundColor: colors.surface,
        borderColor: colors.border
      }}
    >
      {/* Month Navigation */}
      <View className="flex-row items-center justify-between mb-6">
        <TouchableOpacity
          onPress={() => onMonthNavigate('prev')}
          activeOpacity={0.8}
        >
          <ArrowLeft size={24} color={colors.text.primary} />
        </TouchableOpacity>
        
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'InstrumentSans_SemiCondensed-Medium',
            color: colors.text.primary
          }}
        >
          {formatMonthYear(currentMonth)}
        </Text>
        
        <TouchableOpacity
          onPress={() => onMonthNavigate('next')}
          activeOpacity={0.8}
        >
          <ArrowRight size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

      {/* Days of Week */}
      <View className="flex-row mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <View key={day} className="flex-1 items-center">
            <Text
              style={{
                fontSize: 12,
                fontFamily: 'InstrumentSans-Medium',
                color: colors.text.muted
              }}
            >
              {day}
            </Text>
          </View>
        ))}
      </View>

      {/* Calendar Grid */}
      <View>
        {Array.from({ length: Math.ceil(days.length / 7) }).map((_, weekIndex) => (
          <View key={weekIndex} className="flex-row">
            {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) => (
              <CalendarDay
                key={weekIndex * 7 + dayIndex}
                date={date}
                selectedDate={selectedDate}
                onDateSelect={onDateSelect}
                specialInfo={date ? getSpecialDateInfo(date) : null}
              />
            ))}
          </View>
        ))}
      </View>
    </View>
  );
}