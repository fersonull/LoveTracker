import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { Heart } from 'lucide-react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <View className="flex-1 justify-center items-center px-8">
        {/* Header Icon */}
        <View className="mb-12">
          <Heart size={80} color="#F43F5E" fill="#F43F5E" />
        </View>

        {/* Main Message */}
        <Text className="text-4xl font-instrument-sc text-gray-800 text-center mb-4">
          Every love has a beginning
        </Text>
        
        <Text className="text-lg font-instrument text-gray-600 text-center mb-16 leading-relaxed">
          Let's celebrate your beautiful journey together
        </Text>

        {/* CTA Button */}
        <TouchableOpacity 
          className="bg-rose-500 px-12 py-4 rounded-full shadow-lg active:scale-95"
          onPress={() => navigation.navigate('PartnerNames')}
        >
          <Text className="text-white text-lg font-instrument-medium">Start Your Story</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}