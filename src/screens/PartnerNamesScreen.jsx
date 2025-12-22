import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Users } from 'lucide-react-native';

export default function PartnerNamesScreen({ navigation }) {
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');

  const handleContinue = () => {
    if (partner1Name.trim() && partner2Name.trim()) {
      navigation.navigate('StartDate', { 
        partner1Name: partner1Name.trim(), 
        partner2Name: partner2Name.trim() 
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-8">
          {/* Header */}
          <View className="items-center mb-12">
            <Users size={60} color="#F43F5E" />
            <Text className="text-3xl font-light text-gray-800 text-center mt-4">
              Who are the lovebirds?
            </Text>
            <Text className="text-base text-gray-600 text-center mt-2">
              Tell us your beautiful names
            </Text>
          </View>

          {/* Input Fields */}
          <View className="space-y-6 mb-12">
            <View>
              <Text className="text-gray-700 font-medium mb-2">First Partner</Text>
              <TextInput
                className="bg-white/80 px-4 py-4 rounded-xl text-lg border border-pink-200 focus:border-rose-400"
                placeholder="Your name"
                placeholderTextColor="#9CA3AF"
                value={partner1Name}
                onChangeText={setPartner1Name}
                autoCapitalize="words"
              />
            </View>

            <View>
              <Text className="text-gray-700 font-medium mb-2">Second Partner</Text>
              <TextInput
                className="bg-white/80 px-4 py-4 rounded-xl text-lg border border-pink-200 focus:border-rose-400"
                placeholder="Your partner's name"
                placeholderTextColor="#9CA3AF"
                value={partner2Name}
                onChangeText={setPartner2Name}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className={`py-4 rounded-full shadow-lg active:scale-95 ${
              partner1Name.trim() && partner2Name.trim() 
                ? 'bg-rose-500' 
                : 'bg-gray-300'
            }`}
            onPress={handleContinue}
            disabled={!partner1Name.trim() || !partner2Name.trim()}
          >
            <Text className={`text-lg font-medium text-center ${
              partner1Name.trim() && partner2Name.trim() 
                ? 'text-white' 
                : 'text-gray-500'
            }`}>
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}