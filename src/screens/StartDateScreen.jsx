import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useTheme } from '../context/ThemeContext';

export default function StartDateScreen({ navigation, route }) {
  const { partner1Name, partner2Name } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { colors } = useTheme();

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleDateChange = (event, date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleContinue = () => {
    navigation.navigate('ReminderPreferences', {
      partner1Name,
      partner2Name,
      startDate: selectedDate.toISOString()
    });
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <View className="items-center mb-12">
          <Calendar size={48} color={colors.accent.rose} />
          <Text 
            className="text-center mt-4"
            style={{
              fontSize: 28,
              fontFamily: 'InstrumentSans_SemiCondensed-Regular',
              color: colors.text.primary
            }}
          >
            When did it all begin?
          </Text>
          <Text 
            className="text-center mt-2"
            style={{
              fontSize: 16,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary
            }}
          >
            Choose your special start date
          </Text>
        </View>

        {/* Date Display */}
        <View 
          className="rounded-2xl p-6 mb-8 border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border
          }}
        >
          <Text 
            style={{
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary,
              fontSize: 14,
              marginBottom: 8
            }}
          >
            Your relationship started on:
          </Text>
          <Text 
            style={{
              fontSize: 18,
              fontFamily: 'InstrumentSans-Medium',
              color: colors.text.primary
            }}
          >
            {formatDate(selectedDate)}
          </Text>
        </View>

        {/* Date Picker Button */}
        <TouchableOpacity
          className="py-4 rounded-2xl mb-12 border"
          style={{
            backgroundColor: colors.surface,
            borderColor: colors.border
          }}
          onPress={() => setShowDatePicker(true)}
          activeOpacity={0.8}
        >
          <Text 
            style={{
              color: colors.accent.rose,
              fontSize: 16,
              fontFamily: 'InstrumentSans-Medium',
              textAlign: 'center'
            }}
          >
            Change Date
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          className="py-4 rounded-2xl shadow-sm"
          style={{ backgroundColor: colors.accent.rose }}
          onPress={handleContinue}
          activeOpacity={0.8}
        >
          <Text 
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'InstrumentSans-Medium',
              textAlign: 'center'
            }}
          >
            Continue
          </Text>
        </TouchableOpacity>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
            maximumDate={new Date()}
          />
        )}
      </View>
    </SafeAreaView>
  );
}