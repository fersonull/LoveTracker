import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heart, Settings, Calendar } from 'lucide-react-native';
import { useTheme } from '../context/ThemeContext';

import WelcomeScreen from '../screens/onboarding/welcome-screen';
import PartnerNamesScreen from '../screens/onboarding/partner-name-screen';
import StartDateScreen from '../screens/onboarding/start-date-screen';
import ReminderPreferencesScreen from '../screens/onboarding/reminder-preference-screen';
import DashboardScreen from '../screens/main/dashboard-screen';
import SettingsScreen from '../screens/main/settings-screen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
    const { colors } = useTheme();

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarIcon: ({ focused, color, size }) => {
                    let IconComponent;

                    if (route.name === 'Home') {
                        IconComponent = Heart;
                    } else if (route.name === 'Calendar') {
                        IconComponent = Calendar;
                    } else if (route.name === 'Settings') {
                        IconComponent = Settings;
                    }

                    return <IconComponent
                        size={size}
                        color={color}
                        fill={focused ? color : 'none'}
                    />;
                },
                tabBarActiveTintColor: colors.accent.rose,
                tabBarInactiveTintColor: colors.text.muted,
                tabBarStyle: {
                    backgroundColor: colors.surface,
                    borderTopColor: colors.border,
                    borderTopWidth: 1,
                    height: 70,
                },
                tabBarLabelStyle: {
                    fontFamily: 'InstrumentSans-Medium',
                    fontSize: 12,
                    marginTop: 4,
                },
                tabBarIconStyle: {
                    marginTop: 5,
                }
            })}
        >
            <Tab.Screen
                name="Home"
                component={DashboardScreen}
                options={{ tabBarLabel: 'Home' }}
            />
            <Tab.Screen
                name="Calendar"
                component={DashboardScreen}
                options={{ tabBarLabel: 'Memories' }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ tabBarLabel: 'Settings' }}
            />
        </Tab.Navigator>
    );
}

export default function AppNavigator() {
    const [isLoading, setIsLoading] = React.useState(true);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = React.useState(false);

    React.useEffect(() => {
        checkOnboardingStatus();
    }, []);

    const checkOnboardingStatus = async () => {
        try {
            const { StorageService } = await import('../utils/storage');
            const hasCompleted = await StorageService.hasCompletedOnboarding();
            setHasCompletedOnboarding(hasCompleted);
        } catch (error) {
            console.error('Error checking onboarding status:', error);
            setHasCompletedOnboarding(false);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return null; // or a loading screen component
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={hasCompletedOnboarding ? "Dashboard" : "Welcome"}
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    gestureEnabled: true
                }}
            >
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="PartnerNames" component={PartnerNamesScreen} />
                <Stack.Screen name="StartDate" component={StartDateScreen} />
                <Stack.Screen name="ReminderPreferences" component={ReminderPreferencesScreen} />

                <Stack.Screen name="Dashboard" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}