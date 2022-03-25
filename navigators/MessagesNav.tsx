import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import Room from "../screens/Room";
import Rooms from "../screens/Rooms";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function MessagesNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: "white",
        headerBackTitleVisible: false,
        headerBackImage: ({ tintColor }: any) => (
          <Ionicons color={tintColor} name="close" size={28} />
        ),
        headerStyle: {
          backgroundColor: "black",
        },
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="Rooms" component={Rooms} />
      <Stack.Screen name="Room" component={Room} />
    </Stack.Navigator>
  );
}
