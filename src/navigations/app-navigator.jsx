import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Import screens
import WelcomeScreen from '../screens/WelcomeScreen';
import PartnerNamesScreen from '../screens/PartnerNamesScreen';
import StartDateScreen from '../screens/StartDateScreen';
import ReminderPreferencesScreen from '../screens/ReminderPreferencesScreen';
import DashboardScreen from '../screens/DashboardScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createNativeStackNavigator();

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
                
                {/* Main App */}
                <Stack.Screen name="Dashboard" component={DashboardScreen} />
                <Stack.Screen name="Settings" component={SettingsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}