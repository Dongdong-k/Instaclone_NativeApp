import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: { backgroundColor: "black" },
        tabBarActiveTintColor: "white",
        tabBarIndicatorStyle: {
          backgroundColor: "lightgreen",
          top: 0,
        },
      }}
    >
      <Tab.Screen name="SelectTab" options={{ title: "Select" }}>
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: "white",
              headerStyle: {
                backgroundColor: "black",
                shadowOpacity: 0.3,
              },
              headerBackTitleVisible: false,
              headerTitleAlign: "center",
              headerBackImage: ({ tintColor }: any) => (
                <Ionicons color={tintColor} name="close" size={28} />
              ),
            }}
          >
            <Stack.Screen
              name="Select"
              options={{ title: "Choose a Photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="TakePhoto" component={TakePhoto} />
    </Tab.Navigator>
  );
}
{
  /* <Tab.Screen name="Select" component={SelectPhoto} /> */
}
