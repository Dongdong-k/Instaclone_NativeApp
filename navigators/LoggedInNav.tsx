import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import SelectPhoto from "../screens/SelectPhoto";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import { color } from "../color";
import { Ionicons } from "@expo/vector-icons";

const Stack = createStackNavigator();

export default function LoggedInNav() {
  return (
    <Stack.Navigator screenOptions={{ presentation: "card" }}>
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          title: "Upload",
          headerTintColor: "white",
          headerBackTitleVisible: false,
          headerBackImage: ({ tintColor }) => (
            <Ionicons color={tintColor} name="close" size={28} />
          ),
          headerStyle: {
            backgroundColor: "black",
          },
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
