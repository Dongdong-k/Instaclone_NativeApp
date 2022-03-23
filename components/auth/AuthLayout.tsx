import React from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from "react-native";
import styled from "styled-components/native";
import DismissKeyboard from "../DismissKeyboard";

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
  height: 100px;
`;

export default function AuthLayout({ children }: any) {
  return (
    <>
      <StatusBar barStyle={"light-content"} hidden={false} />
      <DismissKeyboard>
        <AuthContainer>
          <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={Platform.OS === "ios" ? 150 : -300}
            style={{
              width: "100%",
              alignItems: "center",
            }}
          >
            <Logo
              resizeMode="contain"
              source={require("../../assets/logo1.png")}
            />
            {children}
          </KeyboardAvoidingView>
        </AuthContainer>
      </DismissKeyboard>
    </>
  );
}
