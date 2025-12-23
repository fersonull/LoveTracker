import React from 'react';
import { View, Text } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';
import { DateUtils } from '../../utils/date-calculation';

export default function SummaryCard({ relationshipData, duration }) {
  const { colors } = useTheme();
  
  if (!relationshipData) return null;
  
  return (
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
  );
}