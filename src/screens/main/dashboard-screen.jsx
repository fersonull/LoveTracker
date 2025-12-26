import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Settings, Calendar, Clock, Timer, Star, Trophy, Sparkles } from 'lucide-react-native';
import { DateUtils } from '../../utils/date-calculation';
import HeroCountdown from '../../components/dashboard/hero-countdown';
import { useTheme } from '../../context/ThemeContext';
import { useRelationship } from '../../context/RelationshipContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import SummaryCard from "../../components/dashboard/summary-card"
import StatCard from "../../components/dashboard/stat-card"

export default function DashboardScreen({ navigation, route }) {
  const [duration, setDuration] = useState({
    totalDays: 0,
    totalMonths: 0,
    years: 0,
    months: 0,
    days: 0
  });
  const { colors } = useTheme();
  const { relationshipData, isLoading } = useRelationship();

  useEffect(() => {
    if (!relationshipData && !isLoading) {
      // No data found, redirect to onboarding
      navigation.reset({
        index: 0,
        routes: [{ name: 'Welcome' }],
      });
    }
  }, [relationshipData, isLoading, navigation]);

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

  if (isLoading || !relationshipData) {
    return (
      <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
        <View className="flex-1 justify-center items-center">
          <Heart size={60} color={colors.accent.rose} fill={colors.accent.rose} />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary,
              marginTop: 16
            }}
          >
            Loading your love story...
          </Text>
        </View>
      </SafeAreaView>
    );
  }


  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-6 pt-6 pb-4">
          <View className="items-center">
            <Text
              style={{
                fontSize: 18,
                fontFamily: 'InstrumentSans-Regular',
                color: colors.text.secondary
              }}
            >
              Hello, Lovebirds!
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'InstrumentSans-Medium',
                color: colors.text.muted
              }}
            >
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>
        </View>

        <HeroCountdown
          startDate={relationshipData.startDate}
          partnerNames={{
            partner1: relationshipData.partner1Name,
            partner2: relationshipData.partner2Name
          }}
        />

        <View className="px-6 mb-8">
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'InstrumentSans-SemiBold',
              color: colors.text.primary,
              marginBottom: 16
            }}
          >
            Your Journey
          </Text>

          <View className="flex-row gap-2 mb-4">
            <StatCard
              title="Total Hours"
              value={Math.floor((duration.totalDays || 0) * 24).toLocaleString()}
              subtitle="Hours of memories"
              icon={Clock}
              color={colors.accent.rose}
            />
            <StatCard
              title="Total Minutes"
              value={Math.floor((duration.totalDays || 0) * 24 * 60).toLocaleString()}
              subtitle="Precious moments"
              icon={Timer}
              color={colors.accent.pink}
            />
          </View>

          <View className="flex-row gap-2 mb-4">
            <StatCard
              title="Months Together"
              value={duration.totalMonths || '0'}
              subtitle="Monthly milestones"
              icon={Calendar}
              color={colors.accent.rose}
            />
            <StatCard
              title="Weekends"
              value={Math.floor((duration.totalDays || 0) / 7 * 2)}
              subtitle="Weekend adventures"
              icon={Star}
              color={colors.accent.purple}
            />
          </View>

          <SummaryCard relationshipData={relationshipData} duration={duration} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}