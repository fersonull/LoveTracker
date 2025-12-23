import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { Heart, MousePointerClick } from 'lucide-react-native';
import { DateUtils } from '../../utils/date-calculation';
import { useTheme } from '../../context/ThemeContext';

const { width } = Dimensions.get('window');

export default function HeroCountdown({ startDate, partnerNames }) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  const [backgroundTransition] = useState(new Animated.Value(0));
  const [pulseAnim] = useState(new Animated.Value(1));
  const { colors } = useTheme();

  useEffect(() => {
    const updateCountdown = () => {
      if (!startDate) return;

      const start = new Date(startDate);
      const now = new Date();

      // Calculate the total time difference in milliseconds
      const totalDiff = now.getTime() - start.getTime();

      // Calculate total days since start
      const totalDays = Math.floor(totalDiff / (1000 * 60 * 60 * 24));

      // Calculate total hours since relationship started
      const totalHours = Math.floor(totalDiff / (1000 * 60 * 60));

      // For minutes and seconds, use current real-time values
      // These will reset every hour and count up from 0-59
      const currentMinutes = now.getMinutes();
      const currentSeconds = now.getSeconds();

      setCountdown({
        days: totalDays,
        hours: totalHours,
        minutes: currentMinutes,
        seconds: currentSeconds
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [startDate]);

  useEffect(() => {
    // Background gradient animation
    const bgAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(backgroundTransition, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: false,
        }),
        Animated.timing(backgroundTransition, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: false,
        }),
      ])
    );

    // Subtle pulse animation for the circle
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    );

    bgAnimation.start();
    pulseAnimation.start();

    return () => {
      bgAnimation.stop();
      pulseAnimation.stop();
    };
  }, []);

  const backgroundInterpolation = backgroundTransition.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['#fdf2f8', '#fff1f2', '#fce7f3'],
  });

  return (
    <View className="mx-6 mb-12">
      <View className="items-center py-12">
        <View className="relative">
          <View
            className="border-2 border-dashed rounded-full"
            style={{
              width: 300,
              height: 300,
              borderColor: colors.border
            }}
          />

          <Animated.View
            className="absolute rounded-full items-center justify-center"
            style={{
              top: 20,
              left: 20,
              right: 20,
              bottom: 20,
              transform: [{ scale: pulseAnim }],
              backgroundColor: colors.accent.rose,
              shadowColor: colors.accent.rose,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 20,
              elevation: 8
            }}
          >
            <View className="absolute" style={{ top: 30 }}>
              <MousePointerClick size={20} color="white" fill="white" />
            </View>

            <View className="items-center">
              <Text
                className="font-bold text-white mb-2"
                style={{
                  fontSize: 52,
                  fontFamily: 'InstrumentSans_SemiCondensed-Bold',
                  lineHeight: 56
                }}
              >
                {countdown.days}
              </Text>
              <Text
                className="text-white mb-6"
                style={{
                  fontSize: 16,
                  fontFamily: 'InstrumentSans-Medium',
                  opacity: 0.9
                }}
              >
                days together
              </Text>

              <View className="bg-white/20 rounded-2xl px-6 py-3">
                <Text
                  className="text-white text-center"
                  style={{
                    fontSize: 15,
                    fontFamily: 'InstrumentSans-Regular',
                    opacity: 0.9
                  }}
                >
                  {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m {String(countdown.seconds).padStart(2, '0')}s
                </Text>
              </View>
            </View>

          </Animated.View>
        </View>

        <View className="mt-8 items-center">
          <Text
            style={{
              fontSize: 24,
              fontFamily: 'InstrumentSans_SemiCondensed-Regular',
              color: colors.text.primary
            }}
          >
            {partnerNames ? `${partnerNames.partner1} & ${partnerNames.partner2}` : 'Your Love Story'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: 'InstrumentSans-Regular',
              color: colors.text.secondary,
              marginTop: 6
            }}
          >
            Growing stronger every day
          </Text>
        </View>
      </View>
    </View>
  );
}