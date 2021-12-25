import React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import styled from "styled-components/native";

const AuthContainer = styled.View`
  flex: 1;
  background-color: black;
  justify-content: center;
  align-items: center;
  padding: 0px 40px;
`;

const Logo = styled.Image`
  max-width: 50%;
  width: 100%;
  height: 300px;
`;

export default function AuthLayout({ children }: any) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback
      style={{ flex: 1 }}
      onPress={() => dismissKeyboard()}
    >
      <AuthContainer>
        <Logo resizeMode="contain" source={require("../../assets/logo1.png")} />
        {children}
      </AuthContainer>
    </TouchableWithoutFeedback>
  );
}
