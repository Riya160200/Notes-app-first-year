// app/(tabs)/_layout.tsx - FIXED VERSION
import { View } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.pink[600],
        tabBarInactiveTintColor: Colors.pink[300],
        tabBarStyle: {
          backgroundColor: Colors.card,
          borderTopWidth: 0,
          elevation: 20,
          shadowColor: Colors.shadow,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.2,
          shadowRadius: 12,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: 'absolute',
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '700',
          marginBottom: 4,
        },
        tabBarItemStyle: {
          paddingVertical: 5,
        },
        headerStyle: {
          backgroundColor: Colors.background,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: Colors.pink[600],
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 26,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: '✨ My Notes',
          tabBarLabel: 'My Notes',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 105, 180, 0.1)' : 'transparent',
              padding: 8,
              borderRadius: 12,
            }}>
              <Ionicons 
                name={focused ? "albums" : "albums-outline"} 
                size={size + 2} 
                color={color} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '💕 Create Note',
          tabBarLabel: 'Create',
          tabBarIcon: ({ color, size, focused }) => (
            <View style={{
              backgroundColor: focused ? 'rgba(255, 105, 180, 0.15)' : Colors.pink[100],
              padding: 10,
              borderRadius: 20,
              borderWidth: focused ? 3 : 2,
              borderColor: color,
            }}>
              <Ionicons 
                name="add" 
                size={size + 4} 
                color={color} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}