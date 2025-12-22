import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Settings, Calendar } from 'lucide-react-native';
import { StorageService } from '../utils/storage';
import { DateUtils } from '../utils/dateCalculations';

export default function DashboardScreen({ navigation, route }) {
  const [relationshipData, setRelationshipData] = useState(null);
  const [duration, setDuration] = useState({
    days: 0,
    months: 0,
    years: 0,
    totalMonths: 0
  });

  useEffect(() => {
    loadRelationshipData();
  }, []);

  const loadRelationshipData = async () => {
    try {
      const data = await StorageService.loadRelationshipData();
      if (data) {
        setRelationshipData(data);
      } else {
        // No data found, redirect to onboarding
        navigation.reset({
          index: 0,
          routes: [{ name: 'Welcome' }],
        });
      }
    } catch (error) {
      console.error('Error loading relationship data:', error);
    }
  };

  useEffect(() => {
    if (relationshipData) {
      calculateDuration();
      const interval = setInterval(calculateDuration, 1000 * 60 * 60); // Update every hour
      return () => clearInterval(interval);
    }
  }, [relationshipData]);

  const calculateDuration = () => {
    if (!relationshipData) return;

    const calculatedDuration = DateUtils.calculateDuration(relationshipData.startDate);
    setDuration(calculatedDuration);
  };

  const formatStartDate = () => {
    if (!relationshipData) return '';
    const date = new Date(relationshipData.startDate);
    return DateUtils.formatShortDate(date);
  };

  if (!relationshipData) {
    return (
      <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600 font-instrument">Loading your love story...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const DurationCard = ({ title, value, subtitle, icon: Icon }) => (
    <View className="bg-white/90 rounded-2xl p-6 mb-4 shadow-sm border border-pink-100">
      <View className="flex-row items-center mb-3">
        <Icon size={24} color="#F43F5E" />
        <Text className="text-gray-600 ml-3 font-instrument-medium">{title}</Text>
      </View>
      <Text className="text-3xl font-instrument-sc text-gray-800 mb-1">{value}</Text>
      <Text className="text-gray-500 font-instrument">{subtitle}</Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-8 pt-4 pb-8">
          <View className="flex-row justify-between items-center mb-8">
            <View>
              <Text className="text-2xl font-instrument-sc text-gray-800">
                {relationshipData.partner1Name} & {relationshipData.partner2Name}
              </Text>
              <Text className="text-gray-600 mt-1 font-instrument">
                Growing together since {formatStartDate()}
              </Text>
            </View>
            <TouchableOpacity
              className="bg-white/80 p-3 rounded-full border border-pink-200"
              onPress={() => navigation.navigate('Settings')}
            >
              <Settings size={24} color="#F43F5E" />
            </TouchableOpacity>
          </View>

          {/* Duration Cards */}
          <DurationCard
            title="Days Together"
            value={duration.totalDays?.toLocaleString() || '0'}
            subtitle="Every day counts ❤️"
            icon={Heart}
          />

          <DurationCard
            title="Months Together"
            value={duration.totalMonths?.toLocaleString() || '0'}
            subtitle="Growing stronger each month 💕"
            icon={Calendar}
          />

          <DurationCard
            title="Years & Months"
            value={DateUtils.formatDuration(duration)}
            subtitle="A beautiful journey together 🌹"
            icon={Heart}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}