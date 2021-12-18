import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Appearance } from "react-native-appearance";

export default function Welcome({ navigation }: any) {
  // 현재 테마 가져오기
  const colorScheme = Appearance.getColorScheme();
  // 테마 변경시 변경내역 가져오기
  const colorSubscription = Appearance.addChangeListener(({ colorScheme }) => {
    console.log(colorSubscription);
  });
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("CreateAccount")}>
        <View>
          <Text>Go to Create Account</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <View>
          <Text>Go to Login</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
