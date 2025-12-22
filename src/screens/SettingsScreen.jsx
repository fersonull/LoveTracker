import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { ArrowLeft, Edit3, Bell, Trash2, Check } from 'lucide-react-native';
import { StorageService } from '../utils/storage';
import { NotificationService } from '../services/notificationService';

export default function SettingsScreen({ navigation }) {
  const [relationshipData, setRelationshipData] = useState(null);

  useEffect(() => {
    // TODO: Load relationship data from AsyncStorage
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
      className={`bg-white/90 border border-pink-100 rounded-xl p-4 mb-3 active:scale-95 ${
        danger ? 'border-red-200' : ''
      }`}
      onPress={onPress}
    >
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className={`text-lg font-medium ${danger ? 'text-red-600' : 'text-gray-800'}`}>
            {title}
          </Text>
          {subtitle && (
            <Text className="text-gray-600 mt-1">{subtitle}</Text>
          )}
        </View>
        {rightElement}
      </View>
    </TouchableOpacity>
  );

  const ToggleSwitch = ({ value }) => (
    <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
      value ? 'bg-rose-500 border-rose-500' : 'border-gray-300'
    }`}>
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
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-8 pt-4 pb-8">
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              className="bg-white/80 p-3 rounded-full border border-pink-200 mr-4"
              onPress={() => navigation.goBack()}
            >
              <ArrowLeft size={24} color="#F43F5E" />
            </TouchableOpacity>
            <Text className="text-2xl font-light text-gray-800">Settings</Text>
          </View>

          {/* Relationship Info */}
          <View className="mb-8">
            <Text className="text-lg font-medium text-gray-800 mb-4">Relationship Details</Text>
            
            <SettingItem
              title="Edit Names"
              subtitle={`${relationshipData.partner1Name} & ${relationshipData.partner2Name}`}
              onPress={() => {/* TODO: Navigate to edit names */}}
              rightElement={<Edit3 size={20} color="#9CA3AF" />}
            />

            <SettingItem
              title="Edit Start Date"
              subtitle={new Date(relationshipData.startDate).toLocaleDateString()}
              onPress={() => {/* TODO: Navigate to edit date */}}
              rightElement={<Edit3 size={20} color="#9CA3AF" />}
            />
          </View>

          {/* Notification Preferences */}
          <View className="mb-8">
            <Text className="text-lg font-medium text-gray-800 mb-4">Notifications</Text>
            
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
            <Text className="text-lg font-medium text-gray-800 mb-4">Danger Zone</Text>
            
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