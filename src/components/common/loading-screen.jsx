import { View, Text } from 'react-native';
import { Heart } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingScreen({ message = "Loading your love story..." }) {
  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-pink-50 to-rose-100">
      <View className="flex-1 justify-center items-center px-8">
        {/* Animated Heart */}
        <View className="mb-8">
          <Heart size={60} color="#F43F5E" fill="#F43F5E" />
        </View>

        {/* Loading Message */}
        <Text className="text-lg text-gray-600 text-center">
          {message}
        </Text>
      </View>
    </SafeAreaView>
  );
}