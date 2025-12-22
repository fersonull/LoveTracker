import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Bell, Check } from 'lucide-react-native';
import { StorageService } from '../utils/storage';
import { NotificationService } from '../services/notificationService';

export default function ReminderPreferencesScreen({ navigation, route }) {
  const { partner1Name, partner2Name, startDate } = route.params;
  const [monthlyReminder, setMonthlyReminder] = useState(true);
  const [yearlyReminder, setYearlyReminder] = useState(true);

  const handleFinish = async () => {
    const relationshipData = {
      partner1Name,
      partner2Name,
      startDate,
      preferences: {
        monthlyReminder,
        yearlyReminder
      },
      createdAt: new Date().toISOString()
    };
    
    // Save data to storage
    await StorageService.saveRelationshipData(relationshipData);
    
    // Schedule notifications
    await NotificationService.scheduleAllReminders(relationshipData);
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    });
  };

  const ToggleOption = ({ title, subtitle, value, onToggle }) => (
    <TouchableOpacity
      className="bg-white/80 border border-pink-200 rounded-xl p-4 mb-4 active:scale-95"
      onPress={onToggle}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-lg font-medium text-gray-800">{title}</Text>
          <Text className="text-gray-600 mt-1">{subtitle}</Text>
        </View>
        <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
          value ? 'bg-rose-500 border-rose-500' : 'border-gray-300'
        }`}>
          {value && <Check size={16} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <View className="items-center mb-12">
          <Bell size={60} color="#F43F5E" />
          <Text className="text-3xl font-light text-gray-800 text-center mt-4">
            Never miss a milestone
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            Choose your gentle reminders
          </Text>
        </View>

        {/* Reminder Options */}
        <View className="mb-12">
          <ToggleOption
            title="Monthly Reminders"
            subtitle="Celebrate your monthsary every month 💕"
            value={monthlyReminder}
            onToggle={() => setMonthlyReminder(!monthlyReminder)}
          />
          
          <ToggleOption
            title="Anniversary Reminders"
            subtitle="Remember your special day every year 🎉"
            value={yearlyReminder}
            onToggle={() => setYearlyReminder(!yearlyReminder)}
          />
        </View>

        {/* Finish Button */}
        <TouchableOpacity
          className="bg-rose-500 py-4 rounded-full shadow-lg active:scale-95"
          onPress={handleFinish}
        >
          <Text className="text-white text-lg font-medium text-center">
            Start Tracking Our Love
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}