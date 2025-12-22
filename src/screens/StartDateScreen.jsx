import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Calendar } from 'lucide-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function StartDateScreen({ navigation, route }) {
  const { partner1Name, partner2Name } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

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
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <View className="items-center mb-12">
          <Calendar size={60} color="#F43F5E" />
          <Text className="text-3xl font-instrument-sc text-gray-800 text-center mt-4">
            When did it all begin?
          </Text>
          <Text className="text-base font-instrument text-gray-600 text-center mt-2">
            Choose your special start date
          </Text>
        </View>

        {/* Date Display */}
        <View className="bg-white/80 rounded-2xl p-6 mb-8 shadow-sm border border-pink-200">
          <Text className="text-gray-600 text-sm font-instrument mb-2">Your relationship started on:</Text>
          <Text className="text-xl font-instrument-medium text-gray-800">
            {formatDate(selectedDate)}
          </Text>
        </View>

        {/* Date Picker Button */}
        <TouchableOpacity
          className="bg-white/80 border border-pink-200 py-4 rounded-xl mb-12 active:scale-95"
          onPress={() => setShowDatePicker(true)}
        >
          <Text className="text-rose-600 text-lg font-instrument-medium text-center">
            Change Date
          </Text>
        </TouchableOpacity>

        {/* Continue Button */}
        <TouchableOpacity
          className="bg-rose-500 py-4 rounded-full shadow-lg active:scale-95"
          onPress={handleContinue}
        >
          <Text className="text-white text-lg font-instrument-medium text-center">
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