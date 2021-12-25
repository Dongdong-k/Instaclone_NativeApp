import React from "react";
import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { color } from "../color";
import AuthButton from "../components/auth/AuthButton";
import AuthLayout from "../components/auth/AuthLayout";

const LoginLink = styled.Text`
  color: ${color.blue};
  margin-top: 20px;
  font-weight: 600;
`;

export default function Welcome({ navigation }: any) {
  const goToCreateAccount = () => navigation.navigate("CreateAccount");
  const goToLogin = () => navigation.navigate("Login");

  return (
    <AuthLayout>
      <AuthButton
        disabled={false}
        onPress={goToCreateAccount}
        text={"Create New Account"}
      />
      <TouchableOpacity onPress={goToLogin}>
        <LoginLink>Log In</LoginLink>
      </TouchableOpacity>
    </AuthLayout>
  );
}
