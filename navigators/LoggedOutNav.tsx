import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CreateAccount from "../screens/CreateAccount";
import Login from "../screens/Login";
import Welcome from "../screens/Welcome";

type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  CreateAccount: undefined;
};

const Stack = createNativeStackNavigator();

// 스택 네비게이터 반환 필요
export default function LoggedOutNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CreateAccount" component={CreateAccount} />
    </Stack.Navigator>
  );
}