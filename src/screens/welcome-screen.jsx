import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Heart } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export default function WelcomeScreen({ navigation }) {
  const { colors } = useTheme();
  
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <View className="flex-1 justify-center items-center px-8">
        {/* Header Icon */}
        <View className="mb-12">
          <Heart size={64} color={colors.accent.rose} fill={colors.accent.rose} />
        </View>

        {/* Main Message */}
        <Text 
          className="text-center mb-4"
          style={{
            fontSize: 32,
            fontFamily: 'InstrumentSans_SemiCondensed-Regular',
            color: colors.text.primary,
            lineHeight: 40
          }}
        >
          Every love has a beginning
        </Text>
        
        <Text 
          className="text-center mb-16"
          style={{
            fontSize: 16,
            fontFamily: 'InstrumentSans-Regular',
            color: colors.text.secondary,
            lineHeight: 24,
            paddingHorizontal: 20
          }}
        >
          Let's celebrate your beautiful journey together
        </Text>

        {/* CTA Button */}
        <TouchableOpacity 
          className="px-12 py-4 rounded-2xl shadow-sm"
          style={{ backgroundColor: colors.accent.rose }}
          onPress={() => navigation.navigate('PartnerNames')}
          activeOpacity={0.8}
        >
          <Text 
            style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'InstrumentSans-Medium'
            }}
          >
            Start Your Story
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}