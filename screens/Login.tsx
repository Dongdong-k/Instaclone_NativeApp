import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const Container = styled.View`
  margin-top: 100px;
`;

export default function Login({ navigation }: any) {
  return (
    <AuthLayout>
      <AuthButton disabled={true} text="Log In" onPress={() => null} />
    </AuthLayout>
  );
}
