import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";
import { TextInputForm } from "../components/auth/AuthShared";

const Container = styled.View`
  margin-top: 100px;
`;

export default function Login({ navigation }: any) {
  return (
    <AuthLayout>
      <TextInputForm
        placeholder="User Name"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        returnKeyType="next"
        blurOnSubmit={false}
      />
      <TextInputForm
        placeholder="Password"
        placeholderTextColor={"rgba(255, 255, 255, 0.8)"}
        secureTextEntry
        returnKeyType="done"
        blurOnSubmit={false}
        lastOne={true}
      />
      <AuthButton disabled={true} text="Log In" onPress={() => null} />
    </AuthLayout>
  );
}
