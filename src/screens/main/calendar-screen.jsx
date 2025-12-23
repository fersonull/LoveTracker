import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Calendar, Heart, ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { StorageService } from '../../utils/storage';
import { DateUtils } from '../../utils/date-calculation';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalendarScreen({ navigation }) {
  const [relationshipData, setRelationshipData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { colors } = useTheme();

  useEffect(() => {
    loadRelationshipData();
  }, []);

  const loadRelationshipData = async () => {
    try {
      const data = await StorageService.loadRelationshipData();
      if (data) {
        setRelationshipData(data);
      }
    } catch (error) {
      console.error('Error loading relationship data:', error);
    }
  };

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

  const isSpecialDate = (date) => {
    if (!relationshipData || !date) return null;

    const startDate = new Date(relationshipData.startDate);
    const startDay = startDate.getDate();
    const startMonth = startDate.getMonth();
    const startYear = startDate.getFullYear();

    // Check if it's the anniversary
    if (date.getDate() === startDay && date.getMonth() === startMonth) {
      if (date.getFullYear() === startYear) {
        return 'start'; // Relationship start date
      } else if (date.getFullYear() > startYear) {
        return 'anniversary'; // Anniversary
      }
    }

    // Check if it's a monthsary (same day each month)
    if (date.getDate() === startDay && date > startDate) {
      return 'monthsary';
    }

    return null;
  };

  const navigateMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const formatMonthYear = (date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  const getSpecialDateInfo = (date) => {
    if (!relationshipData || !date) return null;

    const specialType = isSpecialDate(date);
    if (!specialType) return null;

    const startDate = new Date(relationshipData.startDate);
    const duration = DateUtils.calculateDuration(relationshipData.startDate);

    switch (specialType) {
      case 'start':
        return { type: 'start', label: 'First Day Together', color: colors.accent.rose };
      case 'anniversary':
        const years = date.getFullYear() - startDate.getFullYear();
        return { type: 'anniversary', label: `${years} Year Anniversary`, color: colors.accent.rose };
      case 'monthsary':
        const months = (date.getFullYear() - startDate.getFullYear()) * 12 + (date.getMonth() - startDate.getMonth());
        return { type: 'monthsary', label: `${months} Month Anniversary`, color: colors.accent.pink };
      default:
        return null;
    }
  };

  const renderCalendarDay = (date, index) => {
    if (!date) {
      return <View key={index} className="flex-1 h-12" />;
    }

    const isToday = date.toDateString() === new Date().toDateString();
    const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
    const specialInfo = getSpecialDateInfo(date);

    return (
      <TouchableOpacity
        key={index}
        className="flex-1 h-12 items-center justify-center m-1 rounded-lg"
        style={{
          backgroundColor: isSelected
            ? colors.accent.rose
            : specialInfo
              ? specialInfo.color + '20'
              : 'transparent'
        }}
        onPress={() => setSelectedDate(date)}
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
  };

  if (!relationshipData) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
        <View className="flex-1 justify-center items-center">
          <Calendar size={60} color={colors.accent.rose} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary,
              marginTop: 16
            }}
          >
            Loading calendar...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const days = getDaysInMonth(currentMonth);
  const selectedDateInfo = selectedDate ? getSpecialDateInfo(selectedDate) : null;

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-6 pb-4">
          <View className="flex-row items-center justify-between mb-6">
            <View>
              <Text
                style={{
                  fontSize: 24,
                  fontFamily: 'InstrumentSans_SemiCondensed-Regular',
                  color: colors.text.primary
                }}
              >
                Memories
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontFamily: 'InstrumentSans-Regular',
                  color: colors.text.secondary,
                  marginTop: 4
                }}
              >
                Your special moments together
              </Text>
            </View>
            <View
              className="rounded-full p-3"
              style={{ backgroundColor: colors.accent.rose }}
            >
              <Calendar size={24} color="white" />
            </View>
          </View>
        </View>

        {/* Calendar */}
        <View className="mx-6 mb-6">
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
                onPress={() => navigateMonth('prev')}
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
                onPress={() => navigateMonth('next')}
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
                  {days.slice(weekIndex * 7, (weekIndex + 1) * 7).map((date, dayIndex) =>
                    renderCalendarDay(date, weekIndex * 7 + dayIndex)
                  )}
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Selected Date Info */}
        {selectedDate && (
          <View className="mx-6 mb-6">
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
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}