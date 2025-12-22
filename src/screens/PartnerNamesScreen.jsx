import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { Users } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

export default function PartnerNamesScreen({ navigation }) {
  const [partner1Name, setPartner1Name] = useState('');
  const [partner2Name, setPartner2Name] = useState('');
  const { colors } = useTheme();

  const handleContinue = () => {
    if (partner1Name.trim() && partner2Name.trim()) {
      navigation.navigate('StartDate', { 
        partner1Name: partner1Name.trim(), 
        partner2Name: partner2Name.trim() 
      });
    }
  };

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      <KeyboardAvoidingView 
        className="flex-1" 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1 justify-center px-8">
          {/* Header */}
          <View className="items-center mb-12">
            <Users size={48} color={colors.accent.rose} />
            <Text 
              className="text-center mt-4"
              style={{
                fontSize: 28,
                fontFamily: 'InstrumentSans_SemiCondensed-Regular',
                color: colors.text.primary
              }}
            >
              Who are the lovebirds?
            </Text>
            <Text 
              className="text-center mt-2"
              style={{
                fontSize: 16,
                fontFamily: 'InstrumentSans-Regular',
                color: colors.text.secondary
              }}
            >
              Tell us your beautiful names
            </Text>
          </View>

          {/* Input Fields */}
          <View className="mb-12">
            <View className="mb-6">
              <Text 
                style={{
                  fontFamily: 'InstrumentSans-Medium',
                  color: colors.text.primary,
                  fontSize: 14,
                  marginBottom: 8
                }}
              >
                First Partner
              </Text>
              <TextInput
                className="px-4 py-4 rounded-2xl border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text.primary,
                  fontSize: 16,
                  fontFamily: 'InstrumentSans-Regular'
                }}
                placeholder="Your name"
                placeholderTextColor={colors.text.muted}
                value={partner1Name}
                onChangeText={setPartner1Name}
                autoCapitalize="words"
              />
            </View>

            <View>
              <Text 
                style={{
                  fontFamily: 'InstrumentSans-Medium',
                  color: colors.text.primary,
                  fontSize: 14,
                  marginBottom: 8
                }}
              >
                Second Partner
              </Text>
              <TextInput
                className="px-4 py-4 rounded-2xl border"
                style={{
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  color: colors.text.primary,
                  fontSize: 16,
                  fontFamily: 'InstrumentSans-Regular'
                }}
                placeholder="Your partner's name"
                placeholderTextColor={colors.text.muted}
                value={partner2Name}
                onChangeText={setPartner2Name}
                autoCapitalize="words"
              />
            </View>
          </View>

          {/* Continue Button */}
          <TouchableOpacity
            className="py-4 rounded-2xl shadow-sm active:scale-95"
            style={{
              backgroundColor: partner1Name.trim() && partner2Name.trim() 
                ? colors.accent.rose 
                : colors.text.muted
            }}
            onPress={handleContinue}
            disabled={!partner1Name.trim() || !partner2Name.trim()}
          >
            <Text 
              style={{
                fontSize: 16,
                fontFamily: 'InstrumentSans-Medium',
                textAlign: 'center',
                color: 'white'
              }}
            >
              Continue
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}