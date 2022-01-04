import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from "../screens/Feed";
import React from "react";
import Search from "../screens/Search";
import Notification from "../screens/Notification";
import Profile from "../screens/Profile";
import { View } from "react-native";
import TabIcon from "../components/nav/TabIcon";

const Tabs = createBottomTabNavigator();

export default function LoggedInNav() {
  return (
    <Tabs.Navigator
      initialRouteName="Feed"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopColor: "rgba(255, 255, 255, 0.3) ",
        },
        tabBarActiveTintColor: "white",
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        component={Feed}
        name="Feed"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"home"} />
          ),
        }}
      />
      <Tabs.Screen
        component={Search}
        name="Search"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"search"} />
          ),
        }}
      />
      <Tabs.Screen
        component={View}
        name="Camera"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"camera"} />
          ),
        }}
      />
      <Tabs.Screen
        component={Notification}
        name="Notification"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"heart"} />
          ),
        }}
      />
      <Tabs.Screen
        component={Profile}
        name="Profile"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"person"} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}
