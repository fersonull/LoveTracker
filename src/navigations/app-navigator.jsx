import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Heart, Settings, Calendar, User } from 'lucide-react-native';

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import PartnerNamesScreen from '../screens/PartnerNamesScreen';
import StartDateScreen from '../screens/StartDateScreen';
import ReminderPreferencesScreen from '../screens/ReminderPreferencesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Bottom Tab Navigator for main app
function MainTabs() {
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
                    } else if (route.name === 'Profile') {
                        IconComponent = User;
                    } else if (route.name === 'Settings') {
                        IconComponent = Settings;
                    }

                    return <IconComponent 
                        size={size} 
                        color={color} 
                        fill={focused ? color : 'none'}
                    />;
                },
                tabBarActiveTintColor: '#F43F5E',
                tabBarInactiveTintColor: '#9CA3AF',
                tabBarStyle: {
                    backgroundColor: 'white',
                    borderTopColor: '#F3F4F6',
                    borderTopWidth: 1,
                    height: 90,
                    paddingBottom: 20,
                    paddingTop: 10,
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
                component={DashboardScreen} // Placeholder for now
                options={{ tabBarLabel: 'Memories' }}
            />
            <Tab.Screen 
                name="Profile" 
                component={DashboardScreen} // Placeholder for now
                options={{ tabBarLabel: 'Profile' }}
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
    return (
        <NavigationContainer>
            <Stack.Navigator 
                initialRouteName="Welcome"
                screenOptions={{
                    headerShown: false,
                    animation: 'slide_from_right',
                    gestureEnabled: true
                }}
            >
                {/* Onboarding Flow */}
                <Stack.Screen name="Welcome" component={WelcomeScreen} />
                <Stack.Screen name="PartnerNames" component={PartnerNamesScreen} />
                <Stack.Screen name="StartDate" component={StartDateScreen} />
                <Stack.Screen name="ReminderPreferences" component={ReminderPreferencesScreen} />
                
                {/* Main App with Tabs */}
                <Stack.Screen name="Dashboard" component={MainTabs} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}