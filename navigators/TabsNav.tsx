import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import TabIcon from "../components/nav/TabIcon";
import { Image } from "react-native";
import useMe from "../hooks/useMe";
import StackNavFactory from "./StackNavFactory";

const Tabs = createBottomTabNavigator();

export default function TabsNav() {
  const { data, refetch } = useMe();
  const [firstLoggedIn, setFirstLoggedIn] = useState(true);
  useEffect(() => {
    refetch();
    setFirstLoggedIn(false);
  }, [firstLoggedIn]);

  return (
    <Tabs.Navigator
      initialRouteName="FeedTabs"
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
        name="FeedTabs"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"home"} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Feed" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="SearchTabs"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"search"} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Search" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="UploadTabs"
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"camera"} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Upload" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="NotificationTabs"
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} color={color} iconName={"heart"} />
          ),
        }}
      >
        {() => <StackNavFactory screenName="Notification" />}
      </Tabs.Screen>
      <Tabs.Screen
        name="MeTabs"
        options={{
          tabBarIcon: ({ focused, color, size }) =>
            data?.me?.avatar ? (
              <Image
                style={{
                  width: 25,
                  height: 25,
                  borderRadius: 12.5,
                  ...(focused && { borderColor: "white", borderWidth: 2 }),
                }}
                source={{ uri: data.me.avatar }}
              />
            ) : (
              <TabIcon focused={focused} color={color} iconName={"person"} />
            ),
        }}
      >
        {() => <StackNavFactory screenName="Me" />}
      </Tabs.Screen>
    </Tabs.Navigator>
  );
}
