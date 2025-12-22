import React, { useState, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Heart, Settings, Calendar, Clock, Timer, Star, Trophy, Sparkles } from 'lucide-react-native';
import { StorageService } from '../utils/storage';
import { DateUtils } from '../utils/dateCalculations';
import HeroCountdown from '../components/HeroCountdown';
import { useTheme } from '../context/ThemeContext';

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
    // Use theme-aware background colors based on color
    const cardBgColor = color === colors.accent.rose ? colors.cardBackgroundRose :
                       color === colors.accent.pink ? colors.cardBackgroundPink :
                       color === colors.accent.purple ? colors.cardBackgroundPurple :
                       colors.cardBackgroundCyan;
    
    return (
      <View 
        className="rounded-3xl p-5 shadow-sm flex-1 mx-1"
        style={{ 
          backgroundColor: cardBgColor,
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
              color: color
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
        {/* Header */}
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

        {/* Hero Countdown Section */}
        <HeroCountdown 
          startDate={relationshipData.startDate}
          partnerNames={{
            partner1: relationshipData.partner1Name,
            partner2: relationshipData.partner2Name
          }}
        />

        {/* Love Statistics Cards */}
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
          
          {/* First row - Time stats */}
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

          {/* Second row - Milestone stats */}
          <View className="flex-row mb-4">
            <StatCard
              title="Months Together"
              value={duration.totalMonths || '0'}
              subtitle="Monthly milestones"
              icon={Calendar}
              color={colors.accent.rose}
            />
            <StatCard
              title="Achievements"
              value={Math.floor((duration.totalDays || 0) / 100)}
              subtitle="Century marks"
              icon={Trophy}
              color={colors.accent.pink}
            />
          </View>

          {/* Third row - Special metrics */}
          <View className="flex-row mb-6">
            <StatCard
              title="Weekends"
              value={Math.floor((duration.totalDays || 0) / 7 * 2)}
              subtitle="Weekend adventures"
              icon={Star}
              color={colors.accent.purple}
            />
            <StatCard
              title="Seasons"
              value={Math.floor((duration.totalDays || 0) / 91)}
              subtitle="Seasons of love"
              icon={Sparkles}
              color={colors.accent.cyan}
            />
          </View>

          {/* Single full-width card */}
          <View 
            className="rounded-3xl p-6 shadow-sm"
            style={{
              backgroundColor: colors.accent.rose
            }}
          >
            <View className="items-center">
              <Heart size={32} color="white" fill="white" />
              <Text 
                className="text-white mt-3 mb-2"
                style={{ 
                  fontSize: 24, 
                  fontFamily: 'InstrumentSans_SemiCondensed-Bold'
                }}
              >
                {DateUtils.formatDuration(duration)}
              </Text>
              <Text 
                className="text-white text-center"
                style={{ 
                  fontSize: 16, 
                  fontFamily: 'InstrumentSans-Regular',
                  opacity: 0.9
                }}
              >
                Your beautiful love story continues
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}