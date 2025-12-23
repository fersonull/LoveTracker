import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

export default function FormInput({ 
  label, 
  placeholder, 
  value, 
  onChangeText,
  autoCapitalize = 'words',
  keyboardType = 'default',
  style
}) {
  const { colors } = useTheme();
  
  return (
    <View className="mb-6">
      <Text 
        style={{
          fontFamily: 'InstrumentSans-Medium',
          color: colors.text.primary,
          fontSize: 14,
          marginBottom: 8
        }}
      >
        {label}
      </Text>
      <TextInput
        className="px-4 py-4 rounded-2xl border"
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          color: colors.text.primary,
          fontSize: 16,
          fontFamily: 'InstrumentSans-Regular',
          ...style
        }}
        placeholder={placeholder}
        placeholderTextColor={colors.text.muted}
        value={value}
        onChangeText={onChangeText}
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
      />
    </View>
  );
}