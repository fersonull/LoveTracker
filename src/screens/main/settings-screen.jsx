import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ArrowLeft, Edit3, Bell, Trash2, Check, Moon, Sun } from 'lucide-react-native';
import { StorageService } from '../../utils/storage';
import { NotificationService } from '../../services/notificationService';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }) {
  const [relationshipData, setRelationshipData] = useState(null);
  const { isDarkMode, colors, toggleTheme } = useTheme();

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

  const handleResetData = () => {
    Alert.alert(
      "Reset Relationship Data",
      "Are you sure you want to reset all your relationship data? This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            // Clear all data and notifications
            await StorageService.clearRelationshipData();
            await NotificationService.clearAllReminders();

            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            });
          }
        }
      ]
    );
  };

  const toggleReminder = async (type) => {
    const updatedData = {
      ...relationshipData,
      preferences: {
        ...relationshipData.preferences,
        [type]: !relationshipData.preferences[type]
      }
    };
    setRelationshipData(updatedData);

    // Save to storage
    await StorageService.saveRelationshipData(updatedData);

    // Update notifications
    await NotificationService.scheduleAllReminders(updatedData);
  };

  const SettingItem = ({ title, subtitle, onPress, rightElement, danger = false }) => (
    <TouchableOpacity
      className="rounded-xl p-4 mb-3"
      style={{
        backgroundColor: colors.cardBackground,
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

  const ToggleSwitch = ({ value }) => (
    <View
      className="w-6 h-6 rounded-full border-2 items-center justify-center"
      style={{
        backgroundColor: value ? colors.accent.rose : 'transparent',
        borderColor: value ? colors.accent.rose : colors.text.muted,
      }}
    >
      {value && <Check size={16} color="white" />}
    </View>
  );

  if (!relationshipData) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">Loading settings...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-6 pt-4 pb-8">
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              className="p-3 rounded-2xl mr-4"
              style={{
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
              }}
              onPress={() => navigation.goBack()}
              activeOpacity={0.8}
            >
              <ArrowLeft size={24} color={colors.accent.rose} />
            </TouchableOpacity>
            <Text
              style={{
                fontSize: 24,
                fontFamily: 'InstrumentSans_SemiCondensed-Regular',
                color: colors.text.primary
              }}
            >
              Settings
            </Text>
          </View>

          {/* Appearance */}
          <View className="mb-8">
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'InstrumentSans-SemiBold',
                color: colors.text.primary,
                marginBottom: 16
              }}
            >
              Appearance
            </Text>

            <SettingItem
              title="Dark Mode"
              subtitle={`Currently using ${isDarkMode ? 'dark' : 'light'} theme`}
              onPress={toggleTheme}
              rightElement={
                <View
                  className="p-2 rounded-full"
                  style={{ backgroundColor: colors.accent.rose }}
                >
                  {isDarkMode ? (
                    <Moon size={20} color="white" />
                  ) : (
                    <Sun size={20} color="white" />
                  )}
                </View>
              }
            />
          </View>

          {/* Relationship Info */}
          <View className="mb-8">
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'InstrumentSans-SemiBold',
                color: colors.text.primary,
                marginBottom: 16
              }}
            >
              Relationship Details
            </Text>

            <SettingItem
              title="Edit Names"
              subtitle={`${relationshipData.partner1Name} & ${relationshipData.partner2Name}`}
              onPress={() => {/* TODO: Navigate to edit names */ }}
              rightElement={<Edit3 size={20} color={colors.text.muted} />}
            />

            <SettingItem
              title="Edit Start Date"
              subtitle={new Date(relationshipData.startDate).toLocaleDateString()}
              onPress={() => {/* TODO: Navigate to edit date */ }}
              rightElement={<Edit3 size={20} color={colors.text.muted} />}
            />
          </View>

          {/* Notification Preferences */}
          <View className="mb-8">
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'InstrumentSans-SemiBold',
                color: colors.text.primary,
                marginBottom: 16
              }}
            >
              Notifications
            </Text>

            <SettingItem
              title="Monthly Reminders"
              subtitle="Get notified on your monthsary"
              onPress={() => toggleReminder('monthlyReminder')}
              rightElement={<ToggleSwitch value={relationshipData.preferences.monthlyReminder} />}
            />

            <SettingItem
              title="Anniversary Reminders"
              subtitle="Get notified on your anniversary"
              onPress={() => toggleReminder('yearlyReminder')}
              rightElement={<ToggleSwitch value={relationshipData.preferences.yearlyReminder} />}
            />
          </View>

          {/* Danger Zone */}
          <View>
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'InstrumentSans-SemiBold',
                color: colors.text.primary,
                marginBottom: 16
              }}
            >
              Danger Zone
            </Text>

            <SettingItem
              title="Reset All Data"
              subtitle="This will delete all your relationship data"
              onPress={handleResetData}
              rightElement={<Trash2 size={20} color="#DC2626" />}
              danger={true}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}