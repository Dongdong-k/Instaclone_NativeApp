import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
};

const Stack = createStackNavigator();

// 스택 네비게이터 반환 필요
// 제일 상단에 있는 것이 초기화면
export default function LoggedOutNav() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        presentation: "card",
        headerBackTitleVisible: false,
        headerTitleAlign: "center",
        headerShown: false,
        headerTransparent: true,
        headerTintColor: "white",
        headerStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: true, title: "" }}
      />
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccount}
        options={{ headerShown: true, title: "" }}
      />
    </Stack.Navigator>
  );
}
