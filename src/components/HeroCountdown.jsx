import React, { useState, useEffect } from 'react';
import { View, Text, Animated, Dimensions } from 'react-native';
import { Heart } from 'lucide-react-native';
import { DateUtils } from '../utils/dateCalculations';
import { useTheme } from '../context/ThemeContext';

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
    <View className="mx-6 mb-8">
      <View className="items-center py-8">
        {/* Dotted Circle Border */}
        <View className="relative">
          {/* Outer dotted border */}
          <View 
            className="border-2 border-dashed rounded-full"
            style={{ 
              width: 280, 
              height: 280,
              borderColor: colors.border
            }}
          />
          
          {/* Main Circle */}
          <Animated.View 
            className="absolute inset-4 rounded-full items-center justify-center"
            style={{ 
              transform: [{ scale: pulseAnim }],
              backgroundColor: '#F43F5E',
              shadowColor: '#F43F5E',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.4,
              shadowRadius: 20,
              elevation: 8
            }}
          >
            {/* Love Icon */}
            <View className="absolute" style={{ top: 24 }}>
              <Heart size={20} color="white" fill="white" />
            </View>
            
            {/* Main Counter */}
            <View className="items-center">
              <Text 
                className="font-bold text-white mb-1"
                style={{ 
                  fontSize: 48, 
                  fontFamily: 'InstrumentSans_SemiCondensed-Bold',
                  lineHeight: 52
                }}
              >
                {countdown.days}
              </Text>
              <Text 
                className="text-white mb-4"
                style={{ 
                  fontSize: 16, 
                  fontFamily: 'InstrumentSans-Medium',
                  opacity: 0.9
                }}
              >
                days together
              </Text>
              
              {/* Time Details */}
              <View className="bg-white/20 rounded-2xl px-4 py-2">
                <Text 
                  className="text-white text-center"
                  style={{ 
                    fontSize: 14, 
                    fontFamily: 'InstrumentSans-Regular',
                    opacity: 0.9
                  }}
                >
                  {String(countdown.hours).padStart(2, '0')}h {String(countdown.minutes).padStart(2, '0')}m {String(countdown.seconds).padStart(2, '0')}s
                </Text>
              </View>
            </View>
            
            {/* Bottom message */}
            <View className="absolute" style={{ bottom: 24 }}>
              <Text 
                className="text-white text-center"
                style={{ 
                  fontSize: 12, 
                  fontFamily: 'InstrumentSans-Regular',
                  opacity: 0.8
                }}
              >
                Every moment counts
              </Text>
            </View>
          </Animated.View>
        </View>
        
        {/* Names below circle */}
        <View className="mt-6 items-center">
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
              color: colors.text.secondary
            }}
          >
            Growing stronger every day
          </Text>
        </View>
      </View>
    </View>
  );
}