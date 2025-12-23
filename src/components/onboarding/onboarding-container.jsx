import React from 'react';
import { SafeAreaView, View, KeyboardAvoidingView, Platform } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function OnboardingContainer({ 
  children, 
  showKeyboardAvoidingView = false,
  style 
}) {
  const { colors } = useTheme();
  
  const content = (
    <View className="flex-1 justify-center px-8" style={style}>
      {children}
    </View>
  );
  
  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: colors.background }}>
      {showKeyboardAvoidingView ? (
        <KeyboardAvoidingView 
          className="flex-1" 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          {content}
        </KeyboardAvoidingView>
      ) : (
        content
      )}
    </SafeAreaView>
  );
}