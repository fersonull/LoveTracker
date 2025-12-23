import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Settings, Calendar, Clock, Timer, Star, Trophy, Sparkles } from 'lucide-react-native';
import { StorageService } from '../../utils/storage';
import { DateUtils } from '../../utils/date-calculation';
import HeroCountdown from '../../components/dashboard/hero-countdown';
import { useTheme } from '../../context/ThemeContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function DashboardScreen({ navigation, route }) {
  const [relationshipData, setRelationshipData] = useState(null);
  const [duration, setDuration] = useState({
    days: 0,
    months: 0,
    years: 0,
    totalMonths: 0
  });
  const { colors } = useTheme();

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

  const StatCard = ({ title, value, subtitle, icon: Icon, color }) => {
    return (
      <View
        className="rounded-3xl p-5 shadow-sm flex-1 mx-1"
        style={{
          backgroundColor: colors.surface,
          borderWidth: 1,
          borderColor: colors.border
        }}
      >
        <View className="items-center">
          <View
            className="rounded-full p-3 mb-3"
            style={{ backgroundColor: color }}
          >
            <Icon size={20} color="white" />
          </View>
          <Text
            className="mb-2"
            style={{
              fontSize: 24,
              fontFamily: 'InstrumentSans_SemiCondensed-Bold',
              color: colors.text.primary
            }}
          >
            {value}
          </Text>
          <Text
            className="text-center mb-1"
            style={{
              fontSize: 14,
              fontFamily: 'InstrumentSans-Medium',
              color: colors.text.primary
            }}
          >
            {title}
          </Text>
          <Text
            className="text-center"
            style={{
              fontSize: 11,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary
            }}
          >
            {subtitle}
          </Text>
        </View>
      </View>
    );
  };

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

          <View className="flex-row mb-4">
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

          <View className="flex-row mb-4">
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
                    fontFamily: 'InstrumentSans-SemiBold',
                    color: colors.text.primary
                  }}
                >
                  Together for {DateUtils.formatDuration(duration)}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'InstrumentSans-Regular',
                    color: colors.text.secondary,
                    marginTop: 4
                  }}
                >
                  Since {new Date(relationshipData.startDate).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </Text>
              </View>

              <View className="items-end">
                <View
                  className="rounded-full p-3"
                  style={{ backgroundColor: colors.accent.rose }}
                >
                  <Heart size={20} color="white" fill="white" />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: 'InstrumentSans-Medium',
                    color: colors.accent.rose,
                    marginTop: 8
                  }}
                >
                  {duration.totalDays} days
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}