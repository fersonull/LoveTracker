import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '../../context/ThemeContext';

export default function ScreenHeader({ 
  title, 
  subtitle, 
  showBackButton = false, 
  onBackPress,
  rightElement,
  centered = false
}) {
  const { colors } = useTheme();
  
  return (
    <View className="px-6 pt-6 pb-4">
      <View className={`flex-row items-center ${centered ? 'justify-center' : 'justify-between'}`}>
        {showBackButton ? (
          <TouchableOpacity
            className="p-3 rounded-2xl mr-4"
            style={{
              backgroundColor: colors.surface,
              borderWidth: 1,
              borderColor: colors.border,
            }}
            onPress={onBackPress}
            activeOpacity={0.8}
          >
            <ArrowLeft size={24} color={colors.accent.rose} />
          </TouchableOpacity>
        ) : !centered && <View />}
        
        <View className={centered ? 'items-center' : 'flex-1'}>
          <Text 
            style={{ 
              fontSize: centered ? 18 : 24, 
              fontFamily: centered ? 'InstrumentSans-Regular' : 'InstrumentSans_SemiCondensed-Regular',
              color: colors.text.primary
            }}
          >
            {title}
          </Text>
          {subtitle && (
            <Text 
              style={{ 
                fontSize: centered ? 16 : 14, 
                fontFamily: centered ? 'InstrumentSans-Medium' : 'InstrumentSans-Regular',
                color: centered ? colors.text.muted : colors.text.secondary,
                marginTop: centered ? 4 : 4
              }}
            >
              {subtitle}
            </Text>
          )}
        </View>
        
        {rightElement && !centered && rightElement}
        {!rightElement && !centered && <View />}
      </View>
    </View>
  );
}