import React from "react";
import { Text, View, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Container = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

export default function CreateAccount({ navigation }: any) {
  return (
    <AuthLayout>
      <TextInput
        style={{ backgroundColor: "white", width: "100%" }}
        placeholder="First Name"
        placeholderTextColor={"gray"}
        returnKeyType="next"
      />
      <TextInput
        style={{ backgroundColor: "white", width: "100%" }}
        placeholder="Last Name"
        placeholderTextColor={"gray"}
        returnKeyType="next"
      />
      <TextInput
        style={{ backgroundColor: "white", width: "100%" }}
        placeholder="Username"
        placeholderTextColor={"gray"}
        returnKeyType="next"
      />
      <TextInput
        style={{ backgroundColor: "white", width: "100%" }}
        placeholder="Email"
        placeholderTextColor={"gray"}
        keyboardType="email-address"
        returnKeyType="next"
      />
      <TextInput
        style={{ backgroundColor: "white", width: "100%" }}
        placeholder="Password"
        placeholderTextColor={"gray"}
        secureTextEntry
        returnKeyType="done"
      />
      <AuthButton disabled={true} text="Create Account" onPress={() => null} />
    </AuthLayout>
  );
}
