import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Bell, Check } from 'lucide-react-native';
import { StorageService } from '../../utils/storage';
import { NotificationService } from '../../services/notificationService';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ReminderPreferencesScreen({ navigation, route }) {
  const { partner1Name, partner2Name, startDate } = route.params;
  const [monthlyReminder, setMonthlyReminder] = useState(true);
  const [yearlyReminder, setYearlyReminder] = useState(true);
  const { colors } = useTheme();

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
        <View
          className="w-6 h-6 rounded-full border-2 items-center justify-center"
          style={{
            backgroundColor: value ? colors.accent.rose : 'transparent',
            borderColor: value ? colors.accent.rose : colors.text.muted
          }}
        >
          {value && <Check size={16} color="white" />}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 justify-center px-8">
        {/* Header */}
        <View className="items-center mb-12">
          <Bell size={48} color={colors.accent.rose} />
          <Text
            className="text-center mt-4"
            style={{
              fontSize: 28,
              fontFamily: 'InstrumentSans_SemiCondensed-Regular',
              color: colors.text.primary
            }}
          >
            Never miss a milestone
          </Text>
          <Text
            className="text-center mt-2"
            style={{
              fontSize: 16,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary
            }}
          >
            Choose your gentle reminders
          </Text>
        </View>

        {/* Reminder Options */}
        <View className="mb-12">
          <ToggleOption
            title="Monthly Reminders"
            subtitle="Celebrate your monthsary every month"
            value={monthlyReminder}
            onToggle={() => setMonthlyReminder(!monthlyReminder)}
          />

          <ToggleOption
            title="Anniversary Reminders"
            subtitle="Remember your special day every year"
            value={yearlyReminder}
            onToggle={() => setYearlyReminder(!yearlyReminder)}
          />
        </View>

        {/* Finish Button */}
        <TouchableOpacity
          className="py-4 rounded-2xl shadow-sm"
          style={{ backgroundColor: colors.accent.rose }}
          onPress={handleFinish}
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
            Start Tracking Our Love
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}